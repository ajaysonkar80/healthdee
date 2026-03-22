// components/auth/ResetPasswordForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordData } from "@/server/validators/auth";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetPasswordForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const email        = searchParams.get("email") ?? "";

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess]         = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<ResetPasswordData>({ resolver: zodResolver(resetPasswordSchema) });

  async function onSubmit(data: ResetPasswordData) {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/password/reset", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, otp: data.otp, password: data.password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json?.error ?? "Invalid or expired code. Please try again.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <span className="text-2xl">✓</span>
        </div>
        <p className="font-medium text-gray-900">Password changed successfully</p>
        <p className="text-sm text-gray-500">Redirecting you to login…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {email && (
        <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
          Resetting password for <strong>{email}</strong>
        </p>
      )}

      <div>
        <Input
          placeholder="6-digit code from your email"
          maxLength={6}
          {...register("otp")}
        />
        {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp.message}</p>}
      </div>

      <div>
        <PasswordInput placeholder="New password" {...register("password")} />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <PasswordInput placeholder="Confirm new password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      {serverError && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Changing password…" : "Change password"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        <Link href="/forgot-password" className="font-medium text-pink-600 hover:underline">
          Resend code
        </Link>
      </p>
    </form>
  );
}