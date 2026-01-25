import { AlertCircle } from 'lucide-react';

export default function UrgentNotifications() {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="font-semibold text-gray-900">
        Urgent Notifications
      </h3>

      <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-600" />

          <div className="flex-1">
            <p className="font-medium text-red-700">
              Emergency Arrival
            </p>
            <p className="mt-1 text-sm text-red-600">
              Patient Vijay Shah arrived with acute chest pain.
            </p>
          </div>

          <button className="rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700">
            Prioritize
          </button>
        </div>
      </div>
    </div>
  );
}
