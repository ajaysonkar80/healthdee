"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

import { EmailLoginStep } from "./EmailLoginStep";
import { PhoneLoginStep } from "./PhoneLoginStep";
import { LoginOtpStep } from "./LoginOtpStep";

type Step = "PHONE" | "EMAIL" | "OTP";

export function LoginForm() {
  const [step, setStep] = useState<Step>("PHONE");
  const [phone, setPhone] = useState("");

  const { login, loading } = useAuth();

  async function handleOtpVerified(role: "admin" | "doctor" | "patient") {
    // After OTP verification backend should return role
    // For now redirect logic handled in AuthContext
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-center">
        Welcome Back
      </h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        Log in to manage your practice and patients.
      </p>

      {/* Toggle */}
      <div className="mt-6 flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setStep("PHONE")}
          className={`flex-1 rounded-md py-2 text-sm ${
            step === "PHONE"
              ? "bg-white font-medium shadow"
              : "text-gray-500"
          }`}
        >
          📱 Mobile OTP
        </button>
        <button
          onClick={() => setStep("EMAIL")}
          className={`flex-1 rounded-md py-2 text-sm ${
            step === "EMAIL"
              ? "bg-white font-medium shadow"
              : "text-gray-500"
          }`}
        >
          ✉️ Email Login
        </button>
      </div>

      {/* Steps */}
      <div className="mt-6">
        {step === "PHONE" && (
          <PhoneLoginStep
            onOtpSent={(phone) => {
              setPhone(phone);
              setStep("OTP");
            }}
          />
        )}

        {step === "EMAIL" && 
          <EmailLoginStep />}


        {step === "OTP" && (
          <LoginOtpStep
            phone={phone}
            onVerified={handleOtpVerified}
          />
        )}
      </div>

      {loading && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Logging in...
        </p>
      )}

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        New to the platform?{" "}
        <Link
          href="/signup"
          className="font-medium text-pink-600"
        >
          Register as Doctor/Clinic
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
