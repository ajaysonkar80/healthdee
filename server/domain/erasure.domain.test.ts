import { describe, it, expect } from "vitest";
import { 
  assertValidErasureStatusTransition, 
  assertErasureRequestIsMutable, 
  ErasureDomainError 
} from "./erasure.domain";
import type { ErasureStatus } from "@/db/schema";

describe("Erasure Domain Logic", () => {

  describe("assertValidErasureStatusTransition", () => {
    it("should allow transition to the same status (no-op)", () => {
      const status: ErasureStatus = "requested";
      expect(() => assertValidErasureStatusTransition(status, status)).not.toThrow();
    });

    it("should allow valid transitions", () => {
      // requested -> in_progress
      expect(() => assertValidErasureStatusTransition("requested", "in_progress")).not.toThrow();
      
      // in_progress -> completed
      expect(() => assertValidErasureStatusTransition("in_progress", "completed")).not.toThrow();
      
      // in_progress -> rejected
      expect(() => assertValidErasureStatusTransition("in_progress", "rejected")).not.toThrow();
    });

    it("should throw ErasureDomainError for invalid transitions", () => {
      // requested cannot skip to completed
      expect(() => assertValidErasureStatusTransition("requested", "completed"))
        .toThrowError(ErasureDomainError);
      
      // completed is a terminal state and cannot move back
      expect(() => assertValidErasureStatusTransition("completed", "in_progress"))
        .toThrowError(/Invalid erasure request transition/);
        
      // rejected is a terminal state
      expect(() => assertValidErasureStatusTransition("rejected", "requested"))
        .toThrowError(ErasureDomainError);
    });
  });

  describe("assertErasureRequestIsMutable", () => {
    it("should allow modification for 'requested' and 'in_progress' states", () => {
      expect(() => assertErasureRequestIsMutable("requested")).not.toThrow();
      expect(() => assertErasureRequestIsMutable("in_progress")).not.toThrow();
    });

    it("should throw ErasureDomainError for terminal states", () => {
      expect(() => assertErasureRequestIsMutable("completed"))
        .toThrowError("Completed or rejected erasure requests cannot be modified");
        
      expect(() => assertErasureRequestIsMutable("rejected"))
        .toThrowError(ErasureDomainError);
    });
  });

  describe("ErasureDomainError", () => {
    it("should correctly set the error name", () => {
      const error = new ErasureDomainError("test message");
      expect(error.name).toBe("ErasureDomainError");
      expect(error.message).toBe("test message");
      expect(error).toBeInstanceOf(Error);
    });
  });
});