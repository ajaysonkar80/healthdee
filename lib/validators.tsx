import { z } from "zod";

export const emailSignupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const phoneSignupSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
});
