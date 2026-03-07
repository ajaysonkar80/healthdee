import type { NextRequest } from "next/server";
import { withErrorHandling } from "@/server/http/route-helpers";
import { success } from "@/server/http/response";

import { doctorRepo } from "@/server/repositories/doctor.repo";
import { appointmentRepo } from "@/server/repositories/appointment.repo";

import { ValidationError } from "@/server/utils/errors";

export const GET = withErrorHandling(
  async (req: NextRequest, context) => {
    const { id } = (context as { params: { id: string } }).params;

    if (!id) {
      throw new ValidationError("Doctor ID is required");
    }

    const doctor = await doctorRepo.getDoctorById(id);

    if (!doctor.isActive) {
      throw new ValidationError("Doctor not found");
    }

    const now = new Date();

    // 👇 This returns { data, total }
    const result =
      await appointmentRepo.listAppointmentsByDoctor(
        doctor.id,
        {
          from: now,
        }
      );

    // 👇 result.data is the array
    const blocked = result.data
      .filter(
        (a) =>
          a.status === "PENDING" ||
          a.status === "CONFIRMED"
      )
      .map((a) => ({
        scheduledAt: a.scheduledAt,
      }));

    return success(blocked);
  }
);