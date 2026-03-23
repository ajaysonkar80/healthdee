import { describe, it, expect } from "vitest";
import { 
  doctorCreateSchema, 
  doctorUpdateSchema, 
  doctorVerificationUpdateSchema 
} from "./doctor";

describe("Doctor Validators", () => {
  const validDoctorData = {
    specialty: "Cardiology",
    experienceYears: 15,
    bio: "Experienced cardiologist specializing in heart failure management.",
    consultationFee: 500,
    profileImageUrl: "https://example.com/doctor.jpg",
    rmpRegistrationNumber: "RMP-12345",
    rmpStateMedicalCouncil: "Maharashtra Medical Council",
  };

  describe("doctorCreateSchema", () => {
    it("should pass with all valid required and optional fields", () => {
      const result = doctorCreateSchema.safeParse(validDoctorData);
      expect(result.success).toBe(true);
    });

    it("should fail if required fields are missing", () => {
      const { rmpRegistrationNumber, ...invalid } = validDoctorData;
      expect(doctorCreateSchema.safeParse(invalid).success).toBe(false);
    });

    it("should enforce character limits on specialty and bio", () => {
      // Specialty too short
      expect(doctorCreateSchema.safeParse({ ...validDoctorData, specialty: "A" }).success).toBe(false);
      // Bio too short
      expect(doctorCreateSchema.safeParse({ ...validDoctorData, bio: "Short bio" }).success).toBe(false);
    });

    it("should reject negative or unrealistic experience years", () => {
      expect(doctorCreateSchema.safeParse({ ...validDoctorData, experienceYears: -1 }).success).toBe(false);
      expect(doctorCreateSchema.safeParse({ ...validDoctorData, experienceYears: 61 }).success).toBe(false);
    });

    it("should validate the profileImageUrl format", () => {
      expect(doctorCreateSchema.safeParse({ ...validDoctorData, profileImageUrl: "invalid-url" }).success).toBe(false);
      // Test nullable
      expect(doctorCreateSchema.safeParse({ ...validDoctorData, profileImageUrl: null }).success).toBe(true);
    });
  });

  describe("doctorUpdateSchema", () => {
    it("should pass with partial valid data", () => {
      const result = doctorUpdateSchema.safeParse({
        specialty: "Neurology",
        consultationFee: 750,
      });
      expect(result.success).toBe(true);
    });

    it("should still enforce constraints on provided optional fields", () => {
      // Bio still needs to be at least 10 chars if provided
      expect(doctorUpdateSchema.safeParse({ bio: "Too short" }).success).toBe(false);
    });
  });

  describe("doctorVerificationUpdateSchema", () => {
    /**
     * NOTE: Values depend on DoctorVerificationSchema from @/db/schema.
     * Common statuses include 'pending', 'verified', 'rejected'.
     */
    const validVerifiedStatus = "verified";
    const validPendingStatus = "pending";

    it("should pass when status is verified and verifiedAt is provided", () => {
      const result = doctorVerificationUpdateSchema.safeParse({
        verificationStatus: validVerifiedStatus,
        verifiedAt: Date.now(),
      });
      expect(result.success).toBe(true);
    });

    it("should fail when status is verified but verifiedAt is missing", () => {
      const result = doctorVerificationUpdateSchema.safeParse({
        verificationStatus: validVerifiedStatus,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe("verifiedAt is required when doctor is verified");
      }
    });

    it("should pass when status is not verified even if verifiedAt is missing", () => {
      const result = doctorVerificationUpdateSchema.safeParse({
        verificationStatus: validPendingStatus,
      });
      expect(result.success).toBe(true);
    });
  });
});