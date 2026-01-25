import StatCard from './StatCard';

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Appointments"
        value="24"
        badge="+10% vs yesterday"
      />

      <StatCard
        title="Patients Seen"
        value="14"
        badge="+5% on track"
      />

      <StatCard
        title="Earnings"
        value="₹8,400"
        badge="+12% highest this week"
        highlight
      />
    </div>
  );
}
