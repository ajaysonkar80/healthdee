import { describe, it, expect, vi, beforeEach } from "vitest";
import { adminService } from "@/server/services/admin.service";
import { userRepo } from "@/server/repositories/user.repo";
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { assertValidUserStatusTransition } from "@/server/domain/user.domain";
import { ForbiddenError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";

// Mock dependencies
vi.mock("@/server/repositories/user.repo");
vi.mock("@/server/repositories/doctor.repo");
vi.mock("@/server/repositories/audit.repo");
vi.mock("@/server/domain/user.domain");
vi.mock("@/server/domain/audit.domain", () => ({
  assertAuditActorPresent: vi.fn(),
  assertAuditTargetValid: vi.fn(),
  assertAuditMetadataSerializable: vi.fn(),
}));

describe("adminService", () => {
  const ADMIN_ID = "admin-123";
  const USER_ID = "user-456";
  const DOCTOR_ID = "doc-789";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("assertAdmin", () => {
    it("should return the actor if they have an admin role", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: ADMIN_ID, role: UserRole.admin } as any);
      
      const result = await adminService.assertAdmin(ADMIN_ID);
      expect(result.role).toBe(UserRole.admin);
    });

    it("should throw ForbiddenError if the actor is not an admin", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: USER_ID, role: UserRole.patient } as any);
      
      await expect(adminService.assertAdmin(USER_ID)).rejects.toThrow(ForbiddenError);
    });
  });

  describe("changeUserStatus", () => {
    it("should allow an admin to deactivate a user and create an audit log", async () => {
      // Setup: Actor is admin, Target exists
      vi.mocked(userRepo.getUserById)
        .mockResolvedValueOnce({ id: ADMIN_ID, role: UserRole.admin } as any) // Actor check
        .mockResolvedValueOnce({ id: USER_ID, status: "active" } as any);    // Target fetch

      await adminService.changeUserStatus(ADMIN_ID, USER_ID, "deactivated");

      expect(userRepo.deactivateUser).toHaveBeenCalledWith(USER_ID);
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        action: "USER_STATUS_CHANGED",
        targetId: USER_ID,
        metadata: { from: "active", to: "deactivated" }
      }));
    });

    it("should validate the status transition before proceeding", async () => {
      vi.mocked(userRepo.getUserById)
        .mockResolvedValueOnce({ id: ADMIN_ID, role: UserRole.admin } as any)
        .mockResolvedValueOnce({ id: USER_ID, status: "deleted" } as any);

      vi.mocked(assertValidUserStatusTransition).mockImplementation(() => {
        throw new Error("Invalid transition");
      });

      await expect(adminService.changeUserStatus(ADMIN_ID, USER_ID, "active")).rejects.toThrow("Invalid transition");
    });
  });

  describe("setDoctorVerificationStatus", () => {
    it("should update status and log DOCTOR_VERIFIED when status is verified", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: ADMIN_ID, role: UserRole.admin } as any);
      vi.mocked(doctorRepo.getDoctorById).mockResolvedValue({ id: DOCTOR_ID, verificationStatus: "pending" } as any);

      await adminService.setDoctorVerificationStatus(ADMIN_ID, DOCTOR_ID, "verified");

      expect(doctorRepo.updateVerificationStatus).toHaveBeenCalledWith(DOCTOR_ID, "verified");
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({
        action: "DOCTOR_VERIFIED",
        targetId: DOCTOR_ID
      }));
    });
  });

  describe("getMetrics", () => {
    it("should compile totals from multiple repository calls", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: ADMIN_ID, role: UserRole.admin } as any);
      
      // Mock listUsers and listDoctors to return different totals
      vi.mocked(userRepo.listUsers).mockResolvedValue({ total: 10, data: [] } as any);
      vi.mocked(doctorRepo.listDoctors).mockResolvedValue({ total: 5, data: [] } as any);

      const metrics = await adminService.getMetrics(ADMIN_ID);

      expect(metrics.users.total).toBe(10);
      expect(metrics.doctors.total).toBe(5);
      expect(userRepo.listUsers).toHaveBeenCalledTimes(6); // Total, Active, Inactive, Admin, Doctor, Patient
      expect(doctorRepo.listDoctors).toHaveBeenCalledTimes(4); // Total, Verified, Rejected, Pending
    });
  });
});