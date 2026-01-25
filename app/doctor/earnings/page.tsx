import EarningsSummary from '@/components/doctor/earnings/EarningsSummary';
import EarningsTable from '@/components/doctor/earnings/EarningsTable';

export default function DoctorEarningsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Earnings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your daily and monthly earnings
        </p>
      </div>

      {/* Summary Cards */}
      <EarningsSummary />

      {/* Earnings Table */}
      <EarningsTable />
    </div>
  );
}
