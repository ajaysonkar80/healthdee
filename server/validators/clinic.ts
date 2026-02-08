import { z } from "zod";

export const clinicBaseSchema = z
  .object({
    name: z.string().trim().min(2).max(150),

    publicSlug: z
      .string()
      .trim()
      .regex(/^[a-z0-9-]+$/),

    description: z.string().max(1000).optional(),

    address: z.string().trim().min(5).max(300),

    city: z.string().trim().min(2).max(100),

    state: z.string().trim().max(100).optional(),

    country: z.string().length(2).default("IN"),

    geoLat: z.number().min(-90).max(90).optional(),
    geoLng: z.number().min(-180).max(180).optional(),

    isActive: z.boolean().optional(),
  })
  .refine(
    (d) =>
      (d.geoLat === undefined && d.geoLng === undefined) ||
      (d.geoLat !== undefined && d.geoLng !== undefined),
    {
      message: "Both geoLat and geoLng must be provided together",
    }
  );

export const clinicCreateSchema = clinicBaseSchema;
export const clinicUpdateSchema = clinicBaseSchema;
