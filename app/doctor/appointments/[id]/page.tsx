// app/doctor/appointments/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, MapPin, Droplets,
         AlertTriangle, CalendarDays, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentDetailsSkeleton } from "./AppointmentsDetailsSkeleton";
// Inlined to avoid importing from server/repositories in a client component.
type PatientDetail = {
  fullName: string;
  email: string | null;
  phone: string | null;
  gender: string | null;
  bloodGroup: string | null;
  city: string | null;
  state: string | null;
  profileImageUrl: string | null;
  allergies: string | null;
  chronicConditions: string | null;
  abhaLinked: boolean;
};
type AppointmentFullDetail = {
  id: string;
  scheduledAt: Date;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  appointmentType: "new" | "follow-up";
  patientId: string;
  doctorId: string;
  createdAt: Date | null;
  patient: PatientDetail;
  doctor: { specialty: string; profileImageUrl: string | null };
};

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */
function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long", day: "numeric", month: "long",
    year: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
  }).format(new Date(date));
}

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  }).format(new Date(date));
}

const STATUS_BADGE: Record<string, string> = {
  PENDING:   "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-pink-100   text-pink-600",
  COMPLETED: "bg-green-100  text-green-700",
  CANCELLED: "bg-gray-100   text-gray-500",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Waiting", CONFIRMED: "In Progress",
  COMPLETED: "Completed", CANCELLED: "Cancelled",
};

/* -------------------------------------------------------
   Patient info row
------------------------------------------------------- */
function InfoRow({ icon, label, value }: {
  icon: React.ReactNode; label: string; value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-400">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   Main page
------------------------------------------------------- */
export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();

  const [data, setData]         = useState<AppointmentFullDetail | null>(null);
  const [loading, setLoading]   = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res  = await fetch(`/api/appointments/${id}`, { credentials: "include" });
        const json = await res.json();
        setData(json.data);
      } catch {
        setError("Failed to load appointment.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function callAction(action: "confirm" | "complete" | "cancel") {
    if (!id || actionId) return;
    setActionId(action);
    setError(null);
    try {
      const endpoint = action === "cancel" || action === "complete"
        ? `/api/appointments/${id}/${action}`
        : `/api/appointments/${id}/confirm`;

      const res = await fetch(endpoint, {
        method: "PATCH", credentials: "include",
      });

      if (!res.ok) {
        const j = await res.json();
        throw new Error(j?.error?.message ?? "Action failed");
      }

      // Re-fetch updated state
      const refreshed = await fetch(`/api/appointments/${id}`, { credentials: "include" });
      const json       = await refreshed.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setActionId(null);
    }
  }

  if (loading) return (
    <div className="p-6"><AppointmentDetailsSkeleton /></div>
  );

  if (!data) return (
    <div className="p-6">
      <Link href="/doctor/appointments" className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-pink-600">
        <ArrowLeft className="h-4 w-4" /> Back to appointments
      </Link>
      <p className="text-sm text-red-500">{error ?? "Appointment not found."}</p>
    </div>
  );

  const { patient, doctor, status, appointmentType } = data;
  const isMutable = status === "PENDING" || status === "CONFIRMED";

  return (
    <div className="space-y-6 p-6">
      {/* Back */}
      <Link href="/doctor/appointments"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-pink-600">
        <ArrowLeft className="h-4 w-4" /> Back to appointments
      </Link>

      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Appointment Details</h1>
          <p className="mt-1 font-mono text-xs text-gray-400">{data.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={STATUS_BADGE[status]}>
            {STATUS_LABEL[status] ?? status}
          </Badge>
          <Badge className={`border ${appointmentType === "follow-up"
            ? "border-blue-200 bg-blue-50 text-blue-600"
            : "border-gray-200 bg-gray-50 text-gray-600"}`}>
            {appointmentType === "follow-up" ? "Follow-Up" : "New"}
          </Badge>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Patient Card ──────────────────────────── */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {patient.profileImageUrl && (
                  <AvatarImage src={patient.profileImageUrl} alt={patient.fullName} />
                )}
                <AvatarFallback className="bg-pink-100 text-pink-600 text-lg font-semibold">
                  {getInitials(patient.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-gray-900">{patient.fullName}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {patient.gender && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 capitalize">
                      {patient.gender}
                    </span>
                  )}
                  {patient.bloodGroup && (
                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                      {patient.bloodGroup}
                    </span>
                  )}
                  {patient.abhaLinked && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                      ABHA Linked
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={<Mail className="h-4 w-4" />}    label="Email"  value={patient.email} />
              <InfoRow icon={<Phone className="h-4 w-4" />}   label="Phone"  value={patient.phone} />
              <InfoRow icon={<MapPin className="h-4 w-4" />}  label="Location"
                value={[patient.city, patient.state].filter(Boolean).join(", ") || null} />
              <InfoRow icon={<Droplets className="h-4 w-4" />} label="Blood Group" value={patient.bloodGroup} />
            </div>

            {/* Medical notes */}
            {(patient.allergies || patient.chronicConditions) && (
              <div className="space-y-3 rounded-lg border border-yellow-100 bg-yellow-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-yellow-800">
                  <AlertTriangle className="h-4 w-4" />
                  Medical Alerts
                </div>
                {patient.allergies && (
                  <div>
                    <p className="text-xs text-yellow-600">Allergies</p>
                    <p className="text-sm text-yellow-900">{patient.allergies}</p>
                  </div>
                )}
                {patient.chronicConditions && (
                  <div>
                    <p className="text-xs text-yellow-600">Chronic Conditions</p>
                    <p className="text-sm text-yellow-900">{patient.chronicConditions}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Appointment Card ───────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Appointment Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Scheduled</p>
                  <p className="text-sm font-medium text-gray-800">
                    {formatDateTime(data.scheduledAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Booked on</p>
                  <p className="text-sm font-medium text-gray-800">
                    {data.createdAt ? formatDate(data.createdAt) : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Specialty</p>
                  <p className="text-sm font-medium text-gray-800">{doctor.specialty}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {isMutable && (
              <div className="space-y-2 pt-4 border-t">
                {status === "PENDING" && (
                  <Button
                    className="w-full bg-pink-600 hover:bg-pink-700"
                    disabled={!!actionId}
                    onClick={() => callAction("confirm")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {actionId === "confirm" ? "Confirming…" : "Confirm Appointment"}
                  </Button>
                )}

                {status === "CONFIRMED" && (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!!actionId}
                    onClick={() => callAction("complete")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {actionId === "complete" ? "Completing…" : "Mark as Completed"}
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                  disabled={!!actionId}
                  onClick={() => callAction("cancel")}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  {actionId === "cancel" ? "Cancelling…" : "Cancel Appointment"}
                </Button>
              </div>
            )}

            {status === "COMPLETED" && (
              <p className="pt-4 text-center text-sm text-green-600 font-medium">
                ✓ Appointment completed
              </p>
            )}
            {status === "CANCELLED" && (
              <p className="pt-4 text-center text-sm text-gray-400">
                This appointment was cancelled.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}