// components/doctor/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Wallet,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",    href: "/doctor",              icon: LayoutDashboard },
  { label: "Appointments", href: "/doctor/appointments", icon: Calendar        },
  { label: "Prescriptions",href: "/doctor/prescriptions",icon: FileText        },
  { label: "Earnings",     href: "/doctor/earnings",     icon: Wallet          },
  { label: "Settings",     href: "/doctor/settings",     icon: Settings        },
];

interface SidebarProps {
  doctorName: string;
  specialty:  string;
}

export default function Sidebar({ doctorName, specialty }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col bg-white">
      {/* Logo + doctor identity */}
      <div className="px-6 py-5">
        <h1 className="text-xl font-bold text-pink-600">HealthDee</h1>
        <p className="text-sm font-medium text-gray-800 mt-1">{doctorName}</p>
        <p className="text-xs text-gray-400">{specialty}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {NAV_ITEMS.map((item) => {
          // Dashboard link: exact match; others: prefix match
          const active =
            item.href === "/doctor"
              ? pathname === "/doctor" || pathname === "/doctor/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-pink-600 text-white"
                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Status footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between rounded-lg bg-pink-50 p-3">
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm font-medium text-gray-900">Active</p>
          </div>
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      </div>
    </aside>
  );
}