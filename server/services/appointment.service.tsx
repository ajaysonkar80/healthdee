import { appointmentRepo } from "@/server/repositories/appointment.repo";
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { patientRepo } from "@/server/repositories/patient.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

import {
  assertAuditActorPresent,
  assertAuditTargetValid,
  assertAuditMetadataSerializable,
  type AuditLogInput,
} from "@/server/domain/audit.domain";

import {
  assertValidAppointmentStatusTransition,
  assertAppointmentScheduledInFuture,
  assertPatientIsNotDoctor,
  assertAppointmentIsMutable,
} from "@/server/domain/appointment.domain";

import {
  ForbiddenError,
  ValidationError,
} from "@/server/utils/errors";

import { UserRole } from "@/server/constants/user-role";
import { UserStatus } from "@/server/constants/user-status";

import type {
  AppointmentStatus,
  ConsultationMode,
  ConsultationLogType,
} from "@/db/schema";

/* ======================================================
   Helpers
====================================================== */

async function persistAudit(log: AuditLogInput) {
  assertAuditActorPresent(log);
  assertAuditTargetValid(log);
  assertAuditMetadataSerializable(log.metadata);
  await auditRepo.create(log);
}
async function assertAppointmentAccess(
  actorUserId: string,
  appointment: {
    patientId: string;
    doctorId?: string;
    doctor?: { id: string };
  }
) {
  const actor = await userRepo.getUserById(actorUserId);

  if (actor.role === UserRole.admin) {
    return;
  }

  if (actor.role === UserRole.patient) {
    const patient =
      await patientRepo.getPatientByUserId(actorUserId);

    if (appointment.patientId !== patient.id) {
      throw new ForbiddenError("Access denied");
    }

    return;
  }

  if (actor.role === UserRole.doctor) {
    const doctor =
      await doctorRepo.getDoctorByUserId(actorUserId);

    const doctorId =
      appointment.doctorId ?? appointment.doctor?.id;

    if (!doctorId || doctorId !== doctor.id) {
      throw new ForbiddenError("Access denied");
    }

    return;
  }

  throw new ForbiddenError("Access denied");
}
/* ======================================================
   Appointment Service
====================================================== */

