// components/doctor/dashboard/Header.tsx
"use client";

import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/LogoutButton";

function formatDateTime(date: Date) {
  const datePart = date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const timePart = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} • ${timePart}`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface HeaderProps {
  doctorName:  string;
  avatarUrl:   string | null;
}

export default function Header({ doctorName, avatarUrl }: HeaderProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Date & Time */}
      <div className="text-sm text-gray-500">{formatDateTime(now)}</div>

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
          href="/doctor/prescriptions"
          className="rounded-lg border border-pink-600 px-4 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50"
        >
          Write Prescription
        </Link>

        {/* Doctor avatar + name */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={doctorName} />}
            <AvatarFallback className="bg-pink-100 text-xs font-semibold text-pink-600">
              {getInitials(doctorName)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-gray-700 lg:block">
            {doctorName}
          </span>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}