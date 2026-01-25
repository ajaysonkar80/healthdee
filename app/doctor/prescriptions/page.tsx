import Link from 'next/link';
import PrescriptionsTable from '@/components/doctor/prescriptions/PrescriptionsTable';

export default function DoctorPrescriptionsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Prescriptions
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage issued prescriptions
          </p>
        </div>

        <Link
          href="/doctor/prescriptions/new"
          className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
        >
          Write Prescription
        </Link>
      </div>

      {/* Prescriptions Table */}
      <PrescriptionsTable />
    </div>
  );
}
