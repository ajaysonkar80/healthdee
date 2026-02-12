"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgetPasswordForm() {
  const router = useRouter();

  const { register, handleSubmit } =
    useForm<ForgotPasswordFormData>();

  async function onSubmit(data: ForgotPasswordFormData) {
    const res = await fetch("/api/auth/password/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Failed to send OTP");
      return;
    }

    router.push(`/reset-password?email=${data.email}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        label="Email address"
        type="email"
        placeholder="Email address"
        {...register("email", { required: true })}
      />

      <Button type="submit" className="w-full">
        Send OTP
      </Button>
    </form>
  );
}
