import { z } from "zod";
import { DoctorVerificationSchema } from "@/db/schema";

/* -----------------------------------------------------
   Doctor profile (input only)
----------------------------------------------------- */

export const doctorCreateSchema = z.object({
  specialty: z.string().min(2),
  experienceYears: z.number().int().nonnegative().optional(),
  profileImageUrl: z.string().url().nullable().optional(),
  rmpRegistrationNumber: z.string().min(2),
  rmpStateMedicalCouncil: z.string().min(2),
});

export const doctorUpdateSchema = z.object({
  specialty: z.string().min(2).optional(),
  experienceYears: z.number().int().nonnegative().optional(),
  profileImageUrl: z.string().url().nullable().optional(),
});

/* -----------------------------------------------------
   Verification (admin input only)
----------------------------------------------------- */


export const doctorVerificationUpdateSchema = z
  .object({
    verificationStatus: DoctorVerificationSchema,
    verifiedAt: z.number().int().optional(),
  })
  .refine(
    (d) =>
      d.verificationStatus !== "verified" || d.verifiedAt !== undefined,
    {
      message: "verifiedAt is required when doctor is verified",
      path: ["verifiedAt"],
    }
  );