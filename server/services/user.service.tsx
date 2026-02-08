import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

import {
  assertValidUserStatusTransition,
  assertUserRoleImmutable,
  assertUserNotDeleted,
} from "@/server/domain/user.domain";

import {
  assertAuditActorPresent,
  assertAuditTargetValid,
  assertAuditMetadataSerializable,
  type AuditLogInput,
} from "@/server/domain/audit.domain";

import { ForbiddenError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";


type UserRoleValue = typeof UserRole[keyof typeof UserRole];
type UserStatusValue = typeof UserStatus[keyof typeof UserStatus];

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
   User Service
====================================================== */

export const userService = {
  /* --------------------------------------------------
     Get user by ID
  --------------------------------------------------- */
  async getUserById(requestingUserId: string, targetUserId: string) {
    const user = await userRepo.getUserById(targetUserId);

    assertUserNotDeleted(user.status);

    // basic self-or-admin access rule
    if (requestingUserId !== targetUserId && user.role !== "admin") {
      throw new ForbiddenError("Access denied");
    }

    return user;
  },

  /* --------------------------------------------------
     List users (Admin only)
  --------------------------------------------------- */
  async listUsers(
    requestingUserId: string,
    params?: {
      limit?: number;
      offset?: number;
      search?: string;
      role?: UserRoleValue;
status?: UserStatusValue;

    }
  ) {
    const admin = await userRepo.getUserById(requestingUserId);

    if (admin.role !== "admin") {
      throw new ForbiddenError("Only admins can list users");
    }

    return userRepo.listUsers(params);
  },

  /* --------------------------------------------------
     Change user status (Admin only)
  --------------------------------------------------- */
  async changeUserStatus(
    actorUserId: string,
    targetUserId: string,
    nextStatus: UserStatusValue
  ) {
    const actor = await userRepo.getUserById(actorUserId);
    if (actor.role !== "admin") {
      throw new ForbiddenError("Only admins can change user status");
    }

    const user = await userRepo.getUserById(targetUserId);

    assertUserNotDeleted(user.status);
    assertValidUserStatusTransition(user.status, nextStatus);

    await userRepo.deactivateUser(targetUserId);

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
     Ensure role immutability (defensive)
  --------------------------------------------------- */
  async assertRoleUnchanged(
    userId: string,
    nextRole: UserRoleValue
  ) {
    const user = await userRepo.getUserById(userId);

    assertUserRoleImmutable(user.role, nextRole);

    return { valid: true };
  },
};
