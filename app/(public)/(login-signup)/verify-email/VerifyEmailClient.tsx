// app/(public)/(login-signup)/verify-email/VerifyEmailClient.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { EmailVerificationStep } from "@/components/auth/EmailVerificationStep";

export function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const email        = searchParams.get("email");

  useEffect(() => {
    // No email param means they navigated here directly — not allowed
    if (!email) router.replace("/signup");
  }, [email, router]);

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-bold text-pink-600">HealthDee</h1>
        </div>
        <EmailVerificationStep email={email} />
      </div>
    </div>
  );
}