"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log("SEND RESET EMAIL TO:", data.email);

    // mock email sent
    router.push("/reset-password");
  }

  return (
    <form className="bg-white p-6 rounded-xl space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-lg font-semibold text-center">Forgot Password</h1>

      <Input label="Email address" {...register("email")} />

      <Button type="submit">
        Send reset link
      </Button>
    </form>
  );
}
             