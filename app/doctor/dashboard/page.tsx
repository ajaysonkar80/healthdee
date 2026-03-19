// app/doctor/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { appointmentService } from "@/server/services/appointment.service";
import { doctorEarningService } from "@/server/services/doctor_earning.service";
import StatsSection from "@/components/doctor/dashboard/StatsSection";
import AppointmentQueue from "@/components/doctor/appointment/AppointmentQueue";
import CurrentlyConsulting from "@/components/doctor/dashboard/CurrentlyConsulting";
import UrgentNotifications from "@/components/doctor/dashboard/UrgentNotifications";

export default async function DoctorDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  const payload     = verifyAccessToken(token);
  const actorUserId = payload.sub as string;

  // Three parallel fetches:
  // 1. Dashboard stats + current consultation + pending list (appointments)
  // 2. Today's earnings (doctor_earnings table — no join needed)
  // 3. Appointment queue preview (up to 5 rows for the queue widget)
  const [dashStats, earningStats, queueResult] = await Promise.all([
    appointmentService
      .getDoctorDashboardStats(actorUserId)
      .catch(() => ({
        todayTotal: 0, todayCompleted: 0, pendingCount: 0,
        currentConsultation: null, pendingAppointments: [],
      })),

    doctorEarningService
      .getEarningsStats(actorUserId)
      .catch(() => ({
        today: 0, thisWeek: 0, thisMonth: 0, allTime: 0,
        totalCount: 0, patientCount: 0,
      })),

    appointmentService
      .listAppointmentsByDoctorWithPatient(actorUserId, { limit: 5 })
      .catch(() => ({ data: [], total: 0 })),
  ]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Today&apos;s Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {new Intl.DateTimeFormat("en-IN", {
            weekday: "long", day: "numeric",
            month: "long", year: "numeric",
          }).format(new Date())}
        </p>
      </div>

      {/* Stats cards */}
      <StatsSection
        stats={{
          todayTotal:     dashStats.todayTotal,
          todayCompleted: dashStats.todayCompleted,
          pendingCount:   dashStats.pendingCount,
          todayEarnings:  earningStats.today,
        }}
      />

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left col: queue + currently consulting */}
        <div className="space-y-6 lg:col-span-2">
          <AppointmentQueue
            appointments={queueResult.data}
            total={queueResult.total}
          />
          <CurrentlyConsulting
            consultation={dashStats.currentConsultation}
          />
        </div>

        {/* Right col: pending confirmations */}
        <UrgentNotifications
          pendingCount={dashStats.pendingCount}
          pendingAppointments={dashStats.pendingAppointments}
        />
      </div>
    </div>
  );
}