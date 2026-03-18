// app/doctor/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { appointmentService } from "@/server/services/appointment.service";
import StatsSection from "@/components/doctor/dashboard/StatsSection";
import AppointmentQueue from "@/components/doctor/appointment/AppointmentQueue";
import CurrentlyConsulting from "@/components/doctor/dashboard/CurrentlyConsulting";
import UrgentNotifications from "@/components/doctor/dashboard/UrgentNotifications";

export default async function DoctorDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  const payload = verifyAccessToken(token);
  const actorUserId = payload.sub as string;

  // Fetch today's appointments for the queue preview (max 5)
  const result = await appointmentService
    .listAppointmentsByDoctorWithPatient(actorUserId, { limit: 5 })
    .catch(() => ({ data: [], total: 0 }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Today&apos;s Overview
        </h1>
      </div>

      <StatsSection />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AppointmentQueue appointments={result.data} total={result.total} />
          <CurrentlyConsulting />
        </div>
        <UrgentNotifications />
      </div>
    </div>
  );
}