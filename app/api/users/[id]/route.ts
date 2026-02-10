import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { userService } from "@/server/services/user.service";
import type { AuthUser } from "@/server/policies/roles";
import { canAccessUser } from "@/server/policies/access/canAccessUser";
import { rbacDeps } from "@/server/policies/rbac-deps";
import { ForbiddenError } from "@/server/utils/errors";

/* ---------------- GET ---------------- */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest, ctx) => {
    if (!req.auth) {
      throw new ForbiddenError("Unauthorized");
    }

    const actor: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const params = ctx as { params?: { id?: string } };
    const targetUserId = params.params?.id;

    if (!targetUserId) {
      throw new ForbiddenError("Invalid user id");
    }

    const allowed = await canAccessUser(
      actor,
      targetUserId,
      rbacDeps
    );

    if (!allowed) {
      throw new ForbiddenError("Forbidden");
    }

    const user = await userService.getUserById(
      actor.id,
      targetUserId
    );

    return success(user);
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
    const targetUserId = params.params?.id;

    if (!targetUserId) {
      throw new ForbiddenError("Invalid user id");
    }

    const allowed = await canAccessUser(
      actor,
      targetUserId,
      rbacDeps
    );

    if (!allowed) {
      throw new ForbiddenError("Forbidden");
    }

    const body = await req.json();

    const result = await userService.changeUserStatus(
      actor.id,
      targetUserId,
      body
    );

    return success(result);
  })
);
