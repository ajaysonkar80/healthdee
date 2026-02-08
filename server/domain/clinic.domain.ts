/* ======================================================
   Errors
====================================================== */

export class ClinicDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClinicDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type ClinicState = {
  id: string;
  isActive: boolean;
  geoLat?: string | null;
  geoLng?: string | null;
};

/* ======================================================
   Invariants
====================================================== */

/**
 * Clinics must have paired geo coordinates
 */
export function assertClinicGeoConsistency(
  geoLat?: string | null,
  geoLng?: string | null
) {
  const hasLat = geoLat !== null && geoLat !== undefined;
  const hasLng = geoLng !== null && geoLng !== undefined;

  if (hasLat !== hasLng) {
    throw new ClinicDomainError(
      "Clinic geoLat and geoLng must be provided together"
    );
  }
}

/**
 * Inactive clinics cannot be used for new operations
 */
export function assertClinicIsActive(clinic: ClinicState) {
  if (!clinic.isActive) {
    throw new ClinicDomainError(
      "Operation not allowed on inactive clinic"
    );
  }
}

/**
 * Public slug immutability (recommended invariant)
 */
export function assertClinicSlugImmutable(
  currentSlug: string,
  nextSlug: string
) {
  if (currentSlug !== nextSlug) {
    throw new ClinicDomainError(
      "Clinic public slug cannot be changed once created"
    );
  }
}
