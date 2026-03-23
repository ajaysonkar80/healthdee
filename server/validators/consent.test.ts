import { describe, it, expect } from "vitest";
import { 
  consentGrantSchema, 
  consentWithdrawSchema, 
  consentCreateSchema 
} from "./consent";

describe("Consent Validators", () => {
  const validUuid = "123e4567-e89b-12d3-a456-426614174000";
  
  /**
   * FIX: Healthcare consent statuses are usually 'granted' or 'pending'.
   * If 'active' failed in your previous run, try 'granted'.
   */
  const validStatus = "granted"; 

  describe("consentGrantSchema", () => {
    it("should pass with a valid UUID and required fields", () => {
      const result = consentGrantSchema.safeParse({
        noticeId: validUuid,
        purpose: "Medical Research",
        channel: "Email",
        consentStatus: validStatus,
      });

      // If it fails, this will print the EXACT reason in your terminal
      if (!result.success) {
        console.log("Zod Error Details:", JSON.stringify(result.error.format(), null, 2));
      }

      expect(result.success).toBe(true);
    });
  });

  describe("consentCreateSchema", () => {
    // We use a helper object to ensure we test the same data that fails in your screenshot
    const validCreateData = {
      noticeId: validUuid,
      purpose: "  Telemedicine Consult  ",
      channel: "In-App Notification",
      consentStatus: validStatus,
    };

    it("should trim and validate valid creation data", () => {
      const result = consentCreateSchema.safeParse(validCreateData);

      if (!result.success) {
        console.log("Creation Schema Error:", JSON.stringify(result.error.format(), null, 2));
      }

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.purpose).toBe("Telemedicine Consult");
      }
    });

    it("should enforce maximum length constraints", () => {
      const result = consentCreateSchema.safeParse({
        ...validCreateData,
        purpose: "a".repeat(201),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("consentWithdrawSchema", () => {
    it("should validate a proper consentId UUID", () => {
      expect(consentWithdrawSchema.safeParse({ 
        consentId: validUuid 
      }).success).toBe(true);
    });
  });
});