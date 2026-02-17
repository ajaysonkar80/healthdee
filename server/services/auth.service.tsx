import { userRepo } from "@/server/repositories/user.repo";
import { patientRepo } from "@/server/repositories/patient.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { refreshTokenRepo } from "../repositories/refreshToken.repo";
import { hash, verify } from "@/server/utils/password";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/server/utils/jwt";

import {
  ValidationError,
  ForbiddenError,
} from "@/server/utils/errors";

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

function toAuthDomainState(auth: {
  email?: string | null;
  emailVerifiedAt?: Date | null;
  whatsappPhone?: string | null;
  whatsappVerifiedAt?: Date | null;
}) {
  return {
    email: auth.email ?? null,
    emailVerifiedAt: auth.emailVerifiedAt
      ? auth.emailVerifiedAt.getTime()
      : null,
    whatsappPhone: auth.whatsappPhone ?? null,
    whatsappVerifiedAt: auth.whatsappVerifiedAt
      ? auth.whatsappVerifiedAt.getTime()
      : null,
  };
}

/* ======================================================
   Auth Service
====================================================== */

export const authService = {
  /* --------------------------------------------------
     Register via Email
  --------------------------------------------------- */
  async registerWithEmail(input: unknown) {
    const data = emailSignupSchema.parse(input);

    const existing = await userRepo
      .getAuthByEmail(data.email)
      .catch(() => null);

    if (existing) {
      throw new ValidationError("User already exists");
    }

    const user = await userRepo.createUser({
      name: data.name,
      role: UserRole.patient,
      status: UserStatus.active,
    });

    await userRepo.createAuthCredentials({
      userId: user.id,
      email: data.email,
      passwordHash: await hash(data.password),
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
      metadata: { method: "email" },
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

  /* --------------------------------------------------
     Register via Phone
  --------------------------------------------------- */
  async registerWithPhone(input: unknown) {
    const data = phoneSignupSchema.parse(input);

    const existing = await userRepo
      .getAuthByWhatsapp(data.phone)
      .catch(() => null);

    if (existing) {
      throw new ValidationError("User already exists");
    }

    const user = await userRepo.createUser({
      name: data.name,
      role: UserRole.patient,
      status: UserStatus.active,
    });

    await userRepo.createAuthCredentials({
      userId: user.id,
      whatsappPhone: data.phone,
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
      metadata: { method: "whatsapp" },
    });

    return { success: true };
  },

  /* --------------------------------------------------
     Login via Email
  --------------------------------------------------- */
  async loginWithEmail(input: unknown) {
    const data = emailLoginSchema.parse(input);

    const auth = await userRepo.getAuthByEmail(data.email);
    const user = await userRepo.getUserById(auth.userId);

    const authState = toAuthDomainState(auth);

    assertHasAtLeastOneCredential(authState);
    assertLoginAllowed(authState, "email");

    const ok = await verify(data.password, auth.passwordHash!);
    if (!ok) {
      throw new ValidationError("Invalid credentials");
    }

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("User is not active");
    }

    await userRepo.updateLastLogin(user.id);

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
      },
      accessToken,
      refreshToken,
    };
  },

  /* --------------------------------------------------
     Request Password Reset
  --------------------------------------------------- */
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

    console.log("PASSWORD RESET OTP:", otp);

    return { sent: true };
  },

  /* --------------------------------------------------
     Reset Password
  --------------------------------------------------- */
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

  /* --------------------------------------------------
     Request OTP
  --------------------------------------------------- */
  async requestOtp(phone: string) {
    const otp = generateOtp();

    await userRepo.createOtpSession({
      channel: OtpChannel.whatsapp,
      destination: phone,
      otpHash: await hash(otp),
      expiresAt: otpExpiresAt(),
    });

    return { sent: true };
  },

  /* --------------------------------------------------
     Verify OTP (Signup or Login)
  --------------------------------------------------- */
  async verifyOtp(phone: string, input: unknown) {
    const { otp } = otpVerifySchema.parse(input);

    const session = await userRepo.getValidOtpSession(
      phone,
      OtpChannel.whatsapp
    );

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

  /* --------------------------------------------------
     Refresh Token
  --------------------------------------------------- */
  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    const user = await userRepo.getUserById(payload.sub);

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("User is not active");
    }

    const newAccessToken = signAccessToken({
      sub: user.id,
      role: user.role,
    });

    const newRefreshToken = signRefreshToken({
      sub: user.id,
    });

    return {
      user: {
        id: user.id,
        role: user.role,
      },
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },

  /* --------------------------------------------------
     Login via Phone
  --------------------------------------------------- */
  async loginWithPhone(phone: string, input: unknown) {
    const { otp } = otpVerifySchema.parse(input);

    const session = await userRepo.getValidOtpSession(
      phone,
      OtpChannel.whatsapp
    );

    const ok = await verify(otp, session.otpHash);
    if (!ok) {
      throw new ValidationError("Invalid or expired OTP");
    }

    await userRepo.markOtpVerified(session.id);

    const auth = await userRepo.getAuthByWhatsapp(phone);
    const user = await userRepo.getUserById(auth.userId);

    const authState = toAuthDomainState(auth);

    assertHasAtLeastOneCredential(authState);
    assertLoginAllowed(authState, "whatsapp");

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("User is not active");
    }

    await userRepo.updateLastLogin(user.id);

    const accessToken = signAccessToken({
      sub: user.id,
      role: user.role,
    });

    const refreshToken = signRefreshToken({
      sub: user.id,
    });

    return {
      user: {
        id: user.id,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  },

  /* --------------------------------------------------
     Logout
  --------------------------------------------------- */
  async logout(refreshToken?: string) {
    if (!refreshToken) {
      return { success: true };
    }

    try {
      await refreshTokenRepo.deleteByHash(refreshToken);
    } catch {}

    return { success: true };
  },
};
