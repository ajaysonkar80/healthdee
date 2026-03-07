import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { userService } from "@/server/services/user.service";
import type { AuthUser } from "@/server/policies/roles";
import { defineAbilityFor } from "@/server/policies/ability";
import { ForbiddenError } from "@/server/utils/errors";

export const GET = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const user: AuthUser = {
      id: req.auth.userId,
      role: req.auth.role,
    };

    const ability = defineAbilityFor(user);
    if (!ability.can("read", "User")) {
      throw new ForbiddenError("Forbidden");
    }

    const users = await userService.listUsers(user.id);

    return success(users);
  })
);
