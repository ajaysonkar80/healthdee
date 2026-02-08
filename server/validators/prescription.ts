import { z } from "zod";
import { ScheduleClassSchema } from "@/db/schema";

export const prescriptionCreateSchema = z.object({
  consultationId: z.string().uuid(),
});

export const prescriptionItemSchema = z.object({
  drugName: z.string().trim().min(2).max(200),
  dosage: z.string().trim().min(1).max(100),
  frequency: z.string().trim().min(1).max(100),

  durationDays: z
    .number()
    .int()
    .min(1)
    .max(365),

  scheduleClass: ScheduleClassSchema,
});

export const prescriptionItemsCreateSchema = z.object({
  items: z.array(prescriptionItemSchema).min(1),
});
