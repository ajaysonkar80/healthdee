import type { NextRequest } from "next/server";
import {
  withAuth,
  withErrorHandling,
} from "@/server/http/route-helpers";

import { success } from "@/server/http/response";

import { doctorRepo } from "@/server/repositories/doctor.repo";

import type { AuthUser } from "@/server/policies/roles";
import { defineAbilityFor } from "@/server/policies/ability";

import { ForbiddenError, ValidationError } from "@/server/utils/errors";

/* ======================================================
   GET → Read Availability
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

    const ability = defineAbilityFor(actor);

    // 👇 Use READ
    if (!ability.can("read", "Doctor")) {
      throw new ForbiddenError("Forbidden");
    }

    const doctor = await doctorRepo.getDoctorByUserId(actor.id);

    const availability =
      await doctorRepo.getAllByDoctor(doctor.id);

    return success(availability);
  })
);

/* ======================================================
   PUT → Update Availability
====================================================== */

export const PUT = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const ability = defineAbilityFor(actor);

    // 👇 Use UPDATE
    if (!ability.can("update", "Doctor")) {
      throw new ForbiddenError("Forbidden");
    }

    const doctor = await doctorRepo.getDoctorByUserId(actor.id);

    const body = await req.json();

    if (!Array.isArray(body.availability)) {
      throw new ValidationError("Invalid availability payload");
    }

    for (const day of body.availability) {
      if (
        typeof day.dayOfWeek !== "number" ||
        day.dayOfWeek < 0 ||
        day.dayOfWeek > 6
      ) {
        throw new ValidationError("Invalid dayOfWeek");
      }

      if (day.isActive) {
        if (!day.startTime || !day.endTime) {
          throw new ValidationError(
            "startTime and endTime required when active"
          );
        }

        if (day.startTime >= day.endTime) {
          throw new ValidationError(
            "startTime must be earlier than endTime"
          );
        }

        await doctorRepo.upsertAvailability({
          doctorId: doctor.id,
          dayOfWeek: day.dayOfWeek,
          startTime: day.startTime,
          endTime: day.endTime,
          slotDurationMinutes: 30,
          isActive: true,
        });
      } else {
        await doctorRepo.disableDay(
          doctor.id,
          day.dayOfWeek
        );
      }
    }

    return success({ success: true });
  })
);