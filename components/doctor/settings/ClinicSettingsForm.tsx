// components/doctor/settings/ClinicSettingsForm.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Building2, Loader2 } from "lucide-react";
// Import the status type from your schema if available, 
// otherwise use the literal union
import type { DoctorVerificationStatus } from "@/db/schema";

interface Profile {
  isActive?: boolean | null;
  // FIX: Make specialty nullable to match DB/Service response
  specialty?: string | null; 
  consultationFee?: number | null;
  fullName?: string | null;
  // FIX: Use specific union type for status
  verificationStatus?: DoctorVerificationStatus | string | null;
}

interface Props {
  profile: Profile | null;
}

export default function ClinicSettingsForm({ profile }: Props) {
  const router = useRouter();
  
  // Initialize state with fallback for null profile
  const [isActive, setIsActive] = useState(profile?.isActive ?? true);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle(value: boolean) {
    setIsActive(value);
    setSuccess(false);
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/doctor/active", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ isActive: value }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error ?? "Failed to update status");
        }

        setSuccess(true);
        router.refresh();
      } catch (err) {
        setIsActive(!value);
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  const statusLabel = isActive ? "Active" : "Inactive";
  const statusColor = isActive ? "text-green-600" : "text-muted-foreground";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Building2 size={16} />
          Clinic & Availability
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Control whether patients can book appointments with you.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Accepting Appointments</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              When inactive, you won&apos;t appear in search results and new bookings will be blocked.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isPending && (
              <Loader2 size={14} className="animate-spin text-muted-foreground" />
            )}
            <span className={`text-sm font-medium ${statusColor}`}>
              {statusLabel}
            </span>
            <Switch
              checked={!!isActive} // Ensure boolean type
              onCheckedChange={handleToggle}
              disabled={isPending}
            />
          </div>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <p className="text-sm font-medium">Profile Summary</p>

          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Specialty</span>
              <span className="text-foreground font-medium">
                {profile?.specialty ?? "Not specified"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Consultation Fee</span>
              <span className="text-foreground font-medium">
                {profile?.consultationFee
                  ? `₹${profile.consultationFee}`
                  : "Not set"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Verification</span>
              <span
                className={`font-medium capitalize ${
                  profile?.verificationStatus === "verified"
                    ? "text-green-600"
                    : profile?.verificationStatus === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {profile?.verificationStatus ?? "pending"}
              </span>
            </div>
          </div>
        </div>

        {success && <p className="text-sm text-green-600 font-medium">Status updated successfully.</p>}
        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

        <p className="text-xs text-muted-foreground">
          To update specialty or consultation fee, go to the{" "}
          <a href="/doctor/settings/professional" className="underline underline-offset-2">Professional</a> tab.
        </p>
      </CardContent>
    </Card>
  );
}