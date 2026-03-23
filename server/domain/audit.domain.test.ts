import { describe, it, expect } from "vitest";
import { 
  assertAuditActorPresent, 
  assertAuditTargetValid, 
  assertAuditMetadataSerializable,
  AuditDomainError,
  AuditLogInput
} from "./audit.domain";

describe("Audit Domain Logic", () => {

  describe("assertAuditActorPresent", () => {
    it("should pass for actions that do not require an actor", () => {
      const log: AuditLogInput = {
        action: "USER_CREATED",
        targetType: "USER",
        targetId: "user_123",
        actorUserId: null // No actor provided
      };
      expect(() => assertAuditActorPresent(log)).not.toThrow();
    });

    it("should pass for sensitive actions when an actor is present", () => {
      const log: AuditLogInput = {
        action: "USER_STATUS_CHANGED",
        targetType: "USER",
        targetId: "user_123",
        actorUserId: "admin_99"
      };
      expect(() => assertAuditActorPresent(log)).not.toThrow();
    });

    it("should throw AuditDomainError for sensitive actions missing an actor", () => {
      const log: AuditLogInput = {
        action: "DOCTOR_VERIFIED",
        targetType: "DOCTOR",
        targetId: "doc_456",
        actorUserId: undefined // Missing actor
      };
      expect(() => assertAuditActorPresent(log))
        .toThrow(AuditDomainError);
      expect(() => assertAuditActorPresent(log))
        .toThrow(/requires an actorUserId/);
    });
  });

  describe("assertAuditTargetValid", () => {
    it("should pass when both targetType and targetId are provided", () => {
      const log: AuditLogInput = {
        action: "APPOINTMENT_CREATED",
        targetType: "APPOINTMENT",
        targetId: "apt_789"
      };
      expect(() => assertAuditTargetValid(log)).not.toThrow();
    });

    it("should throw if targetType is missing or empty", () => {
      const log: any = {
        action: "APPOINTMENT_CREATED",
        targetId: "apt_789"
      };
      expect(() => assertAuditTargetValid(log))
        .toThrow("Audit log must include targetType and targetId");
    });

    it("should throw if targetId is missing or empty", () => {
      const log: any = {
        action: "APPOINTMENT_CREATED",
        targetType: "APPOINTMENT",
        targetId: ""
      };
      expect(() => assertAuditTargetValid(log)).toThrow();
    });
  });

  describe("assertAuditMetadataSerializable", () => {
    it("should pass if metadata is null or undefined", () => {
      expect(() => assertAuditMetadataSerializable(null)).not.toThrow();
      expect(() => assertAuditMetadataSerializable(undefined)).not.toThrow();
    });

    it("should pass for a standard serializable object", () => {
      const metadata = {
        oldStatus: "PENDING",
        newStatus: "CONFIRMED",
        reason: "Patient paid deposit"
      };
      expect(() => assertAuditMetadataSerializable(metadata)).not.toThrow();
    });

    it("should throw AuditDomainError if metadata has circular references", () => {
      const circular: any = { key: "value" };
      circular.self = circular; // Create circular reference

      expect(() => assertAuditMetadataSerializable(circular))
        .toThrow(AuditDomainError);
      expect(() => assertAuditMetadataSerializable(circular))
        .toThrow("Audit metadata must be JSON serializable");
    });
  });
});