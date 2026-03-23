import { describe, it, expect } from "vitest";
import { 
  assertValidDoctorVerificationTransition,
  assertDoctorVerificationFields,
  assertDoctorProfileEditable,
  assertDoctorBelongsToUser,
  assertDoctorIsVerified,
  assertDoctorProfileComplete,
  DoctorDomainError,
  DoctorState
} from "./doctor.domain";

describe("Doctor Domain Logic", () => {

  describe("assertValidDoctorVerificationTransition", () => {
    it("should allow transition from pending to verified", () => {
      expect(() => assertValidDoctorVerificationTransition("pending", "verified")).not.toThrow();
    });

    it("should allow transition from pending to rejected", () => {
      expect(() => assertValidDoctorVerificationTransition("pending", "rejected")).not.toThrow();
    });

    it("should allow transition to the same status (noop)", () => {
      expect(() => assertValidDoctorVerificationTransition("verified", "verified")).not.toThrow();
    });

    it("should throw for invalid transition from verified back to pending", () => {
      expect(() => assertValidDoctorVerificationTransition("verified", "pending"))
        .toThrow(DoctorDomainError);
      expect(() => assertValidDoctorVerificationTransition("verified", "pending"))
        .toThrow(/Invalid doctor verification transition/);
    });
  });

  describe("assertDoctorVerificationFields", () => {
    it("should pass when status is verified and verifiedAt is provided", () => {
      expect(() => assertDoctorVerificationFields("verified", 1742724000)).not.toThrow();
    });

    it("should throw if status is verified but verifiedAt is missing", () => {
      expect(() => assertDoctorVerificationFields("verified", null))
        .toThrow("verifiedAt is required when doctor is verified");
    });

    it("should throw if verifiedAt is provided but status is not verified", () => {
      expect(() => assertDoctorVerificationFields("pending", 1742724000))
        .toThrow("verifiedAt must not be set unless doctor is verified");
    });
  });

  describe("assertDoctorProfileEditable", () => {
    const mockDoctor = (status: any): DoctorState => ({
      id: "doc_1",
      userId: "user_1",
      verificationStatus: status
    });

    it("should allow editing a pending profile", () => {
      expect(() => assertDoctorProfileEditable(mockDoctor("pending"))).not.toThrow();
    });

    it("should throw for verified profiles", () => {
      expect(() => assertDoctorProfileEditable(mockDoctor("verified")))
        .toThrow("Verified doctor profiles cannot be modified");
    });

    it("should throw for rejected profiles", () => {
      expect(() => assertDoctorProfileEditable(mockDoctor("rejected")))
        .toThrow("Rejected doctor profiles cannot be modified");
    });
  });

  describe("assertDoctorBelongsToUser", () => {
    it("should pass if the IDs match", () => {
      expect(() => assertDoctorBelongsToUser("user_123", "user_123")).not.toThrow();
    });

    it("should throw if the IDs do not match", () => {
      expect(() => assertDoctorBelongsToUser("user_123", "user_999"))
        .toThrow("Doctor profile can only be modified by owning user");
    });
  });

  describe("assertDoctorIsVerified", () => {
    it("should pass if status is verified", () => {
      const doctor: DoctorState = { id: "d1", userId: "u1", verificationStatus: "verified" };
      expect(() => assertDoctorIsVerified(doctor)).not.toThrow();
    });

    it("should throw if status is pending or rejected", () => {
      const doctor: DoctorState = { id: "d1", userId: "u1", verificationStatus: "pending" };
      expect(() => assertDoctorIsVerified(doctor))
        .toThrow("Operation allowed only for verified doctors");
    });
  });

  describe("assertDoctorProfileComplete", () => {
    const completeInput = {
      specialty: "Cardiology",
      rmpRegistrationNumber: "RMP-12345",
      rmpStateMedicalCouncil: "Maharashtra Medical Council"
    };

    it("should pass with all required professional fields", () => {
      expect(() => assertDoctorProfileComplete(completeInput)).not.toThrow();
    });

    it("should throw if specialty is missing", () => {
      expect(() => assertDoctorProfileComplete({ ...completeInput, specialty: "" }))
        .toThrow("Doctor specialty is required");
    });

    it("should throw if registration number is missing", () => {
      expect(() => assertDoctorProfileComplete({ ...completeInput, rmpRegistrationNumber: undefined }))
        .toThrow("RMP registration number is required");
    });

    it("should throw if state council is missing", () => {
      expect(() => assertDoctorProfileComplete({ ...completeInput, rmpStateMedicalCouncil: "" }))
        .toThrow("State medical council is required");
    });
  });
});