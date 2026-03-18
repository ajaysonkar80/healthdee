// components/doctor/appointment/AppointmentDetailsSkeleton.tsx

export function AppointmentDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* back link */}
      <div className="h-4 w-32 rounded bg-gray-200" />

      {/* header */}
      <div className="space-y-2">
        <div className="h-7 w-56 rounded bg-gray-200" />
        <div className="h-4 w-40 rounded bg-gray-100" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient card */}
        <div className="lg:col-span-2 space-y-4 rounded-xl border bg-white p-6">
          <div className="h-5 w-36 rounded bg-gray-200" />
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-3 w-32 rounded bg-gray-100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 w-20 rounded bg-gray-100" />
                <div className="h-4 w-28 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Appointment card */}
        <div className="space-y-4 rounded-xl border bg-white p-6">
          <div className="h-5 w-36 rounded bg-gray-200" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 w-24 rounded bg-gray-100" />
              <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
          ))}
          <div className="pt-4 space-y-2">
            <div className="h-10 w-full rounded-lg bg-gray-200" />
            <div className="h-10 w-full rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}