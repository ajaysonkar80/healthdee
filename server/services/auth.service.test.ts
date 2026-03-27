import { describe, it, expect, vi, beforeEach } from "vitest";
import { authService } from "@/server/services/auth.service";
import { userRepo } from "@/server/repositories/user.repo";
import { patientRepo } from "@/server/repositories/patient.repo";
import { refreshTokenRepo } from "@/server/repositories/refreshToken.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { verify } from "@/server/utils/password";
import { ValidationError, ForbiddenError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";

// Mock Repositories
vi.mock("@/server/repositories/user.repo");
vi.mock("@/server/repositories/patient.repo");
vi.mock("@/server/repositories/refreshToken.repo");
vi.mock("@/server/repositories/audit.repo");

// Mock Utils
vi.mock("@/server/utils/password", () => ({
  hash: vi.fn().mockResolvedValue("hashed_value"),
  verify: vi.fn().mockResolvedValue(true),
}));

vi.mock("@/server/utils/jwt", () => ({
  signAccessToken: vi.fn().mockReturnValue("access_token"),
  signRefreshToken: vi.fn().mockReturnValue("refresh_token"),
  verifyRefreshToken: vi.fn().mockReturnValue({ sub: "user-123" }),
}));

describe("authService", () => {
  const MOCK_USER = {
    id: "user-123",
    role: UserRole.patient,
    status: UserStatus.active,
    name: "Test User",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("registerWithEmail", () => {
    const signupInput = {
      email: "test@example.com",
      password: "Password123!",
      confirmPassword: "Password123!",
      name: "Test User",
    };

    it("should create a user, credentials, and ABHA profile successfully", async () => {
      vi.mocked(userRepo.getAuthByEmail).mockRejectedValue(
        new Error("Not found")
      );
      vi.mocked(userRepo.createUser).mockResolvedValue(
        MOCK_USER as any
      );

      const result = await authService.registerWithEmail(
        signupInput
      ) as any;

      expect(userRepo.createUser).toHaveBeenCalledWith(
        expect.objectContaining({ name: signupInput.name })
      );
      expect(patientRepo.createAbhaProfile).toHaveBeenCalled();
      expect(auditRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ action: "USER_CREATED" })
      );
      expect(result.accessToken).toBe("access_token");
    });

    it("should throw ValidationError if the email is already registered", async () => {
      vi.mocked(userRepo.getAuthByEmail).mockResolvedValue(
        { userId: "existing" } as any
      );

      await expect(
        authService.registerWithEmail(signupInput)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe("loginWithEmail", () => {
    const loginInput = {
      email: "test@example.com",
      password: "Password123!",
    };

    it("should authenticate active users and create a session", async () => {
      vi.mocked(userRepo.getAuthByEmail).mockResolvedValue({
        userId: MOCK_USER.id,
        email: loginInput.email,
        emailVerifiedAt: new Date(), // ✅ critical fix
        passwordHash: "hash",
      } as any);

      vi.mocked(userRepo.getUserById).mockResolvedValue(
        MOCK_USER as any
      );
      vi.mocked(verify).mockResolvedValue(true);

      const result = await authService.loginWithEmail(
        loginInput
      );

      expect(refreshTokenRepo.create).toHaveBeenCalled();
      expect(userRepo.updateLastLogin).toHaveBeenCalledWith(
        MOCK_USER.id
      );
      expect(result.user.id).toBe(MOCK_USER.id);
    });

    it("should block login for deactivated users", async () => {
      vi.mocked(userRepo.getAuthByEmail).mockResolvedValue({
        userId: MOCK_USER.id,
        email: loginInput.email,
        emailVerifiedAt: new Date(), // ✅ important
        passwordHash: "hash",
      } as any);

      vi.mocked(userRepo.getUserById).mockResolvedValue({
        ...MOCK_USER,
        status: UserStatus.deactivated,
      } as any);

      await expect(
        authService.loginWithEmail(loginInput)
      ).rejects.toThrow(ForbiddenError);
    });
  });

  describe("OTP Flows", () => {
    it("should start phone login by creating an OTP session", async () => {
      vi.mocked(userRepo.getAuthByWhatsapp).mockResolvedValue(
        { userId: MOCK_USER.id } as any
      );

      const result = await authService.startPhoneLogin(
        "919876543210"
      );

      expect(result.sent).toBe(true);
      expect(userRepo.createOtpSession).toHaveBeenCalledWith(
        expect.objectContaining({
          destination: "919876543210",
        })
      );
    });

    it("should complete phone login upon valid OTP verification", async () => {
      vi.mocked(userRepo.getValidOtpSession).mockResolvedValue({
        id: "session-1",
        otpHash: "hash",
      } as any);

      vi.mocked(userRepo.getAuthByWhatsapp).mockResolvedValue(
        { userId: MOCK_USER.id } as any
      );

      vi.mocked(userRepo.getUserById).mockResolvedValue(
        MOCK_USER as any
      );

      vi.mocked(verify).mockResolvedValue(true);

      const result = await authService.completePhoneLogin({
        phone: "919876543210",
        otp: "1234",
      });

      expect(userRepo.markOtpVerified).toHaveBeenCalledWith(
        "session-1"
      );
      expect(result.accessToken).toBe("access_token");
    });
  });

  describe("Password Management", () => {
    it("should reset password and invalidate existing sessions", async () => {
      vi.mocked(userRepo.getAuthByEmail).mockResolvedValue({
        userId: MOCK_USER.id,
      } as any);

      vi.mocked(userRepo.getValidOtpSession).mockResolvedValue({
        id: "s1",
        otpHash: "h",
      } as any);

      vi.mocked(verify).mockResolvedValue(true);

      const result = await authService.resetPassword({
        email: "test@example.com",
        otp: "1234",
        password: "NewPassword123!",
      });

      expect(
        userRepo.updatePasswordHashByUserId
      ).toHaveBeenCalled();

      expect(
        userRepo.deleteAllUserRefreshTokens
      ).toHaveBeenCalledWith(MOCK_USER.id);

      expect(result.success).toBe(true);
    });
  });

  describe("logout", () => {
    it("should delete the refresh token from the repository", async () => {
      await authService.logout("token_to_delete");

      expect(refreshTokenRepo.deleteByHash).toHaveBeenCalledWith(
        "token_to_delete"
      );
    });
  });
});