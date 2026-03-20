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

async function persistAudit(log: AuditLogInput) {
  assertAuditActorPresent(log);
  assertAuditTargetValid(log);
  assertAuditMetadataSerializable(log.metadata);
  await auditRepo.create(log);
}

export const doctorService = {

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
    if (user.role !== UserRole.doctor) throw new ForbiddenError("Only doctors can create profiles");
    if (user.status !== UserStatus.active) throw new ForbiddenError("Inactive users cannot create profiles");

    const existing = await doctorRepo.getDoctorByUserId(actorUserId).catch(() => null);
    if (existing) throw new ValidationError("Doctor profile already exists");

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

  async getDoctorById(doctorId: string) {
    return doctorRepo.getDoctorById(doctorId);
  },

  async getDoctorByPublicId(publicId: string) {
    return doctorRepo.getDoctorByPublicId(publicId);
  },

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

  async getDoctorStats() {
    return doctorRepo.getDoctorStats();
  },

  async updateDoctorActiveStatus(
    actorUserId: string,
    doctorId: string,
    isActive: boolean
  ) {
    const actor = await userRepo.getUserById(actorUserId);
    if (actor.role !== UserRole.admin) throw new ForbiddenError("Only admins can change doctor active status");

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

  async getPublicDoctors(params?: {
    page?: number | string;
    limit?: number | string;
    search?: string;
    minFee?: number | string;
    maxFee?: number | string;
  }) {
    const page   = typeof params?.page   === "string" ? parseInt(params.page,   10) : params?.page;
    const limit  = typeof params?.limit  === "string" ? parseInt(params.limit,  10) : params?.limit;
    const minFee = typeof params?.minFee === "string" ? parseInt(params.minFee, 10) : params?.minFee;
    const maxFee = typeof params?.maxFee === "string" ? parseInt(params.maxFee, 10) : params?.maxFee;

    return doctorRepo.getPublicDoctors({
      page:   page  && page  > 0             ? page  : 1,
      limit:  limit && limit > 0 && limit <= 50 ? limit : 9,
      search: params?.search?.trim() || undefined,
      minFee: typeof minFee === "number" && minFee >= 0 ? minFee : undefined,
      maxFee: typeof maxFee === "number" && maxFee >= 0 ? maxFee : undefined,
    });
  },

  async getDoctorDetailByPublicId(publicId: string) {
    if (!publicId || publicId.trim().length === 0) throw new ValidationError("Invalid doctor public ID");
    return doctorRepo.getDoctorDetailByPublicId(publicId.trim());
  },

  async setDoctorVerificationStatus(
    actorUserId: string,
    doctorId: string,
    nextStatus: DoctorVerificationStatus
  ) {
    const actor = await userRepo.getUserById(actorUserId);
    if (actor.role !== UserRole.admin) throw new ForbiddenError("Only admins can verify doctors");

    const doctor = await doctorRepo.getDoctorById(doctorId);
    assertValidDoctorVerificationTransition(doctor.verificationStatus, nextStatus);

    const verifiedAt = nextStatus === "verified" ? Date.now() : null;
    assertDoctorVerificationFields(nextStatus, verifiedAt);
    await doctorRepo.updateVerificationStatus(doctorId, nextStatus);

    await persistAudit({
      actorUserId,
      action: nextStatus === "verified" ? "DOCTOR_VERIFIED" : "DOCTOR_REJECTED",
      targetType: "doctor",
      targetId: doctorId,
    });

    return { success: true };
  },

  async getDoctorReviews(doctorId: string, limit?: number) {
    if (!doctorId) throw new ValidationError("Invalid doctor ID");
    return doctorRepo.getReviewsByDoctorId(doctorId, limit && limit > 0 && limit <= 20 ? limit : 5);
  },

  async submitDoctorReview(input: {
    doctorId: string;
    patientName: string;
    rating: number;
    comment: string;
  }) {
    if (!input.doctorId)                                     throw new ValidationError("Doctor ID required");
    if (!input.patientName || input.patientName.trim().length < 2) throw new ValidationError("Invalid patient name");
    if (input.rating < 1 || input.rating > 5)                throw new ValidationError("Rating must be between 1 and 5");
    if (!input.comment || input.comment.trim().length < 5)   throw new ValidationError("Comment too short");

    return doctorRepo.createDoctorReview({
      doctorId:    input.doctorId,
      patientName: input.patientName.trim(),
      rating:      input.rating,
      comment:     input.comment.trim(),
      isVerified:  false,
    });
  },

  async listDoctorsForVerification(params?: {
    limit?: number;
    offset?: number;
    search?: string;
    verificationStatus?: DoctorVerificationStatus;
  }) {
    return doctorRepo.listDoctorsForVerification(params);
  },

  async getVerificationStats() {
    return doctorRepo.getVerificationStats();
  },

  /* ====================================================
     SETTINGS — new methods
  ==================================================== */

  async getDoctorSettingsProfile(actorUserId: string) {
    const user = await userRepo.getUserById(actorUserId);
    if (user.role !== UserRole.doctor) throw new ForbiddenError("Only doctors can access this");
    return doctorRepo.getDoctorProfileForSettings(actorUserId);
  },

  async updateDoctorPersonalDetails(
    actorUserId: string,
    input: { name: string }
  ) {
    const user = await userRepo.getUserById(actorUserId);
    if (user.role !== UserRole.doctor) throw new ForbiddenError("Only doctors can update their profile");
    if (!input.name || input.name.trim().length < 2) throw new ValidationError("Name must be at least 2 characters");

    await doctorRepo.updateUserName(actorUserId, input.name.trim());
    await persistAudit({
      actorUserId,
      action: "DOCTOR_PROFILE_UPDATED",
      targetType: "user",
      targetId: actorUserId,
      metadata: { updatedFields: ["name"] },
    });
    return { success: true };
  },

  async updateDoctorProfessionalDetails(
    actorUserId: string,
    input: {
      fullName?:               string;
      specialty?:              string;
      degrees?:                string;
      languages?:              string;
      tagline?:                string;
      experienceYears?:        number;
      bio?:                    string;
      consultationFee?:        number;
      rmpRegistrationNumber?:  string;
      rmpStateMedicalCouncil?: string;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);
    if (user.role !== UserRole.doctor) throw new ForbiddenError("Only doctors can update their profile");

    const doctor = await doctorRepo.getDoctorByUserId(actorUserId);
    const updated = await doctorRepo.updateDoctorExtendedProfile(doctor.id, input);

    await persistAudit({
      actorUserId,
      action: "DOCTOR_PROFILE_UPDATED",
      targetType: "doctor",
      targetId: doctor.id,
      metadata: { updatedFields: Object.keys(input) },
    });
    return updated;
  },

  async setSelfActiveStatus(actorUserId: string, isActive: boolean) {
    const user = await userRepo.getUserById(actorUserId);
    if (user.role !== UserRole.doctor) throw new ForbiddenError("Only doctors can change their own status");

    const doctor = await doctorRepo.getDoctorByUserId(actorUserId);
    const result = await doctorRepo.updateActiveStatus(doctor.id, isActive);

    await persistAudit({
      actorUserId,
      action: isActive ? "DOCTOR_ACTIVATED" : "DOCTOR_DEACTIVATED",
      targetType: "doctor",
      targetId: doctor.id,
      metadata: { isActive, selfToggled: true },
    });
    return result;
  },

  async getDoctorPreferences(actorUserId: string) {
    const user = await userRepo.getUserById(actorUserId);
    if (user.role !== UserRole.doctor) throw new ForbiddenError("Only doctors can access preferences");

    const prefs = await doctorRepo.getDoctorPreferences(actorUserId);
    return prefs ?? {
      whatsappAlerts:       true,
      smsNotifications:     false,
      emailNotifications:   true,
      appointmentReminders: true,
    };
  },

  async updateDoctorPreferences(
    actorUserId: string,
    input: {
      whatsappAlerts?:       boolean;
      smsNotifications?:     boolean;
      emailNotifications?:   boolean;
      appointmentReminders?: boolean;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);
    if (user.role !== UserRole.doctor) throw new ForbiddenError("Only doctors can update preferences");
    return doctorRepo.upsertDoctorPreferences(actorUserId, input);
  },
};