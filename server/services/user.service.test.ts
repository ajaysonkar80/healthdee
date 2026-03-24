import { describe, it, expect, vi, beforeEach } from "vitest";
import { userService } from "@/server/services/user.service";
import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import {
  assertValidUserStatusTransition,
  assertUserRoleImmutable,
  assertUserNotDeleted,
} from "@/server/domain/user.domain";
import { ForbiddenError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";

// Mock Dependencies
vi.mock("@/server/repositories/user.repo");
vi.mock("@/server/repositories/audit.repo");
vi.mock("@/server/domain/user.domain", () => ({
  assertValidUserStatusTransition: vi.fn(),
  assertUserRoleImmutable: vi.fn(),
  assertUserNotDeleted: vi.fn(),
}));

vi.mock("@/server/domain/audit.domain", () => ({
  assertAuditActorPresent: vi.fn(),
  assertAuditTargetValid: vi.fn(),
  assertAuditMetadataSerializable: vi.fn(),
}));

describe("userService", () => {
  const ADMIN_ID = "admin-123";
  const USER_ID = "user-456";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserById", () => {
    it("should allow a user to fetch their own data", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({
        id: USER_ID,
        role: "patient",
        status: "active",
      } as any);

      const result = await userService.getUserById(USER_ID, USER_ID);

      expect(result.id).toBe(USER_ID);
      expect(assertUserNotDeleted).toHaveBeenCalledWith("active");
    });

    it("should allow access if the target user is an admin (based on service logic)", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({
        id: ADMIN_ID,
        role: "admin",
        status: "active",
      } as any);

      const result = await userService.getUserById("some-other-id", ADMIN_ID);
      expect(result.id).toBe(ADMIN_ID);
    });

    it("should throw ForbiddenError if requesting user is not the target and target is not admin", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({
        id: USER_ID,
        role: "patient",
        status: "active",
      } as any);

      await expect(userService.getUserById("stranger-id", USER_ID)).rejects.toThrow(
        ForbiddenError
      );
    });
  });

  describe("listUsers", () => {
    it("should allow an admin to list users", async () => {
      // Mock requester as admin
      vi.mocked(userRepo.getUserById).mockResolvedValue({
        id: ADMIN_ID,
        role: "admin",
      } as any);
      vi.mocked(userRepo.listUsers).mockResolvedValue({ data: [], total: 0 } as any);

      const result = await userService.listUsers(ADMIN_ID, { limit: 10 });

      expect(userRepo.listUsers).toHaveBeenCalledWith({ limit: 10 });
      expect(result.total).toBe(0);
    });

    it("should throw ForbiddenError if requester is not an admin", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({
        id: USER_ID,
        role: "patient",
      } as any);

      await expect(userService.listUsers(USER_ID)).rejects.toThrow(ForbiddenError);
    });
  });

  describe("changeUserStatus", () => {
    it("should allow admin to change user status and log the audit", async () => {
      // Mock actor as admin
      vi.mocked(userRepo.getUserById)
        .mockResolvedValueOnce({ id: ADMIN_ID, role: "admin" } as any) // Actor
        .mockResolvedValueOnce({ id: USER_ID, status: "active" } as any); // Target

      const result = await userService.changeUserStatus(ADMIN_ID, USER_ID, "deactivated");

      expect(userRepo.deactivateUser).toHaveBeenCalledWith(USER_ID);
      expect(auditRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "USER_STATUS_CHANGED",
          targetId: USER_ID,
          metadata: { from: "active", to: "deactivated" },
        })
      );
      expect(result.success).toBe(true);
    });

    it("should validate transition via domain rules before updating", async () => {
      vi.mocked(userRepo.getUserById)
        .mockResolvedValueOnce({ id: ADMIN_ID, role: "admin" } as any)
        .mockResolvedValueOnce({ id: USER_ID, status: "active" } as any);

      vi.mocked(assertValidUserStatusTransition).mockImplementation(() => {
        throw new Error("Invalid transition");
      });

      await expect(
        userService.changeUserStatus(ADMIN_ID, USER_ID, "active")
      ).rejects.toThrow("Invalid transition");
    });
  });

  describe("assertRoleUnchanged", () => {
    it("should call domain rule to verify role immutability", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({
        id: USER_ID,
        role: "patient",
      } as any);

      const result = await userService.assertRoleUnchanged(USER_ID, "patient");

      expect(assertUserRoleImmutable).toHaveBeenCalledWith("patient", "patient");
      expect(result.valid).toBe(true);
    });
  });
});