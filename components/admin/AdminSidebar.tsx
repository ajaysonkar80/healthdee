"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { Badge } from "../ui/badge";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Clinics", href: "/admin/clinics" },
  { label: "Doctors", href: "/admin/doctors" },
  { label: "Patients", href: "/admin/patients" },
  { label: "Verifications", href: "/admin/verifications", badge: 14 },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r bg-white p-4">
      {/* Logo */}
      <div className="mb-8 text-xl font-bold text-pink-600">
        HealthDee
        <div className="text-xs font-normal text-muted-foreground">
          ADMIN PORTAL
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-pink-100 text-pink-600"
                    : "text-muted-foreground hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
    {item.badge}
  </span>
)}

              </div>
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <Button className="mt-6 w-full bg-pink-500 hover:bg-pink-600">
        + New Operation
      </Button>
    </aside>
  );
}
