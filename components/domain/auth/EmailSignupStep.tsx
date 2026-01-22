"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

export function EmailSignupStep({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(data: any) {
    // Temporary: no API, no backend
    console.log("EMAIL SIGNUP (NO BACKEND YET):", data);

    // ✅ ALWAYS move to EmailVerificationStep
    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input label="Full Name" {...register("name")} />
      <Input label="Email Address" type="email" {...register("email")} />
      <Input label="Password" type="password" {...register("password")} />
      <Input
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
      />

      {/* ✅ ALWAYS VISIBLE BUTTON */}
      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : "Continue"}
        </Button>
      </div>
    </form>
  );
}
