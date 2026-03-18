// components/doctor/appointment/AppointmentQueueSkeleton.tsx

export function AppointmentQueueSkeleton() {
  return (
    <div className="rounded-xl border bg-white">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-5 py-3">
        {["col-span-4","col-span-2","col-span-2","col-span-2","col-span-2"].map((cls, i) => (
          <div key={i} className={`${cls} h-3 animate-pulse rounded bg-gray-200`} />
        ))}
      </div>
      <div className="divide-y">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-12 items-center gap-4 px-5 py-4">
            <div className="col-span-4 flex items-center gap-3">
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="col-span-2 h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div className="col-span-2 h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="col-span-2 h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="col-span-2 flex justify-end">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}