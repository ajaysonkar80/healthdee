// components/doctor/settings/ProfessionalDetailsForm.tsx
"use client";

import { useRef, useState, useTransition } from "react";
import { updateProfessionalDetailsAction } from "@/server/actions/doctorSettings.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stethoscope } from "lucide-react";

interface Profile {
  fullName?:               string | null;
  specialty:               string;
  degrees?:                string | null;
  languages?:              string | null;
  tagline?:                string | null;
  experienceYears?:        number | null;
  bio?:                    string | null;
  consultationFee?:        number | null;
  rmpRegistrationNumber:   string;
  rmpStateMedicalCouncil:  string;
}

interface Props {
  profile: Profile | null;
}

export default function ProfessionalDetailsForm({ profile }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState<string | null>(null);

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
            {/* Full Name */}
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

            {/* Specialty */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="specialty">
                Specialty <span className="text-red-500">*</span>
              </label>
              <Input
                label=""
                id="specialty"
                name="specialty"
                defaultValue={profile?.specialty ?? ""}
                placeholder="General Physician"
                required
              />
            </div>

            {/* Degrees */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="degrees">
                Degrees
              </label>
              <Input
              label=""
                id="degrees"
                name="degrees"
                defaultValue={profile?.degrees ?? ""}
                placeholder="MBBS, MD"
              />
            </div>

            {/* Languages */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="languages">
                Languages
              </label>
              <Input
                label=""
                id="languages"
                name="languages"
                defaultValue={profile?.languages ?? ""}
                placeholder="Hindi, English"
              />
            </div>

            {/* Experience */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="experienceYears">
                Years of Experience
              </label>
              <Input
                label=""
                id="experienceYears"
                name="experienceYears"
                type="number"
                min={0}
                max={60}
                defaultValue={profile?.experienceYears ?? ""}
                placeholder="5"
              />
            </div>

            {/* Consultation Fee */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="consultationFee">
                Consultation Fee (₹)
              </label>
              <Input
                label=""
                id="consultationFee"
                name="consultationFee"
                type="number"
                min={0}
                defaultValue={profile?.consultationFee ?? ""}
                placeholder="500"
              />
            </div>

            {/* RMP Number */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="rmpRegistrationNumber">
                RMP Registration Number <span className="text-red-500">*</span>
              </label>
              <Input
                label=""
                id="rmpRegistrationNumber"
                name="rmpRegistrationNumber"
                defaultValue={profile?.rmpRegistrationNumber ?? ""}
                placeholder="MCI-12345"
                required
              />
            </div>

            {/* State Medical Council */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="rmpStateMedicalCouncil">
                State Medical Council <span className="text-red-500">*</span>
              </label>
              <Input
                label=""
                id="rmpStateMedicalCouncil"
                name="rmpStateMedicalCouncil"
                defaultValue={profile?.rmpStateMedicalCouncil ?? ""}
                placeholder="Maharashtra Medical Council"
                required
              />
            </div>
          </div>

          {/* Tagline — full width */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="tagline">
              Tagline
            </label>
            <Input
              label=""
              id="tagline"
              name="tagline"
              defaultValue={profile?.tagline ?? ""}
              placeholder="Compassionate care for every patient"
            />
          </div>

          {/* Bio — full width */}
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

          {/* Feedback */}
          {success && (
            <p className="text-sm text-green-600">Changes saved successfully.</p>
          )}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}