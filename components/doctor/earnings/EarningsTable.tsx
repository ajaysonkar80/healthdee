// components/doctor/earnings/EarningsTable.tsx

// Inlined — this is a server component but the type is defined here
// as the single source of truth for the table row shape.
export type EarningsRow = {
  id:              string;
  appointmentId:   string;
  appointmentType: "new" | "follow-up";
  feeAmount:       number;
  status:          "paid" | "refunded";
  earnedAt:        Date;
  patientName:     string;
};

interface EarningsTableProps {
  rows:        EarningsRow[];
  total:       number;
  currentPage: number;
  pageSize:    number;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(date));
}

function StatusBadge({ status }: { status: "paid" | "refunded" }) {
  if (status === "paid") {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        Paid
      </span>
    );
  }
  return (
    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
      Refunded
    </span>
  );
}

function TypeBadge({ type }: { type: "new" | "follow-up" }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
      type === "follow-up"
        ? "bg-blue-50 text-blue-600"
        : "bg-pink-50 text-pink-600"
    }`}>
      {type === "follow-up" ? "Follow-up" : "New"}
    </span>
  );
}

export default function EarningsTable({
  rows,
  total,
  currentPage,
  pageSize,
}: EarningsTableProps) {
  const from = rows.length > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const to   = Math.min(currentPage * pageSize, total);

  return (
    <div className="rounded-xl border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="font-semibold text-gray-900">Earnings History</h3>
        {total > 0 && (
          <span className="text-xs text-gray-400">
            Showing {from}–{to} of {total.toLocaleString()}
          </span>
        )}
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-400">
        <div className="col-span-3">Date</div>
        <div className="col-span-3">Patient</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-2">Status</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {rows.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-gray-400">
            No earnings recorded yet. Earnings appear here when appointments are completed.
          </div>
        ) : (
          rows.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center gap-4 px-5 py-4"
            >
              <div className="col-span-3 text-sm text-gray-600">
                {formatDate(item.earnedAt)}
              </div>

              <div className="col-span-3 truncate text-sm font-medium text-gray-900">
                {item.patientName}
              </div>

              <div className="col-span-2">
                <TypeBadge type={item.appointmentType} />
              </div>

              <div className="col-span-2 font-semibold text-gray-900">
                {item.feeAmount > 0
                  ? `₹${item.feeAmount.toLocaleString("en-IN")}`
                  : "—"}
              </div>

              <div className="col-span-2">
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}