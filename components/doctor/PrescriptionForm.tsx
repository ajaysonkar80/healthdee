'use client';

import { useState } from 'react';

export default function PrescriptionForm() {
  const [notes, setNotes] = useState('');

  return (
    <form className="space-y-4 rounded-xl border bg-white p-6">
      <h3 className="font-semibold text-gray-900">
        Write Prescription
      </h3>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Medicines & Instructions
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-pink-600 focus:outline-none"
          placeholder="e.g. Paracetamol 500mg twice daily..."
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
      >
        Save Prescription
      </button>
    </form>
  );
}
