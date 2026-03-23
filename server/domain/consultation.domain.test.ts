import { describe, it, expect } from "vitest";
import { 
  assertConsultationCreationAllowed, 
  assertNoExistingConsultation, 
  assertConsultationStartAllowed, 
  assertConsultationEndAllowed, 
  assertConsultationIsMutable,
  ConsultationDomainError,
  ConsultationState,
  AppointmentSnapshot
} from "./consultation.domain";

describe("Consultation Domain Logic", () => {

  describe("assertConsultationCreationAllowed", () => {
    it("should pass if appointment status is PENDING", () => {
      const apt: AppointmentSnapshot = { id: "a1", status: "PENDING", scheduledAt: 1000 };
      expect(() => assertConsultationCreationAllowed(apt)).not.toThrow();
    });

    it("should throw if appointment is not PENDING", () => {
      const apt: AppointmentSnapshot = { id: "a1", status: "CONFIRMED", scheduledAt: 1000 };
      expect(() => assertConsultationCreationAllowed(apt))
        .toThrow("Consultation can only be created for PENDING appointments");
    });
  });

  describe("assertNoExistingConsultation", () => {
    it("should pass if no existing consultation is provided (null)", () => {
      expect(() => assertNoExistingConsultation(null)).not.toThrow();
    });

    it("should throw if an existing consultation is already present", () => {
      const existing: ConsultationState = { id: "c1", appointmentId: "a1", mode: "video" }; // ✅ Lowercase fixed
      expect(() => assertNoExistingConsultation(existing))
        .toThrow(ConsultationDomainError);
    });
  });

  describe("assertConsultationStartAllowed", () => {
    it("should pass if startedAt is after scheduledAt", () => {
      const apt: AppointmentSnapshot = { id: "a1", status: "PENDING", scheduledAt: 1711200000 };
      expect(() => assertConsultationStartAllowed(apt, 1711203600)).not.toThrow();
    });

    it("should throw if start is before the scheduled time", () => {
      const apt: AppointmentSnapshot = { id: "a1", status: "PENDING", scheduledAt: 1711200000 };
      expect(() => assertConsultationStartAllowed(apt, 1711199999))
        .toThrow("Consultation cannot start before appointment time");
    });
  });

  describe("assertConsultationEndAllowed", () => {
    it("should pass if endedAt is after startedAt", () => {
      expect(() => assertConsultationEndAllowed(1000, 2000)).not.toThrow();
    });

    it("should throw if endedAt is specified but startedAt is missing", () => {
      expect(() => assertConsultationEndAllowed(null, 2000))
        .toThrow("Consultation cannot end before it has started");
    });

    it("should throw if end time is not after start time", () => {
      expect(() => assertConsultationEndAllowed(1000, 1000))
        .toThrow("Consultation end time must be after start time");
    });
  });

  describe("assertConsultationIsMutable", () => {
    it("should pass if consultation has not ended", () => {
      const active: ConsultationState = { id: "c1", appointmentId: "a1", mode: "video", endedAt: null }; // ✅ Lowercase fixed
      expect(() => assertConsultationIsMutable(active)).not.toThrow();
    });

    it("should throw if consultation has an endedAt timestamp", () => {
      const closed: ConsultationState = { id: "c1", appointmentId: "a1", mode: "video", endedAt: 12345 }; // ✅ Lowercase fixed
      expect(() => assertConsultationIsMutable(closed))
        .toThrow("Ended consultations cannot be modified");
    });
  });
});