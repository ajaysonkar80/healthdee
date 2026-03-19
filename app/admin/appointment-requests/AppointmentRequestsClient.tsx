// app/admin/appointment-requests/AppointmentRequestsClient.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppointmentTable } from "@/components/admin/appointment-requests/AppointmentTable";
import { AppointmentPagination } from "@/components/admin/appointment-requests/AppointmentPagination";
import { AppointmentFilters } from "@/components/admin/appointment-requests/AppointmentFilters";
import type { AppointmentRowData } from "@/components/admin/appointment-requests/AppointmentTableRow";
import type { AppointmentStatus } from "@/components/admin/appointment-requests/AppointmentStatusBadge";

const PAGE_SIZE = 10;

interface Props {
  initialData: AppointmentRowData[];
  total: number;
  currentPage: number;
  currentStatus?: AppointmentStatus;
  currentFrom?: string;
  currentTo?: string;
}

export default function AppointmentRequestsClient({
  initialData,
  total,
  currentPage,
  currentStatus,
  currentFrom,
  currentTo,
}: Props) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // ─── URL helpers ───────────────────────────────────────────────
  function buildURL(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams();

    const base: Record<string, string | undefined> = {
      page: currentPage > 1 ? String(currentPage) : undefined,
      status: currentStatus,
      from: currentFrom,
      to: currentTo,
    };

    const merged = { ...base, ...updates };

    for (const [key, value] of Object.entries(merged)) {
      if (value !== undefined && value !== "") {
        params.set(key, value);
      }
    }

    const qs = params.toString();
    return `/admin/appointment-requests${qs ? `?${qs}` : ""}`;
  }

  // ─── Filter change ──────────────────────────────────────────────
  function handleFilter(filters: {
    status?: AppointmentStatus;
    from?: string;
    to?: string;
  }) {
    const url = buildURL({
      page: "1", // always reset to page 1 when filters change
      status: filters.status,
      from: filters.from,
      to: filters.to,
    });
    startTransition(() => router.push(url));
  }

  function handleClearFilters() {
    startTransition(() =>
      router.push("/admin/appointment-requests")
    );
  }

  // ─── Pagination ─────────────────────────────────────────────────
  function handlePageChange(page: number) {
    const url = buildURL({ page: page === 1 ? undefined : String(page) });
    startTransition(() => router.push(url));
  }

  // ─── Actions ────────────────────────────────────────────────────
  async function acceptAppointment(id: string) {
    try {
      setLoadingId(id);
      setError(null);

      const res = await fetch(`/api/appointments/${id}/confirm`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to confirm appointment");
      }

      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  }

  async function rejectAppointment(id: string) {
    try {
      setLoadingId(id);
      setError(null);

      const res = await fetch(`/api/appointments/${id}/cancel`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to cancel appointment");
      }

      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  }

  const hasActiveFilters = !!(currentStatus || currentFrom || currentTo);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Appointment Requests
        </h1>
        <p className="text-sm text-muted-foreground">
          Review, approve, or reject patient bookings. {total > 0 && `${total} total.`}
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-4 text-red-500 hover:text-red-700"
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters */}
      <AppointmentFilters
        currentStatus={currentStatus}
        currentFrom={currentFrom}
        currentTo={currentTo}
        hasActiveFilters={hasActiveFilters}
        onFilter={handleFilter}
        onClear={handleClearFilters}
      />

      {/* Table */}
      <AppointmentTable
        data={initialData}
        onAccept={acceptAppointment}
        onReject={rejectAppointment}
        loadingId={loadingId}
        isRefreshing={isPending}
      />

      {/* Pagination */}
      <AppointmentPagination
        currentPage={currentPage}
        totalResults={total}
        pageSize={PAGE_SIZE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}