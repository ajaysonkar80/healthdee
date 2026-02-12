"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { resetPasswordWithOtpSchema } from "@/server/validators/auth";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ResetPasswordData = z.infer<typeof resetPasswordWithOtpSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordWithOtpSchema),
    defaultValues: {
      email: emailFromQuery,
    },
  });

  async function onSubmit(data: ResetPasswordData) {
    const res = await fetch("/api/auth/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Invalid OTP or expired");
      return;
    }

    alert("Password changed successfully");
    router.push("/login");
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <form
        className="bg-white p-6 rounded-xl space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-semibold text-center">
          Reset Password
        </h1>

        <Input
          label="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">
            {errors.email.message}
          </p>
        )}

        <Input
          label="OTP"
          {...register("otp")}
        />
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

        <Button type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
}
