// components/auth/PhoneLoginStep.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PhoneLoginStepProps {
  onOtpSentAction: (phone: string) => void;
}

export function PhoneLoginStep({ onOtpSentAction }: PhoneLoginStepProps) {
  const [phone, setPhone]   = useState("");
  const [error, setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSendOtp() {
    const trimmed = phone.trim();
    if (!trimmed) { setError("Please enter your phone number."); return; }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/otp/request", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: trimmed }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error ?? "Failed to send OTP. Please try again.");
        return;
      }

      onOtpSentAction(trimmed);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="tel"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm
                     focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500
                     transition"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button onClick={handleSendOtp} className="w-full" disabled={loading}>
        {loading ? "Sending OTP…" : "Send OTP via WhatsApp"}
      </Button>

      <p className="text-center text-xs text-gray-400">
        We&apos;ll send a 4-digit code to your WhatsApp number.
      </p>
    </div>
  );
}