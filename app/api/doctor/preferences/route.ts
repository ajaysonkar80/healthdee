// app/api/doctor/preferences/route.ts
import type { NextRequest } from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";
import { doctorService } from "@/server/services/doctor.service";
import { ForbiddenError } from "@/server/utils/errors";
import { isDoctor } from "@/server/policies/guards/isDoctor";
import type { AuthUser } from "@/server/policies/roles";
import { z } from "zod";

const bodySchema = z.object({
  whatsappAlerts:       z.boolean().optional(),
  smsNotifications:     z.boolean().optional(),
  emailNotifications:   z.boolean().optional(),
  appointmentReminders: z.boolean().optional(),
});

export const GET = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");
    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };
    if (!isDoctor(actor)) throw new ForbiddenError("Doctors only");
    const prefs = await doctorService.getDoctorPreferences(actor.id);
    return success(prefs);
  })
);

export const PATCH = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");
    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };
    if (!isDoctor(actor)) throw new ForbiddenError("Doctors only");
    const body = await req.json();
    const input = bodySchema.parse(body);
    const updated = await doctorService.updateDoctorPreferences(actor.id, input);
    return success(updated);
  })
);