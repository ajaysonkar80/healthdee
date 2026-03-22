// components/auth/EmailVerificationStep.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  email: string;
}

export function EmailVerificationStep({ email }: Props) {
  const router    = useRouter();
  const [otp, setOtp]         = useState(["", "", "", "", "", ""]);
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(60);
  const inputRefs             = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown for resend button
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next   = ["", "", "", "", "", ""];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  async function handleSubmit() {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the 6-digit code"); return; }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/otp/verify-email", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, otp: code }),
      });

      const json = await res.json();
      if (!res.ok) { setError(json?.error ?? "Invalid code. Please try again."); return; }
      router.push("/select-role");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResendIn(60);
    setError(null);
    await fetch("/api/auth/register", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ resend: true, email }),
    }).catch(() => null);
  }

  return (
    <div className="space-y-6 text-center">
      <div>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-50">
          <span className="text-2xl">✉️</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Check your email</h2>
        <p className="mt-1 text-sm text-gray-500">
          We sent a 6-digit code to <strong>{email}</strong>
        </p>
      </div>

      {/* OTP input boxes */}
      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-12 w-10 rounded-lg border border-gray-200 text-center text-xl font-semibold focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button onClick={handleSubmit} className="w-full" disabled={loading}>
        {loading ? "Verifying…" : "Verify email"}
      </Button>

      <p className="text-sm text-gray-500">
        Didn&apos;t receive it?{" "}
        {resendIn > 0 ? (
          <span className="text-gray-400">Resend in {resendIn}s</span>
        ) : (
          <button
            onClick={handleResend}
            className="font-medium text-pink-600 hover:underline"
          >
            Resend code
          </button>
        )}
      </p>
    </div>
  );
}