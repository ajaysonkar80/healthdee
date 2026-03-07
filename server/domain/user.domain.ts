import type { UserRole, UserStatus } from "@/db/schema";

/* ======================================================
   Errors
====================================================== */

export class UserDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserDomainError";
  }
}

/* ======================================================
   User Status Transitions
====================================================== */

const USER_STATUS_TRANSITIONS: Record<UserStatus, UserStatus[]> = {
  active: ["deactivated", "deleted"],
  deactivated: ["active", "deleted"],
  deleted: [],
};

export function assertValidUserStatusTransition(
  currentStatus: UserStatus,
  nextStatus: UserStatus
) {
  if (currentStatus === nextStatus) return;

  const allowed = USER_STATUS_TRANSITIONS[currentStatus];
  if (!allowed.includes(nextStatus)) {
    throw new UserDomainError(
      `Invalid user status transition: ${currentStatus} → ${nextStatus}`
    );
  }
}

/* ======================================================
   Role Rules
====================================================== */

export function assertUserRoleImmutable(
  currentRole: UserRole,
  nextRole: UserRole
) {
  if (currentRole !== nextRole) {
    throw new UserDomainError("User role cannot be changed once assigned");
  }
}

/* ======================================================
   Deleted User Invariants
====================================================== */

export function assertUserNotDeleted(status: UserStatus) {
  if (status === "deleted") {
    throw new UserDomainError("Operation not allowed on deleted user");
  }
}
