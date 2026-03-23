import { describe, it, expect } from "vitest";
import { 
  consultationCreateSchema, 
  consultationUpdateSchema 
} from "./consultation";

describe("Consultation Validators", () => {
  const validUuid = "550e8400-e29b-41d4-a716-446655440000";
  
  /**
   * NOTE: ConsultationModeSchema values depend on your db/schema.ts.
   * Based on common healthcare patterns, this is likely 'video', 'audio', or 'clinic'.
   */
  const validMode = "video"; 

  describe("consultationCreateSchema", () => {
    it("should pass with a valid UUID and mode", () => {
      const result = consultationCreateSchema.safeParse({
        appointmentId: validUuid,
        mode: validMode,
      });

      if (!result.success) {
        console.log("Create Schema Error:", JSON.stringify(result.error.format(), null, 2));
      }

      expect(result.success).toBe(true);
    });

    it("should fail if appointmentId is not a valid UUID", () => {
      expect(consultationCreateSchema.safeParse({
        appointmentId: "invalid-id",
        mode: validMode,
      }).success).toBe(false);
    });

    it("should fail if mode is invalid", () => {
      expect(consultationCreateSchema.safeParse({
        appointmentId: validUuid,
        mode: "smoke-signals", // Invalid mode
      }).success).toBe(false);
    });
  });

  describe("consultationUpdateSchema", () => {
    const now = Date.now();
    const oneHourLater = now + 3600000;

    it("should pass when endedAt is after startedAt", () => {
      const result = consultationUpdateSchema.safeParse({
        startedAt: now,
        endedAt: oneHourLater,
        summary: "Patient shows signs of recovery.",
      });
      expect(result.success).toBe(true);
    });

    it("should pass with only a summary update", () => {
      const result = consultationUpdateSchema.safeParse({
        summary: "Updated consultation notes.",
      });
      expect(result.success).toBe(true);
    });

    it("should fail if endedAt is before startedAt", () => {
      const result = consultationUpdateSchema.safeParse({
        startedAt: oneHourLater,
        endedAt: now,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("endedAt must be after startedAt");
      }
    });

    it("should fail if endedAt is provided without startedAt", () => {
      /**
       * Per the .refine logic: (d.endedAt === undefined || (d.startedAt !== undefined && d.endedAt > d.startedAt))
       * Providing endedAt while startedAt is undefined will trigger the second half of the OR, 
       * which fails because startedAt is undefined.
       */
      const result = consultationUpdateSchema.safeParse({
        endedAt: oneHourLater,
      });
      expect(result.success).toBe(false);
    });

    it("should fail if summary exceeds 5000 characters", () => {
      expect(consultationUpdateSchema.safeParse({
        summary: "a".repeat(5001),
      }).success).toBe(false);
    });

    it("should fail if timestamps are not integers", () => {
      expect(consultationUpdateSchema.safeParse({
        startedAt: 123.45,
      }).success).toBe(false);
    });
  });
});