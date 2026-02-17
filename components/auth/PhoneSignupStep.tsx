"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSignupSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

type PhoneSignupFormData = z.infer<typeof phoneSignupSchema>;

export function PhoneSignupStep({
  onOtpSentAction,
}: {
  onOtpSentAction: (data: { name: string; phone: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneSignupFormData>({
    resolver: zodResolver(phoneSignupSchema),
  });

  async function onSubmit(data: PhoneSignupFormData) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "phone",
          name: data.name,
          phone: data.phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to send OTP");
      }

      onOtpSentAction({
        name: data.name,
        phone: data.phone,
      });
    } catch (err: unknown) {
      console.error("Phone signup error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      alert(message);
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
        label="Mobile Number"
        inputMode="numeric"
        {...register("phone")}
      />
      {errors.phone && (
        <p className="text-xs text-red-500">
          {errors.phone.message}
        </p>
      )}

      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Sending OTP..." : "Send OTP on WhatsApp"}
        </Button>
      </div>
    </form>
  );
}
