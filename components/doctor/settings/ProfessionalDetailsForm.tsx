// components/doctor/settings/ProfessionalDetailsForm.tsx
"use client";

import { useRef, useState, useTransition } from "react";
import { updateProfessionalDetailsAction } from "@/server/actions/doctorSettings.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stethoscope } from "lucide-react";

// FIX: Align interface with Database/Service (nullable fields)
interface Profile {
  fullName?: string | null;
  specialty?: string | null; // Changed to nullable
  degrees?: string | null;
  languages?: string | null;
  tagline?: string | null;
  experienceYears?: number | null;
  bio?: string | null;
  consultationFee?: number | null;
  rmpRegistrationNumber?: string | null; // Changed to nullable
  rmpStateMedicalCouncil?: string | null; // Changed to nullable
}

interface Props {
  profile: Profile | null;
}

export default function ProfessionalDetailsForm({ profile }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    setSuccess(false);
    setError(null);
    startTransition(async () => {
      try {
        await updateProfessionalDetailsAction(formData);
        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Stethoscope size={16} />
          Professional Details
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Shown on your public profile and booking page.
        </p>
      </CardHeader>

      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="fullName">
                Full Name (with title)
              </label>
              <Input
              label=""
                id="fullName"
                name="fullName"
                defaultValue={profile?.fullName ?? ""}
                placeholder="Dr. Rajesh Kumar"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="specialty">
                Specialty <span className="text-red-500">*</span>
              </label>
              <Input
                id="specialty"
                label=""
                name="specialty"
                defaultValue={profile?.specialty ?? ""}
                placeholder="General Physician"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="degrees">
                Degrees
              </label>
              <Input
                id="degrees"
                label=""
                name="degrees"
                defaultValue={profile?.degrees ?? ""}
                placeholder="MBBS, MD"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="languages">
                Languages
              </label>
              <Input
                id="languages"
                label=""
                name="languages"
                defaultValue={profile?.languages ?? ""}
                placeholder="Hindi, English"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="experienceYears">
                Years of Experience
              </label>
              <Input
                id="experienceYears"
                label=""
                name="experienceYears"
                type="number"
                min={0}
                max={60}
                defaultValue={profile?.experienceYears ?? ""}
                placeholder="5"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="consultationFee">
                Consultation Fee (₹)
              </label>
              <Input
                id="consultationFee"
                name="consultationFee"
                label=""
                type="number"
                min={0}
                defaultValue={profile?.consultationFee ?? ""}
                placeholder="500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="rmpRegistrationNumber">
                RMP Registration Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="rmpRegistrationNumber"
                label=""
                name="rmpRegistrationNumber"
                defaultValue={profile?.rmpRegistrationNumber ?? ""}
                placeholder="MCI-12345"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="rmpStateMedicalCouncil">
                State Medical Council <span className="text-red-500">*</span>
              </label>
              <Input
                id="rmpStateMedicalCouncil"
                name="rmpStateMedicalCouncil"
                label=""
                defaultValue={profile?.rmpStateMedicalCouncil ?? ""}
                placeholder="Maharashtra Medical Council"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="tagline">
              Tagline
            </label>
            <Input
              id="tagline"
              label=""
              name="tagline"
              defaultValue={profile?.tagline ?? ""}
              placeholder="Compassionate care for every patient"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={profile?.bio ?? ""}
              rows={4}
              placeholder="Tell patients about your background, approach, and expertise…"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
          </div>

          {success && <p className="text-sm text-green-600 font-medium">Changes saved successfully.</p>}
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}