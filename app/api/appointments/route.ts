// app/api/appointments/route.ts

import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { appointmentService } from "@/server/services/appointment.service";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";

/* ---------------- GET ---------------- */
/**
 * List appointments
 *
 * Admin   → all appointments
 * Doctor  → their appointments
 * Patient → their appointments
 */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const { userId, role } = req.auth;

    if (role === "admin") {
      const result =
        await appointmentService.listAllAppointments();

      return success(result.data);
    }

    if (role === "doctor") {
      const result =
        await appointmentService.listAppointmentsByDoctor(userId);

      return success(result.data);
    }

    if (role === "patient") {
      const result =
        await appointmentService.listAppointmentsByPatient(userId);

      return success(result.data);
    }

    throw new ForbiddenError("Unsupported role");
  })
);

/* ---------------- POST ---------------- */
/**
 * Create appointment
 *
 * Patient → allowed
 * Doctor  → forbidden
 * Admin   → forbidden
 */
export const POST = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const { userId, role } = req.auth;

    if (role !== "patient") {
      throw new ForbiddenError("Only patients can create appointments");
    }

    const body = await req.json();

    if (
      !body ||
      typeof body.doctorId !== "string" ||
      typeof body.scheduledAt !== "string"
    ) {
      throw new ValidationError("Invalid appointment payload");
    }

    const appointment =
      await appointmentService.createAppointment(userId, body);

    return success(appointment);
  })
);
