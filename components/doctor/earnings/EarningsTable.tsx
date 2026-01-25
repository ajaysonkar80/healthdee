const DATA = [
  {
    id: '1',
    date: '25 Jan 2026',
    patient: 'Amit Sharma',
    type: 'New',
    amount: '₹500',
    status: 'Paid',
  },
  {
    id: '2',
    date: '25 Jan 2026',
    patient: 'Suman Verma',
    type: 'Follow-up',
    amount: '₹300',
    status: 'Paid',
  },
  {
    id: '3',
    date: '24 Jan 2026',
    patient: 'Rohan Gupta',
    type: 'New',
    amount: '₹500',
    status: 'Pending',
  },
];

export default function EarningsTable() {
  return (
    <div className="rounded-xl border bg-white">
      {/* Header */}
      <div className="border-b px-5 py-4">
        <h3 className="font-semibold text-gray-900">
          Earnings History
        </h3>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-5 py-3 text-xs font-medium uppercase text-gray-500">
        <div className="col-span-3">Date</div>
        <div className="col-span-3">Patient</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Amount</div>
        <div className="col-span-2">Status</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {DATA.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 px-5 py-4 items-center"
          >
            <div className="col-span-3 text-sm text-gray-700">
              {item.date}
            </div>

            <div className="col-span-3 font-medium text-gray-900">
              {item.patient}
            </div>

            <div className="col-span-2">
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
                {item.type}
              </span>
            </div>

            <div className="col-span-2 font-medium text-gray-900">
              {item.amount}
            </div>

            <div className="col-span-2">
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Paid') {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        Paid
      </span>
    );
  }

  return (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
      Pending
    </span>
  );
}
