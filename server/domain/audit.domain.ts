/* ======================================================
   Errors
====================================================== */

export class AuditDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuditDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type AuditAction =
  | "USER_CREATED"
  | "USER_STATUS_CHANGED"
  | "DOCTOR_VERIFIED"
  | "DOCTOR_REJECTED"
  | "APPOINTMENT_CREATED"
  | "APPOINTMENT_CANCELLED"
  | "APPOINTMENT_COMPLETED"
  | "CONSULTATION_STARTED"
  | "CONSULTATION_ENDED"
  | "PRESCRIPTION_CREATED"
  | "CONSENT_GRANTED"
  | "CONSENT_WITHDRAWN"
  | "DATA_ERASURE_REQUESTED"
  | "DATA_ERASURE_COMPLETED"
  | "ABHA_PROFILE_UPDATED";

export type AuditLogInput = {
  actorUserId?: string | null;
  action: AuditAction;
  targetType: string;
  targetId: string;
  metadata?: Record<string, unknown> | null;
};

/* ======================================================
   Core Invariants
====================================================== */

/**
 * Certain actions MUST have an actor
 */
const ACTIONS_REQUIRING_ACTOR: AuditAction[] = [
  "USER_STATUS_CHANGED",
  "DOCTOR_VERIFIED",
  "DOCTOR_REJECTED",
  "APPOINTMENT_CANCELLED",
  "APPOINTMENT_COMPLETED",
  "CONSULTATION_STARTED",
  "CONSULTATION_ENDED",
  "PRESCRIPTION_CREATED",
  "CONSENT_WITHDRAWN",
  "DATA_ERASURE_COMPLETED",
];

export function assertAuditActorPresent(
  log: AuditLogInput
) {
  if (
    ACTIONS_REQUIRING_ACTOR.includes(log.action) &&
    !log.actorUserId
  ) {
    throw new AuditDomainError(
      `Audit action ${log.action} requires an actorUserId`
    );
  }
}

/**
 * Target must always be specified
 */
export function assertAuditTargetValid(
  log: AuditLogInput
) {
  if (!log.targetType || !log.targetId) {
    throw new AuditDomainError(
      "Audit log must include targetType and targetId"
    );
  }
}

/**
 * Metadata sanity check
 */
export function assertAuditMetadataSerializable(
  metadata?: Record<string, unknown> | null
) {
  if (!metadata) return;

  try {
    JSON.stringify(metadata);
  } catch {
    throw new AuditDomainError(
      "Audit metadata must be JSON serializable"
    );
  }
}
