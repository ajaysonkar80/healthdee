import { z } from "zod";
import { ConsultationModeSchema } from "@/db/schema";

export const consultationCreateSchema = z.object({
  appointmentId: z.string().uuid(),
  mode: ConsultationModeSchema,
});

export const consultationUpdateSchema = z
  .object({
    startedAt: z.number().int().optional(),
    endedAt: z.number().int().optional(),
    summary: z.string().max(5000).optional(),
  })
  .refine(
    (d) =>
      d.endedAt === undefined ||
      (d.startedAt !== undefined && d.endedAt > d.startedAt),
    {
      message: "endedAt must be after startedAt",
    }
  );