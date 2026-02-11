// app/api/appointments/[id]/route.ts

import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { appointmentService } from "@/server/services/appointment.service";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";
import type { AppointmentStatus } from "@/db/schema";

/* ---------------- GET ---------------- */
/**
 * Get appointment by ID
 *
 * Admin   → any appointment
 * Doctor  → own appointment
 * Patient → own appointment
 */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest, ctx) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const { userId } = req.auth;

    const params = ctx as { params?: { id?: string } };
    const appointmentId = params.params?.id;

    if (!appointmentId) {
      throw new ValidationError("Invalid appointment id");
    }

    const appointment =
      await appointmentService.getAppointmentById(
        userId,
        appointmentId
      );

    return success(appointment);
  })
);

/* ---------------- PATCH ---------------- */
/**
 * Update appointment status
 *
 * Admin   → allowed
 * Doctor  → own appointment
 * Patient → own appointment
 */
export const PATCH = withErrorHandling(
  withAuth(async (req: NextRequest, ctx) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const { userId } = req.auth;

    const params = ctx as { params?: { id?: string } };
    const appointmentId = params.params?.id;

    if (!appointmentId) {
      throw new ValidationError("Invalid appointment id");
    }

    const body = await req.json();

    /**
     * Expected body:
     * {
     *   status: AppointmentStatus
     * }
     */
    if (
      !body ||
      typeof body.status !== "string"
    ) {
      throw new ValidationError("Invalid status payload");
    }

    const nextStatus = body.status as AppointmentStatus;

    const result =
      await appointmentService.updateAppointmentStatus(
        userId,
        appointmentId,
        nextStatus
      );

    return success(result);
  })
);
