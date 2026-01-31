import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AppointmentFilters } from "@/components/admin/appointment-requests/AppointmentFilters";
import { AppointmentTable } from "@/components/admin/appointment-requests/AppointmentTable";
import { AppointmentPagination } from "@/components/admin/appointment-requests/AppointmentPagination";
import { AppointmentRowData } from "@/components/admin/appointment-requests/AppointmentTableRow";

const appointmentRequests: AppointmentRowData[] = [
  {
    id: "1",
    patientName: "Sarah Jenkins",
    patientEmail: "sarah.j@example.com",
    doctorName: "Dr. Michael Chen",
    date: "Oct 24, 2023",
    time: "10:30 AM",
    status: "REQUESTED",
  },
  {
    id: "2",
    patientName: "Robert Fox",
    patientEmail: "robert.fox@gmail.com",
    doctorName: "Dr. Elena Rodriguez",
    date: "Oct 24, 2023",
    time: "02:15 PM",
    status: "ACCEPTED",
  },
  {
    id: "3",
    patientName: "Linda Wright",
    patientEmail: "l.wright@outlook.com",
    doctorName: "Dr. Michael Chen",
    date: "Oct 23, 2023",
    time: "09:00 AM",
    status: "REJECTED",
  },
  {
    id: "4",
    patientName: "David Miller",
    patientEmail: "dmiller@company.com",
    doctorName: "Dr. Sarah Kim",
    date: "Oct 23, 2023",
    time: "04:45 PM",
    status: "REQUESTED",
  },
];

export default function AppointmentRequestsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Appointment Requests
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage incoming patient bookings for manual verification.
          </p>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <AppointmentFilters />

      {/* Table */}
      <AppointmentTable data={appointmentRequests} />

      {/* Pagination */}
      <AppointmentPagination currentPage={1} totalResults={1240} />
    </div>
  );
}
