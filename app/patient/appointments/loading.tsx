function AppointmentsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="h-8 w-64 rounded bg-gray-200" />
        <div className="h-4 w-96 rounded bg-gray-200" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 border-b p-4">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>

        {/* Rows */}
        {[1, 2, 3].map((row) => (
          <div
            key={row}
            className="grid grid-cols-4 gap-4 border-b p-4 last:border-none"
          >
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-4 w-48 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded-full bg-gray-200" />
            <div className="h-8 w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return( <AppointmentsSkeleton />);
};