"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { emailLoginSchema } from "@/lib/validators";
import { useAuth } from "@/app/context/AuthContext";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof emailLoginSchema>;

export function EmailLoginStep() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(emailLoginSchema),
  });

  async function onSubmit(data: FormData) {
    try {
      await login(data.email, data.password);
      // ✅ Redirect handled automatically inside AuthContext
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Email" {...register("email")} />
      {errors.email && (
        <p className="text-xs text-red-500">
          {errors.email.message}
        </p>
      )}

      <PasswordInput label="Password" {...register("password")} />
      {errors.password && (
        <p className="text-xs text-red-500">
          {errors.password.message}
        </p>
      )}

      <div className="text-right">
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="text-sm text-pink-600"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" disabled={isSubmitting || loading}>
        {isSubmitting || loading
          ? "Logging in..."
          : "Login"}
      </Button>
    </form>
  );
}
