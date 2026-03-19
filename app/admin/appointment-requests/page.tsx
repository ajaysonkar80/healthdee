// app/admin/appointment-requests/page.tsx

import AppointmentRequestsClient from "./AppointmentRequestsClient";
import { appointmentService } from "@/server/services/appointment.service";
import type { AppointmentStatus } from "@/db/schema";

const PAGE_SIZE = 10;

const VALID_STATUSES: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

interface PageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
    from?: string;
    to?: string;
  }>;
}

export default async function AppointmentRequestsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page ?? 1));
  const offset = (page - 1) * PAGE_SIZE;

  const status = VALID_STATUSES.includes(params.status as AppointmentStatus)
    ? (params.status as AppointmentStatus)
    : undefined;

  const from = params.from ? new Date(params.from) : undefined;
  const to = params.to ? new Date(params.to) : undefined;

  const response = await appointmentService.listAllAppointments({
    limit: PAGE_SIZE,
    offset,
    status,
    from,
    to,
  });

  return (
    <AppointmentRequestsClient
      initialData={response.data}
      total={response.total}
      currentPage={page}
      currentStatus={status}
      currentFrom={params.from}
      currentTo={params.to}
    />
  );
}