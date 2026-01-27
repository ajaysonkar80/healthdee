"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { phoneLoginSchema } from "@/lib/validators";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

type FormData = z.infer<typeof phoneLoginSchema>;

export function PhoneLoginStep({
  onOtpSent,
}: {
  onOtpSent: (phone: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(phoneLoginSchema),
  });

  function onSubmit(data: FormData) {
    console.log("SEND LOGIN OTP TO:", data.phone);
    onOtpSent(data.phone);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Mobile Number"
        inputMode="numeric"
        {...register("phone")}
      />
      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending OTP..." : "Send OTP"}
      </Button>
    </form>
  );
}
