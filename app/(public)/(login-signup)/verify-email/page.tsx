"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    async function verify() {
      //console.log("Verifying token:", token);

      // DEV MODE: assume success
      await new Promise((r) => setTimeout(r, 1000));

      // ✅ AFTER EMAIL VERIFIED
      router.replace("/select-role");
    }

    if (token) {
      verify();
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-600">
        Verifying your email…
      </p>
    </div>
  );
}
