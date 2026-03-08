import type { NextRequest } from "next/server";

import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { patientService } from "@/server/services/patient.service";

import type { AuthUser } from "@/server/policies/roles";
import { canAccessPatient } from "@/server/policies/access/canAccessPatient";
import { rbacDeps } from "@/server/policies/rbac-deps";

import { ForbiddenError } from "@/server/utils/errors";

/* ---------------- GET ---------------- */
/**
 * Get patient preferences
 */

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
    const patientUserId = params.params?.id;

    if (!patientUserId) {
      throw new ForbiddenError("Invalid patient id");
    }

    const allowed = await canAccessPatient(
      actor,
      patientUserId,
      {
        doctors: rbacDeps.doctorRepo,
        appointments: rbacDeps.appointmentRepo,
      }
    );

    if (!allowed) {
      throw new ForbiddenError("Forbidden");
    }

    const preferences =
      await patientService.getUserPreferences(patientUserId);

    return success(preferences);
  })
);

/* ---------------- PATCH ---------------- */
/**
 * Update patient preferences (self only)
 */

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
    const patientUserId = params.params?.id;

    if (!patientUserId) {
      throw new ForbiddenError("Invalid patient id");
    }

    const allowed = await canAccessPatient(
      actor,
      patientUserId,
      {
        doctors: rbacDeps.doctorRepo,
        appointments: rbacDeps.appointmentRepo,
      }
    );

    if (!allowed) {
      throw new ForbiddenError("Forbidden");
    }

    const body = await req.json();

    const updated =
      await patientService.updateUserPreferences(
        actor.id,
        body
      );

    return success(updated);
  })
);