// components/doctor/settings/SettingsTabs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Stethoscope, Building2, ShieldCheck } from "lucide-react";

const TABS = [
  { label: "Personal",     href: "/doctor/settings/personal",    icon: User        },
  { label: "Professional", href: "/doctor/settings/professional", icon: Stethoscope },
  { label: "Clinic",       href: "/doctor/settings/clinic",       icon: Building2   },
  { label: "Security",     href: "/doctor/settings/security",     icon: ShieldCheck },
];

export default function SettingsTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 rounded-xl border bg-muted/40 p-1">
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        const Icon   = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-white shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={15} />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}