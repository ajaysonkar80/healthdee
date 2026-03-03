// app/api/appointments/[id]/reschedule/route.ts

import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { appointmentService } from "@/server/services/appointment.service";
import { ForbiddenError } from "@/server/utils/errors";
import type { AuthUser } from "@/server/policies/roles";
import { z } from "zod";

/* ======================================================
   Validator
====================================================== */

const rescheduleSchema = z.object({
  scheduledAt: z.string().datetime(),
});

/* ======================================================
   PATCH — Reschedule appointment
   Allowed: Patient (own), Doctor (own), Admin
====================================================== */

export const PATCH = withErrorHandling(
  withAuth(async (req: NextRequest, context) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const { id: appointmentId } =
  await (context as { params: Promise<{ id: string }> }).params;

    if (!appointmentId) {
      throw new ForbiddenError("Invalid appointment ID");
    }

    const body = await req.json();
    const parsed = rescheduleSchema.parse(body);

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const result = await appointmentService.rescheduleAppointment(
      actor.id,
      appointmentId,
      new Date(parsed.scheduledAt)
    );

    return success(result);
  })
);
