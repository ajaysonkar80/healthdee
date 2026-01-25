export default function StatCard({
  title,
  value,
  badge,
  highlight = false,
}: {
  title: string;
  value: string;
  badge: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-5 ${
        highlight ? 'border-pink-500' : 'border-gray-200'
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </h2>

      <span className="mt-3 inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
        {badge}
      </span>
    </div>
  );
}
