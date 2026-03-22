// server/validators/auth.ts
import { z } from "zod";

/* ── Primitives ── */

export const strongPassword = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^a-zA-Z0-9]/, "Must contain a special character");

export const phoneSchema     = z.string().regex(/^\d+$/).length(10);
export const emailSchema     = z.string().trim().toLowerCase().email();
export const otpEmailSchema  = z.string().regex(/^\d{6}$/, "Must be a 6-digit code");
export const otpPhoneSchema  = z.string().regex(/^\d{4}$/, "Must be a 4-digit code");

/* ── Signup ── */

export const registerSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("email"), email: z.string().email(), password: z.string().min(8) }),
  z.object({ type: z.literal("phone"), phone: z.string().min(10) }),
]);

export type RegisterInput = z.infer<typeof registerSchema>;

// Full email signup (used in both server validator and client-side)
export const emailSignupSchema = z.object({
  name:            z.string().min(2, "Name must be at least 2 characters"),
  email:           emailSchema,
  password:        strongPassword,
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  path:    ["confirmPassword"],
  message: "Passwords do not match",
});

export type EmailSignupInput = z.infer<typeof emailSignupSchema>;

export const phoneSignupSchema = z.object({
  name:  z.string().min(2),
  phone: phoneSchema,
});

/* ── Email OTP verify (6-digit, used for email verification) ── */

export const emailOtpVerifySchema = z.object({
  email: emailSchema,
  otp:   otpEmailSchema,
});

/* ── Phone OTP verify (4-digit, used for WhatsApp) ── */

export const otpVerifySchema = z.object({
  otp: otpPhoneSchema,
});

/* ── Login ── */

export const loginSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("email"), email: z.string().email(), password: z.string().min(8) }),
  z.object({ type: z.literal("phone"), phone: z.string().min(10), otp: z.string().min(4) }),
]);

export type LoginInput = z.infer<typeof loginSchema>;

export const emailLoginSchema = z.object({
  email:    emailSchema,
  password: z.string().min(1),
});

export const phoneLoginSchema = z.object({ phone: phoneSchema });

/* ── Role selection ── */

export const selectRoleSchema = z.object({
  role: z.enum(["patient", "doctor"]),
});

/* ── Password reset ── */

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  email:           emailSchema,
  otp:             otpEmailSchema,
  password:        strongPassword,
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  path:    ["confirmPassword"],
  message: "Passwords do not match",
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;