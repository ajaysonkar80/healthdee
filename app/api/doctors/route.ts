import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { doctorService } from "@/server/services/doctor.service";
import type { AuthUser } from "@/server/policies/roles";
import { defineAbilityFor } from "@/server/policies/ability";
import { ForbiddenError } from "@/server/utils/errors";

/* ---------------- GET ---------------- */
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

    if (!ability.can("read", "Doctor")) {
      throw new ForbiddenError("Forbidden");
    }

    // ✅ Extract optional query params
    const { searchParams } = new URL(req.url);

    const params = {
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : undefined,

      offset: searchParams.get("offset")
        ? Number(searchParams.get("offset"))
        : undefined,

      search: searchParams.get("search") ?? undefined,
      specialty: searchParams.get("specialty") ?? undefined,
      verificationStatus: searchParams.get("verificationStatus") as
        | "pending"
        | "verified"
        | "rejected"
        | undefined,

      isUserActive: searchParams.get("isUserActive")
        ? searchParams.get("isUserActive") === "true"
        : undefined,
    };

    const doctors = await doctorService.listDoctors(params);

    return success(doctors);
  })
);
