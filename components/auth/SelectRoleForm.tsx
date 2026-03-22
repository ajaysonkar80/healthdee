// components/auth/SelectRoleForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Role = "patient" | "doctor";

export function SelectRoleForm() {
  const router = useRouter();
  const [role, setRole]         = useState<Role | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleContinue() {
    if (!role) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/select-role", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ role }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error ?? "Something went wrong. Please try again.");
        return;
      }

      const nextStep = json.data?.nextStep;

      if (nextStep === "patient_dashboard") router.push("/patient");
      else if (nextStep === "doctor_onboarding") router.push("/doctor/onboarding");
      else if (nextStep === "doctor_verification") router.push("/doctor/verification");
      else router.push("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-gray-900">How will you use HealthDee?</h1>
        <p className="mt-1 text-sm text-gray-500">This sets up your experience — you can&apos;t change this later</p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setRole("patient")}
          className={`w-full rounded-xl border-2 px-4 py-5 text-left transition ${
            role === "patient"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">👤</span>
            <div>
              <p className="font-medium text-gray-900">Patient</p>
              <p className="mt-0.5 text-sm text-gray-500">Book appointments, manage prescriptions and health records</p>
            </div>
            {role === "patient" && (
              <span className="ml-auto text-pink-500">✓</span>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setRole("doctor")}
          className={`w-full rounded-xl border-2 px-4 py-5 text-left transition ${
            role === "doctor"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">🩺</span>
            <div>
              <p className="font-medium text-gray-900">Doctor</p>
              <p className="mt-0.5 text-sm text-gray-500">Consult patients, manage appointments and prescriptions</p>
            </div>
            {role === "doctor" && (
              <span className="ml-auto text-pink-500">✓</span>
            )}
          </div>
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <Button
        className="mt-6 w-full"
        onClick={handleContinue}
        disabled={!role || loading}
      >
        {loading ? "Setting up your account…" : "Continue"}
      </Button>
    </div>
  );
}