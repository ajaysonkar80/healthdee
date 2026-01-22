"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailSignupStep } from "./EmailSignupStep";
import { PhoneSignupStep } from "./PhoneSignupStep";
import { OtpStep } from "./OtpStep";
import { EmailVerificationStep } from "./EmailVerificationStep";
import { Button } from "@/components/shared/Button";

type Step = "EMAIL" | "PHONE" | "OTP" | "EMAIL_VERIFY";

export function SignupForm() {
  const [step, setStep] = useState<Step>("EMAIL");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  function handleOtpVerified() {
    router.push("/select-role");
  }

  function handleEmailSignupDone() {
    if (process.env.NODE_ENV === "development") {
      router.push("/select-role");
    } else {
      setStep("EMAIL_VERIFY");
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      {/* 🔹 SIGNUP METHOD SELECTOR */}
      {(step === "EMAIL" || step === "PHONE") && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStep("EMAIL")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              step === "EMAIL"
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Email
          </button>

          <button
            type="button"
            onClick={() => setStep("PHONE")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              step === "PHONE"
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Phone
          </button>
        </div>
      )}

      {/* 🔹 STEP RENDERING */}
      {step === "EMAIL" && (
        <EmailSignupStep onSuccess={handleEmailSignupDone} />
      )}

      {step === "PHONE" && (
        <PhoneSignupStep
          onOtpSent={(phone) => {
            setPhone(phone);
            setStep("OTP");
          }}
        />
      )}

      {step === "OTP" && (
        <OtpStep phone={phone} onVerified={handleOtpVerified} />
      )}

      {step === "EMAIL_VERIFY" && <EmailVerificationStep />}
    </div>
  );
}
