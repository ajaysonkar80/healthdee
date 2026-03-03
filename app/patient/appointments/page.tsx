'use client';

import { useEffect, useState, Suspense } from 'react';
import Loading from "./loading"

type Appointment = {
  id: string;
  scheduledAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
};

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchAppointments() {
    try {
      const res = await fetch('/api/appointments', {
        credentials: 'include',
      });

      const data = await res.json();
      setAppointments(data.data?.data ?? []);
    } catch (err) {
      console.error('Failed to fetch appointments', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function cancelAppointment(id: string) {
  try {
    setUpdatingId(id);

    const res = await fetch(
      `/api/appointments/${id}/cancel`,
      {
        method: 'PATCH',
        credentials: 'include',
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error ?? 'Cancel failed');
    }

    await fetchAppointments();
  } catch (err) {
    console.error('Failed to cancel appointment', err);
  } finally {
    setUpdatingId(null);
  }
}

  if (loading) {
    return (
      <Suspense fallback={<Loading />}>
        < Loading/>
      </Suspense>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          My Appointments
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your appointments
        </p>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-6 py-3 text-xs font-medium uppercase text-gray-500">
          <div className="col-span-4">Appointment ID</div>
          <div className="col-span-4">Scheduled Time</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y">
          {appointments.length === 0 && (
            <div className="px-6 py-6 text-sm text-gray-500">
              No appointments found.
            </div>
          )}

          {appointments.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
            >
              <div className="col-span-4 font-medium text-gray-900 truncate">
                {item.id}
              </div>

              <div className="col-span-4 text-sm text-gray-600">
                {new Date(item.scheduledAt).toLocaleString()}
              </div>

              <div className="col-span-2">
                <StatusBadge status={item.status} />
              </div>

              <div className="col-span-2 flex justify-end">
                {(item.status === 'PENDING' ||
                  item.status === 'CONFIRMED') && (
                  <button
                    disabled={updatingId === item.id}
                    onClick={() => cancelAppointment(item.id)}
                    className="rounded-lg border border-red-500 px-3 py-1 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-50"
                  >
                    {updatingId === item.id
                      ? 'Cancelling...'
                      : 'Cancel'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Appointment['status'];
}) {
  if (status === 'CONFIRMED') {
    return (
      <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
        Confirmed
      </span>
    );
  }

  if (status === 'COMPLETED') {
    return (
      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
        Completed
      </span>
    );
  }

  if (status === 'CANCELLED') {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
        Cancelled
      </span>
    );
  }

  return (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
      Pending
    </span>
  );
}
