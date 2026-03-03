'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppointmentTable } from "@/components/admin/appointment-requests/AppointmentTable";
import { AppointmentPagination } from "@/components/admin/appointment-requests/AppointmentPagination";
import type { AppointmentRowData } from "@/components/admin/appointment-requests/AppointmentTableRow";

interface Props {
  initialData: AppointmentRowData[];
  total: number;
}

export default function AppointmentRequestsClient({
  initialData,
  total,
}: Props) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function acceptAppointment(id: string) {
    try {
      setLoadingId(id);

      const res = await fetch(
        `/api/appointments/${id}/confirm`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to confirm appointment");
      }

      // Let server component refetch fresh data
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  }

  async function rejectAppointment(id: string) {
    try {
      setLoadingId(id);

      const res = await fetch(
        `/api/appointments/${id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to cancel appointment");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Appointments
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor all patient bookings.
        </p>
      </div>

      <AppointmentTable
        data={initialData}
        onAccept={acceptAppointment}
        onReject={rejectAppointment}
        loadingId={loadingId}
      />

      <AppointmentPagination
        currentPage={1}
        totalResults={total}
      />
    </div>
  );
}