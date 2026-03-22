// app/(public)/(login-signup)/verify-email/page.tsx
import { Suspense } from "react";
import { VerifyEmailClient } from "./VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-sm text-gray-500">Loading…</p></div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}