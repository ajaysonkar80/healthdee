"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { otpSchema } from "@/lib/validators";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type FormData = z.infer<typeof otpSchema>;

export function LoginOtpStep({
  phone,
  onVerified,
}: {
  phone: string;
  onVerified: (role: "patient" | "doctor") => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(otpSchema),
  });

  function onSubmit(data: FormData) {
    if (data.otp !== "1234") return;

    // 🔹 MOCK ROLE
    const role = phone.endsWith("99") ? "doctor" : "patient";
    onVerified(role);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-gray-600">
        OTP sent to <strong>{phone}</strong>
      </p>

      <Input
        label="Enter OTP"
        inputMode="numeric"
        maxLength={4}
        {...register("otp")}
      />
      {errors.otp && <p className="text-xs text-red-500">{errors.otp.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        Verify & Login
      </Button>
    </form>
  );
}
