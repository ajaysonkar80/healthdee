import { describe, it, expect, vi, beforeEach } from "vitest";
import { prescriptionService } from "./prescription.services";
import { prescriptionRepo } from "../repositories/prescription.repo";
import { appointmentRepo } from "../repositories/appointment.repo";
import { userRepo } from "../repositories/user.repo";
import { auditRepo } from "../repositories/audit.repo";
import { 
  assertPrescriptionCreationAllowed, 
  assertNoExistingPrescription,
  assertScheduleClassAllowed 
} from "@/server/domain/prescription.domain";
import { ForbiddenError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";

// Mock Repositories
vi.mock("@/server/repositories/prescription.repo");
vi.mock("@/server/repositories/appointment.repo");
vi.mock("@/server/repositories/user.repo");
vi.mock("@/server/repositories/audit.repo");

// Mock Domain Rules
vi.mock("@/server/domain/prescription.domain", () => ({
  assertPrescriptionCreationAllowed: vi.fn(),
  assertNoExistingPrescription: vi.fn(),
  assertPrescriptionOwnership: vi.fn(),
  assertScheduleClassAllowed: vi.fn(),
}));

vi.mock("@/server/domain/audit.domain", () => ({
  assertAuditActorPresent: vi.fn(),
  assertAuditTargetValid: vi.fn(),
  assertAuditMetadataSerializable: vi.fn(),
}));

describe("prescriptionService", () => {
  const DOCTOR_USER_ID = "doctor-123";
  const PATIENT_USER_ID = "patient-456";
  const CONSULTATION_ID = "cons-789";
  const APPOINTMENT_ID = "app-000";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createPrescription", () => {
    const mockInput = {
      consultationId: CONSULTATION_ID,
      items: [{ medicine: "Paracetamol", schedule: "H1" } as any],
    };

    it("should successfully create a prescription when all domain rules pass", async () => {
      // 1. Mock Actor check
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: DOCTOR_USER_ID, role: UserRole.doctor } as any);
      
      // 2. Mock Consultation & Appointment fetch
      vi.mocked(appointmentRepo.getConsultationByAppointment).mockResolvedValue({ 
        id: CONSULTATION_ID, 
        appointmentId: APPOINTMENT_ID,
        endedAt: new Date()
      } as any);
      
      vi.mocked(appointmentRepo.getAppointmentById).mockResolvedValue({ 
        doctorId: DOCTOR_USER_ID, 
        patientId: PATIENT_USER_ID 
      } as any);

      // 3. Mock existence check (returns null/not found)
      vi.mocked(prescriptionRepo.getPrescriptionByConsultation).mockRejectedValue(new Error("Not found"));

      // 4. Mock Success Persistence
      vi.mocked(prescriptionRepo.createPrescription).mockResolvedValue({ id: "presc-1" } as any);

      const result = await prescriptionService.createPrescription(DOCTOR_USER_ID, mockInput);

      expect(result.id).toBe("presc-1");
      expect(prescriptionRepo.createPrescription).toHaveBeenCalled();
      expect(assertScheduleClassAllowed).toHaveBeenCalled();
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({ 
        action: "PRESCRIPTION_CREATED" 
      }));
    });

    it("should throw ForbiddenError if a non-doctor tries to create a prescription", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: PATIENT_USER_ID, role: UserRole.patient } as any);

      await expect(prescriptionService.createPrescription(PATIENT_USER_ID, mockInput))
        .rejects.toThrow(ForbiddenError); // Only doctors can create prescriptions
    });

    it("should validate that no prescription already exists for the consultation", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: DOCTOR_USER_ID, role: UserRole.doctor } as any);
      vi.mocked(appointmentRepo.getConsultationByAppointment).mockResolvedValue({ appointmentId: APPOINTMENT_ID } as any);
      vi.mocked(appointmentRepo.getAppointmentById).mockResolvedValue({ doctorId: DOCTOR_USER_ID } as any);
      
      // Mock existing prescription found
      vi.mocked(prescriptionRepo.getPrescriptionByConsultation).mockResolvedValue({ id: "existing-id" } as any);
      vi.mocked(assertNoExistingPrescription).mockImplementation(() => {
        throw new Error("Already exists");
      });

      await expect(prescriptionService.createPrescription(DOCTOR_USER_ID, mockInput))
        .rejects.toThrow("Already exists");
    });
  });

  describe("getPrescriptionByConsultation", () => {
    it("should allow the assigned patient to view their prescription", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: PATIENT_USER_ID, role: UserRole.patient } as any);
      vi.mocked(prescriptionRepo.getPrescriptionByConsultation).mockResolvedValue({ 
        patientId: PATIENT_USER_ID, 
        doctorId: DOCTOR_USER_ID 
      } as any);

      const result = await prescriptionService.getPrescriptionByConsultation(PATIENT_USER_ID, CONSULTATION_ID);
      
      expect(result.patientId).toBe(PATIENT_USER_ID);
    });

    it("should allow an admin to view any prescription", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: "admin-1", role: UserRole.admin } as any);
      vi.mocked(prescriptionRepo.getPrescriptionByConsultation).mockResolvedValue({ 
        patientId: PATIENT_USER_ID, 
        doctorId: DOCTOR_USER_ID 
      } as any);

      const result = await prescriptionService.getPrescriptionByConsultation("admin-1", CONSULTATION_ID);
      expect(result).toBeDefined();
    });

    it("should block unauthorized users from viewing prescriptions", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ id: "unauthorized-id", role: UserRole.patient } as any);
      vi.mocked(prescriptionRepo.getPrescriptionByConsultation).mockResolvedValue({ 
        patientId: PATIENT_USER_ID, 
        doctorId: DOCTOR_USER_ID 
      } as any);

      await expect(prescriptionService.getPrescriptionByConsultation("unauthorized-id", CONSULTATION_ID))
        .rejects.toThrow(ForbiddenError); // Access denied
    });
  });
});