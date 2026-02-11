"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { emailSignupSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";

type EmailSignupFormData = z.infer<typeof emailSignupSchema>;

export function EmailSignupStep({
  setStep,
}: {
  setStep: React.Dispatch<
    React.SetStateAction<
      "EMAIL" | "PHONE" | "OTP" | "EMAIL_VERIFY"
    >
  >;
}) {
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
        body: JSON.stringify({
          type: "email",
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Registration failed");
      }

      // Move to email verification step
      setStep("EMAIL_VERIFY");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Full Name" {...register("name")} />
      {errors.name && (
        <p className="text-xs text-red-500">
          {errors.name.message}
        </p>
      )}

      <Input
        label="Email Address"
        type="email"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-xs text-red-500">
          {errors.email.message}
        </p>
      )}

      <PasswordInput
        label="Password"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-xs text-red-500">
          {errors.password.message}
        </p>
      )}

      <PasswordInput
        label="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p className="text-xs text-red-500">
          {errors.confirmPassword.message}
        </p>
      )}

      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}
