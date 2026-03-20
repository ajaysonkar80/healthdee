// app/api/doctor/active/route.ts
import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { doctorService } from "@/server/services/doctor.service";
import { ForbiddenError } from "@/server/utils/errors";
import { isDoctor } from "@/server/policies/guards/isDoctor";
import type { AuthUser } from "@/server/policies/roles";
import { z } from "zod";

const bodySchema = z.object({ isActive: z.boolean() });

export const PATCH = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");
    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };
    if (!isDoctor(actor)) throw new ForbiddenError("Doctors only");

    const body = await req.json();
    const { isActive } = bodySchema.parse(body);

    const result = await doctorService.setSelfActiveStatus(actor.id, isActive);
    return success(result);
  })
);