export default function DoctorDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 rounded bg-gray-200" />

      <div className="grid grid-cols-3 gap-6">
        <div className="h-32 rounded-xl bg-gray-200" />
        <div className="h-32 rounded-xl bg-gray-200" />
        <div className="h-32 rounded-xl bg-gray-200" />
      </div>

      <div className="h-64 rounded-xl bg-gray-200" />
    </div>
  );
}
