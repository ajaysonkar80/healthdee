// app/api/appointments/[id]/route.ts

import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { appointmentService } from "@/server/services/appointment.service";
import { ForbiddenError } from "@/server/utils/errors";
import type { AuthUser } from "@/server/policies/roles";
import { z } from "zod";
import type { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
});

/* ======================================================
   GET — Get appointment by ID with full patient details
   Called by doctor/appointments/[id]/page.tsx
====================================================== */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest, context?: unknown) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const { id } = await (context as RouteContext).params;

    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };

    // Use getAppointmentWithFullDetails so the response includes the
    // patient object (fullName, email, phone, allergies, etc.).
    // The old getAppointmentDetailsForConfirmation only returned doctor info,
    // causing `data.patient` to be undefined in the detail page.
    const appointment = await appointmentService.getAppointmentWithFullDetails(
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
  withAuth(async (req: NextRequest, context?: unknown) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const { id } = await (context as RouteContext).params;

    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };

    const body   = await req.json();
    const parsed = updateStatusSchema.parse(body);

    const result = await appointmentService.updateAppointmentStatus(
      actor.id,
      id,
      parsed.status
    );

    return success(result);
  })
);