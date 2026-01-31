"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

type OtpFormData = z.infer<typeof otpSchema>;

export function OtpStep({
  phone,
  onVerified,
}: {
  phone: string;
  onVerified: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  function onSubmit(data: OtpFormData) {
    // ✅ MOCK OTP CHECK
    if (data.otp !== "1234") {
      return;
    }

    onVerified();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <p className="text-sm text-gray-600">
        OTP sent on WhatsApp to <strong>{phone}</strong>
      </p>

      <Input
        label="Enter OTP"
        inputMode="numeric"
        maxLength={4}
        {...register("otp")}
      />
      {errors.otp && (
        <p className="text-xs text-red-500">
          {errors.otp.message}
        </p>
      )}

      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify & Continue"}
        </Button>
      </div>
    </form>
  );
}
