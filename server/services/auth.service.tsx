import { userRepo } from "@/server/repositories/user.repo";
import { patientService } from "./patient.service";
import { patientRepo } from "@/server/repositories/patient.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { refreshTokenRepo } from "../repositories/refreshToken.repo";
import { hash, verify } from "@/server/utils/password";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/server/utils/jwt";
import { randomBytes } from "crypto"; // Added for secure verification tokens
import { mailService } from "./mail.service"; // Import our new service
import {
  ValidationError,
  ForbiddenError,
} from "@/server/utils/errors";
import { doctorRepo } from "../repositories/doctor.repo";
import {
  phoneSignupSchema,
  emailLoginSchema,
  otpVerifySchema,
} from "@/server/validators/auth";

import { emailSignupSchema } from "@/lib/validators";

import {
  assertHasAtLeastOneCredential,
  assertLoginAllowed,
} from "@/server/domain/auth.domain";

import {
  assertAuditActorPresent,
  assertAuditTargetValid,
  assertAuditMetadataSerializable,
  type AuditLogInput,
} from "@/server/domain/audit.domain";

import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";
import { OtpChannel } from "@/server/constants/otp-channel";

/* ======================================================
   Helpers
====================================================== */

function generateOtp(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function otpExpiresAt(minutes = 5): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

async function persistAudit(log: AuditLogInput) {
  assertAuditActorPresent(log);
  assertAuditTargetValid(log);
  assertAuditMetadataSerializable(log.metadata);
  await auditRepo.create(log);
}
// server/services/auth.service.tsx

function toAuthDomainState(auth: {
  email?: string | null;
  emailVerifiedAt?: Date | number | null; // Allow both types
  whatsappPhone?: string | null;
  whatsappVerifiedAt?: Date | number | null;
}) {
  // Helper to safely get Unix time regardless of if the DB returns a Date or a Number
  const getUnix = (val: Date | number | null | undefined) => {
    if (!val) return null;
    if (val instanceof Date) return val.getTime();
    return val; // It's already a number
  };

  return {
    email: auth.email ?? null,
    emailVerifiedAt: getUnix(auth.emailVerifiedAt),
    whatsappPhone: auth.whatsappPhone ?? null,
    whatsappVerifiedAt: getUnix(auth.whatsappVerifiedAt),
  };
}

/* ======================================================
   Auth Service
====================================================== */

export const authService = {
  /* ======================================================
     EMAIL AUTH
  ====================================================== */

  /* ======================================================
     EMAIL AUTH
  ====================================================== */

  async registerWithEmail(input: unknown) {
    const data = emailSignupSchema.parse(input);
    const email = data.email.trim().toLowerCase();
    const existing = await userRepo
      .getAuthByEmail(data.email)
      .catch(() => null);

    if (existing) {
      throw new ValidationError("User already exists");
    }

    // 1. Create the User
    const user = await userRepo.createUser({
      name: data.name,
      role: UserRole.patient,
      status: UserStatus.active, 
    });

    // 3. CRITICAL: Create the Auth Credentials (Linked Table)
    // This is the part that was likely missing or failing.
    await userRepo.createAuthCredentials({
      userId: user.id,
      email: email,
      passwordHash: await hash(data.password),
    });

    
    await userRepo.deleteUnverifiedOtpSessions(email, OtpChannel.email);
    // 2. Generate secure verification token
    const verificationToken = crypto.randomUUID();

  await userRepo.createOtpSession({
    userId: user.id,
    channel: OtpChannel.email,
    destination: email,
    // FIX: Store the hex token directly (don't use the 'hash' function)
    otpHash: verificationToken, 
    // FIX: Ensure expiry is saved as Unix seconds
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), 
  });

    
    /*
    await userRepo.createOtpSession({
      userId: user.id,
      channel: OtpChannel.email,
      destination: data.email,
      otpHash: await hash(verificationToken),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 Hours
    });
    */
    try{
      await mailService.sendVerification(data.email, data.name, verificationToken);
    }catch{
      console.error("Failed to send verification email")
      throw new Error("failed to send verification email")
    }
    // 4. Send Verification Email via Zepto Mail
    

    // FIX: Removed accessToken and refreshToken. 
    // This blocks the user from being logged in immediately.
    return {
      success: true,
      message: "Verification email sent. Please check your inbox."
    };
  },

  /* --- Inside verifyEmail --- */
  async verifyEmail(email: string, token: string) {
    const session = await userRepo.getValidOtpSession(email, OtpChannel.email);

    // DEBUG: Logs to your terminal so you can see why it fails
    console.log("🔍 Verifying Token...");
    console.log("Token from URL:", token);
    console.log("Token from DB: ", session.otpHash);

    // FIX: Use simple string comparison (hex tokens don't need bcrypt)
    const ok = token === session.otpHash; 
    
    if (!ok) {
      console.error("❌ Token mismatch!");
      throw new ValidationError("Invalid or expired verification link");
    }

    await userRepo.markOtpVerified(session.id);
    await userRepo.updateEmailVerifiedAt(email);
    
    const user = await userRepo.getUserById(session.userId!);
    try {
    await mailService.sendWelcome(email, user.name);
  } catch (mailError) {
    console.warn("Welcome email failed, but user is verified:", mailError);
  }

    return { success: true };
  },

  /* ======================================================
     EMAIL LOGIN (ENFORCED VERIFICATION)
  ====================================================== */

  async loginWithEmail(input: unknown) {
    const data = emailLoginSchema.parse(input);

    const auth = await userRepo.getAuthByEmail(data.email);
    const user = await userRepo.getUserById(auth.userId);

    // 1. Check if user account is active
    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("User is not active");
    }

    const authState = toAuthDomainState(auth);

    // 2. Enforce Domain Rules (Verification Check)
    try {
      assertHasAtLeastOneCredential(authState);
      assertLoginAllowed(authState, "email");
    } catch (err) {
      // If the domain throws a "not verified" error, we wrap it in a ForbiddenError
      // so the API returns a 403 status instead of a 500.
      if (err instanceof Error && err.name === "AuthDomainError") {
        throw new ForbiddenError(err.message);
      }
      throw err;
    }

    if (!auth.passwordHash) {
      throw new ValidationError(
        "Password login not available for this account"
      );
    }

    // 3. Verify Password
    const ok = await verify(data.password, auth.passwordHash);

    if (!ok) {
      throw new ValidationError("Invalid credentials");
    }

    await userRepo.updateLastLogin(user.id);

    // 4. Generate Tokens
    const accessToken = signAccessToken({
      sub: user.id,
      role: user.role,
    });

    const refreshToken = signRefreshToken({
      sub: user.id,
    });

    await refreshTokenRepo.create({
      userId: user.id,
      tokenHash: await hash(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
      },
      accessToken,
      refreshToken,
    };
  },

  /* ======================================================
     PHONE SIGNUP (STRICT)
  ====================================================== */

  async startPhoneSignup(input: unknown) {
    const data = phoneSignupSchema.parse(input);

    const existing = await userRepo
      .getAuthByWhatsapp(data.phone)
      .catch(() => null);

    if (existing) {
      throw new ValidationError("User already exists. Please login.");
    }

    const otp = generateOtp();

    await userRepo.createOtpSession({
      channel: OtpChannel.whatsapp,
      destination: data.phone,
      otpHash: await hash(otp),
      expiresAt: otpExpiresAt(),
    });

    //console.log("SIGNUP OTP:", otp);

    return { sent: true };
  },

  async completePhoneSignup(input: {
    name: string;
    phone: string;
    otp: string;
  }) {
    const session = await userRepo.getValidOtpSession(
      input.phone,
      OtpChannel.whatsapp
    );

    const ok = await verify(input.otp, session.otpHash);
    if (!ok) {
      throw new ValidationError("Invalid or expired OTP");
    }

    await userRepo.markOtpVerified(session.id);

    const existing = await userRepo
      .getAuthByWhatsapp(input.phone)
      .catch(() => null);

    if (existing) {
      throw new ValidationError("User already exists. Please login.");
    }

    const user = await userRepo.createUser({
      name: input.name,
      role: UserRole.patient,
      status: UserStatus.active,
    });

    await userRepo.createAuthCredentials({
      userId: user.id,
      whatsappPhone: input.phone,
    });

    await patientRepo.createAbhaProfile({
      userId: user.id,
      abhaNumber: `TEMP-${user.id}`,
    });

    await persistAudit({
      actorUserId: user.id,
      action: "USER_CREATED",
      targetType: "user",
      targetId: user.id,
      metadata: { method: "phone_signup" },
    });

    return {
      accessToken: signAccessToken({
        sub: user.id,
        role: user.role,
      }),
      refreshToken: signRefreshToken({
        sub: user.id,
      }),
    };
  },

  // server/services/auth.service.tsx

async completeOnboarding(userId: string, role: "patient" | "doctor") {
  // 1. Update the User's Role in the DB
  await userRepo.updateUser(userId, { role });

  // 2. Create the specific Profile
  if (role === "patient") {
    await patientService.initializePatientProfile(userId);
    
    
  } else {
    const publicId = `doc_${crypto.randomUUID().split('-')[0].slice(0, 5)}`;
    await doctorRepo.createDoctor({ 
      userId, 
      publicId, 
    });
  }

  // 3. Create Default Notification Preferences
  

  // 4. Return the path they should go to
  return role === "patient" ? "/patient/dashboard" : "/doctor-onboarding";
},

  /* ======================================================
     PHONE LOGIN (STRICT)
  ====================================================== */

  async startPhoneLogin(phone: string) {
    const auth = await userRepo
      .getAuthByWhatsapp(phone)
      .catch(() => null);

    if (!auth) {
      throw new ValidationError("Account not found. Please signup.");
    }

    const otp = generateOtp();

    await userRepo.createOtpSession({
      userId: auth.userId,
      channel: OtpChannel.whatsapp,
      destination: phone,
      otpHash: await hash(otp),
      expiresAt: otpExpiresAt(),
    });

    //console.log("LOGIN OTP:", otp);

    return { sent: true };
  },

  async completePhoneLogin(input: {
    phone: string;
    otp: string;
  }) {
    const session = await userRepo.getValidOtpSession(
      input.phone,
      OtpChannel.whatsapp
    );

    const ok = await verify(input.otp, session.otpHash);
    if (!ok) {
      throw new ValidationError("Invalid or expired OTP");
    }

    await userRepo.markOtpVerified(session.id);

    const auth = await userRepo.getAuthByWhatsapp(input.phone);
    const user = await userRepo.getUserById(auth.userId);

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("User is not active");
    }

    await userRepo.updateLastLogin(user.id);

    return {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
      },
      accessToken: signAccessToken({
        sub: user.id,
        role: user.role,
      }),
      refreshToken: signRefreshToken({
        sub: user.id,
      }),
    };
  },

  /* ======================================================
     PASSWORD RESET
  ====================================================== */

  async requestPasswordReset(email: string) {
    const auth = await userRepo.getAuthByEmail(email);

    const otp = generateOtp();

    await userRepo.createOtpSession({
      userId: auth.userId,
      channel: OtpChannel.email,
      destination: email,
      otpHash: await hash(otp),
      expiresAt: otpExpiresAt(10),
    });

    //console.log("PASSWORD RESET OTP:", otp);

    return { sent: true };
  },

  async resetPassword(input: {
    email: string;
    otp: string;
    password: string;
  }) {
    const auth = await userRepo.getAuthByEmail(input.email);

    const session = await userRepo.getValidOtpSession(
      input.email,
      OtpChannel.email
    );

    const ok = await verify(input.otp, session.otpHash);
    if (!ok) {
      throw new ValidationError("Invalid or expired OTP");
    }

    await userRepo.markOtpVerified(session.id);

    const newPasswordHash = await hash(input.password);

    await userRepo.updatePasswordHashByUserId(
      auth.userId,
      newPasswordHash
    );

    await userRepo.deleteAllUserRefreshTokens(auth.userId);

    return { success: true };
  },

  /* ======================================================
     REFRESH + LOGOUT
  ====================================================== */

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    const user = await userRepo.getUserById(payload.sub);

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("User is not active");
    }

    return {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
      },
      accessToken: signAccessToken({
        sub: user.id,
        role: user.role,
      }),
      refreshToken: signRefreshToken({
        sub: user.id,
      }),
    };
  },

  async logout(refreshToken?: string) {
    if (!refreshToken) return { success: true };

    try {
      await refreshTokenRepo.deleteByHash(refreshToken);
    } catch {}

    return { success: true };
  },

  /* --------------------------------------------------
   Request OTP
--------------------------------------------------- */
async requestOtp(phone: string): Promise<{ sent: boolean }> {
  if (!phone) {
    throw new ValidationError("Phone number is required");
  }

  // Generate 4-digit OTP (1000–9999)
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await userRepo.createOtpSession({
    channel: OtpChannel.whatsapp,
    destination: phone,
    otpHash: await hash(otp),
    expiresAt: otpExpiresAt(), // should be +5 min ideally
  });

  // TODO: send OTP via WhatsApp provider here
  // await whatsappProvider.send(phone, `Your OTP is ${otp}`);

  return { sent: true };
},

