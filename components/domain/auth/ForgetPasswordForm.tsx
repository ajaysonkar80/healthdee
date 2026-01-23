"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log("SEND RESET EMAIL TO:", data.email);

    // mock email sent
    router.push("/reset-password");
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <h1 className="text-xl font-semibold text-center">
        Forgot your password?
      </h1>

      <p className="mt-1 text-center text-sm text-gray-500">
        Enter your email and we’ll send you a reset link.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
      >
        <Input
          label="Email address"
          type="email"
          {...register("email")}
        />

        <Button type="submit">
          Send reset link
        </Button>
      </form>
    </div>
  );
}
