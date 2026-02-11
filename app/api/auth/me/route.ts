// app/api/auth/me/route.ts

import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { ForbiddenError } from "@/server/utils/errors";

/* ---------------- GET ---------------- */
/**
 * Get current authenticated user
 *
 * Requires valid access token
 */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    return success({
      id: req.auth.userId,
      role: req.auth.role,
    });
  })
);
