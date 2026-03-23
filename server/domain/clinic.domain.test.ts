import { describe, it, expect } from "vitest";
import { 
  assertClinicGeoConsistency, 
  assertClinicIsActive, 
  assertClinicSlugImmutable,
  ClinicDomainError,
  ClinicState
} from "./clinic.domain";

describe("Clinic Domain Logic", () => {

  describe("assertClinicGeoConsistency", () => {
    it("should pass when both coordinates are provided", () => {
      expect(() => assertClinicGeoConsistency("12.345", "78.910")).not.toThrow();
    });

    it("should pass when both coordinates are null or undefined", () => {
      expect(() => assertClinicGeoConsistency(null, null)).not.toThrow();
      expect(() => assertClinicGeoConsistency(undefined, undefined)).not.toThrow();
    });

    it("should throw ClinicDomainError if only geoLat is provided", () => {
      expect(() => assertClinicGeoConsistency("12.345", null))
        .toThrow(ClinicDomainError);
      expect(() => assertClinicGeoConsistency("12.345", undefined))
        .toThrow("Clinic geoLat and geoLng must be provided together");
    });

    it("should throw ClinicDomainError if only geoLng is provided", () => {
      expect(() => assertClinicGeoConsistency(null, "78.910"))
        .toThrow(ClinicDomainError);
    });
  });

  describe("assertClinicIsActive", () => {
    it("should pass for an active clinic", () => {
      const activeClinic: ClinicState = {
        id: "clinic_1",
        isActive: true
      };
      expect(() => assertClinicIsActive(activeClinic)).not.toThrow();
    });

    it("should throw ClinicDomainError for an inactive clinic", () => {
      const inactiveClinic: ClinicState = {
        id: "clinic_2",
        isActive: false
      };
      expect(() => assertClinicIsActive(inactiveClinic))
        .toThrow("Operation not allowed on inactive clinic");
    });
  });

  describe("assertClinicSlugImmutable", () => {
    it("should pass if the slugs are identical", () => {
      expect(() => assertClinicSlugImmutable("city-health-center", "city-health-center"))
        .not.toThrow();
    });

    it("should throw ClinicDomainError if the slugs differ", () => {
      expect(() => assertClinicSlugImmutable("city-health", "suburban-health"))
        .toThrow("Clinic public slug cannot be changed once created");
    });
  });
});