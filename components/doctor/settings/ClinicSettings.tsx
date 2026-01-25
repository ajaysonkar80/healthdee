'use client';

import { useState } from 'react';

export default function ClinicSettings() {
  const [clinicName, setClinicName] = useState('City General Clinic');
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="font-semibold text-gray-900">
        Clinic Settings
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Clinic Name
          </label>
          <input
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-pink-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Clinic Status
          </span>

          <button
            onClick={() => setOpen(!open)}
            className={`rounded-full px-4 py-1 text-sm font-medium ${
              open
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {open ? 'Open' : 'Closed'}
          </button>
        </div>
      </div>
    </div>
  );
}
