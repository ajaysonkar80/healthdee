// app/api/doctors/route.ts
import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { doctorService } from "@/server/services/doctor.service";
import type { AuthUser } from "@/server/policies/roles";
import { defineAbilityFor } from "@/server/policies/ability";
import { ForbiddenError } from "@/server/utils/errors";

const DEFAULT_LIMIT = 10;

/* ---------------- GET /api/doctors ---------------- */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };
    const ability = defineAbilityFor(actor);

    if (!ability.can("read", "Doctor")) throw new ForbiddenError("Forbidden");

    const { searchParams } = new URL(req.url);

    // Support both ?page= (page-based) and ?offset= (offset-based)
    // page takes priority when both are present
    const pageParam = searchParams.get("page");
    const offsetParam = searchParams.get("offset");
    const limitParam = searchParams.get("limit");

    const limit = limitParam ? Number(limitParam) : DEFAULT_LIMIT;
    const page = pageParam ? Math.max(1, Number(pageParam)) : null;
    const offset = page !== null
      ? (page - 1) * limit
      : offsetParam
        ? Number(offsetParam)
        : 0;

    const params = {
      limit,
      offset,
      search: searchParams.get("search") ?? undefined,
      specialty: searchParams.get("specialty") ?? undefined,
      verificationStatus: (searchParams.get("verificationStatus") as
        | "pending"
        | "verified"
        | "rejected"
        | undefined) ?? undefined,
      isUserActive: searchParams.get("isUserActive") !== null
        ? searchParams.get("isUserActive") === "true"
        : undefined,
    };

    const result = await doctorService.listDoctors(params);

    return success(result, {
      page: page ?? Math.floor(offset / limit) + 1,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    });
  })
);