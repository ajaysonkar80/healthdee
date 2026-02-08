import { ConsentStatus } from "@/db/schema";

/* ======================================================
   Errors
====================================================== */

export class ConsentDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConsentDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type ConsentState = {
  id: string;
  consentStatus: ConsentStatus;
  grantedAt?: number | null;
  withdrawnAt?: number | null;
};

/* ======================================================
   State Transitions
====================================================== */

const CONSENT_STATUS_TRANSITIONS: Record<
  ConsentStatus,
  ConsentStatus[]
> = {
  granted: ["withdrawn", "expired"],
  withdrawn: ["withdrawn"],
  expired: ["expired"],
};

export function assertValidConsentStatusTransition(
  current: ConsentStatus,
  next: ConsentStatus
) {
  if (current === next) return;

  const allowed = CONSENT_STATUS_TRANSITIONS[current];
  if (!allowed.includes(next)) {
    throw new ConsentDomainError(
      `Invalid consent transition: ${current} → ${next}`
    );
  }
}

/* ======================================================
   Conditional Field Rules
====================================================== */

export function assertConsentTimestamps(
  nextStatus: ConsentStatus,
  grantedAt?: number | null,
  withdrawnAt?: number | null
) {
  if (nextStatus === "granted" && !grantedAt) {
    throw new ConsentDomainError(
      "grantedAt is required when consent is granted"
    );
  }

  if (nextStatus === "withdrawn" && !withdrawnAt) {
    throw new ConsentDomainError(
      "withdrawnAt is required when consent is withdrawn"
    );
  }

  if (nextStatus !== "withdrawn" && withdrawnAt) {
    throw new ConsentDomainError(
      "withdrawnAt must not be set unless consent is withdrawn"
    );
  }
}
