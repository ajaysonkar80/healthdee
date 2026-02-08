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

import {
  ForbiddenError,
  ValidationError,
} from "@/server/utils/errors";

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
   Doctor Service
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
      profileImageUrl?: string;
      rmpRegistrationNumber: string;
      rmpStateMedicalCouncil: string;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can create doctor profiles");
    }

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("Inactive users cannot create doctor profiles");
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
      profileImageUrl: input.profileImageUrl,
      rmpRegistrationNumber: input.rmpRegistrationNumber,
      rmpStateMedicalCouncil: input.rmpStateMedicalCouncil,
      verificationStatus: "pending",
    });

    await persistAudit({
      actorUserId,
      action: "USER_CREATED",
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
      profileImageUrl?: string;
    }
  ) {
    const doctor = await doctorRepo.getDoctorById(doctorId);

    assertDoctorBelongsToUser(doctor.userId, actorUserId);

    return doctorRepo.updateDoctorProfile(doctorId, input);
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
     List doctors
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

    const verifiedAt =
      nextStatus === "verified" ? Date.now() : null;

    assertDoctorVerificationFields(nextStatus, verifiedAt);

    await doctorRepo.updateVerificationStatus(
      doctorId,
      nextStatus
    );

    await persistAudit({
      actorUserId,
      action:
        nextStatus === "verified"
          ? "DOCTOR_VERIFIED"
          : "DOCTOR_REJECTED",
      targetType: "doctor",
      targetId: doctorId,
    });

    return { success: true };
  },
};
