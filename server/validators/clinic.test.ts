import { describe, it, expect } from "vitest";
import { clinicBaseSchema } from "./clinic";

describe("Clinic Validators", () => {
  const validClinic = {
    name: "HealthDee Central Clinic",
    publicSlug: "central-clinic-01",
    address: "123 Healthcare Lane, Sector 4",
    city: "Mumbai",
    country: "IN",
  };

  describe("clinicBaseSchema - Basic Validation", () => {
    it("should pass with valid required fields", () => {
      const result = clinicBaseSchema.safeParse(validClinic);
      expect(result.success).toBe(true);
    });

    it("should fail if name is too short or too long", () => {
      expect(clinicBaseSchema.safeParse({ ...validClinic, name: "A" }).success).toBe(false);
      expect(clinicBaseSchema.safeParse({ ...validClinic, name: "a".repeat(151) }).success).toBe(false);
    });

    it("should validate publicSlug regex strictly", () => {
      // Valid: lowercase, numbers, hyphens
      expect(clinicBaseSchema.safeParse({ ...validClinic, publicSlug: "my-clinic-123" }).success).toBe(true);
      
      // Invalid: Uppercase
      expect(clinicBaseSchema.safeParse({ ...validClinic, publicSlug: "My-Clinic" }).success).toBe(false);
      
      // Invalid: Special characters
      expect(clinicBaseSchema.safeParse({ ...validClinic, publicSlug: "clinic_01!" }).success).toBe(false);
    });

    it("should enforce character limits on description", () => {
      expect(clinicBaseSchema.safeParse({ ...validClinic, description: "a".repeat(1001) }).success).toBe(false);
    });

    it("should default country to 'IN' if omitted", () => {
      const { country, ...withoutCountry } = validClinic;
      const result = clinicBaseSchema.safeParse(withoutCountry);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.country).toBe("IN");
      }
    });

    it("should fail if country is not exactly 2 characters", () => {
      expect(clinicBaseSchema.safeParse({ ...validClinic, country: "USA" }).success).toBe(false);
    });
  });

  describe("clinicBaseSchema - Geo-location Logic", () => {
    it("should pass when both geoLat and geoLng are provided", () => {
      const result = clinicBaseSchema.safeParse({
        ...validClinic,
        geoLat: 19.0760,
        geoLng: 72.8777,
      });
      expect(result.success).toBe(true);
    });

    it("should pass when both geoLat and geoLng are missing", () => {
      const result = clinicBaseSchema.safeParse(validClinic);
      expect(result.success).toBe(true);
    });

    it("should fail if only geoLat is provided", () => {
      const result = clinicBaseSchema.safeParse({
        ...validClinic,
        geoLat: 19.0760,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("Both geoLat and geoLng must be provided together");
      }
    });

    it("should fail if only geoLng is provided", () => {
      const result = clinicBaseSchema.safeParse({
        ...validClinic,
        geoLng: 72.8777,
      });
      expect(result.success).toBe(false);
    });

    it("should fail if coordinates are out of range", () => {
      expect(clinicBaseSchema.safeParse({ ...validClinic, geoLat: 91, geoLng: 0 }).success).toBe(false);
      expect(clinicBaseSchema.safeParse({ ...validClinic, geoLat: 0, geoLng: 181 }).success).toBe(false);
    });
  });
});