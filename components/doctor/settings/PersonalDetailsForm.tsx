// components/doctor/settings/PersonalDetailsForm.tsx
"use client";

import { useRef, useState, useTransition } from "react";
import { updatePersonalDetailsAction } from "@/server/actions/doctorSettings.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

interface Profile {
  userName: string;
  email?: string | null;
  whatsappPhone?: string | null;
}

interface Props {
  profile: Profile | null;
}

export default function PersonalDetailsForm({ profile }: Props) {
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
        await updatePersonalDetailsAction(formData);
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
          <User size={16} />
          Personal Details
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your account-level name and contact info.
        </p>
      </CardHeader>

      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          {/* Display Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="name">
              Display Name
            </label>
            <Input
              label=""
              id="name"
              name="name"
              defaultValue={profile?.userName ?? ""}
              placeholder="Your full name"
              required
            />
            <p className="text-xs text-muted-foreground">
              This is shown in the sidebar and appointment records.
            </p>
          </div>

          {/* Email — read only */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="email">
              Email Address
            </label>
            <Input
              label=""
              id="email"
              name="email"
              defaultValue={profile?.email ?? ""}
              disabled
              className="bg-muted/50 text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Email is managed through authentication and cannot be changed here.
            </p>
          </div>

          {/* WhatsApp — read only */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="whatsapp">
              WhatsApp / Phone
            </label>
            <Input
              label=""
              id="whatsapp"
              defaultValue={profile?.whatsappPhone ?? ""}
              disabled
              className="bg-muted/50 text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Phone is linked to your OTP login and cannot be changed here.
            </p>
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