import { describe, it, expect } from "vitest";
import { 
  prescriptionCreateSchema, 
  prescriptionItemSchema, 
  prescriptionItemsCreateSchema 
} from "./prescription";

describe("Prescription Validators", () => {
  const validUuid = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
  
  /**
   * NOTE: ScheduleClassSchema values depend on your @/db/schema definition.
   * Common values in healthcare systems are 'H', 'H1', 'G', or 'X'.
   */
  const validScheduleClass = "H"; 

  describe("prescriptionCreateSchema", () => {
    it("should pass with a valid consultationId UUID", () => {
      const result = prescriptionCreateSchema.safeParse({
        consultationId: validUuid,
      });
      expect(result.success).toBe(true);
    });

    it("should fail if consultationId is not a valid UUID", () => {
      expect(prescriptionCreateSchema.safeParse({
        consultationId: "invalid-uuid",
      }).success).toBe(false);
    });
  });

  describe("prescriptionItemSchema", () => {
    const validItem = {
      drugName: "Paracetamol 500mg",
      dosage: "1 tablet",
      frequency: "Twice a day after meals",
      durationDays: 5,
      scheduleClass: validScheduleClass,
    };

    it("should pass with valid medication details", () => {
      const result = prescriptionItemSchema.safeParse(validItem);
      
      // If this fails, check if validScheduleClass matches your db/schema.ts
      if (!result.success) {
        console.log("Item Validation Error:", JSON.stringify(result.error.format(), null, 2));
      }
      
      expect(result.success).toBe(true);
    });

    it("should trim strings and enforce length limits", () => {
      const result = prescriptionItemSchema.safeParse({
        ...validItem,
        drugName: "  Amoxicillin  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.drugName).toBe("Amoxicillin");
      }

      // drugName too short (min 2)
      expect(prescriptionItemSchema.safeParse({ ...validItem, drugName: "A" }).success).toBe(false);
    });

    it("should enforce duration constraints (1-365 days)", () => {
      expect(prescriptionItemSchema.safeParse({ ...validItem, durationDays: 0 }).success).toBe(false);
      expect(prescriptionItemSchema.safeParse({ ...validItem, durationDays: 366 }).success).toBe(false);
      expect(prescriptionItemSchema.safeParse({ ...validItem, durationDays: 14.5 }).success).toBe(false); // Must be int
    });

    it("should fail if scheduleClass is invalid", () => {
      expect(prescriptionItemSchema.safeParse({
        ...validItem,
        scheduleClass: "INVALID_CLASS",
      }).success).toBe(false);
    });
  });

  describe("prescriptionItemsCreateSchema", () => {
    it("should pass with a list of one or more items", () => {
      const result = prescriptionItemsCreateSchema.safeParse({
        items: [
          {
            drugName: "Metformin",
            dosage: "500mg",
            frequency: "Daily",
            durationDays: 30,
            scheduleClass: validScheduleClass,
          }
        ]
      });
      expect(result.success).toBe(true);
    });

    it("should fail if items array is empty", () => {
      const result = prescriptionItemsCreateSchema.safeParse({
        items: []
      });
      expect(result.success).toBe(false);
    });
  });
});