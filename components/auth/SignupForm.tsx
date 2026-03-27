"use client";

import { useState } from "react";
import { EmailSignupStep } from "./EmailSignupStep";
import { PhoneSignupStep } from "./PhoneSignupStep";
import { OtpStep } from "./OtpStep";
import { EmailVerificationStep } from "./EmailVerificationStep";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Step = "EMAIL" | "PHONE" | "OTP" | "EMAIL_VERIFY";

export function SignupForm() {
  const [step, setStep] = useState<Step>("EMAIL");
  const [userEmail, setUserEmail] = useState(""); // Track email for the next screen

  // Store full signup data for phone flow
  const [phoneSignupData, setPhoneSignupData] = useState<{
    name: string;
    phone: string;
  } | null>(null);

  function handleOtpVerified() {
    setStep("EMAIL_VERIFY");
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Sign up to continue</h1>
        <p className="mt-1 text-sm text-gray-500">Create an account to get started</p>
      </div>

      {(step === "EMAIL" || step === "PHONE") && (
        <div className="mb-6 flex gap-2">
          <Button
            type="button"
            variant={step === "EMAIL" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setStep("EMAIL")}
          >Email</Button>
          <Button
            type="button"
            variant={step === "PHONE" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setStep("PHONE")}
          >Phone</Button>
        </div>
      )}

      {step === "EMAIL" && (
        <EmailSignupStep 
          setStep={setStep} 
          onEmailSubmit={(email) => setUserEmail(email)} 
        />
      )}

      {step === "PHONE" && (
        <PhoneSignupStep
          onOtpSentAction={(data) => {
            setPhoneSignupData(data);
            setStep("OTP");
          }}
        />
      )}

      {step === "OTP" && phoneSignupData && (
        <OtpStep
          name={phoneSignupData.name}
          phone={phoneSignupData.phone}
          onVerified={handleOtpVerified}
        />
      )}

      {step === "EMAIL_VERIFY" && <EmailVerificationStep email={userEmail} />}

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login here
        </Link>
        <div className="mt-3 flex justify-center gap-4 text-xs">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}