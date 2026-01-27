// app/about/_components/impact-stats/ImpactStats.tsx
import StatCard from "./StatCard";

const stats = [
  {
    value: "50+",
    label: "Cities Covered",
  },
  {
    value: "1M+",
    label: "Lives Impacted",
  },
  {
    value: "500+",
    label: "Local Partners",
  },
];

export default function ImpactStats() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
