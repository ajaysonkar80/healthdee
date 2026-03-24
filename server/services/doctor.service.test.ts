import { describe, it, expect, vi, beforeEach } from "vitest";
import { doctorService } from "@/server/services/doctor.service";
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";

// Mock Repositories
vi.mock("@/server/repositories/doctor.repo");
vi.mock("@/server/repositories/user.repo");
vi.mock("@/server/repositories/audit.repo");

// Mock Domain Assertions
vi.mock("@/server/domain/doctor.domain", () => ({
  assertDoctorBelongsToUser: vi.fn(),
  assertValidDoctorVerificationTransition: vi.fn(),
  assertDoctorVerificationFields: vi.fn(),
}));

vi.mock("@/server/domain/audit.domain", () => ({
  assertAuditActorPresent: vi.fn(),
  assertAuditTargetValid: vi.fn(),
  assertAuditMetadataSerializable: vi.fn(),
}));

describe("doctorService", () => {
  const DOCTOR_USER_ID = "user-doc-123";
  const ADMIN_USER_ID = "user-admin-999";
  const DOCTOR_ID = "doc-uuid-456";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createDoctorProfile", () => {
    const profileInput = {
      publicId: "dr-smith",
      specialty: "Cardiology",
      rmpRegistrationNumber: "RMP12345",
      rmpStateMedicalCouncil: "Delhi",
    };

    it("should create a profile for an active doctor user", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ 
        role: UserRole.doctor, status: UserStatus.active 
      } as any);
      vi.mocked(doctorRepo.getDoctorByUserId).mockRejectedValue(new Error("Not found"));
      vi.mocked(doctorRepo.createDoctor).mockResolvedValue({ id: DOCTOR_ID, ...profileInput } as any);

      const result = await doctorService.createDoctorProfile(DOCTOR_USER_ID, profileInput);

      expect(result.id).toBe(DOCTOR_ID);
      expect(doctorRepo.createDoctor).toHaveBeenCalled();
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({ action: "DOCTOR_PROFILE_CREATED" }));
    });

    it("should fail if the user is not a doctor role", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.patient } as any);
      
      await expect(doctorService.createDoctorProfile(DOCTOR_USER_ID, profileInput))
        .rejects.toThrow(ForbiddenError);
    });
  });

  describe("getPublicDoctors", () => {
    it("should sanitize and parse string-based query parameters", async () => {
      vi.mocked(doctorRepo.getPublicDoctors).mockResolvedValue({ data: [], total: 0 } as any);

      await doctorService.getPublicDoctors({
        page: "2",
        limit: "10",
        minFee: "500"
      });

      expect(doctorRepo.getPublicDoctors).toHaveBeenCalledWith(expect.objectContaining({
        page: 2,
        limit: 10,
        minFee: 500
      }));
    });

    it("should enforce a maximum limit for pagination", async () => {
      await doctorService.getPublicDoctors({ limit: "100" });
      expect(doctorRepo.getPublicDoctors).toHaveBeenCalledWith(expect.objectContaining({
        limit: 9 // Default fallback logic in service is limit <= 50 ? limit : 9
      }));
    });
  });

  describe("setDoctorVerificationStatus (Admin)", () => {
    it("should allow an admin to verify a doctor and log the audit", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.admin } as any);
      vi.mocked(doctorRepo.getDoctorById).mockResolvedValue({ id: DOCTOR_ID, verificationStatus: "pending" } as any);

      await doctorService.setDoctorVerificationStatus(ADMIN_USER_ID, DOCTOR_ID, "verified");

      expect(doctorRepo.updateVerificationStatus).toHaveBeenCalledWith(DOCTOR_ID, "verified");
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({ action: "DOCTOR_VERIFIED" }));
    });

    it("should block non-admins from verifying doctors", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.doctor } as any);
      
      await expect(doctorService.setDoctorVerificationStatus(DOCTOR_USER_ID, DOCTOR_ID, "verified"))
        .rejects.toThrow(ForbiddenError);
    });
  });

  describe("submitDoctorReview", () => {
    it("should validate rating range before calling repo", async () => {
      await expect(doctorService.submitDoctorReview({
        doctorId: DOCTOR_ID,
        patientName: "John",
        rating: 6, // Invalid
        comment: "Great doctor!"
      })).rejects.toThrow(ValidationError);
    });

    it("should successfully save a valid review as unverified", async () => {
      await doctorService.submitDoctorReview({
        doctorId: DOCTOR_ID,
        patientName: "John Doe",
        rating: 5,
        comment: "Excellent service and care."
      });

      expect(doctorRepo.createDoctorReview).toHaveBeenCalledWith(expect.objectContaining({
        isVerified: false,
        rating: 5
      }));
    });
  });

  describe("Settings & Personal Details", () => {
    it("should allow doctors to update their own active status", async () => {
      vi.mocked(userRepo.getUserById).mockResolvedValue({ role: UserRole.doctor } as any);
      vi.mocked(doctorRepo.getDoctorByUserId).mockResolvedValue({ id: DOCTOR_ID } as any);

      await doctorService.setSelfActiveStatus(DOCTOR_USER_ID, false);

      expect(doctorRepo.updateActiveStatus).toHaveBeenCalledWith(DOCTOR_ID, false);
      expect(auditRepo.create).toHaveBeenCalledWith(expect.objectContaining({ 
        action: "DOCTOR_DEACTIVATED",
        metadata: expect.objectContaining({ selfToggled: true })
      }));
    });
  });
});