// app/api/doctor/profile/route.ts
// Used by the onboarding wizard to save each step.
import type { NextRequest }   from "next/server";
import { withAuth, withErrorHandling } from "@/server/http/route-helpers";
import { success }            from "@/server/http/response";
import { doctorService }      from "@/server/services/doctor.service";
import { ForbiddenError }     from "@/server/utils/errors";
import { isDoctor }           from "@/server/policies/guards/isDoctor";
import type { AuthUser }      from "@/server/policies/roles";
import { z }                  from "zod";

const patchSchema = z.object({
  fullName:               z.string().min(2).optional(),
  specialty:              z.string().min(2).optional(),
  degrees:                z.string().optional(),
  languages:              z.string().optional(),
  tagline:                z.string().optional(),
  experienceYears:        z.coerce.number().int().min(0).optional(),
  bio:                    z.string().optional(),
  consultationFee:        z.coerce.number().int().min(0).optional(),
  rmpRegistrationNumber:  z.string().optional(),
  rmpStateMedicalCouncil: z.string().optional(),
  profileImageUrl:        z.string().url().nullable().optional(),
});

export const PATCH = withErrorHandling(
  withAuth(async (req: NextRequest) => {
    if (!req.auth) throw new ForbiddenError("Unauthorized");
    const actor: AuthUser = { id: req.auth.userId, role: req.auth.role };
    if (!isDoctor(actor)) throw new ForbiddenError("Doctors only");

    const body  = await req.json();
    const input = patchSchema.parse(body);

    const updated = await doctorService.updateDoctorProfessionalDetails(actor.id, input);
    return success(updated);
  })
);