"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useState } from "react";
import { emailSignupSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";

type EmailSignupFormData = z.infer<typeof emailSignupSchema>;

// Extracting types for better readability
type Step = "EMAIL" | "PHONE" | "OTP" | "EMAIL_VERIFY";

interface EmailSignupStepProps {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  onEmailSubmit: (email: string) => void; // Added to fix the 'onEmailSubmit' does not exist error
}

export function EmailSignupStep({ setStep, onEmailSubmit }: EmailSignupStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: EmailSignupFormData) {
    if (isLoading) return; // Prevent double trigger
  setIsLoading(true);
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
// Inside onSubmit in EmailSignupStep.tsx
const result = await response.json();

if (!response.ok) {
  // FIX: Access the message from the error object
  const serverErrorMessage = result?.error?.message || result?.message || "Registration failed";
  throw new Error(serverErrorMessage);
}

      // Capture the email for the verification screen before changing steps
      onEmailSubmit(data.email); 
      setStep("EMAIL_VERIFY");
    } catch (err: unknown) {
      console.error("Signup error:", err);
      
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Registration failed. Please try again.";

      alert(errorMessage);
    } finally{
      setIsLoading(false);
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