export const appointmentService = {
  /* --------------------------------------------------
     Create appointment (patient only)
  --------------------------------------------------- */
  async createAppointment(
  actorUserId: string,
  input: {
    doctorId: string;
    scheduledAt: Date;
  }
) {
  /* --------------------------------------------------
     Basic User Validation
  --------------------------------------------------- */

  const user = await userRepo.getUserById(actorUserId);

  if (user.role !== UserRole.patient) {
    throw new ForbiddenError("Only patients can create appointments");
  }

  if (user.status !== UserStatus.active) {
    throw new ForbiddenError("Inactive users cannot create appointments");
  }

  const patient = await patientRepo.getPatientByUserId(actorUserId);
  const doctor = await doctorRepo.getDoctorById(input.doctorId);

  if (doctor.verificationStatus !== "verified") {
    throw new ValidationError("Doctor is not verified");
  }

  assertPatientIsNotDoctor(actorUserId, doctor.userId);

  /* --------------------------------------------------
     Ensure appointment is in future
  --------------------------------------------------- */

  const scheduledAtSeconds = Math.floor(
    input.scheduledAt.getTime() / 1000
  );

  assertAppointmentScheduledInFuture(scheduledAtSeconds);

  /* --------------------------------------------------
     30-Day Booking Window Limit
  --------------------------------------------------- */

  const now = new Date();
  const maxDate = new Date();
  maxDate.setDate(now.getDate() + 30);

  if (input.scheduledAt > maxDate) {
    throw new ValidationError(
      "Appointments can only be booked within 30 days"
    );
  }

  /* --------------------------------------------------
     Doctor Weekly Availability Validation
  --------------------------------------------------- */

  const dayOfWeek = input.scheduledAt.getDay(); // 0 = Sunday

  const availability =
    await doctorRepo.getByDoctorAndDay(
      doctor.id,
      dayOfWeek
    );

  if (!availability || !availability.isActive) {
    throw new ValidationError(
      "Doctor is not available on selected day"
    );
  }

  // Convert selected time to HH:mm (local time safe)
  const hours = input.scheduledAt.getHours().toString().padStart(2, "0");
  const minutes = input.scheduledAt.getMinutes().toString().padStart(2, "0");
  const selectedTime = `${hours}:${minutes}`;

  if (
    selectedTime < availability.startTime ||
    selectedTime >= availability.endTime
  ) {
    throw new ValidationError(
      "Selected time is outside doctor's working hours"
    );
  }

  /* --------------------------------------------------
     Overlap Protection (30 min fixed)
     Blocks only PENDING + CONFIRMED
  --------------------------------------------------- */

  const doctorConflict =
    await appointmentRepo.existsOverlappingAppointment({
      doctorId: doctor.id,
      scheduledAt: input.scheduledAt,
    });

  if (doctorConflict) {
    throw new ValidationError(
      "Doctor already has an appointment at this time"
    );
  }

  const patientConflict =
    await appointmentRepo.existsOverlappingAppointment({
      patientId: patient.id,
      scheduledAt: input.scheduledAt,
    });

  if (patientConflict) {
    throw new ValidationError(
      "You already have an appointment at this time"
    );
  }

  /* --------------------------------------------------
     Create Appointment (Doctor Approval Required)
  --------------------------------------------------- */

  const appointment = await appointmentRepo.createAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    scheduledAt: input.scheduledAt,
    status: "PENDING",
  });

  /* --------------------------------------------------
     Audit Log
  --------------------------------------------------- */

  await persistAudit({
    actorUserId,
    action: "APPOINTMENT_CREATED",
    targetType: "appointment",
    targetId: appointment.id,
    metadata: {
      scheduledAt: input.scheduledAt.toISOString(),
    },
  });

  return appointment;
},

  /* --------------------------------------------------
     Get appointment by ID (patient / doctor / admin)
  --------------------------------------------------- */
  async getAppointmentById(
    actorUserId: string,
    appointmentId: string
  ) {
    
    const appointment =
      await appointmentRepo.getAppointmentById(appointmentId);

    await assertAppointmentAccess(actorUserId, appointment);

    return appointment;
  },
  
  async getAppointmentDetailsForConfirmation(
  actorUserId: string,
  appointmentId: string
) {
  // Fetch appointment with doctor join
  const appointment =
    await appointmentRepo.getAppointmentWithDoctorById(
      appointmentId
    );

  if (!appointment) {
    throw new ValidationError("Appointment not found");
  }

  // Centralized access control
  await assertAppointmentAccess(actorUserId, appointment);

  return appointment;
},

  /* --------------------------------------------------
     List appointments (patient)
  --------------------------------------------------- */
  async listAppointmentsByPatient(
    actorUserId: string,
    params?: {
      limit?: number;
      offset?: number;
      status?: AppointmentStatus;
      from?: Date;
      to?: Date;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.patient) {
      throw new ForbiddenError("Only patients can view appointments");
    }

    return appointmentRepo.listAppointmentsByPatient(
      actorUserId,
      params
    );
  },

  /* --------------------------------------------------
     List appointments (doctor)
  --------------------------------------------------- */
  async listAppointmentsByDoctor(
    actorUserId: string,
    params?: {
      limit?: number;
      offset?: number;
      status?: AppointmentStatus;
      from?: Date;
      to?: Date;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can view appointments");
    }

    const doctor = await doctorRepo.getDoctorByUserId(actorUserId);

    return appointmentRepo.listAppointmentsByDoctor(
      doctor.id,
      params
    );
  },

    /* --------------------------------------------------
     List appointments (admin)
  --------------------------------------------------- */
  async listAllAppointments(params?: {
    limit?: number;
    offset?: number;
    status?: AppointmentStatus;
    from?: Date;
    to?: Date;
  }) {
    // Admin-only by design
    // Actor identity is resolved at API layer
    return appointmentRepo.listAllAppointments(params);
  },

  

  /* --------------------------------------------------
     Update appointment status
  --------------------------------------------------- */
  async updateAppointmentStatus(
    actorUserId: string,
    appointmentId: string,
    nextStatus: AppointmentStatus
  ) {
    
    const appointment =
      await appointmentRepo.getAppointmentById(appointmentId);

    await assertAppointmentAccess(actorUserId, appointment);

    assertValidAppointmentStatusTransition(
      appointment.status,
      nextStatus
    );

    await appointmentRepo.updateAppointmentStatus(
      appointmentId,
      nextStatus
    );

    await persistAudit({
      actorUserId,
      action:
        nextStatus === "CANCELLED"
          ? "APPOINTMENT_CANCELLED"
          : "APPOINTMENT_COMPLETED",
      targetType: "appointment",
      targetId: appointmentId,
      metadata: {
        from: appointment.status,
        to: nextStatus,
      },
    });

    return { success: true };
  },

  /* --------------------------------------------------
   Reschedule appointment
--------------------------------------------------- */
/* --------------------------------------------------
   Reschedule appointment (30 min fixed duration)
--------------------------------------------------- */
async rescheduleAppointment(
  actorUserId: string,
  appointmentId: string,
  newScheduledAt: Date
) {
  
  const appointment =
    await appointmentRepo.getAppointmentById(appointmentId);

  /* --------------------------------------------------
     Authorization
  --------------------------------------------------- */

  await assertAppointmentAccess(actorUserId, appointment);

  /* --------------------------------------------------
     Ensure appointment is mutable
  --------------------------------------------------- */

  assertAppointmentIsMutable({
    id: appointment.id,
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    status: appointment.status,
    scheduledAt: Math.floor(
      appointment.scheduledAt.getTime() / 1000
    ),
  });

  /* --------------------------------------------------
     Ensure new date is in the future
  --------------------------------------------------- */

  const scheduledAtSeconds = Math.floor(
    newScheduledAt.getTime() / 1000
  );

  assertAppointmentScheduledInFuture(scheduledAtSeconds);

  /* --------------------------------------------------
     Overlap Protection (30 minutes fixed)
     Block only PENDING & CONFIRMED
  --------------------------------------------------- */

  const doctorConflict =
    await appointmentRepo.existsOverlappingAppointment({
      doctorId: appointment.doctorId,
      scheduledAt: newScheduledAt,
      excludeAppointmentId: appointment.id,
    });

  if (doctorConflict) {
    throw new ValidationError(
      "Doctor already has an appointment at this time"
    );
  }

  const patientConflict =
    await appointmentRepo.existsOverlappingAppointment({
      patientId: appointment.patientId,
      scheduledAt: newScheduledAt,
      excludeAppointmentId: appointment.id,
    });

  if (patientConflict) {
    throw new ValidationError(
      "You already have an appointment at this time"
    );
  }

  /* --------------------------------------------------
     Update scheduled time
  --------------------------------------------------- */

  const updated =
    await appointmentRepo.updateScheduledAt(
      appointmentId,
      newScheduledAt
    );

  /* --------------------------------------------------
     Audit log
  --------------------------------------------------- */

  await persistAudit({
    actorUserId,
    action: "APPOINTMENT_RESCHEDULED",
    targetType: "appointment",
    targetId: appointmentId,
    metadata: {
      from: appointment.scheduledAt.toISOString(),
      to: newScheduledAt.toISOString(),
    },
  });

  return updated;
},



  /* --------------------------------------------------
     Consultation lifecycle
  --------------------------------------------------- */
  async startConsultation(
    actorUserId: string,
    appointmentId: string,
    mode: ConsultationMode
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can start consultations");
    }

    const doctor = await doctorRepo.getDoctorByUserId(actorUserId);
    const appointment =
      await appointmentRepo.getAppointmentById(appointmentId);

    if (appointment.doctorId !== doctor.id) {
      throw new ForbiddenError("Not your appointment");
    }

    assertAppointmentIsMutable({
      id: appointment.id,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      status: appointment.status,
      scheduledAt: Math.floor(
        appointment.scheduledAt.getTime() / 1000
      ),
    });

    const consultation =
      await appointmentRepo.createConsultation({
        appointmentId,
        mode,
        startedAt: new Date(),
      });

    await persistAudit({
      actorUserId,
      action: "CONSULTATION_STARTED",
      targetType: "consultation",
      targetId: consultation.id,
    });

    return consultation;
  },

  async endConsultation(
    actorUserId: string,
    consultationId: string,
    input: { summary?: string }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can end consultations");
    }

    await appointmentRepo.endConsultation(consultationId, {
      endedAt: new Date(),
      summary: input.summary,
    });

    await persistAudit({
      actorUserId,
      action: "CONSULTATION_ENDED",
      targetType: "consultation",
      targetId: consultationId,
    });

    return { success: true };
  },

  /* --------------------------------------------------
     Consultation logs
  --------------------------------------------------- */
  async addConsultationLog(
    actorUserId: string,
    input: {
      consultationId: string;
      logType: ConsultationLogType;
      content: unknown;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can add logs");
    }

    return appointmentRepo.addConsultationLog({
      consultationId: input.consultationId,
      logType: input.logType,
      content: input.content,
    });
  },

  async listConsultationLogs(
    actorUserId: string,
    consultationId: string,
    params?: {
      limit?: number;
      offset?: number;
      logType?: ConsultationLogType;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can view logs");
    }

    return appointmentRepo.listConsultationLogs(
      consultationId,
      params
    );
  },
};
