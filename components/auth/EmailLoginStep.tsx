"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// 1. Correct Import for App Router
import { useRouter } from "next/navigation"; 
import { emailLoginSchema } from "@/lib/validators";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

type FormData = z.infer<typeof emailLoginSchema>;

export function EmailLoginStep({
  onSuccess,
}: {
  onSuccess: (role: "patient" | "doctor") => void;
}) {
  // 2. Initialize the router hook at the top level
  const router = useRouter(); 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(emailLoginSchema),
  });

  function onSubmit(data: FormData) {
    console.log("EMAIL LOGIN:", data);
    
    const role = data.email.includes("doctor") ? "doctor" : "patient";
    onSuccess(role);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Email" {...register("email")} />
      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

      <PasswordInput label="Password" {...register("password")} />
      {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}

      <div className="text-right">
        <button
          type="button"
          // 3. This will now work because 'router' is defined in the component scope
          onClick={() => router.push("/forgot-password")}
          className="text-sm text-pink-600"
        >
          Forgot password?
        </button>
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}