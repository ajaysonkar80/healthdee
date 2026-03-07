import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { patientService } from "@/server/services/patient.service";

import type { AuthUser } from "@/server/policies/roles";
import { canAccessPatient } from "@/server/policies/access/canAccessPatient";
import { filterPatientFields } from "@/server/policies/fields/patient.fields";
import { rbacDeps } from "@/server/policies/rbac-deps";
import { ForbiddenError } from "@/server/utils/errors";

/* ---------------- GET ---------------- */
/**
 * Get patient profile (PII protected)
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

    const patient = await patientService.getPatientByUserId(
      actor.id,
      patientUserId
    );

    const safePatient = filterPatientFields(actor, patient);

    return success(safePatient);
  })
);

/* ---------------- PATCH ---------------- */
/**
 * Update ABHA profile (self only)
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

    const updated = await patientService.updateAbhaProfile(
      actor.id,
      patientUserId,
      body
    );

    const safePatient = filterPatientFields(actor, updated);

    return success(safePatient);
  })
);
