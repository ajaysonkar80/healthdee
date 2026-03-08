import { patientRepo } from "@/server/repositories/patient.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

import {
  assertAuditActorPresent,
  assertAuditTargetValid,
  assertAuditMetadataSerializable,
  type AuditLogInput,
} from "@/server/domain/audit.domain";

import {
  ForbiddenError,
  ValidationError,
} from "@/server/utils/errors";

import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";

/* ======================================================
   Derived Types
====================================================== */

type UserStatusValue =
  typeof UserStatus[keyof typeof UserStatus];

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
   Patient Service
====================================================== */

export const patientService = {
  /* --------------------------------------------------
     Get patient profile (self or admin)
  --------------------------------------------------- */
  async getPatientByUserId(
    actorUserId: string,
    targetUserId: string
  ) {
    const actor = await userRepo.getUserById(actorUserId);

    if (
      actor.role !== UserRole.admin &&
      actorUserId !== targetUserId
    ) {
      throw new ForbiddenError("Access denied");
    }

    return patientRepo.getPatientByUserId(targetUserId);
  },

  /* --------------------------------------------------
     List patients (admin only)
  --------------------------------------------------- */
  async listPatients(
    actorUserId: string,
    params?: {
      limit?: number;
      offset?: number;
      search?: string;
      status?: UserStatusValue;
    }
  ) {
    const actor = await userRepo.getUserById(actorUserId);

    if (actor.role !== UserRole.admin) {
      throw new ForbiddenError("Only admins can list patients");
    }

    return patientRepo.listPatients(params);
  },

  /* --------------------------------------------------
   Get full patient profile (self or admin)
--------------------------------------------------- */
async getFullPatientProfile(
  actorUserId: string,
  targetUserId: string
) {
  const actor = await userRepo.getUserById(actorUserId);

  if (
    actor.role !== UserRole.admin &&
    actorUserId !== targetUserId
  ) {
    throw new ForbiddenError("Access denied");
  }

  const result = await patientRepo.getFullPatientProfile(
    targetUserId
  );

  return result;
},

/* --------------------------------------------------
   Get patient profile (self or admin)
--------------------------------------------------- */
async getPatientProfile(
  actorUserId: string,
  targetUserId: string
) {
  const actor = await userRepo.getUserById(actorUserId);

  if (
    actor.role !== UserRole.admin &&
    actorUserId !== targetUserId
  ) {
    throw new ForbiddenError("Access denied");
  }

  return patientRepo.getPatientProfile(targetUserId);
},

/* --------------------------------------------------
   Update patient profile (self only)
--------------------------------------------------- */
async updatePatientProfile(
  actorUserId: string,
  targetUserId: string,
  input: {
    fullName?: string;
    gender?: string;
    bloodGroup?: string;
    dateOfBirth?: Date;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    heightCm?: number;
    weightKg?: number;
    allergies?: string;
    chronicConditions?: string;
    profileImageUrl?: string;
  }
) {
  if (actorUserId !== targetUserId) {
    throw new ForbiddenError("Access denied");
  }

  const user = await userRepo.getUserById(actorUserId);

  if (user.role !== UserRole.patient) {
    throw new ForbiddenError("Only patients can update profile");
  }

  if (user.status !== UserStatus.active) {
    throw new ForbiddenError("Inactive user cannot update profile");
  }

  if (Object.keys(input).length === 0) {
    throw new ValidationError("No fields provided for update");
  }

  const updated = await patientRepo.updatePatientProfile(
    actorUserId,
    input
  );

  await persistAudit({
    actorUserId,
    action: "PATIENT_PROFILE_UPDATED",
    targetType: "patient",
    targetId: actorUserId,
    metadata: {
      fields: Object.keys(input),
    },
  });

  return updated;
},

/* --------------------------------------------------
   Get emergency contacts (self or admin)
--------------------------------------------------- */
async getEmergencyContacts(
  actorUserId: string,
  targetUserId: string
) {
  const actor = await userRepo.getUserById(actorUserId);

  if (
    actor.role !== UserRole.admin &&
    actorUserId !== targetUserId
  ) {
    throw new ForbiddenError("Access denied");
  }

  return patientRepo.getEmergencyContacts(targetUserId);
},

/* --------------------------------------------------
   Create emergency contact (self only)
--------------------------------------------------- */
async createEmergencyContact(
  actorUserId: string,
  input: {
    name: string;
    relationship?: string;
    phone: string;
    email?: string;
    isPrimary?: boolean;
    notes?: string;
  }
) {
  const user = await userRepo.getUserById(actorUserId);

  if (user.role !== UserRole.patient) {
    throw new ForbiddenError(
      "Only patients can add emergency contacts"
    );
  }

  const contact = await patientRepo.createEmergencyContact({
    userId: actorUserId,
    ...input,
  });

  await persistAudit({
    actorUserId,
    action: "EMERGENCY_CONTACT_CREATED",
    targetType: "patient",
    targetId: actorUserId,
    metadata: {
      contactId: contact.id,
    },
  });

  return contact;
},

/* --------------------------------------------------
   Delete emergency contact (self only)
--------------------------------------------------- */
async deleteEmergencyContact(
  actorUserId: string,
  contactId: string
) {
  const user = await userRepo.getUserById(actorUserId);

  if (user.role !== UserRole.patient) {
    throw new ForbiddenError(
      "Only patients can delete emergency contacts"
    );
  }

  const deleted = await patientRepo.deleteEmergencyContact(
    contactId
  );

  await persistAudit({
    actorUserId,
    action: "EMERGENCY_CONTACT_DELETED",
    targetType: "patient",
    targetId: actorUserId,
    metadata: {
      contactId,
    },
  });

  return deleted;
},

/* --------------------------------------------------
   Get user preferences (self only)
--------------------------------------------------- */
async getUserPreferences(actorUserId: string) {
  const prefs = await patientRepo.getUserPreferences(
    actorUserId
  );

  return prefs;
},

/* --------------------------------------------------
   Update user preferences (self only)
--------------------------------------------------- */
async updateUserPreferences(
  actorUserId: string,
  input: {
    whatsappAlerts?: boolean;
    smsNotifications?: boolean;
    emailNotifications?: boolean;
    appointmentReminders?: boolean;
    shareMedicalRecordsWithDoctors?: boolean;
    allowResearchUse?: boolean;
    allowDataDownload?: boolean;
  }
) {
  if (Object.keys(input).length === 0) {
    throw new ValidationError("No fields provided");
  }

  const updated = await patientRepo.updateUserPreferences(
    actorUserId,
    input
  );

  
},

/* --------------------------------------------------
   Initialize patient profile
--------------------------------------------------- */
async initializePatientProfile(userId: string) {
  await patientRepo.createPatientProfile(userId);
  await patientRepo.createUserPreferences(userId);
},

  /* --------------------------------------------------
     Create ABHA profile (self only)
  --------------------------------------------------- */
  async createAbhaProfile(
    actorUserId: string,
    input: {
      abhaNumber: string;
      abhaAddress?: string;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.patient) {
      throw new ForbiddenError("Only patients can create ABHA profile");
    }

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("Inactive user cannot create ABHA profile");
    }

    const existing = await patientRepo
      .getAbhaProfileByUserId(actorUserId)
      .catch(() => null);

    if (existing) {
      throw new ValidationError("ABHA profile already exists");
    }

    await patientRepo.createAbhaProfile({
      userId: actorUserId,
      abhaNumber: input.abhaNumber,
      abhaAddress: input.abhaAddress,
      // ✅ verifiedAt omitted (undefined)
    });

    await persistAudit({
      actorUserId,
      action: "CONSENT_GRANTED",
      targetType: "patient",
      targetId: actorUserId,
      metadata: {
        abhaNumber: input.abhaNumber,
      },
    });

    return { success: true };
  },

  /* --------------------------------------------------
     Get ABHA profile (self or admin)
  --------------------------------------------------- */
  async getAbhaProfile(
    actorUserId: string,
    targetUserId: string
  ) {
    const actor = await userRepo.getUserById(actorUserId);

    if (
      actor.role !== UserRole.admin &&
      actorUserId !== targetUserId
    ) {
      throw new ForbiddenError("Access denied");
    }

    return patientRepo.getAbhaProfileByUserId(targetUserId);
  },

    /* --------------------------------------------------
     Update ABHA profile (self only)
  --------------------------------------------------- */
  async updateAbhaProfile(
    actorUserId: string,
    targetUserId: string,
    input: {
      abhaAddress?: string;
    }
  ) {
    // Self only
    if (actorUserId !== targetUserId) {
      throw new ForbiddenError("Access denied");
    }

    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.patient) {
      throw new ForbiddenError("Only patients can update ABHA profile");
    }

    if (user.status !== UserStatus.active) {
      throw new ForbiddenError("Inactive user cannot update ABHA profile");
    }

    const existing = await patientRepo
      .getAbhaProfileByUserId(actorUserId)
      .catch(() => null);

    if (!existing) {
      throw new ValidationError("ABHA profile does not exist");
    }

    const updated = await patientRepo.updateAbhaProfileByUserId({
      userId: actorUserId,
      abhaAddress: input.abhaAddress,
    });

    await persistAudit({
      actorUserId,
      action: "ABHA_PROFILE_UPDATED",
      targetType: "patient",
      targetId: actorUserId,
      metadata: {
        fields: Object.keys(input),
      },
    });

    return updated;
  },

};
