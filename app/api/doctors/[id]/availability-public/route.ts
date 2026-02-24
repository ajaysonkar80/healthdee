import { NextRequest } from "next/server";
import { withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { doctorRepo } from "@/server/repositories/doctor.repo";
import { ValidationError } from "@/server/utils/errors";

export const GET = withErrorHandling(
  async (req: NextRequest, context: unknown) => {
    // Narrow context properly
    const ctx = context as { params: Promise<{ id: string }> };

    const { id } = await ctx.params;

    if (!id) {
      throw new ValidationError("Doctor ID is required");
    }

    const doctor = await doctorRepo.getDoctorById(id);

    if (!doctor.isActive) {
      throw new ValidationError("Doctor not found");
    }

    const availability = await doctorRepo.getAllByDoctor(
      doctor.id
    );

    const publicAvailability = availability
      .filter((a) => a.isActive)
      .map((a) => ({
        dayOfWeek: a.dayOfWeek,
        startTime: a.startTime,
        endTime: a.endTime,
        isActive: a.isActive,
      }));

    return success(publicAvailability);
  }
);