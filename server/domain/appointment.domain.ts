import { AppointmentStatus } from "@/db/schema";

/* ======================================================
   Errors
====================================================== */

export class AppointmentDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppointmentDomainError";
  }
}

/* ======================================================
   Types
====================================================== */

export type AppointmentState = {
  id: string;
  patientId: string;
  doctorId: string;
  status: AppointmentStatus;
  scheduledAt: number;
};

/* ======================================================
   State Transitions
====================================================== */

const APPOINTMENT_STATUS_TRANSITIONS: Record<
  AppointmentStatus,
  AppointmentStatus[]
> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

export function assertValidAppointmentStatusTransition(
  current: AppointmentStatus,
  next: AppointmentStatus
) {
  if (current === next) return;

  const allowed = APPOINTMENT_STATUS_TRANSITIONS[current];
  if (!allowed.includes(next)) {
    throw new AppointmentDomainError(
      `Invalid appointment transition: ${current} → ${next}`
    );
  }
}

/* ======================================================
   Time Rules
====================================================== */

export function assertAppointmentScheduledInFuture(
  scheduledAt: number
) {
  const now = Math.floor(Date.now() / 1000);

  if (scheduledAt <= now) {
    throw new AppointmentDomainError(
      "Appointment must be scheduled in the future"
    );
  }
}

/* ======================================================
   Cross-Entity Rules
====================================================== */

/**
 * A user cannot book an appointment with themselves
 */
export function assertPatientIsNotDoctor(
  patientUserId: string,
  doctorUserId: string
) {
  if (patientUserId === doctorUserId) {
    throw new AppointmentDomainError(
      "Patient and doctor cannot be the same user"
    );
  }
}

/**
 * Appointment can only be modified while scheduled
 */
export function assertAppointmentIsMutable(
  appointment: AppointmentState
) {
  if (appointment.status !== "PENDING") {
    throw new AppointmentDomainError(
      "Only PENDING appointments can be modified"
    );
  }
}
