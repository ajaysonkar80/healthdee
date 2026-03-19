// components/doctor/earnings/EarningsSummary.tsx
import type { EarningStats } from "@/server/repositories/doctor_earning.repo";

// EarningStats is a pure data type (no DB client), safe to import in server components.
// For client components use the inlined type instead.

function fmt(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

interface EarningsSummaryProps {
  stats: EarningStats;
}

export default function EarningsSummary({ stats }: EarningsSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Today"
        amount={fmt(stats.today)}
        note={`${stats.totalCount} total consultations`}
        highlight
      />
      <SummaryCard
        title="This Week"
        amount={fmt(stats.thisWeek)}
        note="Current week"
      />
      <SummaryCard
        title="This Month"
        amount={fmt(stats.thisMonth)}
        note="Calendar month"
      />
      <SummaryCard
        title="All Time"
        amount={fmt(stats.allTime)}
        note={`${stats.patientCount} patients served`}
      />
    </div>
  );
}

function SummaryCard({
  title,
  amount,
  note,
  highlight,
}: {
  title:      string;
  amount:     string;
  note:       string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl border bg-white p-5 ${
      highlight ? "border-pink-400" : "border-gray-200"
    }`}>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-900">{amount}</h2>
      <span className="mt-3 inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
        {note}
      </span>
    </div>
  );
}