"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { emailSignupSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";

type EmailSignupFormData = z.infer<typeof emailSignupSchema>;

// Extracting types for better readability
type Step = "EMAIL" | "PHONE" | "OTP" | "EMAIL_VERIFY";

interface EmailSignupStepProps {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

export function EmailSignupStep({ setStep }: EmailSignupStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
  });

  async function onSubmit(data: EmailSignupFormData) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          type: "email",
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Safe access using optional chaining on the parsed JSON
        throw new Error(result?.message || "Registration failed");
      }

      setStep("EMAIL_VERIFY");
    } catch (err: unknown) {
      // ✅ Refactored: Use 'unknown' and narrow the type
      console.error("Signup error:", err);
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Registration failed. Please try again.";

      alert(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Full Name" {...register("name")} />
      {errors.name?.message && (
        <p className="text-xs text-red-500">{errors.name.message}</p>
      )}

      <Input
        label="Email Address"
        type="email"
        {...register("email")}
      />
      {errors.email?.message && (
        <p className="text-xs text-red-500">{errors.email.message}</p>
      )}

      <PasswordInput
        label="Password"
        {...register("password")}
      />
      {errors.password?.message && (
        <p className="text-xs text-red-500">{errors.password.message}</p>
      )}

      <PasswordInput
        label="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword?.message && (
        <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
      )}

      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Please wait..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}