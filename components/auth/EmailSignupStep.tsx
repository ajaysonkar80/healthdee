// components/auth/EmailSignupStep.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSignupSchema } from "@/lib/validators";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";

type EmailSignupFormData = z.infer<typeof emailSignupSchema>;

interface EmailSignupStepProps {
  // Called with the registered email so SignupForm can
  // pass it down to EmailVerificationStep
  onEmailRegistered: (email: string) => void;
}

export function EmailSignupStep({ onEmailRegistered }: EmailSignupStepProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
  });

  async function onSubmit(data: EmailSignupFormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name:            data.name,
          email:           data.email,
          password:        data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json?.error ?? "Registration failed. Please try again.");
        return;
      }

      // nextStep is either "verify_email" or "select_role" (feature flag)
      onEmailRegistered(data.email);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input label="Full Name" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Input label="Email Address" type="email" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <PasswordInput label="Password" {...register("password")} />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <PasswordInput label="Confirm Password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating account…" : "Continue"}
        </Button>
      </div>
    </form>
  );
}