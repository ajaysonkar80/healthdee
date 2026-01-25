'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Wallet,
  Settings,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/doctor/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Appointments',
    href: '/doctor/appointments',
    icon: Calendar,
  },
  {
    label: 'Prescriptions',
    href: '/doctor/prescriptions',
    icon: FileText,
  },
  {
    label: 'Earnings',
    href: '/doctor/earnings',
    icon: Wallet,
  },
  {
    label: 'Settings',
    href: '/doctor/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5">
        <h1 className="text-xl font-bold text-pink-600">
          HealTech Doctor
        </h1>
        <p className="text-sm text-gray-500">
          City General Clinic
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition ${
                active
                  ? 'bg-pink-600 text-white'
                  : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Clinic Status */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between rounded-lg bg-pink-50 p-3">
          <div>
            <p className="text-xs text-gray-500">Clinic Status</p>
            <p className="text-sm font-medium text-gray-900">
              Currently Open
            </p>
          </div>
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      </div>
    </aside>
  );
}
