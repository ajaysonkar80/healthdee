import type { ScheduleClass } from "@/db/schema";

/* ======================================================
   Errors
====================================================== */

export class PrescriptionDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PrescriptionDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type PrescriptionState = {
  id: string;
  consultationId: string;
  doctorId: string;
  patientId: string;
};

export type ConsultationSnapshot = {
  id: string;
  doctorId: string;
  patientId: string;
  endedAt?: number | null;
};

export type PrescriptionItemInput = {
  scheduleClass: ScheduleClass;
};

/* ======================================================
   Creation Rules
====================================================== */

/**
 * Prescription can only be created after consultation is completed
 */
export function assertPrescriptionCreationAllowed(
  consultation: ConsultationSnapshot
) {
  if (!consultation.endedAt) {
    throw new PrescriptionDomainError(
      "Prescription can only be created after consultation is completed"
    );
  }
}

/**
 * Only one prescription per consultation
 */
export function assertNoExistingPrescription(
  existingPrescription: PrescriptionState | null
) {
  if (existingPrescription) {
    throw new PrescriptionDomainError(
      "Only one prescription is allowed per consultation"
    );
  }
}

/**
 * Doctor and patient must match the consultation
 */
export function assertPrescriptionOwnership(
  consultation: ConsultationSnapshot,
  doctorId: string,
  patientId: string
) {
  if (
    consultation.doctorId !== doctorId ||
    consultation.patientId !== patientId
  ) {
    throw new PrescriptionDomainError(
      "Prescription doctor or patient does not match consultation"
    );
  }
}

/* ======================================================
   Medical Safety Rules
====================================================== */

/**
 * Restricted schedules require completed consultation
 * (future extension point for stricter compliance rules)
 */
export function assertScheduleClassAllowed(
  item: PrescriptionItemInput
) {
  if (
    item.scheduleClass === "X" ||
    item.scheduleClass === "H1"
  ) {
    // Placeholder for stricter enforcement (kept explicit)
    return;
  }
}
