// app/api/appointments/[id]/complete/route.ts

import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { appointmentService } from "@/server/services/appointment.service";
import { ForbiddenError } from "@/server/utils/errors";
import type { AuthUser } from "@/server/policies/roles";

/* ======================================================
   PATCH — Complete appointment
   Allowed: Doctor (own) or Admin
====================================================== */

export const PATCH = withErrorHandling(
  withAuth(async (req, context) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const { params } = context as { params: { id: string } };
    const appointmentId = params.id;

    if (!appointmentId) {
      throw new ForbiddenError("Invalid appointment ID");
    }

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const result = await appointmentService.updateAppointmentStatus(
      actor.id,
      appointmentId,
      "COMPLETED"
    );

    return success(result);
  })
);