/* --------------------------------------------------
   Verify OTP (Signup or Login)
--------------------------------------------------- */
async verifyOtp(
  phone: string,
  input: unknown
): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  if (!phone) {
    throw new ValidationError("Phone number is required");
  }

  const { otp } = otpVerifySchema.parse(input);

  const session = await userRepo.getValidOtpSession(
    phone,
    OtpChannel.whatsapp
  );

  if (!session) {
    throw new ValidationError("Invalid or expired OTP");
  }

  const ok = await verify(otp, session.otpHash);

  if (!ok) {
    throw new ValidationError("Invalid or expired OTP");
  }

  await userRepo.markOtpVerified(session.id);

  const auth = await userRepo
    .getAuthByWhatsapp(phone)
    .catch(() => null);

  let userId: string;

  if (!auth) {
    const user = await userRepo.createUser({
      name: `User-${phone}`,
      role: UserRole.patient,
      status: UserStatus.active,
    });

    await userRepo.createAuthCredentials({
      userId: user.id,
      whatsappPhone: phone,
    });

    await patientRepo.createAbhaProfile({
      userId: user.id,
      abhaNumber: `TEMP-${user.id}`,
    });

    await persistAudit({
      actorUserId: user.id,
      action: "USER_CREATED",
      targetType: "user",
      targetId: user.id,
      metadata: { method: "otp" },
    });

    userId = user.id;
  } else {
    userId = auth.userId;
  }

  const user = await userRepo.getUserById(userId);

  return {
    accessToken: signAccessToken({
      sub: user.id,
      role: user.role,
    }),
    refreshToken: signRefreshToken({
      sub: user.id,
    }),
  };
},

};
