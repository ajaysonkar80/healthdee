import { z } from "zod";
import { AppointmentStatusSchema } from "@/db/schema";

export const appointmentCreateSchema = z.object({
  doctorId: z.string().uuid(),
  scheduledAt: z
    .number()
    .int()
    .refine((t) => t > Date.now() / 1000, {
      message: "Appointment must be scheduled in the future",
    }),
});

export const appointmentStatusUpdateSchema = z.object({
  status: AppointmentStatusSchema,
});
