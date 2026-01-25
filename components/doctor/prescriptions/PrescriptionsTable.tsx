import Link from 'next/link';

const DATA = [
  {
    id: '1',
    patient: 'Amit Sharma',
    date: '25 Jan 2026',
    diagnosis: 'Fever & Cold',
    medicines: 'Paracetamol, Cough Syrup',
    status: 'Active',
  },
  {
    id: '2',
    patient: 'Suman Verma',
    date: '25 Jan 2026',
    diagnosis: 'Migraine',
    medicines: 'Ibuprofen',
    status: 'Active',
  },
  {
    id: '3',
    patient: 'Rohan Gupta',
    date: '24 Jan 2026',
    diagnosis: 'Diabetes Follow-up',
    medicines: 'Metformin',
    status: 'Completed',
  },
];

export default function PrescriptionsTable() {
  return (
    <div className="rounded-xl border bg-white">
      {/* Header */}
      <div className="border-b px-5 py-4">
        <h3 className="font-semibold text-gray-900">
          Prescription History
        </h3>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-5 py-3 text-xs font-medium uppercase text-gray-500">
        <div className="col-span-3">Patient</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-3">Diagnosis</div>
        <div className="col-span-2">Medicines</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {DATA.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 px-5 py-4 items-center"
          >
            {/* Patient */}
            <div className="col-span-3 font-medium text-gray-900">
              {item.patient}
            </div>

            {/* Date */}
            <div className="col-span-2 text-sm text-gray-600">
              {item.date}
            </div>

            {/* Diagnosis */}
            <div className="col-span-3 text-sm text-gray-700">
              {item.diagnosis}
            </div>

            {/* Medicines */}
            <div className="col-span-2 text-sm text-gray-700 truncate">
              {item.medicines}
            </div>

            {/* Actions */}
            <div className="col-span-2 flex justify-end gap-3">
              <Link
                href={`/doctor/prescriptions/${item.id}`}
                className="text-sm font-medium text-pink-600 hover:underline"
              >
                View
              </Link>

              {item.status === 'Active' && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Active
                </span>
              )}

              {item.status === 'Completed' && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
