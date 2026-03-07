import type { ErasureStatus } from "@/db/schema";

/* ======================================================
   Errors
====================================================== */

export class ErasureDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErasureDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type ErasureRequestState = {
  id: string;
  status: ErasureStatus;
};

/* ======================================================
   State Transitions
====================================================== */

const ERASURE_STATUS_TRANSITIONS: Record<
  ErasureStatus,
  ErasureStatus[]
> = {
  requested: ["in_progress"],
  in_progress: ["completed", "rejected"],
  completed: [],
  rejected: [],
};

export function assertValidErasureStatusTransition(
  current: ErasureStatus,
  next: ErasureStatus
) {
  if (current === next) return;

  const allowed = ERASURE_STATUS_TRANSITIONS[current];
  if (!allowed.includes(next)) {
    throw new ErasureDomainError(
      `Invalid erasure request transition: ${current} → ${next}`
    );
  }
}

/* ======================================================
   Completion Rules
====================================================== */

/**
 * Completed or rejected erasure requests are immutable
 */
export function assertErasureRequestIsMutable(
  status: ErasureStatus
) {
  if (status === "completed" || status === "rejected") {
    throw new ErasureDomainError(
      "Completed or rejected erasure requests cannot be modified"
    );
  }
}
