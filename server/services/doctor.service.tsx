// server/services/doctor.service.tsx
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

import {
  assertAuditActorPresent,
  assertAuditTargetValid,
  assertAuditMetadataSerializable,
  type AuditLogInput,
} from "@/server/domain/audit.domain";

import {
  assertDoctorBelongsToUser,
  assertValidDoctorVerificationTransition,
  assertDoctorVerificationFields,
} from "@/server/domain/doctor.domain";

import { ForbiddenError, ValidationError } from "@/server/utils/errors";

import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";

import type { DoctorVerificationStatus } from "@/db/schema";

/* ======================================================
   Helpers
====================================================== */

async function persistAudit(log: AuditLogInput) {
  assertAuditActorPresent(log);
  assertAuditTargetValid(log);
  assertAuditMetadataSerializable(log.metadata);
  await auditRepo.create(log);
}

/* ======================================================
   Doctor Profile Service
====================================================== */

export const doctorService = {
  /* --------------------------------------------------
     Create doctor profile (doctor user only)
  --------------------------------------------------- */
  async createDoctorProfile(
    actorUserId: string,
    input: {
      publicId: string;
      specialty: string;
      experienceYears?: number;
      bio?: string;
      consultationFee?: number;
      profileImageUrl?: string;
      rmpRegistrationNumber: string;
      rmpStateMedicalCouncil: string;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can create profiles");
    }

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("Inactive users cannot create profiles");
    }

    const existing = await doctorRepo
      .getDoctorByUserId(actorUserId)
      .catch(() => null);

    if (existing) {
      throw new ValidationError("Doctor profile already exists");
    }

    const doctor = await doctorRepo.createDoctor({
      userId: actorUserId,
      publicId: input.publicId,
      specialty: input.specialty,
      experienceYears: input.experienceYears,
      bio: input.bio,
      consultationFee: input.consultationFee,
      profileImageUrl: input.profileImageUrl,
      rmpRegistrationNumber: input.rmpRegistrationNumber,
      rmpStateMedicalCouncil: input.rmpStateMedicalCouncil,
      verificationStatus: "pending",
    });

    await persistAudit({
      actorUserId,
      action: "DOCTOR_PROFILE_CREATED",
      targetType: "doctor",
      targetId: doctor.id,
      metadata: { specialty: doctor.specialty },
    });

    return doctor;
  },

  /* --------------------------------------------------
     Update doctor profile (owner only)
  --------------------------------------------------- */
  async updateDoctorProfile(
    actorUserId: string,
    doctorId: string,
    input: {
      specialty?: string;
      experienceYears?: number;
      bio?: string;
      consultationFee?: number;
      profileImageUrl?: string | null;
    }
  ) {
    const doctor = await doctorRepo.getDoctorById(doctorId);

    assertDoctorBelongsToUser(doctor.userId, actorUserId);

    const updated = await doctorRepo.updateDoctorProfile(doctorId, input);

    await persistAudit({
      actorUserId,
      action: "DOCTOR_PROFILE_UPDATED",
      targetType: "doctor",
      targetId: doctorId,
      metadata: { updatedFields: Object.keys(input) },
    });

    return updated;
  },

  /* --------------------------------------------------
     Get doctor by ID
  --------------------------------------------------- */
  async getDoctorById(doctorId: string) {
    return doctorRepo.getDoctorById(doctorId);
  },

  /* --------------------------------------------------
     Get doctor by public ID
  --------------------------------------------------- */
  async getDoctorByPublicId(publicId: string) {
    return doctorRepo.getDoctorByPublicId(publicId);
  },

  /* --------------------------------------------------
     List doctors (Admin)
  --------------------------------------------------- */
  async listDoctors(params?: {
    limit?: number;
    offset?: number;
    search?: string;
    specialty?: string;
    verificationStatus?: DoctorVerificationStatus;
    isUserActive?: boolean;
  }) {
    return doctorRepo.listDoctors(params);
  },

  /* --------------------------------------------------
     Doctor stats for admin dashboard cards
  --------------------------------------------------- */
  async getDoctorStats() {
    return doctorRepo.getDoctorStats();
  },

  /* --------------------------------------------------
     Toggle doctor active status (admin only)
     NOTE: This sets isActive on the doctor profile only.
     It does NOT touch the users table status.
     User-level soft-delete is a separate compliance
     feature governed by DPDP / data erasure requests.
  --------------------------------------------------- */
  async updateDoctorActiveStatus(
    actorUserId: string,
    doctorId: string,
    isActive: boolean
  ) {
    const actor = await userRepo.getUserById(actorUserId);

    if (actor.role !== UserRole.admin) {
      throw new ForbiddenError(
        "Only admins can change doctor active status"
      );
    }

    const result = await doctorRepo.updateActiveStatus(doctorId, isActive);

    await persistAudit({
      actorUserId,
      action: isActive ? "DOCTOR_ACTIVATED" : "DOCTOR_DEACTIVATED",
      targetType: "doctor",
      targetId: doctorId,
      metadata: { isActive },
    });

    return result;
  },

  /* --------------------------------------------------
     Public Doctors Listing (Marketplace)
  --------------------------------------------------- */
  async getPublicDoctors(params?: {
    page?: number | string;
    limit?: number | string;
    search?: string;
    minFee?: number | string;
    maxFee?: number | string;
  }) {
    const page =
      typeof params?.page === "string"
        ? parseInt(params.page, 10)
        : params?.page;
    const limit =
      typeof params?.limit === "string"
        ? parseInt(params.limit, 10)
        : params?.limit;
    const minFee =
      typeof params?.minFee === "string"
        ? parseInt(params.minFee, 10)
        : params?.minFee;
    const maxFee =
      typeof params?.maxFee === "string"
        ? parseInt(params.maxFee, 10)
        : params?.maxFee;

    const safePage = page && page > 0 ? page : 1;
    const safeLimit = limit && limit > 0 && limit <= 50 ? limit : 9;
    const safeMinFee =
      typeof minFee === "number" && minFee >= 0 ? minFee : undefined;
    const safeMaxFee =
      typeof maxFee === "number" && maxFee >= 0 ? maxFee : undefined;

    return doctorRepo.getPublicDoctors({
      page: safePage,
      limit: safeLimit,
      search: params?.search?.trim() || undefined,
      minFee: safeMinFee,
      maxFee: safeMaxFee,
    });
  },

  /* --------------------------------------------------
     Public Doctor Detail (Marketplace Page)
  --------------------------------------------------- */
  async getDoctorDetailByPublicId(publicId: string) {
    if (!publicId || publicId.trim().length === 0) {
      throw new ValidationError("Invalid doctor public ID");
    }

    return doctorRepo.getDoctorDetailByPublicId(publicId.trim());
  },

  /* --------------------------------------------------
     Verify / Reject doctor (admin only)
  --------------------------------------------------- */
  async setDoctorVerificationStatus(
    actorUserId: string,
    doctorId: string,
    nextStatus: DoctorVerificationStatus
  ) {
    const actor = await userRepo.getUserById(actorUserId);

    if (actor.role !== UserRole.admin) {
      throw new ForbiddenError("Only admins can verify doctors");
    }

    const doctor = await doctorRepo.getDoctorById(doctorId);

    assertValidDoctorVerificationTransition(
      doctor.verificationStatus,
      nextStatus
    );

    const verifiedAt = nextStatus === "verified" ? Date.now() : null;
    assertDoctorVerificationFields(nextStatus, verifiedAt);

    await doctorRepo.updateVerificationStatus(doctorId, nextStatus);

    const action =
      nextStatus === "verified" ? "DOCTOR_VERIFIED" : "DOCTOR_REJECTED";

    await persistAudit({
      actorUserId,
      action,
      targetType: "doctor",
      targetId: doctorId,
    });

    return { success: true };
  },

  /* --------------------------------------------------
     Get Doctor Reviews (Public)
  --------------------------------------------------- */
  async getDoctorReviews(doctorId: string, limit?: number) {
    if (!doctorId) {
      throw new ValidationError("Invalid doctor ID");
    }

    const safeLimit = limit && limit > 0 && limit <= 20 ? limit : 5;
    return doctorRepo.getReviewsByDoctorId(doctorId, safeLimit);
  },

  /* --------------------------------------------------
     Submit Doctor Review
  --------------------------------------------------- */
  async submitDoctorReview(input: {
    doctorId: string;
    patientName: string;
    rating: number;
    comment: string;
  }) {
    if (!input.doctorId) throw new ValidationError("Doctor ID required");
    if (!input.patientName || input.patientName.trim().length < 2)
      throw new ValidationError("Invalid patient name");
    if (input.rating < 1 || input.rating > 5)
      throw new ValidationError("Rating must be between 1 and 5");
    if (!input.comment || input.comment.trim().length < 5)
      throw new ValidationError("Comment too short");

    return doctorRepo.createDoctorReview({
      doctorId: input.doctorId,
      patientName: input.patientName.trim(),
      rating: input.rating,
      comment: input.comment.trim(),
      isVerified: false,
    });
  },

  /* --------------------------------------------------
     Verification listing (admin only)
  --------------------------------------------------- */
  async listDoctorsForVerification(params?: {
    limit?: number;
    offset?: number;
    search?: string;
    verificationStatus?: DoctorVerificationStatus;
  }) {
    return doctorRepo.listDoctorsForVerification(params);
  },

  /* --------------------------------------------------
     Verification stats (admin only)
  --------------------------------------------------- */
  async getVerificationStats() {
    return doctorRepo.getVerificationStats();
  },
};