import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { doctorService } from "@/server/services/doctor.service";
import type { AuthUser } from "@/server/policies/roles";
import { isAdmin } from "@/server/policies/guards/isAdmin";
import { ForbiddenError, ValidationError } from "@/server/utils/errors";

/* ---------------- POST ---------------- */
/**
 * Verify / reject doctor (ADMIN ONLY)
 */
export const POST = withErrorHandling(
  withAuth(async (req: NextRequest, ctx) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    // ✅ Admin-only (service also enforces this)
    if (!isAdmin(actor)) {
      throw new ForbiddenError("Only admins can verify doctors");
    }

    const params = ctx as { params?: { id?: string } };
    const doctorId = params.params?.id;

    if (!doctorId) {
      throw new ValidationError("Invalid doctor id");
    }

    const body = await req.json();

    /**
     * Expected body:
     * {
     *   status: "verified" | "rejected"
     * }
     */
    if (
      body.status !== "verified" &&
      body.status !== "rejected"
    ) {
      throw new ValidationError("Invalid verification status");
    }

    const result =
      await doctorService.setDoctorVerificationStatus(
        actor.id,
        doctorId,
        body.status
      );

    return success(result);
  })
);
