import { userRepo } from "@/server/repositories/user.repo";
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

import {
  assertAuditActorPresent,
  assertAuditTargetValid,
  assertAuditMetadataSerializable,
  type AuditLogInput,
} from "@/server/domain/audit.domain";

import {
  assertValidUserStatusTransition,
} from "@/server/domain/user.domain";

import {
  ForbiddenError,
} from "@/server/utils/errors";

import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";

import type { DoctorVerificationStatus } from "@/db/schema";

/* ======================================================
   Derived Types
====================================================== */

type UserStatusValue =
  typeof UserStatus[keyof typeof UserStatus];

type UserRoleValue =
  typeof UserRole[keyof typeof UserRole];

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
   Admin Service
====================================================== */

export const adminService = {
  /* --------------------------------------------------
     Assert admin access (internal helper)
  --------------------------------------------------- */
  async assertAdmin(actorUserId: string) {
    const actor = await userRepo.getUserById(actorUserId);

    if (actor.role !== UserRole.admin) {
      throw new ForbiddenError("Admin access required");
    }

    return actor;
  },

  /* --------------------------------------------------
     Change user status (activate / deactivate / delete)
  --------------------------------------------------- */
  async changeUserStatus(
    actorUserId: string,
    targetUserId: string,
    nextStatus: UserStatusValue
  ) {
    await this.assertAdmin(actorUserId);

    const user = await userRepo.getUserById(targetUserId);

    assertValidUserStatusTransition(user.status, nextStatus);

    if (nextStatus === "deactivated") {
      await userRepo.deactivateUser(targetUserId);
    }

    // deleted users are soft-deleted via status
    if (nextStatus === "deleted") {
      await userRepo.deactivateUser(targetUserId);
    }

    if (nextStatus === "active" && user.status === "deactivated") {
      // no explicit repo method → reuse deactivateUser semantics
      await userRepo.deactivateUser(targetUserId);
    }

    await persistAudit({
      actorUserId,
      action: "USER_STATUS_CHANGED",
      targetType: "user",
      targetId: targetUserId,
      metadata: {
        from: user.status,
        to: nextStatus,
      },
    });

    return { success: true };
  },

  /* --------------------------------------------------
     Verify / Reject doctor
  --------------------------------------------------- */
  async setDoctorVerificationStatus(
    actorUserId: string,
    doctorId: string,
    status: DoctorVerificationStatus
  ) {
    await this.assertAdmin(actorUserId);

    const doctor = await doctorRepo.getDoctorById(doctorId);

    await doctorRepo.updateVerificationStatus(
      doctorId,
      status
    );

    await persistAudit({
      actorUserId,
      action:
        status === "verified"
          ? "DOCTOR_VERIFIED"
          : "DOCTOR_REJECTED",
      targetType: "doctor",
      targetId: doctorId,
      metadata: {
        previous: doctor.verificationStatus,
        next: status,
      },
    });

    return { success: true };
  },

  /* --------------------------------------------------
     List users (admin)
  --------------------------------------------------- */
  async listUsers(
    actorUserId: string,
    params?: {
      limit?: number;
      offset?: number;
      search?: string;
      role?: UserRoleValue;
      status?: UserStatusValue;
    }
  ) {
    await this.assertAdmin(actorUserId);

    return userRepo.listUsers(params);
  },

  /* --------------------------------------------------
     List doctors (admin)
  --------------------------------------------------- */
  async listDoctors(
    actorUserId: string,
    params?: {
      limit?: number;
      offset?: number;
      search?: string;
      specialty?: string;
      verificationStatus?: DoctorVerificationStatus;
      isUserActive?: boolean;
    }
  ) {
    await this.assertAdmin(actorUserId);

    return doctorRepo.listDoctors(params);
  },

  /* --------------------------------------------------
     Admin metrics dashboard
  --------------------------------------------------- */
  async getMetrics(actorUserId: string) {
    await this.assertAdmin(actorUserId);

    const [
      allUsers,
      activeUsers,
      inactiveUsers,
      adminUsers,
      doctorUsers,
      patientUsers,

      allDoctors,
      verifiedDoctors,
      rejectedDoctors,
      pendingDoctors,
    ] = await Promise.all([
      userRepo.listUsers({ limit: 1, offset: 0 }),
      userRepo.listUsers({
        limit: 1,
        offset: 0,
        status: UserStatus.active,
      }),
      userRepo.listUsers({
        limit: 1,
        offset: 0,
        status: UserStatus.deactivated,
      }),
      userRepo.listUsers({
        limit: 1,
        offset: 0,
        role: UserRole.admin,
      }),
      userRepo.listUsers({
        limit: 1,
        offset: 0,
        role: UserRole.doctor,
      }),
      userRepo.listUsers({
        limit: 1,
        offset: 0,
        role: UserRole.patient,
      }),

      doctorRepo.listDoctors({ limit: 1, offset: 0 }),
      doctorRepo.listDoctors({
        limit: 1,
        offset: 0,
        verificationStatus: "verified",
      }),
      doctorRepo.listDoctors({
        limit: 1,
        offset: 0,
        verificationStatus: "rejected",
      }),
      doctorRepo.listDoctors({
        limit: 1,
        offset: 0,
        verificationStatus: "pending",
      }),
    ]);

    return {
      users: {
        total: allUsers.total,
        active: activeUsers.total,
        inactive: inactiveUsers.total,
        admins: adminUsers.total,
        doctors: doctorUsers.total,
        patients: patientUsers.total,
      },
      doctors: {
        total: allDoctors.total,
        verified: verifiedDoctors.total,
        rejected: rejectedDoctors.total,
        pending: pendingDoctors.total,
      },
    };
  },
};
