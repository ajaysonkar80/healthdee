"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSignupSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

type PhoneSignupFormData = z.infer<typeof phoneSignupSchema>;

export function PhoneSignupStep({
  onOtpSent,
}: {
  onOtpSent: (phone: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneSignupFormData>({
    resolver: zodResolver(phoneSignupSchema),
  });

  async function onSubmit(data: PhoneSignupFormData) {
    console.log("SEND OTP TO:", data.phone);

    // No backend yet — directly proceed
    onOtpSent(data.phone);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input label="Full Name" {...register("name")} />
      {errors.name && (
        <p className="text-xs text-red-500">
          {errors.name.message}
        </p>
      )}

      <Input
        label="Mobile Number"
        inputMode="numeric"
        {...register("phone")}
      />
      {errors.phone && (
        <p className="text-xs text-red-500">
          {errors.phone.message}
        </p>
      )}

      {/* ✅ ALWAYS VISIBLE */}
      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending OTP..." : "Send OTP on WhatsApp"}
        </Button>
      </div>
    </form>
  );
}
