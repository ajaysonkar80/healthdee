import AppointmentQueue from '@/components/doctor/appointment/AppointmentQueue';
import Link from 'next/link';

export default function DoctorAppointmentsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Appointments
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage today&apos;s and upcoming appointments
          </p>
        </div>

        <Link
          href="/doctor/appointments/new"
          className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
        >
          New Appointment
        </Link>
      </div>

      {/* Filters (UI only for now) */}
      <div className="flex flex-wrap gap-3">
        <FilterButton label="All" active />
        <FilterButton label="Waiting" />
        <FilterButton label="In-Progress" />
        <FilterButton label="Scheduled" />
      </div>

      {/* Appointment Table */}
      <AppointmentQueue />
    </div>
  );
}

function FilterButton({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active
          ? 'bg-pink-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
      }`}
    >
      {label}
    </button>
  );
}
