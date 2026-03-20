// components/doctor/settings/SecuritySettingsForm.tsx
"use client";

import { useRef, useState, useTransition } from "react";
import { updateDoctorPreferencesAction } from "@/server/actions/doctorSettings.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, Bell } from "lucide-react";

interface Prefs {
  whatsappAlerts?:       boolean | null;
  smsNotifications?:     boolean | null;
  emailNotifications?:   boolean | null;
  appointmentReminders?: boolean | null;
}

interface Props {
  prefs: Prefs | null;
}

interface ToggleRowProps {
  label:       string;
  description: string;
  name:        string;
  checked:     boolean;
  onChange:    (val: boolean) => void;
}

function ToggleRow({ label, description, name, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      {/* Hidden input so FormData picks up false values */}
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <Switch
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
}

export default function SecuritySettingsForm({ prefs }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Local toggle state
  const [whatsapp,   setWhatsapp]   = useState(prefs?.whatsappAlerts       ?? true);
  const [sms,        setSms]        = useState(prefs?.smsNotifications      ?? false);
  const [email,      setEmail]      = useState(prefs?.emailNotifications    ?? true);
  const [reminders,  setReminders]  = useState(prefs?.appointmentReminders  ?? true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    // Manually build FormData from current toggle state
    const formData = new FormData();
    formData.set("whatsappAlerts",       whatsapp  ? "true" : "false");
    formData.set("smsNotifications",     sms       ? "true" : "false");
    formData.set("emailNotifications",   email     ? "true" : "false");
    formData.set("appointmentReminders", reminders ? "true" : "false");

    setSuccess(false);
    setError(null);

    startTransition(async () => {
      try {
        await updateDoctorPreferencesAction(formData);
        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell size={16} />
            Notification Preferences
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose how you want to be notified about appointments and updates.
          </p>
        </CardHeader>

        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-0">
            <ToggleRow
              label="WhatsApp Alerts"
              description="Receive appointment updates via WhatsApp"
              name="whatsappAlerts"
              checked={whatsapp}
              onChange={setWhatsapp}
            />
            <ToggleRow
              label="SMS Notifications"
              description="Receive SMS for bookings and cancellations"
              name="smsNotifications"
              checked={sms}
              onChange={setSms}
            />
            <ToggleRow
              label="Email Notifications"
              description="Receive email summaries and appointment confirmations"
              name="emailNotifications"
              checked={email}
              onChange={setEmail}
            />
            <ToggleRow
              label="Appointment Reminders"
              description="Get reminded 1 hour before your scheduled appointments"
              name="appointmentReminders"
              checked={reminders}
              onChange={setReminders}
            />

            <div className="pt-4 space-y-2">
              {success && (
                <p className="text-sm text-green-600">Preferences saved.</p>
              )}
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving…" : "Save Preferences"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security — change password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck size={16} />
            Security
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Change your login password
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/forgot-password">Change Password</a>
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium">Login Method</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Email + Password / WhatsApp OTP
              </p>
            </div>
            <span className="text-xs text-muted-foreground rounded-full border px-3 py-1">
              Active
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}