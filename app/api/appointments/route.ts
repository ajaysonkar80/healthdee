// app/api/appointments/route.ts

import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { appointmentService } from "@/server/services/appointment.service";
import { ForbiddenError } from "@/server/utils/errors";

import { isAdmin } from "@/server/policies/guards/isAdmin";
import { isDoctor } from "@/server/policies/guards/isDoctor";
import { isPatient } from "@/server/policies/guards/isPatient";

import type { AuthUser } from "@/server/policies/roles";
import { z } from "zod";

/* ======================================================
   Validators
====================================================== */

const createAppointmentSchema = z.object({
  doctorId: z.string().min(1),
  scheduledAt: z.string().datetime(),
});

/* ======================================================
   POST — Create appointment (patient only)
====================================================== */

export const POST = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    if (!isPatient(actor)) {
      throw new ForbiddenError("Only patients can create appointments");
    }

    const body = await req.json();
    const parsed = createAppointmentSchema.parse(body);

    const appointment = await appointmentService.createAppointment(
      actor.id,
      {
        doctorId: parsed.doctorId,
        scheduledAt: new Date(parsed.scheduledAt),
      }
    );

    return success(appointment);
  })
);

/* ======================================================
   GET — List appointments (role based)
====================================================== */

export const GET = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const { searchParams } = new URL(req.url);

    const querySchema = z.object({
      limit: z.coerce.number().optional(),
      offset: z.coerce.number().optional(),
      status: z
        .enum(["PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",])
        .optional(),
      from: z.coerce.date().optional(),
      to: z.coerce.date().optional(),
    });

  const parsedQuery = querySchema.parse(
    Object.fromEntries(searchParams)
  );

  const params = parsedQuery;



    if (isPatient(actor)) {
      const data =
        await appointmentService.listAppointmentsByPatient(
          actor.id,
          params
        );
      return success(data);
    }

    if (isDoctor(actor)) {
      const data =
        await appointmentService.listAppointmentsByDoctor(
          actor.id,
          params
        );
      return success(data);
    }

    if (isAdmin(actor)) {
      const data =
        await appointmentService.listAllAppointments(params);
      return success(data);
    }

    throw new ForbiddenError("Access denied");
  })
);
