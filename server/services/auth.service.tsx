// server/services/auth.service.tsx
import { db }                    from "@/db";
import * as schema               from "@/db/schema";
import { eq }                    from "drizzle-orm";
import { userRepo }              from "@/server/repositories/user.repo";
import { patientRepo }           from "@/server/repositories/patient.repo";
import { doctorRepo }            from "@/server/repositories/doctor.repo";
import { auditRepo }             from "@/server/repositories/audit.repo";
import { refreshTokenRepo }      from "../repositories/refreshToken.repo";
import { hash, verify }          from "@/server/utils/password";
import {
  signAccessToken, signRefreshToken, verifyRefreshToken,
  signOnboardingToken, verifyOnboardingToken,
} from "@/server/utils/jwt";
import { emailService }          from "@/server/services/email.service";
import { ValidationError, ForbiddenError } from "@/server/utils/errors";
import {
  emailSignupSchema, emailLoginSchema, otpVerifySchema,
  emailOtpVerifySchema, phoneSignupSchema, selectRoleSchema,
} from "@/server/validators/auth";
import {
  assertHasAtLeastOneCredential, assertLoginAllowed,
} from "@/server/domain/auth.domain";
import {
  assertAuditActorPresent, assertAuditTargetValid,
  assertAuditMetadataSerializable, type AuditLogInput,
} from "@/server/domain/audit.domain";
import { UserRole }   from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";
import { OtpChannel } from "@/server/constants/otp-channel";
import { features }   from "@/lib/config/features";
import { logger } from "../utils/logger";
/* ── Helpers ── */

function generateOtp(digits = 6): string {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
}

function otpExpiresAt(minutes = 10): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

async function persistAudit(log: AuditLogInput) {
  assertAuditActorPresent(log);
  assertAuditTargetValid(log);
  assertAuditMetadataSerializable(log.metadata);
  await auditRepo.create(log);
}

function toAuthDomainState(auth: {
  email?: string | null; emailVerifiedAt?: Date | null;
  whatsappPhone?: string | null; whatsappVerifiedAt?: Date | null;
}) {
  return {
    email:                auth.email               ?? null,
    emailVerifiedAt:      auth.emailVerifiedAt     ? auth.emailVerifiedAt.getTime()     : null,
    whatsappPhone:        auth.whatsappPhone        ?? null,
    whatsappVerifiedAt:   auth.whatsappVerifiedAt   ? auth.whatsappVerifiedAt.getTime() : null,
  };
}

function issueTokens(userId: string, role: string) {
  return {
    accessToken:  signAccessToken({ sub: userId, role }),
    refreshToken: signRefreshToken({ sub: userId }),
  };
}

/* ── Auth Service ── */

