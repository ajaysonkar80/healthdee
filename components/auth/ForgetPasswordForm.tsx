"use client";

import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgetPasswordForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<ForgotPasswordFormData>();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    console.log("SEND RESET EMAIL TO:", data.email);

    // mock email sent
    router.push("/reset-password");
  };

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
        Send reset link
      </Button>
    </form>
  );
}
