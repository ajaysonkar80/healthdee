import type { ConsultationMode } from "@/db/schema";
import type { AppointmentStatus } from "@/db/schema";

/* ======================================================
   Errors
====================================================== */

export class ConsultationDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConsultationDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type ConsultationState = {
  id: string;
  appointmentId: string;
  mode: ConsultationMode;
  startedAt?: number | null;
  endedAt?: number | null;
};

export type AppointmentSnapshot = {
  id: string;
  status: AppointmentStatus;
  scheduledAt: number;
};

/* ======================================================
   Creation Rules
====================================================== */

/**
 * Consultation can only be created for PENDING appointments
 */
export function assertConsultationCreationAllowed(
  appointment: AppointmentSnapshot
) {
  if (appointment.status !== "PENDING") {
    throw new ConsultationDomainError(
      "Consultation can only be created for PENDING appointments"
    );
  }
}

/**
 * Only one consultation per appointment
 */
export function assertNoExistingConsultation(
  existingConsultation: ConsultationState | null
) {
  if (existingConsultation) {
    throw new ConsultationDomainError(
      "Only one consultation is allowed per appointment"
    );
  }
}

/* ======================================================
   Lifecycle Rules
====================================================== */

export function assertConsultationStartAllowed(
  appointment: AppointmentSnapshot,
  startedAt: number
) {
  if (startedAt < appointment.scheduledAt) {
    throw new ConsultationDomainError(
      "Consultation cannot start before appointment time"
    );
  }
}

export function assertConsultationEndAllowed(
  startedAt?: number | null,
  endedAt?: number | null
) {
  if (endedAt && !startedAt) {
    throw new ConsultationDomainError(
      "Consultation cannot end before it has started"
    );
  }

  if (startedAt && endedAt && endedAt <= startedAt) {
    throw new ConsultationDomainError(
      "Consultation end time must be after start time"
    );
  }
}

/**
 * Consultation cannot be modified after it has ended
 */
export function assertConsultationIsMutable(
  consultation: ConsultationState
) {
  if (consultation.endedAt) {
    throw new ConsultationDomainError(
      "Ended consultations cannot be modified"
    );
  }
}
