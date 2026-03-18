// app/doctor/appointments/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { verifyAccessToken } from "@/server/utils/jwt";
import { appointmentService } from "@/server/services/appointment.service";
import AppointmentQueue from "@/components/doctor/appointment/AppointmentQueue";
import { AppointmentQueueSkeleton } from "./AppointmentQueueSkeleton";
import type { AppointmentStatus } from "@/db/schema";

const PAGE_LIMIT = 10;

const FILTERS: { label: string; value: string }[] = [
  { label: "All",       value: ""          },
  { label: "Pending",   value: "PENDING"   },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Completed", value: "COMPLETED" },
];

interface SearchParams {
  status?: string;
  page?: string;
}

// ── URL-driven pagination ──────────────────────────────
function PaginationBar({
  currentPage,
  totalPages,
  baseHref,
}: {
  currentPage: number;
  totalPages: number;
  baseHref: string;
}) {
  if (totalPages <= 1) return null;

  function pageHref(p: number) {
    const url = new URL(baseHref, "http://x");
    url.searchParams.set("page", String(p));
    return `${url.pathname}?${url.searchParams.toString()}`;
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-2 text-sm">
      {currentPage > 1 && (
        <Link href={pageHref(currentPage - 1)}
          className="rounded-full border px-3 py-1 text-gray-600 hover:bg-gray-50">
          ← Prev
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link key={p} href={pageHref(p)}
          className={`rounded-full border px-3 py-1 transition ${
            p === currentPage
              ? "bg-pink-600 text-white border-pink-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}>
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={pageHref(currentPage + 1)}
          className="rounded-full border px-3 py-1 text-gray-600 hover:bg-gray-50">
          Next →
        </Link>
      )}
    </div>
  );
}

export default async function DoctorAppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");
  const payload = verifyAccessToken(token);
  const actorUserId = payload.sub as string;

  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const validStatuses: AppointmentStatus[] = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
  const status = validStatuses.includes(params.status as AppointmentStatus)
    ? (params.status as AppointmentStatus)
    : undefined;

  const result = await appointmentService
    .listAppointmentsByDoctorWithPatient(actorUserId, {
      limit:  PAGE_LIMIT,
      offset: (page - 1) * PAGE_LIMIT,
      status,
    })
    .catch(() => ({ data: [], total: 0 }));

  const totalPages = Math.ceil(result.total / PAGE_LIMIT);

  // Build href for pagination (preserves status filter)
  const baseHref = status
    ? `/doctor/appointments?status=${status}`
    : "/doctor/appointments";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your upcoming and past appointments
          </p>
        </div>
      </div>

      {/* Filters — URL-driven */}
      <div className="flex flex-wrap gap-3">
        {FILTERS.map((f) => {
          const href = f.value
            ? `/doctor/appointments?status=${f.value}`
            : "/doctor/appointments";
          const isActive = (status ?? "") === f.value;
          return (
            <Link
              key={f.value}
              href={href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {/* Queue */}
      <Suspense fallback={<AppointmentQueueSkeleton />}>
        <AppointmentQueue appointments={result.data} total={result.total} />
      </Suspense>

      {/* Pagination */}
      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        baseHref={baseHref}
      />
    </div>
  );
}