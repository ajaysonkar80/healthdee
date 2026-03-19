// components/doctor/earnings/EarningsTableSkeleton.tsx

export function EarningsTableSkeleton() {
  return (
    <div className="rounded-xl border bg-white animate-pulse">
      <div className="border-b px-5 py-4">
        <div className="h-5 w-36 rounded bg-gray-200" />
      </div>
      <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-5 py-3">
        {["col-span-3","col-span-3","col-span-2","col-span-2","col-span-2"].map((c, i) => (
          <div key={i} className={`${c} h-3 rounded bg-gray-200`} />
        ))}
      </div>
      <div className="divide-y">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-12 items-center gap-4 px-5 py-4">
            <div className="col-span-3 h-4 w-24 rounded bg-gray-200" />
            <div className="col-span-3 h-4 w-28 rounded bg-gray-200" />
            <div className="col-span-2 h-6 w-16 rounded-full bg-gray-200" />
            <div className="col-span-2 h-4 w-16 rounded bg-gray-200" />
            <div className="col-span-2 h-6 w-16 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}