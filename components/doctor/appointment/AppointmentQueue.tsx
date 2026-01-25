import Link from 'next/link';

const APPOINTMENTS = [
  {
    id: '1',
    name: 'Amit Sharma',
    time: '10:30 AM',
    status: 'waiting',
    type: 'new',
  },
  {
    id: '2',
    name: 'Suman Verma',
    time: '10:45 AM',
    status: 'in-progress',
    type: 'followup',
  },
  {
    id: '3',
    name: 'Rohan Gupta',
    time: '11:15 AM',
    status: 'waiting',
    type: 'new',
  },
  {
    id: '4',
    name: 'Priya Singh',
    time: '11:30 AM',
    status: 'scheduled',
    type: 'followup',
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'in-progress') {
    return (
      <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
        In-Progress
      </span>
    );
  }

  if (status === 'scheduled') {
    return (
      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
        Scheduled
      </span>
    );
  }

  return (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
      Waiting
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
      {type === 'new' ? 'New' : 'Follow-up'}
    </span>
  );
}

export default function AppointmentQueue() {
  return (
    <div className="rounded-xl border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="font-semibold text-gray-900">
          Appointment Queue
        </h3>

        <Link
          href="/doctor/appointments"
          className="text-sm font-medium text-pink-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-5 py-3 text-xs font-medium uppercase text-gray-500">
        <div className="col-span-4">Patient Name</div>
        <div className="col-span-2">Time</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {APPOINTMENTS.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 px-5 py-4 items-center"
          >
            {/* Patient */}
            <div className="col-span-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-sm font-medium text-pink-600">
                {item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>

              <span className="font-medium text-gray-900">
                {item.name}
              </span>
            </div>

            {/* Time */}
            <div className="col-span-2 text-sm text-gray-600">
              {item.time}
            </div>

            {/* Status */}
            <div className="col-span-2">
              <StatusBadge status={item.status} />
            </div>

            {/* Type */}
            <div className="col-span-2">
              <TypeBadge type={item.type} />
            </div>

            {/* Actions */}
            <div className="col-span-2 flex justify-end gap-3">
              <Link
                href={`/doctor/patients/${item.id}`}
                className="text-sm font-medium text-pink-600 hover:underline"
              >
                View File
              </Link>

              {item.status === 'in-progress' && (
                <button className="rounded-full bg-pink-600 px-4 py-1 text-xs font-medium text-white hover:bg-pink-700">
                  Resume
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
