import { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { patientService } from "@/server/services/patient.service";

import type { AuthUser } from "@/server/policies/roles";
import { defineAbilityFor } from "@/server/policies/ability";
import { ForbiddenError } from "@/server/utils/errors";

/* ---------------- GET ---------------- */
/**
 * List patients (PII is filtered inside service layer)
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

    const ability = defineAbilityFor(actor);

    if (!ability.can("read", "Patient")) {
      throw new ForbiddenError("Forbidden");
    }

    const patients = await patientService.listPatients(actor.id);

    return success(patients);
  })
);
