import { prescriptionRepo } from "@/server/repositories/prescription.repo";
import { appointmentRepo } from "@/server/repositories/appointment.repo";
import { userRepo } from "@/server/repositories/user.repo";
import { auditRepo } from "@/server/repositories/audit.repo";

import {
  assertPrescriptionCreationAllowed,
  assertNoExistingPrescription,
  assertPrescriptionOwnership,
  assertScheduleClassAllowed,
  type ConsultationSnapshot,
  type PrescriptionItemInput,
} from "@/server/domain/prescription.domain";

import {
  assertAuditActorPresent,
  assertAuditTargetValid,
  assertAuditMetadataSerializable,
  type AuditLogInput,
} from "@/server/domain/audit.domain";

import { ForbiddenError } from "@/server/utils/errors";
import { UserRole } from "@/server/constants/user-role";

/* ======================================================
   Helpers
====================================================== */

async function persistAudit(log: AuditLogInput) {
  assertAuditActorPresent(log);
  assertAuditTargetValid(log);
  assertAuditMetadataSerializable(log.metadata);
  await auditRepo.create(log);
}

/* ======================================================
   Prescription Service
====================================================== */

export const prescriptionService = {
  /* --------------------------------------------------
     Create prescription (doctor only, immutable)
  --------------------------------------------------- */
  async createPrescription(
    actorUserId: string,
    input: {
      consultationId: string;
      items: PrescriptionItemInput[];
    }
  ) {
    const actor = await userRepo.getUserById(actorUserId);

    if (actor.role !== UserRole.doctor) {
      throw new ForbiddenError("Only doctors can create prescriptions");
    }

    // 1️⃣ Fetch consultation
    const consultation =
      await appointmentRepo.getConsultationByAppointment(
        input.consultationId
      );

    // 2️⃣ Fetch appointment (source of truth for doctor/patient)
    const appointment =
      await appointmentRepo.getAppointmentById(
        consultation.appointmentId
      );

    // 3️⃣ Build domain snapshot
    const consultationSnapshot: ConsultationSnapshot = {
      id: consultation.id,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      endedAt: consultation.endedAt
        ? Math.floor(consultation.endedAt.getTime() / 1000)
        : null,
    };

    // 4️⃣ Domain checks
    assertPrescriptionCreationAllowed(consultationSnapshot);

    const existing =
      await prescriptionRepo
        .getPrescriptionByConsultation(
          consultation.id
        )
        .catch(() => null);

    assertNoExistingPrescription(existing);

    assertPrescriptionOwnership(
      consultationSnapshot,
      appointment.doctorId,
      appointment.patientId
    );

    for (const item of input.items) {
      assertScheduleClassAllowed(item);
    }

    // 5️⃣ Persist prescription (items are domain-only for now)
    const prescription =
      await prescriptionRepo.createPrescription({
        consultationId: consultation.id,
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
      });

    // 6️⃣ Audit
    await persistAudit({
      actorUserId,
      action: "PRESCRIPTION_CREATED",
      targetType: "prescription",
      targetId: prescription.id,
      metadata: {
        consultationId: consultation.id,
        itemsCount: input.items.length,
      },
    });

    return prescription;
  },

  /* --------------------------------------------------
     Get prescription by consultation
  --------------------------------------------------- */
  async getPrescriptionByConsultation(
    actorUserId: string,
    consultationId: string
  ) {
    const actor = await userRepo.getUserById(actorUserId);

    const prescription =
      await prescriptionRepo.getPrescriptionByConsultation(
        consultationId
      );

    if (
      actor.role !== UserRole.admin &&
      actorUserId !== prescription.doctorId &&
      actorUserId !== prescription.patientId
    ) {
      throw new ForbiddenError("Access denied");
    }

    return prescription;
  },
};
