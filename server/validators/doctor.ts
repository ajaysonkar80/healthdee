import { z } from "zod";
import { DoctorVerificationSchema } from "@/db/schema";

/* -----------------------------------------------------
   Doctor profile (create input)
----------------------------------------------------- */

export const doctorCreateSchema = z.object({
  specialty: z
    .string()
    .min(2, "Specialty must be at least 2 characters")
    .max(100),

  experienceYears: z
    .number()
    .int()
    .min(0, "Experience cannot be negative")
    .max(60)
    .optional(),

  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(2000)
    .optional(),

  consultationFee: z
    .number()
    .int()
    .min(0, "Consultation fee cannot be negative")
    .max(100000)
    .optional(),

  profileImageUrl: z
    .string()
    .url("Profile image must be a valid URL")
    .nullable()
    .optional(),

  rmpRegistrationNumber: z
    .string()
    .min(2, "RMP registration number is required")
    .max(100),

  rmpStateMedicalCouncil: z
    .string()
    .min(2, "State medical council is required")
    .max(150),
});

/* -----------------------------------------------------
   Doctor profile (update input)
----------------------------------------------------- */

export const doctorUpdateSchema = z.object({
  specialty: z
    .string()
    .min(2)
    .max(100)
    .optional(),

  experienceYears: z
    .number()
    .int()
    .min(0)
    .max(60)
    .optional(),

  bio: z
    .string()
    .min(10)
    .max(2000)
    .optional(),

  consultationFee: z
    .number()
    .int()
    .min(0)
    .max(100000)
    .optional(),

  profileImageUrl: z
    .string()
    .url()
    .nullable()
    .optional(),
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
      d.verificationStatus !== "verified" ||
      d.verifiedAt !== undefined,
    {
      message:
        "verifiedAt is required when doctor is verified",
      path: ["verifiedAt"],
    }
  );
