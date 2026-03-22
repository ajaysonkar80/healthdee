// app/doctor/onboarding/page.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

/* ── Step data types ── */
type Step1 = { fullName: string; phone: string };
type Step2 = { specialty: string; degrees: string; experienceYears: string; bio: string; consultationFee: string; languages: string; tagline: string };
type Step3 = { rmpRegistrationNumber: string; rmpStateMedicalCouncil: string };

const STEPS = ["Personal Details", "Professional Details", "Clinic & Credentials"] as const;

export default function DoctorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [step1, setStep1] = useState<Step1>({ fullName: "", phone: "" });
  const [step2, setStep2] = useState<Step2>({ specialty: "", degrees: "", experienceYears: "", bio: "", consultationFee: "", languages: "", tagline: "" });
  const [step3, setStep3] = useState<Step3>({ rmpRegistrationNumber: "", rmpStateMedicalCouncil: "" });

  async function saveStep(stepData: Record<string, string>) {
    const res = await fetch("/api/doctor/profile", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(stepData),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json?.error ?? "Failed to save");
    }
  }

  function handleNext() {
    setError(null);

    // Basic validation
    if (step === 0 && !step1.fullName.trim()) { setError("Full name is required"); return; }
    if (step === 1 && !step2.specialty.trim()) { setError("Specialty is required"); return; }
    if (step === 2) {
      if (!step3.rmpRegistrationNumber.trim()) { setError("RMP registration number is required"); return; }
      if (!step3.rmpStateMedicalCouncil.trim()) { setError("State medical council is required"); return; }
    }

    startTransition(async () => {
      try {
        if (step === 0) {
          await saveStep({ fullName: step1.fullName });
          setStep(1);
        } else if (step === 1) {
          await saveStep({
            specialty:       step2.specialty,
            degrees:         step2.degrees,
            experienceYears: step2.experienceYears,
            bio:             step2.bio,
            consultationFee: step2.consultationFee,
            languages:       step2.languages,
            tagline:         step2.tagline,
          });
          setStep(2);
        } else {
          // Final step — save credentials then redirect
          await saveStep({
            rmpRegistrationNumber:  step3.rmpRegistrationNumber,
            rmpStateMedicalCouncil: step3.rmpStateMedicalCouncil,
          });
          router.push("/doctor/verification");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-pink-600">HealthDee</h1>
        <p className="text-sm text-gray-500">Doctor Registration</p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center justify-center gap-2 px-6 py-6 border-b bg-gray-50">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
              i < step  ? "bg-green-500 text-white" :
              i === step? "bg-pink-600 text-white"  :
                          "bg-gray-200 text-gray-400"
            }`}>
              {i < step ? <CheckCircle2 size={16} /> : i + 1}
            </div>
            <span className={`hidden text-sm sm:block ${i === step ? "font-medium text-gray-900" : "text-gray-400"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-8 ${i < step ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form body */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-lg px-6 py-8 space-y-5">

          {/* Step 1: Personal */}
          {step === 0 && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
                <p className="text-sm text-gray-500">How you&apos;ll appear on your profile</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name (with title) *</label>
                  <Input className="mt-1" placeholder="Dr. Rajesh Kumar" value={step1.fullName}
                    onChange={(e) => setStep1((s) => ({ ...s, fullName: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input className="mt-1" placeholder="10-digit mobile number" type="tel" value={step1.phone}
                    onChange={(e) => setStep1((s) => ({ ...s, phone: e.target.value }))} />
                </div>
              </div>
            </>
          )}

          {/* Step 2: Professional */}
          {step === 1 && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Professional Details</h2>
                <p className="text-sm text-gray-500">Shown on your public booking page</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Specialty *</label>
                  <Input className="mt-1" placeholder="e.g. General Physician, Cardiologist" value={step2.specialty}
                    onChange={(e) => setStep2((s) => ({ ...s, specialty: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Degrees</label>
                  <Input className="mt-1" placeholder="MBBS, MD" value={step2.degrees}
                    onChange={(e) => setStep2((s) => ({ ...s, degrees: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Years of Experience</label>
                  <Input className="mt-1" type="number" placeholder="5" value={step2.experienceYears}
                    onChange={(e) => setStep2((s) => ({ ...s, experienceYears: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Languages</label>
                  <Input className="mt-1" placeholder="Hindi, English" value={step2.languages}
                    onChange={(e) => setStep2((s) => ({ ...s, languages: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Consultation Fee (₹)</label>
                  <Input className="mt-1" type="number" placeholder="500" value={step2.consultationFee}
                    onChange={(e) => setStep2((s) => ({ ...s, consultationFee: e.target.value }))} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Tagline</label>
                  <Input className="mt-1" placeholder="Compassionate care for every patient" value={step2.tagline}
                    onChange={(e) => setStep2((s) => ({ ...s, tagline: e.target.value }))} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea rows={4} placeholder="Tell patients about your background and approach…"
                    value={step2.bio}
                    onChange={(e) => setStep2((s) => ({ ...s, bio: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none" />
                </div>
              </div>
            </>
          )}

          {/* Step 3: Credentials */}
          {step === 2 && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Clinic & Credentials</h2>
                <p className="text-sm text-gray-500">Required for verification by the HealthDee team</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">RMP Registration Number *</label>
                  <Input className="mt-1" placeholder="e.g. MCI-12345" value={step3.rmpRegistrationNumber}
                    onChange={(e) => setStep3((s) => ({ ...s, rmpRegistrationNumber: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">State Medical Council *</label>
                  <Input className="mt-1" placeholder="e.g. Maharashtra Medical Council" value={step3.rmpStateMedicalCouncil}
                    onChange={(e) => setStep3((s) => ({ ...s, rmpStateMedicalCouncil: e.target.value }))} />
                </div>
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm font-medium text-yellow-800">What happens next?</p>
                  <p className="mt-1 text-sm text-yellow-700">
                    Our team will verify your credentials within 1–3 business days.
                    You&apos;ll receive an email once your profile is approved and you can start accepting appointments.
                  </p>
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t px-6 py-4 flex items-center justify-between bg-white">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || isPending}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={isPending}>
          {isPending ? "Saving…" : step === 2 ? "Submit for Verification" : "Continue"}
        </Button>
      </div>
    </div>
  );
}