export const authService = {

  /* ============================================================
     EMAIL SIGNUP — Step 1
     Creates user with pending status, sends OTP or skips.
     Returns onboarding token + nextStep for the route to handle.
  ============================================================ */
  async registerWithEmail(input: unknown) {
    const data = emailSignupSchema.parse(input);

    const existing = await userRepo.getAuthByEmail(data.email).catch(() => null);
    if (existing) throw new ValidationError("An account with this email already exists");

    // Create user with temporary status + temporary role
    // Role will be updated at select-role step
    const user = await userRepo.createUser({
      name:   data.name,
      role:   UserRole.patient, // placeholder — updated at select-role
      status: "pending_verification" as schema.UserStatus,
    });

    await userRepo.createAuthCredentials({
      userId:       user.id,
      email:        data.email,
      passwordHash: await hash(data.password),
    });

    await persistAudit({
      actorUserId: user.id,
      action:      "USER_CREATED",
      targetType:  "user",
      targetId:    user.id,
      metadata:    { method: "email" },
    });

    // ── Feature flag: skip email verification ──
    if (!features.EMAIL_VERIFICATION_REQUIRED) {
      // Skip OTP, go straight to role selection
      await db.update(schema.users)
        .set({ status: "pending_role" as schema.UserStatus })
        .where(eq(schema.users.id, user.id));

      const onboardingToken = signOnboardingToken({ sub: user.id, stage: "role_selection" });
      return { nextStep: "select_role" as const, onboardingToken };
    }

    // ── Send email OTP ──
    const otp = generateOtp(6);
    await userRepo.createOtpSession({
      userId:      user.id,
      channel:     OtpChannel.email,
      destination: data.email,
      otpHash:     await hash(otp),
      expiresAt:   otpExpiresAt(10),
    });

    await emailService.sendOtp(data.email, data.name, otp, 10);

    const onboardingToken = signOnboardingToken({ sub: user.id, stage: "email_verification" });
    return { nextStep: "verify_email" as const, onboardingToken };
  },

  /* ============================================================
     VERIFY EMAIL OTP — Step 2
     Verifies the 6-digit OTP, advances user to role_selection.
  ============================================================ */
  async verifyEmailOtp(input: { email: string; otp: string }) {
    const data = emailOtpVerifySchema.parse(input);

    const session = await userRepo.getValidOtpSession(data.email, OtpChannel.email);
    const ok      = await verify(data.otp, session.otpHash);

    if (!ok) throw new ValidationError("Invalid or expired verification code");

    await userRepo.markOtpVerified(session.id);

    // Advance status
    const auth = await userRepo.getAuthByEmail(data.email);
    await db.update(schema.users)
      .set({ status: "pending_role" as schema.UserStatus })
      .where(eq(schema.users.id, auth.userId));

    // Also mark emailVerifiedAt
    await db.update(schema.authCredentials)
      .set({ emailVerifiedAt: new Date() })
      .where(eq(schema.authCredentials.userId, auth.userId));

    const onboardingToken = signOnboardingToken({ sub: auth.userId, stage: "role_selection" });
    return { nextStep: "select_role" as const, onboardingToken };
  },

  /* ============================================================
     SELECT ROLE — Step 3
     Finalises signup: creates profile rows, issues real JWT.
  ============================================================ */
  async selectRole(onboardingToken: string, input: unknown) {
    // Verify the onboarding token — this is what prevents direct URL access
    let tokenPayload: ReturnType<typeof verifyOnboardingToken>;
    try {
      tokenPayload = verifyOnboardingToken(onboardingToken);
    } catch {
      throw new ForbiddenError("Invalid or expired onboarding session. Please sign up again.");
    }

    if (tokenPayload.stage !== "role_selection") {
      throw new ForbiddenError("Please verify your email before selecting a role.");
    }

    const { role } = selectRoleSchema.parse(input);
    const userId   = tokenPayload.sub;

    if (role === "doctor" && !features.ALLOW_DOCTOR_SELF_REGISTRATION) {
      throw new ForbiddenError("Doctor self-registration is currently disabled.");
    }
    if (role === "patient" && !features.ALLOW_PATIENT_SELF_REGISTRATION) {
      throw new ForbiddenError("Patient self-registration is currently disabled.");
    }

    // Update user role + status to active
    await db.update(schema.users)
      .set({
        role:   role as schema.UserRole,
        status: "active" as schema.UserStatus,
      })
      .where(eq(schema.users.id, userId));

    await persistAudit({
      actorUserId: userId,
      action:      "USER_ROLE_SELECTED",
      targetType:  "user",
      targetId:    userId,
      metadata:    { role },
    });

    const tokens = issueTokens(userId, role);
    await refreshTokenRepo.create({
      userId,
      tokenHash: await hash(tokens.refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    if (role === "patient") {
      // Create patient profile + preferences rows
      await patientRepo.createPatientProfile(userId);
      await patientRepo.createUserPreferences(userId);

      return {
        ...tokens,
        role,
        nextStep: "patient_dashboard" as const,
      };
    }

    // Doctor: create doctor row (pending verification, inactive)
    const publicId = `dr-${userId.slice(0, 8)}`;
    await doctorRepo.createDoctor({
      userId,
      publicId,
      specialty:             "General Physician", // placeholder until onboarding
      rmpRegistrationNumber: "",                  // placeholder
      rmpStateMedicalCouncil:"",                  // placeholder
      verificationStatus:    "pending",
      
    });

    await persistAudit({
      actorUserId: userId,
      action:      "DOCTOR_PROFILE_CREATED",
      targetType:  "doctor",
      targetId:    userId,
      metadata:    { method: "self_registration" },
    });

    return {
      ...tokens,
      role,
      nextStep: features.DOCTOR_ONBOARDING_REQUIRED
        ? ("doctor_onboarding" as const)
        : ("doctor_verification" as const),
    };
  },

  /* ============================================================
     EMAIL LOGIN
  ============================================================ */
  async loginWithEmail(input: unknown) {
    const data = emailLoginSchema.parse(input);
    const auth = await userRepo.getAuthByEmail(data.email);
    const user = await userRepo.getUserById(auth.userId);

    assertHasAtLeastOneCredential(toAuthDomainState(auth));
    assertLoginAllowed(toAuthDomainState(auth), "email");

    if (!auth.passwordHash) throw new ValidationError("Password login not available");

    const ok = await verify(data.password, auth.passwordHash);
    if (!ok) throw new ValidationError("Invalid credentials");

    // Handle incomplete signups
    if (user.status === "pending_verification") {
      // Re-send OTP and let them continue verification
      const otp = generateOtp(6);
      await userRepo.createOtpSession({
        userId:      user.id,
        channel:     OtpChannel.email,
        destination: data.email,
        otpHash:     await hash(otp),
        expiresAt:   otpExpiresAt(10),
      });
      await emailService.sendOtp(data.email, user.name, otp, 10);
      const onboardingToken = signOnboardingToken({ sub: user.id, stage: "email_verification" });
      return { nextStep: "verify_email" as const, onboardingToken };
    }

    if (user.status === "pending_role") {
      const onboardingToken = signOnboardingToken({ sub: user.id, stage: "role_selection" });
      return { nextStep: "select_role" as const, onboardingToken };
    }

    if (user.status !== "active") throw new ForbiddenError("Account is not active");

    await userRepo.updateLastLogin(user.id);

    const tokens = issueTokens(user.id, user.role);
    await refreshTokenRepo.create({
      userId:    user.id,
      tokenHash: await hash(tokens.refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user:      { id: user.id, role: user.role, name: user.name },
      nextStep:  "dashboard" as const,
      ...tokens,
    };
  },

  /* ============================================================
     PASSWORD RESET
  ============================================================ */
  async requestPasswordReset(email: string) {
    // Always return success — don't leak whether email exists
    const auth = await userRepo.getAuthByEmail(email).catch(() => null);
    if (!auth) return { sent: true };

    const user = await userRepo.getUserById(auth.userId);
    const otp  = generateOtp(6);

    await userRepo.createOtpSession({
      userId:      auth.userId,
      channel:     OtpChannel.email,
      destination: email,
      otpHash:     await hash(otp),
      expiresAt:   otpExpiresAt(10),
    });

    await emailService.sendPasswordReset(email, user.name, otp, 10);
    return { sent: true };
  },

  async resetPassword(input: { email: string; otp: string; password: string }) {
    const auth    = await userRepo.getAuthByEmail(input.email);
    const session = await userRepo.getValidOtpSession(input.email, OtpChannel.email);

    const ok = await verify(input.otp, session.otpHash);
    if (!ok) throw new ValidationError("Invalid or expired code");

    await userRepo.markOtpVerified(session.id);
    await userRepo.updatePasswordHashByUserId(auth.userId, await hash(input.password));
    await userRepo.deleteAllUserRefreshTokens(auth.userId);

    return { success: true };
  },

  /* ============================================================
     PHONE SIGNUP
  ============================================================ */
  async startPhoneSignup(input: unknown) {
    const data     = phoneSignupSchema.parse(input);
    const existing = await userRepo.getAuthByWhatsapp(data.phone).catch(() => null);
    if (existing) throw new ValidationError("User already exists. Please login.");

    const otp = generateOtp(4);
    await userRepo.createOtpSession({
      channel:     OtpChannel.whatsapp,
      destination: data.phone,
      otpHash:     await hash(otp),
      expiresAt:   otpExpiresAt(5),
    });

    logger.debug("WhatsApp OTP generated (signup)", { phone: data.phone, otp });
    return { sent: true };
  },

  async completePhoneSignup(input: { name: string; phone: string; otp: string }) {
    const session = await userRepo.getValidOtpSession(input.phone, OtpChannel.whatsapp);
    const ok      = await verify(input.otp, session.otpHash);
    if (!ok) throw new ValidationError("Invalid or expired OTP");

    await userRepo.markOtpVerified(session.id);

    const existing = await userRepo.getAuthByWhatsapp(input.phone).catch(() => null);
    if (existing) throw new ValidationError("User already exists. Please login.");

    const user = await userRepo.createUser({
      name:   input.name,
      role:   UserRole.patient,
      status: "pending_role" as schema.UserStatus,
    });

    await userRepo.createAuthCredentials({ userId: user.id, whatsappPhone: input.phone });

    await persistAudit({
      actorUserId: user.id, action: "USER_CREATED",
      targetType: "user", targetId: user.id, metadata: { method: "phone_signup" },
    });

    const onboardingToken = signOnboardingToken({ sub: user.id, stage: "role_selection" });
    return { nextStep: "select_role" as const, onboardingToken };
  },

  /* ============================================================
     PHONE LOGIN
  ============================================================ */
  async startPhoneLogin(phone: string) {
    const auth = await userRepo.getAuthByWhatsapp(phone).catch(() => null);
    if (!auth) throw new ValidationError("Account not found. Please signup.");

    const otp = generateOtp(4);
    await userRepo.createOtpSession({
      userId:      auth.userId,
      channel:     OtpChannel.whatsapp,
      destination: phone,
      otpHash:     await hash(otp),
      expiresAt:   otpExpiresAt(5),
    });

    logger.debug("WhatsApp OTP generated (login)", { phone, otp });
    return { sent: true };
  },

  async completePhoneLogin(input: { phone: string; otp: string }) {
    const session = await userRepo.getValidOtpSession(input.phone, OtpChannel.whatsapp);
    const ok      = await verify(input.otp, session.otpHash);
    if (!ok) throw new ValidationError("Invalid or expired OTP");

    await userRepo.markOtpVerified(session.id);

    const auth = await userRepo.getAuthByWhatsapp(input.phone);
    const user = await userRepo.getUserById(auth.userId);
    if (user.status !== "active") throw new ForbiddenError("User is not active");

    await userRepo.updateLastLogin(user.id);

    return {
      user: { id: user.id, role: user.role, name: user.name },
      ...issueTokens(user.id, user.role),
    };
  },

  /* ============================================================
     REFRESH + LOGOUT
  ============================================================ */
  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const user    = await userRepo.getUserById(payload.sub);
    if (user.status !== "active") throw new ForbiddenError("User is not active");

    return {
      user:         { id: user.id, role: user.role, name: user.name },
      accessToken:  signAccessToken({ sub: user.id, role: user.role }),
      refreshToken: signRefreshToken({ sub: user.id }),
    };
  },

  async logout(refreshToken?: string) {
    if (!refreshToken) return { success: true };
    try { await refreshTokenRepo.deleteByHash(refreshToken); } catch {}
    return { success: true };
  },

  /* Legacy methods kept for backwards compat */
  async requestOtp(phone: string) { return this.startPhoneLogin(phone); },

  async verifyOtp(phone: string, input: unknown) {
    const { otp } = otpVerifySchema.parse(input);
    return this.completePhoneLogin({ phone, otp });
  },
};