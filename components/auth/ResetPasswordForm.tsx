"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { resetPasswordSchema } from "@/server/validators/auth";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordData) {
    try {
      const res = await fetch("/api/auth/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          otp: data.otp,
          password: data.password,
        }),
      });

      if (!res.ok) {
        alert("Invalid OTP or expired");
        return;
      }

      alert("Password changed successfully");
      router.push("/login");
    } catch (err) {
      console.error("Reset error:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold text-center">
          Reset Password
        </h1>

        <Input label="OTP" {...register("otp")} />
        {errors.otp && (
          <p className="text-xs text-red-500">
            {errors.otp.message}
          </p>
        )}

        <PasswordInput
          label="New Password"
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
}
