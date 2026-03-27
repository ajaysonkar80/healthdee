import { z } from "zod";

/* -----------------------------------------------------
   Shared primitives
----------------------------------------------------- */

export const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must include a lowercase letter")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number")
  .regex(/[^a-zA-Z0-9]/, "Password must include a special character");

export const phoneSchema = z
  .string()
  .regex(/^\d+$/, "Phone number must contain only numbers")
  .length(10, "Phone number must be exactly 10 digits");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email address");

/* -----------------------------------------------------
   Signup (Updated to include name and confirmPassword)
----------------------------------------------------- */

export const registerSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("email"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  }),
  z.object({
    type: z.literal("phone"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10),
  }),
]);

export type RegisterInput = z.infer<typeof registerSchema>;

/** * Reusable schema for the inner service validation 
 */
export const emailSignupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type EmailSignupInput = z.infer<typeof emailSignupSchema>;

export const phoneSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: phoneSchema,
});

/* -----------------------------------------------------
   Login
----------------------------------------------------- */

export const loginSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("email"),
    email: z.string().email(),
    password: z.string().min(8),
  }),
  z.object({
    type: z.literal("phone"),
    phone: z.string().min(10),
    otp: z.string().min(4),
  }),
]);

export type LoginInput = z.infer<typeof loginSchema>;

export const emailLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const phoneLoginSchema = z.object({
  phone: phoneSchema,
});

/* -----------------------------------------------------
   OTP
----------------------------------------------------- */

export const otpVerifySchema = z.object({
  otp: z.string().regex(/^\d{4}$/, "OTP must be exactly 4 digits"),
});

/* -----------------------------------------------------
   Reset password
----------------------------------------------------- */

export const resetPasswordSchema = z
  .object({
    otp: z.string().min(4, "OTP is required"),
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;