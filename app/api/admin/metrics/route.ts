// app/api/admin/metrics/route.ts

import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { adminService } from "@/server/services/admin.service";
import { ForbiddenError } from "@/server/utils/errors";
import { isAdmin } from "@/server/policies/guards/isAdmin";
import type { AuthUser } from "@/server/policies/roles";

/* ---------------- GET ---------------- */
/**
 * Admin metrics dashboard
 *
 * Admin only
 */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    if (!isAdmin(actor)) {
      throw new ForbiddenError("Admin access only");
    }

    // ✅ FIX: pass actor userId
    const metrics = await adminService.getMetrics(actor.id);

    return success(metrics);
  })
);
