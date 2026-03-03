// app/admin/appointment-requests/page.tsx

import AppointmentRequestsClient from "./AppointmentRequestsClient";
import { appointmentService } from "@/server/services/appointment.service";

export default async function AppointmentRequestsPage() {
  const response = await appointmentService.listAllAppointments({
    limit: 20,
    offset: 0,
  });

  return (
    <AppointmentRequestsClient
      initialData={response.data}
      total={response.total}
    />
  );
}