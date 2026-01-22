"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { emailSignupSchema } from "@/lib/validators";
import { Input } from "@/components/shared/Input";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Button } from "@/components/shared/Button";

type EmailSignupFormData = z.infer<typeof emailSignupSchema>;

export function EmailSignupStep({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
  });

  async function onSubmit(data: EmailSignupFormData) {
    console.log("EMAIL SIGNUP (NO BACKEND YET):", data);

    // ✅ Always move to EmailVerificationStep
    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Full Name */}
      <Input label="Full Name" {...register("name")} />
      {errors.name && (
        <p className="text-xs text-red-500">
          {errors.name.message}
        </p>
      )}

      {/* Email */}
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

      {/* Password */}
      <PasswordInput
        label="Password"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-xs text-red-500">
          {errors.password.message}
        </p>
      )}

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p className="text-xs text-red-500">
          {errors.confirmPassword.message}
        </p>
      )}

      {/* Submit */}
      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}
