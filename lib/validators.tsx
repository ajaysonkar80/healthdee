// lib/validators.tsx
import { z } from "zod";
import { DoctorVerificationSchema } from "@/db/schema";

/* ── Password ── */
const strongPassword = z
  .string()
  .min(8,           "Password must be at least 8 characters")
  .regex(/[a-z]/,   "Must include a lowercase letter")
  .regex(/[A-Z]/,   "Must include an uppercase letter")
  .regex(/[0-9]/,   "Must include a number")
  .regex(/[^a-zA-Z0-9]/, "Must include a special character");

/* ── Email Signup ── */
export const emailSignupSchema = z.object({
  name:            z.string().min(2, "Name must be at least 2 characters"),
  email:           z.string().email("Please enter a valid email address"),
  password:        strongPassword,
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path:    ["confirmPassword"],
});

/* ── Phone Signup ── */
export const phoneSignupSchema = z.object({
  name:  z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d+$/, "Numbers only").length(10, "Must be 10 digits"),
});

/* ── OTP (4-digit — WhatsApp) ── */
export const otpSchema = z.object({
  otp: z.string().regex(/^\d{4}$/, "OTP must be exactly 4 digits"),
});

/* ── OTP (6-digit — email) ── */
export const emailOtpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "Code must be exactly 6 digits"),
});

/* ── Email Login ── */
export const emailLoginSchema = z.object({
  email:    z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

/* ── Phone Login ── */
export const phoneLoginSchema = z.object({
  phone: z.string().regex(/^\d+$/, "Numbers only").length(10, "Must be 10 digits"),
});
export type PhoneLoginInput = z.infer<typeof phoneLoginSchema>;

/* ── Reset Password (includes email + OTP fields) ── */
export const resetPasswordSchema = z.object({
  email:           z.string().email("Valid email required"),
  otp:             z.string().regex(/^\d{6}$/, "Must be a 6-digit code"),
  password:        strongPassword,
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path:    ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

/* ── Phone ── */
export const phoneSchema = z
  .string()
  .regex(/^\d+$/, "Numbers only")
  .length(10, "Must be 10 digits");

/* ── Admin Doctor Management ── */
export const doctorProfileSchema = z.object({
  fullName:          z.string().min(2),
  specialization:    z.string().min(2),
  licenseNumber:     z.string().min(2),
  yearsOfExperience: z.number().int().nonnegative().optional(),
  bio:               z.string().optional(),
  clinicAddress:     z.string().optional(),
  clinicGeoLat:      z.number().min(-90).max(90).optional(),
  clinicGeoLng:      z.number().min(-180).max(180).optional(),
  consultationFee:   z.number().int().nonnegative(),
  availability:      z.record(z.array(z.string())).optional(),
  verificationStatus:z.enum(["pending", "approved", "rejected"]).optional(),
});

export const doctorCreateSchema = z.object({
  profile: z.object({
    specialty:              z.string().min(1),
    yearsOfExperience:      z.number().int().nonnegative().optional(),
    profileImageUrl:        z.string().url().nullable().optional(),
    rmpRegistrationNumber:  z.string().min(1),
    rmpStateMedicalCouncil: z.string().min(1),
    verificationStatus:     DoctorVerificationSchema.optional(),
  }),
});

export const doctorUpdateSchema = z.object({
  profile: z.object({
    specialty:          z.string().min(1).optional(),
    yearsOfExperience:  z.number().int().nonnegative().optional(),
    verificationStatus: DoctorVerificationSchema.optional(),
    profileImageUrl:    z.string().url().nullable().optional(),
  }).optional(),
});

export const doctorFormSchema = z.object({
  name:      z.string().min(2),
  email:     z.string().email(),
  npi:       z.string().regex(/^\d{7,10}$/),
  specialty: z.string().min(2),
  city:      z.string().min(2),
  status:    z.enum(["active", "inactive"]),
});