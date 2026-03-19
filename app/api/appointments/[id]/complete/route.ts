// app/api/appointments/[id]/complete/route.ts
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { appointmentService } from "@/server/services/appointment.service";
import { doctorEarningService } from "@/server/services/doctor_earning.service";
import { ForbiddenError } from "@/server/utils/errors";
import type { AuthUser } from "@/server/policies/roles";

type RouteContext = { params: Promise<{ id: string }> };

/* ======================================================
   PATCH — Complete appointment + record earning
   Allowed: Doctor (own) or Admin
====================================================== */
export const PATCH = withErrorHandling(
  withAuth(async (req, context?: unknown) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const { id: appointmentId } = await (context as RouteContext).params;

    if (!appointmentId) throw new ForbiddenError("Invalid appointment ID");

    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };

    // 1. Transition appointment → COMPLETED
    const result = await appointmentService.updateAppointmentStatus(
      actor.id,
      appointmentId,
      "COMPLETED"
    );

    // 2. Snapshot a doctor_earnings row for this appointment.
    //    Idempotent — safe if called twice (UNIQUE on appointmentId).
    await doctorEarningService.recordEarning(actor.id, appointmentId);

    return success(result);
  })
);