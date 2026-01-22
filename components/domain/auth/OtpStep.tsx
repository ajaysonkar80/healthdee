"use client";

import { useState } from "react";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

export function OtpStep({
  phone,
  onVerified,
}: {
  phone: string;
  onVerified: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  function verifyOtp() {
    setError("");

    // ✅ MOCK OTP
    if (otp !== "1234") {
      setError("Invalid OTP");
      return;
    }

    // ✅ SUCCESS → bubble up
    onVerified();
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        OTP sent to {phone}
      </p>

      <Input
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <Button onClick={verifyOtp}>
        Verify & Continue
      </Button>
    </div>
  );
}
