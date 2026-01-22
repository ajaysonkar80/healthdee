"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailLoginStep } from "./EmailLoginStep";
import { PhoneLoginStep } from "./PhoneLoginStep";
import { LoginOtpStep } from "./LoginOtpStep";

type Step = "EMAIL" | "PHONE" | "OTP";

export function LoginForm() {
  const [step, setStep] = useState<Step>("EMAIL");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  function handleLoginSuccess(role: "patient" | "doctor") {
    if (role === "doctor") {
      router.push("/doctor/dashboard");
    } else {
      router.push("/patient/dashboard");
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      {/* Method selector */}
      {(step === "EMAIL" || step === "PHONE") && (
        <div className="flex gap-2">
          <button
            onClick={() => setStep("EMAIL")}
            className={`flex-1 py-2 rounded-lg ${
              step === "EMAIL"
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setStep("PHONE")}
            className={`flex-1 py-2 rounded-lg ${
              step === "PHONE"
                ? "bg-pink-100 text-pink-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Phone
          </button>
        </div>
      )}

      {step === "EMAIL" && (
        <EmailLoginStep onSuccess={handleLoginSuccess} />
      )}

      {step === "PHONE" && (
        <PhoneLoginStep
          onOtpSent={(phone) => {
            setPhone(phone);
            setStep("OTP");
          }}
        />
      )}

      {step === "OTP" && (
        <LoginOtpStep
          phone={phone}
          onVerified={handleLoginSuccess}
        />
      )}
    </div>
  );
}
