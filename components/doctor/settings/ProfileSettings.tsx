'use client';

import { useState } from 'react';

export default function ProfileSettings() {
  const [name, setName] = useState('Dr. Rajesh Kumar');
  const [speciality, setSpeciality] = useState('General Physician');

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="font-semibold text-gray-900">
        Profile Information
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-pink-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Speciality
          </label>
          <input
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:border-pink-600 focus:outline-none"
          />
        </div>
      </div>

      <button className="mt-4 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">
        Save Profile
      </button>
    </div>
  );
}
