// app/about/_components/our-story/ImpactInlineStats.tsx
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

export default function ImpactInlineStats() {
  return (
    <div className="mt-10 flex flex-wrap gap-8">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-2xl font-extrabold text-pink-600">
            {stat.value}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
