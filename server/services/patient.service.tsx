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
};
