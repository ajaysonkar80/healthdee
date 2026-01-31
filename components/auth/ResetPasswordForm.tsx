"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { resetPasswordSchema } from "@/lib/validators";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } =
    useForm<ResetPasswordData>({
      resolver: zodResolver(resetPasswordSchema),
    });

  function onSubmit() {
    alert("Password changed successfully");
    router.push("/login");
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
    <form className="bg-white p-6 rounded-xl space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-lg font-semibold text-center">Reset Password</h1>

      <PasswordInput label="New Password" {...register("password")} />
      {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}

      <PasswordInput label="Confirm New Password" {...register("confirmPassword")} />
      {errors.confirmPassword && (
        <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
      )}

      <Button type="submit">
        Change Password
      </Button>
    </form>
    </div>
  );
}
