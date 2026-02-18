'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Doctor = {
  id: string;
  publicId: string;
  specialty: string;
  experienceYears: number;
  consultationFee?: number;
  verificationStatus: string;
};

export default function BookAppointmentPage() {
  const router = useRouter();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* --------------------------------------------------
     Fetch Verified Doctors
  --------------------------------------------------- */
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch(
          '/api/doctors?verificationStatus=verified',
          { credentials: 'include' }
        );

        const data = await res.json();
        setDoctors(data.data ?? []);
      } catch (err) {
        console.error('Failed to fetch doctors', err);
      } finally {
        setLoadingDoctors(false);
      }
    }

    fetchDoctors();
  }, []);

  /* --------------------------------------------------
     Submit Booking
  --------------------------------------------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedDoctorId || !scheduledAt) {
      alert('Please select doctor and time');
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('/api/appointments', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: selectedDoctorId,
          scheduledAt: new Date(scheduledAt).toISOString(),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error?.error?.message || 'Booking failed');
        return;
      }

      router.push('/patient/appointments');
    } catch (err) {
      console.error('Failed to book appointment', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Book Appointment
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Select a doctor and choose a time slot
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
      >
        {/* Doctor Select */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Doctor
          </label>

          {loadingDoctors ? (
            <p className="text-sm text-gray-500">
              Loading doctors...
            </p>
          ) : (
            <select
              value={selectedDoctorId}
              onChange={(e) =>
                setSelectedDoctorId(e.target.value)
              }
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.specialty} • {doc.experienceYears} yrs exp
                  {doc.consultationFee
                    ? ` • ₹${doc.consultationFee}`
                    : ''}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Date Time */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Date & Time
          </label>

          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-50"
        >
          {submitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
}
