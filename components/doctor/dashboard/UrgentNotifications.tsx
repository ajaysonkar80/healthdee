// components/doctor/dashboard/UrgentNotifications.tsx
// Renamed internally to "Pending Confirmations" — no emergency flag
// exists in the schema, so we show appointments awaiting confirmation.
import Link from "next/link";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";

type PendingAppointment = {
  id:          string;
  scheduledAt: Date;
  patientName: string;
};

interface UrgentNotificationsProps {
  pendingCount:        number;
  pendingAppointments: PendingAppointment[];
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour:   "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

export default function UrgentNotifications({
  pendingCount,
  pendingAppointments,
}: UrgentNotificationsProps) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Pending Confirmations</h3>
        {pendingCount > 0 && (
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
            {pendingCount > 99 ? "99+" : pendingCount}
          </span>
        )}
      </div>

      {pendingCount === 0 ? (
        /* Empty state */
        <div className="mt-6 flex flex-col items-center gap-2 py-4 text-center">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
          <p className="text-sm font-medium text-gray-600">All caught up!</p>
          <p className="text-xs text-gray-400">
            No appointments waiting for confirmation.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-1 text-xs text-gray-400">
            {pendingCount} appointment{pendingCount !== 1 ? "s" : ""} need
            {pendingCount === 1 ? "s" : ""} your confirmation
          </p>

          <div className="mt-4 space-y-3">
            {pendingAppointments.map((appt) => (
              <Link
                key={appt.id}
                href={`/doctor/appointments/${appt.id}`}
                className="flex items-center justify-between rounded-lg border border-orange-100 bg-orange-50 px-3 py-3 transition hover:border-orange-300 hover:bg-orange-100"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {appt.patientName}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-orange-600">
                    <Clock className="h-3 w-3" />
                    {formatTime(appt.scheduledAt)}
                  </div>
                </div>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-orange-400" />
              </Link>
            ))}
          </div>

          {pendingCount > 5 && (
            <Link
              href="/doctor/appointments?status=PENDING"
              className="mt-4 flex items-center justify-center gap-1 text-xs font-medium text-pink-600 hover:underline"
            >
              View all {pendingCount} pending
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </>
      )}
    </div>
  );
}