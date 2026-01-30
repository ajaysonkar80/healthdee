"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailSignupStep } from "./EmailSignupStep";
import { PhoneSignupStep } from "./PhoneSignupStep";
import { OtpStep } from "./OtpStep";
import { EmailVerificationStep } from "./EmailVerificationStep";
import { Button } from "@/components/ui/Button";
import Link from 'next/link'
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
    
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
      {/* 🔹 SIGNUP METHOD SELECTOR */}
      {/* 🔹 GREETING */}
      <div className="mb-4 text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Sign up to continue
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create an account to get started
        </p>
      </div>
      {
      (step === "EMAIL" || step === "PHONE") && (
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

      <div className="mt-6 text-center text-sm text-gray-500">
  Already registered?{" "}
  <Link href="/login" className="font-medium text-pink-600">
    Login here
  </Link>

        <div className="mt-3 flex justify-center gap-4 text-xs">
    <Link href="/privacy" className="hover:underline">
      Privacy Policy
    </Link>
    <Link href="/terms" className="hover:underline">
      Terms of Service
    </Link>
  </div>
  </div>
    </div>

    
  );
}
