// components/doctor/appointment/AppointmentQueue.tsx
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Inlined — client components must NOT import from server/repositories.
// Importing server-layer types into a "use client" file causes TypeScript
// to lose the props shape, making JSX treat the component as having no props.
export type AppointmentQueueRow = {
  id: string;
  scheduledAt: Date;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  appointmentType: "new" | "follow-up";
  patientId: string;
  patientName: string;
  patientEmail: string | null;
  patientProfileImageUrl: string | null;
};


/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Deterministic pastel colour from name — matches the design screenshot
const AVATAR_COLOURS = [
  "bg-pink-100 text-pink-600",
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-teal-100 text-teal-600",
];

function avatarColour(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLOURS[Math.abs(hash) % AVATAR_COLOURS.length];
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

/* -------------------------------------------------------
   Status Badge — matches design exactly
------------------------------------------------------- */
function StatusBadge({ status }: { status: AppointmentQueueRow["status"] }) {
  const map: Record<string, string> = {
    PENDING:   "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-pink-100   text-pink-600",
    COMPLETED: "bg-green-100  text-green-700",
    CANCELLED: "bg-gray-100   text-gray-500",
  };
  const label: Record<string, string> = {
    PENDING:   "WAITING",
    CONFIRMED: "IN-PROGRESS",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${map[status] ?? "bg-gray-100 text-gray-500"}`}>
      {label[status] ?? status}
    </span>
  );
}

/* -------------------------------------------------------
   Type Badge
------------------------------------------------------- */
function TypeBadge({ type }: { type: "new" | "follow-up" }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide
      ${type === "follow-up"
        ? "border-blue-200 bg-blue-50 text-blue-600"
        : "border-gray-200 bg-gray-50 text-gray-600"}`}>
      {type === "follow-up" ? "FOLLOW-UP" : "NEW"}
    </span>
  );
}

/* -------------------------------------------------------
   Active row highlight — mirrors the pink left-border
   on the in-progress row in the design
------------------------------------------------------- */
function rowClass(status: AppointmentQueueRow["status"]): string {
  if (status === "CONFIRMED") return "border-l-4 border-l-pink-500 bg-pink-50/40";
  return "";
}

/* -------------------------------------------------------
   Empty state
------------------------------------------------------- */
function EmptyState() {
  return (
    <div className="px-5 py-12 text-center text-sm text-gray-400">
      No appointments match the current filter.
    </div>
  );
}

/* -------------------------------------------------------
   Props
------------------------------------------------------- */
interface AppointmentQueueProps {
  appointments: AppointmentQueueRow[];
  total: number;
}

/* -------------------------------------------------------
   Component
------------------------------------------------------- */
export default function AppointmentQueue({ appointments, total }: AppointmentQueueProps) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h3 className="font-semibold text-gray-900">Appointment Queue</h3>
          {total > 0 && (
            <p className="mt-0.5 text-xs text-gray-400">{total} total appointment{total !== 1 ? "s" : ""}</p>
          )}
        </div>
        <Link href="/doctor/appointments" className="text-sm font-medium text-pink-600 hover:underline">
          View All Schedule
        </Link>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        <div className="col-span-4">Patient Name</div>
        <div className="col-span-2">Time</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {appointments.length === 0 && <EmptyState />}

        {appointments.map((item) => {
          const colour = avatarColour(item.patientName);
          return (
            <div key={item.id} className={`grid grid-cols-12 items-center gap-4 px-5 py-4 transition ${rowClass(item.status)}`}>
              {/* Patient */}
              <div className="col-span-4 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  {item.patientProfileImageUrl && (
                    <AvatarImage src={item.patientProfileImageUrl} alt={item.patientName} />
                  )}
                  <AvatarFallback className={`text-xs font-semibold ${colour}`}>
                    {getInitials(item.patientName)}
                  </AvatarFallback>
                </Avatar>
                <span className={`text-sm font-medium ${item.status === "CONFIRMED" ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                  {item.patientName}
                </span>
              </div>

              {/* Time */}
              <div className="col-span-2 text-sm font-semibold text-pink-500">
                {formatTime(item.scheduledAt)}
              </div>

              {/* Status */}
              <div className="col-span-2">
                <StatusBadge status={item.status} />
              </div>

              {/* Type */}
              <div className="col-span-2">
                <TypeBadge type={item.appointmentType} />
              </div>

              {/* Action */}
              <div className="col-span-2 flex justify-end">
                {item.status === "CONFIRMED" ? (
                  <Link
                    href={`/doctor/appointments/${item.id}`}
                    className="rounded-full bg-pink-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-pink-600 transition"
                  >
                    Resume
                  </Link>
                ) : (
                  <Link
                    href={`/doctor/appointments/${item.id}`}
                    className="text-sm font-medium text-pink-600 hover:underline"
                  >
                    View File
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}