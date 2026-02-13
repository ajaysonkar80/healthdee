'use client';

import { Bell, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogoutButton } from '@/components/auth/LogoutButton';

function formatDateTime(date: Date) {
  const datePart = date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  const timePart = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart} • ${timePart}`;
}

export default function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Date & Time */}
      <div className="text-sm text-gray-500">
        {formatDateTime(now)}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Search size={18} className="text-gray-600" />
        </button>

        {/* Notifications */}
        <button className="relative rounded-full p-2 hover:bg-gray-100">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Actions */}
        <Link
          href="/doctor/prescriptions/new"
          className="rounded-lg border border-pink-600 px-4 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50"
        >
          Write Prescription
        </Link>

        <button className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">
          Start Consultation
        </button>

        {/* Profile Avatar */}
        <div className="h-8 w-8 rounded-full bg-pink-100" />

        {/* Logout */}
        <LogoutButton />
      </div>
    </header>
  );
}
