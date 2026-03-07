import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { doctorService } from "@/server/services/doctor.service";
import type { AuthUser } from "@/server/policies/roles";
import { ForbiddenError } from "@/server/utils/errors";

/* ---------------- GET ---------------- */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest, ctx) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    

    const params = ctx as { params?: { id?: string } };
    const doctorId = params.params?.id;

    if (!doctorId) {
      throw new ForbiddenError("Invalid doctor id");
    }

    const doctor = await doctorService.getDoctorById(
      doctorId
    );

    return success(doctor);
  })
);

/* ---------------- PATCH ---------------- */
export const PATCH = withErrorHandling(
  withAuth(async (req: NextRequest, ctx) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const params = ctx as { params?: { id?: string } };
    const doctorId = params.params?.id;

    if (!doctorId) {
      throw new ForbiddenError("Invalid doctor id");
    }

    const body = await req.json();

    const updated = await doctorService.updateDoctorProfile(
      actor.id,
      doctorId,
      body
    );

    return success(updated);
  })
);
