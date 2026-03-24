import { describe, it, expect, vi, beforeEach } from "vitest";
import { appointmentService } from "@/server/services/appointment.service";
import { appointmentRepo } from "@/server/repositories/appointment.repo";
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { patientRepo } from "@/server/repositories/patient.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";

// Mock Repositories
vi.mock("@/server/repositories/appointment.repo");
vi.mock("@/server/repositories/doctor.repo");
vi.mock("@/server/repositories/patient.repo");
vi.mock("@/server/repositories/user.repo");
vi.mock("@/server/repositories/audit.repo");

// Mock Domain Logic
vi.mock("@/server/domain/appointment.domain", () => ({
  assertValidAppointmentStatusTransition: vi.fn(),
  assertAppointmentScheduledInFuture: vi.fn(),
  assertPatientIsNotDoctor: vi.fn(),
  assertAppointmentIsMutable: vi.fn(),
}));

vi.mock("@/server/domain/audit.domain", () => ({
  assertAuditActorPresent: vi.fn(),
  assertAuditTargetValid: vi.fn(),
  assertAuditMetadataSerializable: vi.fn(),
}));

describe("appointmentService", () => {
  const PATIENT_USER_ID = "user-patient-123";
  const DOCTOR_ID = "doc-456";
  const PATIENT_ID = "pat-789";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createAppointment", () => {
    // inside tests/services/appointment.service.test.ts
const validDate = new Date();
validDate.setDate(validDate.getDate() + 1); 
validDate.setHours(10, 0, 0);

    it("should successfully create an appointment when all validations pass", async () => {
      // Setup: Valid patient, verified doctor, available slot, no overlaps
      vi.mocked(userRepo.getUserById).mockResolvedValue({ 
        id: PATIENT_USER_ID, role: UserRole.patient, status: UserStatus.active 
      } as any);
      vi.mocked(patientRepo.getPatientByUserId).mockResolvedValue({ id: PATIENT_ID } as any);
      vi.mocked(doctorRepo.getDoctorById).mockResolvedValue({ 
        id: DOCTOR_ID, verificationStatus: "verified", userId: "other-user" 
      } as any);
      vi.mocked(doctorRepo.getByDoctorAndDay).mockResolvedValue({ 
        isActive: true, startTime: "08:00", endTime: "17:00" 
      } as any);
      vi.mocked(appointmentRepo.existsOverlappingAppointment).mockResolvedValue(false);
      vi.mocked(appointmentRepo.createAppointment).mockResolvedValue({ id: "app-1" } as any);

      const result = await appointmentService.createAppointment(PATIENT_USER_ID, {
        doctorId: DOCTOR_ID,
        scheduledAt: validDate,
      });

      expect(result.id).toBe("app-1");
      expect(appointmentRepo.createAppointment).toHaveBeenCalled();
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({ action: "APPOINTMENT_CREATED" }));
    });

    it("should throw ForbiddenError if a non-patient tries to book", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.doctor } as any);
      
      await expect(appointmentService.createAppointment(PATIENT_USER_ID, {
        doctorId: DOCTOR_ID,
        scheduledAt: validDate,
      })).rejects.toThrow(ForbiddenError);
    });

    it("should throw ValidationError if the doctor is not verified", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ 
        role: UserRole.patient, status: UserStatus.active 
      } as any);
      vi.mocked(patientRepo.getPatientByUserId).mockResolvedValue({ id: PATIENT_ID } as any);
      vi.mocked(doctorRepo.getDoctorById).mockResolvedValue({ 
        id: DOCTOR_ID, verificationStatus: "pending" 
      } as any);

      await expect(appointmentService.createAppointment(PATIENT_USER_ID, {
        doctorId: DOCTOR_ID,
        scheduledAt: validDate,
      })).rejects.toThrow(ValidationError);
    });

    it("should throw ValidationError if there is a scheduling overlap", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ 
        role: UserRole.patient, status: UserStatus.active 
      } as any);
      vi.mocked(patientRepo.getPatientByUserId).mockResolvedValue({ id: PATIENT_ID } as any);
      vi.mocked(doctorRepo.getDoctorById).mockResolvedValue({ 
        id: DOCTOR_ID, verificationStatus: "verified" 
      } as any);
      vi.mocked(doctorRepo.getByDoctorAndDay).mockResolvedValue({ 
        isActive: true, startTime: "00:00", endTime: "23:59" 
      } as any);
      
      // Mock overlap found
      vi.mocked(appointmentRepo.existsOverlappingAppointment).mockResolvedValue(true);

      await expect(appointmentService.createAppointment(PATIENT_USER_ID, {
        doctorId: DOCTOR_ID,
        scheduledAt: validDate,
      })).rejects.toThrow("Doctor already has an appointment at this time");
    });
  });

  describe("updateAppointmentStatus", () => {
    const APPOINTMENT_ID = "app-999";

    it("should allow a doctor to confirm a pending appointment", async () => {
      vi.mocked(appointmentRepo.getAppointmentById).mockResolvedValue({ 
        id: APPOINTMENT_ID, doctorId: DOCTOR_ID, status: "PENDING" 
      } as any);
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.doctor } as any);
      vi.mocked(doctorRepo.getDoctorByUserId).mockResolvedValue({ id: DOCTOR_ID } as any);

      const result = await appointmentService.updateAppointmentStatus(
        "doc-user-id", APPOINTMENT_ID, "CONFIRMED"
      );

      expect(result.success).toBe(true);
      expect(appointmentRepo.updateAppointmentStatus).toHaveBeenCalledWith(APPOINTMENT_ID, "CONFIRMED");
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({ action: "APPOINTMENT_CONFIRMED" }));
    });

    it("should prevent a patient from confirming their own appointment", async () => {
      vi.mocked(appointmentRepo.getAppointmentById).mockResolvedValue({ 
        id: APPOINTMENT_ID, patientId: PATIENT_ID, status: "PENDING" 
      } as any);
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.patient } as any);
      vi.mocked(patientRepo.getPatientByUserId).mockResolvedValue({ id: PATIENT_ID } as any);

      await expect(appointmentService.updateAppointmentStatus(
        PATIENT_USER_ID, APPOINTMENT_ID, "CONFIRMED"
      )).rejects.toThrow(ForbiddenError);
    });
  });

  describe("rescheduleAppointment", () => {
    it("should validate the new time and check for overlaps before updating", async () => {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 5);

      vi.mocked(appointmentRepo.getAppointmentById).mockResolvedValue({ 
        id: "app-1", doctorId: DOCTOR_ID, patientId: PATIENT_ID, scheduledAt: new Date() 
      } as any);
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.admin } as any);
      vi.mocked(appointmentRepo.existsOverlappingAppointment).mockResolvedValue(false);

      await appointmentService.rescheduleAppointment("admin-id", "app-1", newDate);

      expect(appointmentRepo.updateScheduledAt).toHaveBeenCalledWith("app-1", newDate);
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({ action: "APPOINTMENT_RESCHEDULED" }));
    });
  });
});