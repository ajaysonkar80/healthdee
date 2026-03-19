// components/doctor/earnings/EarningsSummarySkeleton.tsx

export function EarningsSummarySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 animate-pulse">
          <div className="h-3 w-16 rounded bg-gray-200" />
          <div className="mt-3 h-7 w-28 rounded bg-gray-200" />
          <div className="mt-4 h-5 w-24 rounded-full bg-gray-100" />
        </div>
      ))}
    </div>
  );
}