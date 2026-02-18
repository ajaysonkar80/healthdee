'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Appointment = {
  id: string;
  scheduledAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
};

function StatusBadge({ status }: { status: Appointment['status'] }) {
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

export default function AppointmentQueue() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-gray-500">
        Loading appointments...
      </div>
    );
  }

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
        <div className="col-span-4">Appointment ID</div>
        <div className="col-span-3">Scheduled Time</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {appointments.length === 0 && (
          <div className="px-5 py-6 text-sm text-gray-500">
            No appointments found.
          </div>
        )}

        {appointments.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 px-5 py-4 items-center"
          >
            <div className="col-span-4 font-medium text-gray-900">
              {item.id}
            </div>

            <div className="col-span-3 text-sm text-gray-600">
              {new Date(item.scheduledAt).toLocaleString()}
            </div>

            <div className="col-span-3">
              <StatusBadge status={item.status} />
            </div>

            <div className="col-span-2 flex justify-end">
              <Link
                href={`/doctor/appointments/${item.id}`}
                className="text-sm font-medium text-pink-600 hover:underline"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
