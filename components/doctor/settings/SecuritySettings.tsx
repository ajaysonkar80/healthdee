'use client';

import { useState } from 'react';

export default function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="font-semibold text-gray-900">
        Security
      </h2>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Two-Factor Authentication
          </span>

          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`rounded-full px-4 py-1 text-sm font-medium ${
              twoFactor
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {twoFactor ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <button className="text-sm font-medium text-pink-600 hover:underline">
          Change Password
        </button>
      </div>
    </div>
  );
}
