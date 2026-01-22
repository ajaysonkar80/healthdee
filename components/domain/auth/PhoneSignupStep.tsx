"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

export function PhoneSignupStep({
  onOtpSent,
}: {
  onOtpSent: (phone: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(data: any) {
    console.log("SEND OTP TO:", data.phone);
    onOtpSent(data.phone);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input label="Full Name" {...register("name")} />
      <Input label="Mobile Number" {...register("phone")} />

      {/* ✅ ALWAYS VISIBLE */}
      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending OTP..." : "Send OTP on WhatsApp"}
        </Button>
      </div>
    </form>
  );
}
