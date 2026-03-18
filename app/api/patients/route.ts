// app/api/patients/route.ts
import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { patientService } from "@/server/services/patient.service";
import type { AuthUser } from "@/server/policies/roles";
import { defineAbilityFor } from "@/server/policies/ability";
import { ForbiddenError } from "@/server/utils/errors";
import type { UserStatus } from "@/db/schema";

const DEFAULT_LIMIT = 10;

/* ---------------- GET /api/patients ---------------- */
export const GET = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");

    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };
    const ability = defineAbilityFor(actor);

    if (!ability.can("read", "Patient")) throw new ForbiddenError("Forbidden");

    const { searchParams } = new URL(req.url);

    const pageParam  = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const limit  = limitParam ? Number(limitParam) : DEFAULT_LIMIT;
    const page   = pageParam  ? Math.max(1, Number(pageParam)) : 1;
    const offset = (page - 1) * limit;

    const rawStatus = searchParams.get("status");
    const status = (
      ["active", "deactivated", "deleted"].includes(rawStatus ?? "")
        ? rawStatus
        : undefined
    ) as UserStatus | undefined;

    const result = await patientService.listAdminPatients(actor.id, {
      limit,
      offset,
      search: searchParams.get("search") ?? undefined,
      status,
    });

    return success(result, {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    });
  })
);