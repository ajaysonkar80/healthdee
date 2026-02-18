'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
};

export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const res = await fetch(`/api/appointments/${id}`, {
          credentials: 'include',
        });

        const data = await res.json();
        setAppointment(data.data);
      } catch (err) {
        console.error('Failed to fetch appointment', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAppointment();
  }, [id]);

  async function updateStatus(status: Appointment['status']) {
    try {
      setUpdating(true);

      await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      // Refresh data
      router.refresh();
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading appointment...
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-6 text-sm text-red-500">
        Appointment not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Appointment Details
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          ID: {appointment.id}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <InfoRow label="Patient ID" value={appointment.patientId} />
        <InfoRow
          label="Scheduled At"
          value={new Date(appointment.scheduledAt).toLocaleString()}
        />
        <InfoRow label="Status" value={appointment.status} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {appointment.status === 'PENDING' && (
          <button
            disabled={updating}
            onClick={() => updateStatus('CONFIRMED')}
            className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-50"
          >
            Confirm Appointment
          </button>
        )}

        {appointment.status === 'CONFIRMED' && (
          <button
            disabled={updating}
            onClick={() => updateStatus('COMPLETED')}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            Mark as Completed
          </button>
        )}

        {appointment.status !== 'CANCELLED' &&
          appointment.status !== 'COMPLETED' && (
            <button
              disabled={updating}
              onClick={() => updateStatus('CANCELLED')}
              className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-50"
            >
              Cancel Appointment
            </button>
          )}
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}
