// server/services/doctor_earning.service.ts
import { doctorEarningRepo } from "../repositories/doctor_earning.repo";
import { doctorRepo } from "@/server/repositories/doctor.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { appointmentRepo } from "@/server/repositories/appointment.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";
import type { AuditLogInput } from "@/server/domain/audit.domain";
import {
  assertAuditActorPresent,
  assertAuditTargetValid,
  assertAuditMetadataSerializable,
} from "@/server/domain/audit.domain";

/* ─────────────────────────────────────────────────────────
   Doctor Earning Service

   Owns the lifecycle of doctor_earnings records.
   The primary entry point is `recordEarning`, which is
   called by the appointment complete flow.
───────────────────────────────────────────────────────── */

async function persistAudit(log: AuditLogInput) {
  assertAuditActorPresent(log);
  assertAuditTargetValid(log);
  assertAuditMetadataSerializable(log.metadata);
  await auditRepo.create(log);
}

export const doctorEarningService = {

  /* --------------------------------------------------
     Record earning when an appointment is COMPLETED.

     Called by: app/api/appointments/[id]/complete/route.ts
     (or appointmentService.updateAppointmentStatus when
      nextStatus === "COMPLETED").

     Idempotent — safe to call twice; the repo guards
     the UNIQUE constraint and returns the existing row.
  --------------------------------------------------- */
  async recordEarning(
    actorUserId: string,
    appointmentId: string
  ) {
    // Load appointment to get doctorId, patientId, appointmentType
    const appointment = await appointmentRepo.getAppointmentById(appointmentId);

    if (appointment.status !== "COMPLETED") {
      throw new ValidationError(
        "Earning can only be recorded for COMPLETED appointments"
      );
    }

    // Load doctor to snapshot the current consultationFee
    const doctor = await doctorRepo.getDoctorById(appointment.doctorId);

    const earning = await doctorEarningRepo.createEarning({
      doctorId:        appointment.doctorId,
      appointmentId:   appointmentId,
      patientId:       appointment.patientId,
      appointmentType: (appointment.appointmentType ?? "new") as "new" | "follow-up",
      feeAmount:       doctor.consultationFee ?? 0,
      earnedAt:        new Date(),
    });

    await persistAudit({
      actorUserId,
      action:     "EARNING_RECORDED",
      targetType: "earning",
      targetId:   earning.id,
      metadata: {
        appointmentId,
        feeAmount: doctor.consultationFee ?? 0,
      },
    });

    return earning;
  },

  /* --------------------------------------------------
     Get earnings stats for the logged-in doctor.
     Returns today / thisWeek / thisMonth / allTime
     plus total consultations and distinct patient count.
  --------------------------------------------------- */
  async getEarningsStats(actorUserId: string) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can view earnings");
    }

    const doctor = await doctorRepo.getDoctorByUserId(actorUserId);
    return doctorEarningRepo.getEarningsStats(doctor.id);
  },

  /* --------------------------------------------------
     Get paginated earnings history for the logged-in doctor.
  --------------------------------------------------- */
  async getEarningsHistory(
    actorUserId: string,
    params?: {
      limit?:  number;
      offset?: number;
    }
  ) {
    const user = await userRepo.getUserById(actorUserId);

    if (user.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can view earnings");
    }

    const doctor = await doctorRepo.getDoctorByUserId(actorUserId);
    return doctorEarningRepo.getEarningsHistory(doctor.id, params);
  },

  /* --------------------------------------------------
     Admin: get earnings for any doctor by doctorId.
  --------------------------------------------------- */
  async getEarningsHistoryForDoctor(
    actorUserId: string,
    doctorId: string,
    params?: {
      limit?:  number;
      offset?: number;
    }
  ) {
    const actor = await userRepo.getUserById(actorUserId);

    if (actor.role !== UserRole.admin) {
      throw new ForbiddenError("Only admins can view other doctors' earnings");
    }

    return doctorEarningRepo.getEarningsHistory(doctorId, params);
  },
};