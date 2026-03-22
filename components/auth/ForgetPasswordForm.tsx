// components/auth/ForgetPasswordForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const schema = z.object({ email: z.string().email("Please enter a valid email") });
type FormData = z.infer<typeof schema>;

export default function ForgetPasswordForm() {
  const router  = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent]               = useState(false);

  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/password/forgot", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: data.email }),
      });

      if (!res.ok) {
        const json = await res.json();
        setServerError(json?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      }, 1500);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <span className="text-2xl">✉️</span>
        </div>
        <p className="text-sm text-gray-600">
          If an account exists for <strong>{getValues("email")}</strong>, a reset code has been sent.
        </p>
        <p className="text-xs text-gray-400">Redirecting you to reset your password…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Your account email"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {serverError && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending code…" : "Send reset code"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Remembered it?{" "}
        <Link href="/login" className="font-medium text-pink-600 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}