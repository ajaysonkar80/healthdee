import type { DoctorVerificationStatus } from "@/db/schema";

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
   Verification State Machine
====================================================== */

const DOCTOR_VERIFICATION_TRANSITIONS: Record<
  DoctorVerificationStatus,
  DoctorVerificationStatus[]
> = {
  pending: ["verified", "rejected"],
  verified: ["verified"], // terminal (no downgrade)
  rejected: ["rejected"], // terminal
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
   Profile Mutability Rules
====================================================== */

/**
 * Prevent profile modifications after verification or rejection.
 * Adjust policy here if you later allow minor edits.
 */
export function assertDoctorProfileEditable(
  doctor: DoctorState
) {
  if (doctor.verificationStatus === "verified") {
    throw new DoctorDomainError(
      "Verified doctor profiles cannot be modified"
    );
  }

  if (doctor.verificationStatus === "rejected") {
    throw new DoctorDomainError(
      "Rejected doctor profiles cannot be modified"
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

/* ======================================================
   Profile Completeness Rules
====================================================== */

/**
 * Ensure required professional fields exist
 * before allowing verification.
 */
export function assertDoctorProfileComplete(input: {
  specialty?: string;
  rmpRegistrationNumber?: string;
  rmpStateMedicalCouncil?: string;
}) {
  if (!input.specialty) {
    throw new DoctorDomainError(
      "Doctor specialty is required"
    );
  }

  if (!input.rmpRegistrationNumber) {
    throw new DoctorDomainError(
      "RMP registration number is required"
    );
  }

  if (!input.rmpStateMedicalCouncil) {
    throw new DoctorDomainError(
      "State medical council is required"
    );
  }
}
