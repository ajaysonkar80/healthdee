// app/api/doctors/[id]/verify/route.ts
import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { doctorService } from "@/server/services/doctor.service";
import type { AuthUser } from "@/server/policies/roles";
import { isAdmin } from "@/server/policies/guards/isAdmin";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * POST /api/doctors/[id]/verify
 * Body: { status: "verified" | "rejected" }
 * Admin only — transitions verificationStatus on the doctor profile.
 */
export const POST = withErrorHandling(
  withAuth(async (req: NextRequest, context?: unknown) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };

    if (!isAdmin(actor)) {
      throw new ForbiddenError("Only admins can verify doctors");
    }

    const { id: doctorId } = await (context as RouteContext).params;

    if (!doctorId) throw new ValidationError("Invalid doctor id");

    const body = await req.json();

    if (body.status !== "verified" && body.status !== "rejected") {
      throw new ValidationError(
        'status must be "verified" or "rejected"'
      );
    }

    const result = await doctorService.setDoctorVerificationStatus(
      actor.id,
      doctorId,
      body.status
    );

    return success(result);
  })
);