"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OtpStepProps {
  name: string;
  phone: string;
  onVerified: () => void;
}

export function OtpStep({
  name,
  phone,
  onVerified,
}: OtpStepProps) {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleVerify() {
    if (!otp || otp.length !== 4) {
      alert("Enter valid 4-digit OTP");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "/api/auth/phone/signup/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            phone,
            otp,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "OTP verification failed");
      }

      onVerified();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Verification failed";

      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground text-center">
        Enter the OTP sent to <span className="font-medium">{phone}</span>
      </div>

      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        inputMode="numeric"
        maxLength={4}
        placeholder="Enter 4-digit OTP"
        label="otp input"
      />

      <Button
        onClick={handleVerify}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Verifying..." : "Verify OTP"}
      </Button>
    </div>
  );
}
