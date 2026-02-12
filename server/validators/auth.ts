import { z } from "zod";

/* -----------------------------------------------------
   Shared primitives
----------------------------------------------------- */

export const strongPassword = z
  .string()
  .min(8)
  .regex(/[a-z]/)
  .regex(/[A-Z]/)
  .regex(/[0-9]/)
  .regex(/[^a-zA-Z0-9]/);

export const phoneSchema = z
  .string()
  .regex(/^\d+$/)
  .length(10);

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email();

/* -----------------------------------------------------
   Signup
----------------------------------------------------- */

export const registerSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("email"),
    email: z.string().email(),
    password: z.string().min(8),
  }),
  z.object({
    type: z.literal("phone"),
    phone: z.string().min(10),
  }),
]);

export type RegisterInput = z.infer<typeof registerSchema>;

export const emailSignupSchema = z
  .object({
    name: z.string().min(2),
    email: emailSchema,
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
  });

export const phoneSignupSchema = z.object({
  name: z.string().min(2),
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
  password: z.string().min(1),
});

export const phoneLoginSchema = z.object({
  phone: phoneSchema,
});

/* -----------------------------------------------------
   OTP
----------------------------------------------------- */

export const otpVerifySchema = z.object({
  otp: z.string().regex(/^\d{4}$/),
});

/* -----------------------------------------------------
   Reset password
----------------------------------------------------- */

export const resetPasswordSchema = z
  .object({
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
  });

export const resetPasswordWithOtpSchema = z
  .object({
    email: emailSchema,
    otp: z.string().regex(/^\d{4}$/, "OTP must be 4 digits"),
    password: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
  });
