// app/admin/appointment-requests/page.tsx

import { AppointmentTable } from "@/components/admin/appointment-requests/AppointmentTable";
import { AppointmentPagination } from "@/components/admin/appointment-requests/AppointmentPagination";
import { appointmentService } from "@/server/services/appointment.service";

export default async function AppointmentRequestsPage() {
  const response = await appointmentService.listAllAppointments({
    limit: 20,
    offset: 0,
  });

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

      <AppointmentTable data={response.data} />

      <AppointmentPagination
        currentPage={1}
        totalResults={response.total}
      />
    </div>
  );
}
