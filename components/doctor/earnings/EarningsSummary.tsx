export default function EarningsSummary() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <SummaryCard
        title="Today"
        amount="₹8,400"
        note="+12% from yesterday"
        highlight
      />

      <SummaryCard
        title="This Week"
        amount="₹42,000"
        note="On track"
      />

      <SummaryCard
        title="This Month"
        amount="₹1,68,000"
        note="Estimated"
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
  title: string;
  amount: string;
  note: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-5 ${
        highlight ? 'border-pink-600' : 'border-gray-200'
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="mt-2 text-2xl font-semibold text-gray-900">
        {amount}
      </h2>

      <span className="mt-3 inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
        {note}
      </span>
    </div>
  );
}
