'use client';

import { useState } from 'react';

export default function NotificationSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="font-semibold text-gray-900">
        Notification Preferences
      </h2>

      <div className="mt-4 space-y-4">
        <Toggle
          label="Email Notifications"
          enabled={emailAlerts}
          onToggle={() => setEmailAlerts(!emailAlerts)}
        />

        <Toggle
          label="SMS Notifications"
          enabled={smsAlerts}
          onToggle={() => setSmsAlerts(!smsAlerts)}
        />
      </div>
    </div>
  );
}

function Toggle({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>

      <button
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition ${
          enabled ? 'bg-pink-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            enabled ? 'left-5' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}
