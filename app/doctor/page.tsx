import StatsSection from '@/components/doctor/dashboard/StatsSection';
import AppointmentQueue from '@/components/doctor/appointment/AppointmentQueue';
import CurrentlyConsulting from '@/components/doctor/dashboard/CurrentlyConsulting';
import UrgentNotifications from '@/components/doctor/dashboard/UrgentNotifications';

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Today&apos;s Overview
        </h1>
      </div>

      {/* Stats */}
      <StatsSection />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <AppointmentQueue />
          <CurrentlyConsulting />
        </div>

        {/* Right */}
        <UrgentNotifications />
      </div>
    </div>
  );
}
