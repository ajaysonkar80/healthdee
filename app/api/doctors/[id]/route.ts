// app/api/doctors/[id]/route.ts
import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { doctorService } from "@/server/services/doctor.service";
import { defineAbilityFor } from "@/server/policies/ability";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";
import type { AuthUser } from "@/server/policies/roles";

type RouteContext = { params: Promise<{ id: string }> };

/* ---------------- GET /api/doctors/[id] ---------------- */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest, context?: unknown) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const { id } = await (context as RouteContext).params;
    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };
    const ability = defineAbilityFor(actor);

    if (!ability.can("read", "Doctor")) throw new ForbiddenError("Forbidden");

    const doctor = await doctorService.getDoctorById(id);
    return success(doctor);
  })
);

/* ---------------- PATCH /api/doctors/[id] ---------------- */
/* Toggle isActive status (admin only).
 *
 * Body: { isActive: boolean }
 *
 * NOTE: This only changes the doctor profile's isActive flag.
 * It does NOT soft-delete the user account. User-level account
 * deactivation is a separate DPDP-compliant flow via
 * POST /api/users/[id]/deactivate or data erasure requests.
 */
export const PATCH = withErrorHandling(
  withAuth(async (req: NextRequest, context?: unknown) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };
    const ability = defineAbilityFor(actor);

    if (!ability.can("update", "Doctor")) throw new ForbiddenError("Forbidden");

    const { id } = await (context as RouteContext).params;

    const body = await req.json();

    if (typeof body?.isActive !== "boolean") {
      throw new ValidationError("isActive (boolean) is required");
    }

    const result = await doctorService.updateDoctorActiveStatus(
      req.auth.userId,
      id,
      body.isActive
    );

    return success(result);
  })
);