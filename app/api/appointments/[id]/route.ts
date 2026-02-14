// app/api/appointments/[id]/route.ts 

import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { appointmentService } from "@/server/services/appointment.service";
import { ForbiddenError } from "@/server/utils/errors";

import type { AuthUser } from "@/server/policies/roles";
import { z } from "zod";

/* ======================================================
   Validators
====================================================== */

const updateStatusSchema = z.object({
  status: z.enum(["scheduled", "cancelled", "completed"]),
});

/* ======================================================
   GET — Get appointment by ID
====================================================== */
export const GET = withErrorHandling(
  withAuth(async (req, context) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const { params } = context as { params: { id: string } };
    const { id } = params;

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const appointment =
      await appointmentService.getAppointmentById(
        actor.id,
        id
      );

    return success(appointment);
  })
);


/* ======================================================
   PATCH — Update appointment status
====================================================== */

export const PATCH = withErrorHandling(
  withAuth(async (req, context) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const { params } = context as { params: { id: string } };
    const { id } = params;

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const body = await req.json();
    const parsed = updateStatusSchema.parse(body);

    const result =
      await appointmentService.updateAppointmentStatus(
        actor.id,
        id,
        parsed.status
      );

    return success(result);
  })
);
