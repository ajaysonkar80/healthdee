// app/about/_components/impact-stats/StatCard.tsx
type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
        {value}
      </span>
      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </span>
    </div>
  );
}
