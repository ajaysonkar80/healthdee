import { DoctorVerificationStatus } from "@/db/schema";

/* ======================================================
   Errors
====================================================== */

export class DoctorDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DoctorDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type DoctorState = {
  id: string;
  userId: string;
  verificationStatus: DoctorVerificationStatus;
  verifiedAt?: number | null;
};

/* ======================================================
   Verification State Transitions
====================================================== */

const DOCTOR_VERIFICATION_TRANSITIONS: Record<
  DoctorVerificationStatus,
  DoctorVerificationStatus[]
> = {
  pending: ["verified", "rejected"],
  verified: ["verified"],
  rejected: ["rejected"],
};

export function assertValidDoctorVerificationTransition(
  current: DoctorVerificationStatus,
  next: DoctorVerificationStatus
) {
  if (current === next) return;

  const allowed = DOCTOR_VERIFICATION_TRANSITIONS[current];
  if (!allowed.includes(next)) {
    throw new DoctorDomainError(
      `Invalid doctor verification transition: ${current} → ${next}`
    );
  }
}

/* ======================================================
   Conditional Field Rules
====================================================== */

export function assertDoctorVerificationFields(
  nextStatus: DoctorVerificationStatus,
  verifiedAt?: number | null
) {
  if (nextStatus === "verified" && !verifiedAt) {
    throw new DoctorDomainError(
      "verifiedAt is required when doctor is verified"
    );
  }

  if (nextStatus !== "verified" && verifiedAt) {
    throw new DoctorDomainError(
      "verifiedAt must not be set unless doctor is verified"
    );
  }
}

/* ======================================================
   Cross-Entity Invariants
====================================================== */

export function assertDoctorBelongsToUser(
  doctorUserId: string,
  actingUserId: string
) {
  if (doctorUserId !== actingUserId) {
    throw new DoctorDomainError(
      "Doctor profile can only be modified by owning user"
    );
  }
}

export function assertDoctorIsVerified(
  doctor: DoctorState
) {
  if (doctor.verificationStatus !== "verified") {
    throw new DoctorDomainError(
      "Operation allowed only for verified doctors"
    );
  }
}
