import { z } from "zod";

/* ======================================================
   PASSWORD RULE (Reusable)
====================================================== */

const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must include a special character"
  );

/* ======================================================
   EMAIL SIGNUP VALIDATION
====================================================== */

export const emailSignupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .email("Please enter a valid email address"),

    password: strongPassword,

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ======================================================
   PHONE SIGNUP VALIDATION
====================================================== */

export const phoneSignupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  phone: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only numbers")
    .length(10, "Phone number must be exactly 10 digits"),
});

/* ======================================================
   OTP VALIDATION
====================================================== */

export const otpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{4}$/, "OTP must be exactly 4 digits"),
});


/* ======================================================
   LOGIN VALIDATION
====================================================== */
export const emailLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const phoneLoginSchema = z.object({
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only numbers")
    .length(10, "Phone number must be exactly 10 digits"),
});

/* =========================
   RESET PASSWORD
========================= */
export const resetPasswordSchema = z
  .object({
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ======================================================
   ADMIN DOCTOR MANAGEMENT
====================================================== */

const phoneSchema = z
  .string()
  .regex(/^\d+$/, "Phone number must contain only numbers")
  .length(10, "Phone number must be exactly 10 digits");

const doctorProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  specialization: z.string().min(2, "Specialization is required"),
  licenseNumber: z.string().min(2, "License number is required"),
  yearsOfExperience: z
    .number()
    .int("Years of experience must be an integer")
    .nonnegative("Years of experience must be positive")
    .optional(),
  bio: z.string().optional(),
  clinicAddress: z.string().optional(),
  clinicGeoLat: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .optional(),
  clinicGeoLng: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .optional(),
  consultationFee: z
    .number()
    .int("Consultation fee must be an integer")
    .nonnegative("Consultation fee must be positive"),
  availability: z.record(z.array(z.string())).optional(),
  verificationStatus: z.enum(["pending", "approved", "rejected"]).optional(),
});

export const doctorCreateSchema = z
  .object({
    email: z.string().email("Please enter a valid email address").optional(),
    phone: phoneSchema.optional(),
    profile: doctorProfileSchema,
  })
  .refine((data) => data.email || data.phone, {
    message: "Email or phone number is required",
    path: ["email"],
  });

export const doctorUpdateSchema = z
  .object({
    email: z.string().email("Please enter a valid email address").optional(),
    phone: phoneSchema.optional(),
    profile: doctorProfileSchema.partial().optional(),
  })
  .refine((data) => data.email || data.phone || data.profile, {
    message: "Provide at least one field to update",
    path: ["email"],
  });
