// components/doctor/dashboard/StatsSection.tsx
import StatCard from "./StatCard";

export type DashboardStats = {
  todayTotal:     number;
  todayCompleted: number;
  pendingCount:   number;
  todayEarnings:  number;
};

interface StatsSectionProps {
  stats: DashboardStats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard
        title="Today's Appointments"
        value={String(stats.todayTotal)}
        badge={`${stats.pendingCount} pending confirmation`}
      />
      <StatCard
        title="Patients Seen Today"
        value={String(stats.todayCompleted)}
        badge={
          stats.todayTotal > 0
            ? `${Math.round((stats.todayCompleted / stats.todayTotal) * 100)}% completion`
            : "No appointments yet"
        }
      />
      <StatCard
        title="Today's Earnings"
        value={`₹${stats.todayEarnings.toLocaleString("en-IN")}`}
        badge="Completed consultations"
        highlight
      />
    </div>
  );
}