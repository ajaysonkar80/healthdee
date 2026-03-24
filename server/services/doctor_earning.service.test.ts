import { describe, it, expect, vi, beforeEach } from "vitest";
import { doctorEarningService } from "@/server/services/doctor_earning.service";
import { doctorEarningRepo } from "@/server/repositories/doctor_earning.repo";
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { appointmentRepo } from "@/server/repositories/appointment.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";

// Mock Repositories
vi.mock("@/server/repositories/doctor_earning.repo");
vi.mock("@/server/repositories/doctor.repo");
vi.mock("@/server/repositories/user.repo");
vi.mock("@/server/repositories/appointment.repo");
vi.mock("@/server/repositories/audit.repo");

// Mock Domain Logic
vi.mock("@/server/domain/audit.domain", () => ({
  assertAuditActorPresent: vi.fn(),
  assertAuditTargetValid: vi.fn(),
  assertAuditMetadataSerializable: vi.fn(),
}));

describe("doctorEarningService", () => {
  const DOCTOR_USER_ID = "user-doc-123";
  const ADMIN_USER_ID = "user-admin-999";
  const DOCTOR_ID = "doc-456";
  const APPOINTMENT_ID = "app-789";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("recordEarning", () => {
    it("should snapshot the current consultation fee and record earning for a COMPLETED appointment", async () => {
      // Setup
      vi.mocked(appointmentRepo.getAppointmentById).mockResolvedValue({
        id: APPOINTMENT_ID,
        status: "COMPLETED",
        doctorId: DOCTOR_ID,
        patientId: "pat-1",
        appointmentType: "new"
      } as any);
      
      vi.mocked(doctorRepo.getDoctorById).mockResolvedValue({
        id: DOCTOR_ID,
        consultationFee: 500
      } as any);

      vi.mocked(doctorEarningRepo.createEarning).mockResolvedValue({ id: "earn-1" } as any);

      const result = await doctorEarningService.recordEarning(DOCTOR_USER_ID, APPOINTMENT_ID);

      // Assertions
      expect(doctorEarningRepo.createEarning).toHaveBeenCalledWith(expect.objectContaining({
        feeAmount: 500,
        appointmentId: APPOINTMENT_ID
      }));
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({ action: "EARNING_RECORDED" }));
      expect(result.id).toBe("earn-1");
    });

    it("should throw ValidationError if the appointment is not in COMPLETED status", async () => {
      vi.mocked(appointmentRepo.getAppointmentById).mockResolvedValue({
        status: "CONFIRMED"
      } as any);

      await expect(doctorEarningService.recordEarning(DOCTOR_USER_ID, APPOINTMENT_ID))
        .rejects.toThrow(ValidationError); // Earning can only be recorded for COMPLETED appointments
    });
  });

  describe("getEarningsStats", () => {
    it("should allow a doctor to view their own stats", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.doctor } as any);
      vi.mocked(doctorRepo.getDoctorByUserId).mockResolvedValue({ id: DOCTOR_ID } as any);
      vi.mocked(doctorEarningRepo.getEarningsStats).mockResolvedValue({ totalEarning: 5000 } as any);

      const stats = await doctorEarningService.getEarningsStats(DOCTOR_USER_ID);

      
      expect(doctorEarningRepo.getEarningsStats).toHaveBeenCalledWith(DOCTOR_ID);
    });

    it("should throw ForbiddenError if a non-doctor tries to access stats", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.patient } as any);
      
      await expect(doctorEarningService.getEarningsStats("patient-id"))
        .rejects.toThrow(ForbiddenError); // Only doctors can view earnings
    });
  });

  describe("getEarningsHistoryForDoctor (Admin)", () => {
    it("should allow an admin to view any doctor's earning history", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.admin } as any);
      
      await doctorEarningService.getEarningsHistoryForDoctor(ADMIN_USER_ID, DOCTOR_ID, { limit: 10 });

      expect(doctorEarningRepo.getEarningsHistory).toHaveBeenCalledWith(DOCTOR_ID, { limit: 10 });
    });

    it("should block a regular doctor from using the admin history method", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.doctor } as any);
      
      await expect(doctorEarningService.getEarningsHistoryForDoctor(DOCTOR_USER_ID, "other-doc-id"))
        .rejects.toThrow(ForbiddenError); // Only admins can view other doctors' earnings
    });
  });
});