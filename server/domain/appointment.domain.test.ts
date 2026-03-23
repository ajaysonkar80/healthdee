import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { 
  assertValidAppointmentStatusTransition, 
  assertAppointmentScheduledInFuture, 
  assertPatientIsNotDoctor, 
  assertAppointmentIsMutable,
  AppointmentDomainError,
  AppointmentState
} from "./appointment.domain";

describe("Appointment Domain Logic", () => {
  
  describe("assertValidAppointmentStatusTransition", () => {
    it("should allow valid transitions (PENDING → CONFIRMED)", () => {
      expect(() => assertValidAppointmentStatusTransition("PENDING", "CONFIRMED")).not.toThrow();
    });

    it("should allow transition to the same status (noop)", () => {
      expect(() => assertValidAppointmentStatusTransition("PENDING", "PENDING")).not.toThrow();
    });

    it("should allow closing transitions (CONFIRMED → CANCELLED)", () => {
      expect(() => assertValidAppointmentStatusTransition("CONFIRMED", "CANCELLED")).not.toThrow();
    });

    it("should throw for invalid transitions (PENDING → COMPLETED)", () => {
      expect(() => assertValidAppointmentStatusTransition("PENDING", "COMPLETED"))
        .toThrow(AppointmentDomainError);
    });

    it("should throw for transitions from terminal states (COMPLETED → CANCELLED)", () => {
      expect(() => assertValidAppointmentStatusTransition("COMPLETED", "CANCELLED"))
        .toThrow(/Invalid appointment transition/);
    });
  });

  describe("assertAppointmentScheduledInFuture", () => {
    beforeEach(() => {
      // Mock "now" to 2026-03-23 10:00:00 UTC (1742724000)
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-03-23T10:00:00Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should pass for a timestamp in the future", () => {
      const futureTime = Math.floor(Date.now() / 1000) + 3600; // +1 hour
      expect(() => assertAppointmentScheduledInFuture(futureTime)).not.toThrow();
    });

    it("should throw for a timestamp in the past", () => {
      const pastTime = Math.floor(Date.now() / 1000) - 3600; // -1 hour
      expect(() => assertAppointmentScheduledInFuture(pastTime))
        .toThrow("Appointment must be scheduled in the future");
    });

    it("should throw if the timestamp is exactly now", () => {
      const now = Math.floor(Date.now() / 1000);
      expect(() => assertAppointmentScheduledInFuture(now)).toThrow();
    });
  });

  describe("assertPatientIsNotDoctor", () => {
    it("should pass if IDs are different", () => {
      expect(() => assertPatientIsNotDoctor("user_1", "user_2")).not.toThrow();
    });

    it("should throw if IDs are identical", () => {
      expect(() => assertPatientIsNotDoctor("user_1", "user_1"))
        .toThrow("Patient and doctor cannot be the same user");
    });
  });

  describe("assertAppointmentIsMutable", () => {
    const mockAppointment = (status: any): AppointmentState => ({
      id: "apt_1",
      patientId: "p_1",
      doctorId: "d_1",
      status: status,
      scheduledAt: 1742724000
    });

    it("should pass for PENDING appointments", () => {
      expect(() => assertAppointmentIsMutable(mockAppointment("PENDING"))).not.toThrow();
    });

    it("should throw for CONFIRMED appointments", () => {
      expect(() => assertAppointmentIsMutable(mockAppointment("CONFIRMED")))
        .toThrow("Only PENDING appointments can be modified");
    });

    it("should throw for terminal states (CANCELLED/COMPLETED)", () => {
      expect(() => assertAppointmentIsMutable(mockAppointment("CANCELLED"))).toThrow();
      expect(() => assertAppointmentIsMutable(mockAppointment("COMPLETED"))).toThrow();
    });
  });
});