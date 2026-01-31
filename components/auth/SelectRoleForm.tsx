"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Role = "patient" | "doctor";

export function SelectRoleForm() {
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();

  function continueHandler() {
    if (!role) return;

    if (role === "patient") {
      router.push("/patient/dashboard");
    }

    if (role === "doctor") {
      router.push("/doctor/dashboard");
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold">
          Choose your role
        </h1>
        <p className="text-sm text-gray-600">
          This helps us set up your experience
        </p>
      </div>

      {/* Role Options */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setRole("patient")}
          className={`
            w-full rounded-xl border px-4 py-5 text-left
            ${
              role === "patient"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <p className="text-base font-medium">👤 Patient</p>
          <p className="text-sm text-gray-600">
            Book appointments and manage your health
          </p>
        </button>

        <button
          type="button"
          onClick={() => setRole("doctor")}
          className={`
            w-full rounded-xl border px-4 py-5 text-left
            ${
              role === "doctor"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <p className="text-base font-medium">🩺 Doctor</p>
          <p className="text-sm text-gray-600">
            Consult patients and manage appointments
          </p>
        </button>
      </div>

      {/* Continue Button */}
      <div className="pt-2">
        <Button
          onClick={continueHandler}
          disabled={!role}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
