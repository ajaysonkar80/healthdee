import { describe, it, expect, vi, beforeEach } from "vitest";
import { userService } from "@/server/services/user.service";
import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { 
  assertUserNotDeleted, 
  assertValidUserStatusTransition,
  assertUserRoleImmutable 
} from "@/server/domain/user.domain";
import { ForbiddenError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";

// Mock Dependencies
vi.mock("@/server/repositories/user.repo");
vi.mock("@/server/repositories/audit.repo");

// Mock Domain Rules
vi.mock("@/server/domain/user.domain", () => ({
  assertUserNotDeleted: vi.fn(),
  assertValidUserStatusTransition: vi.fn(),
  assertUserRoleImmutable: vi.fn(),
}));

vi.mock("@/server/domain/audit.domain", () => ({
  assertAuditActorPresent: vi.fn(),
  assertAuditTargetValid: vi.fn(),
  assertAuditMetadataSerializable: vi.fn(),
}));

describe("userService", () => {
  const ADMIN_ID = "admin-123";
  const TARGET_USER_ID = "user-456";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserById", () => {
    it("should allow a user to fetch their own data", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ 
        id: TARGET_USER_ID, role: UserRole.patient, status: "active" 
      } as any);

      const user = await userService.getUserById(TARGET_USER_ID, TARGET_USER_ID);
      
      expect(user.id).toBe(TARGET_USER_ID);
      expect(assertUserNotDeleted).toHaveBeenCalledWith("active");
    });

    it("should throw ForbiddenError if a non-admin tries to fetch another user", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ 
        id: TARGET_USER_ID, role: UserRole.patient, status: "active" 
      } as any);

      await expect(userService.getUserById("other-patient", TARGET_USER_ID))
        .rejects.toThrow(ForbiddenError); // Access denied
    });
  });

  describe("listUsers (Admin Only)", () => {
    it("should allow an admin to list users", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: "admin" } as any);
      vi.mocked(userRepo.listUsers).mockResolvedValue({ data: [], total: 0 } as any);

      await userService.listUsers(ADMIN_ID, { limit: 10 });

      expect(userRepo.listUsers).toHaveBeenCalledWith({ limit: 10 });
    });

    it("should block non-admins from listing users", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.doctor } as any);

      await expect(userService.listUsers(TARGET_USER_ID))
        .rejects.toThrow(ForbiddenError); // Only admins can list users
    });
  });

  describe("changeUserStatus", () => {
    it("should allow admin to change status and trigger deactivation logic", async () => {
      vi.mocked(userRepo.getUserById)
        .mockResolvedValueOnce({ id: ADMIN_ID, role: "admin" } as any) // Actor
        .mockResolvedValueOnce({ id: TARGET_USER_ID, status: "active" } as any); // Target

      const result = await userService.changeUserStatus(ADMIN_ID, TARGET_USER_ID, "deactivated");

      expect(userRepo.deactivateUser).toHaveBeenCalledWith(TARGET_USER_ID); // Service calls deactivate
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        action: "USER_STATUS_CHANGED",
        metadata: { from: "active", to: "deactivated" }
      }));
      expect(result.success).toBe(true);
    });
  });

  describe("assertRoleUnchanged", () => {
    it("should call domain rule to ensure role immutability", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: TARGET_USER_ID, role: UserRole.patient } as any);

      const result = await userService.assertRoleUnchanged(TARGET_USER_ID, UserRole.doctor);

      expect(assertUserRoleImmutable).toHaveBeenCalledWith(UserRole.patient, UserRole.doctor);
      expect(result.valid).toBe(true);
    });
  });
});