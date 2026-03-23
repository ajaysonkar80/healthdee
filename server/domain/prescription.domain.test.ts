import { describe, it, expect } from "vitest";
import { 
  assertPrescriptionCreationAllowed, 
  assertNoExistingPrescription, 
  assertPrescriptionOwnership,
  assertScheduleClassAllowed,
  PrescriptionDomainError,
  type ConsultationSnapshot,
  type PrescriptionState
} from "./prescription.domain";

describe("Prescription Domain Logic", () => {
  
  const mockConsultation: ConsultationSnapshot = {
    id: "consult-123",
    doctorId: "doc-456",
    patientId: "pat-789",
    endedAt: Date.now()
  };

  describe("assertPrescriptionCreationAllowed", () => {
    it("should allow creation when consultation is completed (has endedAt)", () => {
      expect(() => assertPrescriptionCreationAllowed(mockConsultation)).not.toThrow();
    });

    it("should throw if consultation is still active (no endedAt)", () => {
      const activeConsultation = { ...mockConsultation, endedAt: null };
      expect(() => assertPrescriptionCreationAllowed(activeConsultation))
        .toThrow(PrescriptionDomainError);
      expect(() => assertPrescriptionCreationAllowed(activeConsultation))
        .toThrow("Prescription can only be created after consultation is completed");
    });
  });

  describe("assertNoExistingPrescription", () => {
    it("should pass if no prescription exists for the consultation", () => {
      expect(() => assertNoExistingPrescription(null)).not.toThrow();
    });

    it("should throw if a prescription record already exists", () => {
      const existing: PrescriptionState = {
        id: "presc-1",
        consultationId: "consult-123",
        doctorId: "doc-456",
        patientId: "pat-789"
      };
      expect(() => assertNoExistingPrescription(existing))
        .toThrow("Only one prescription is allowed per consultation");
    });
  });

  describe("assertPrescriptionOwnership", () => {
    it("should pass when IDs match the consultation record", () => {
      expect(() => assertPrescriptionOwnership(mockConsultation, "doc-456", "pat-789"))
        .not.toThrow();
    });

    it("should throw if the doctorId does not match", () => {
      expect(() => assertPrescriptionOwnership(mockConsultation, "doc-wrong", "pat-789"))
        .toThrow("Prescription doctor or patient does not match consultation");
    });

    it("should throw if the patientId does not match", () => {
      expect(() => assertPrescriptionOwnership(mockConsultation, "doc-456", "pat-wrong"))
        .toThrow(PrescriptionDomainError);
    });
  });

  describe("assertScheduleClassAllowed", () => {
    it("should allow restricted classes X and H1 (placeholder verification)", () => {
      // Currently these are explicit no-ops in the domain, but we test they don't throw
      expect(() => assertScheduleClassAllowed({ scheduleClass: "X" as any })).not.toThrow();
      expect(() => assertScheduleClassAllowed({ scheduleClass: "H1" as any })).not.toThrow();
    });

    it("should allow standard schedule classes", () => {
      expect(() => assertScheduleClassAllowed({ scheduleClass: "G" as any })).not.toThrow();
    });
  });
});