"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface NavItem {
  label: string;
  href: string;
  badge?: number;
}

interface AdminSidebarProps {
  pendingVerificationCount: number;
}

export default function AdminSidebar({
  pendingVerificationCount,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: "Dashboard",              href: "/admin" },
    { label: "Clinics",                href: "/admin/clinics" },
    { label: "Doctors",                href: "/admin/doctors" },
    {
      label: "Doctors Verification",
      href: "/admin/doctors-verification",
      badge: pendingVerificationCount,
    },
    { label: "Patients",               href: "/admin/patients" },
    { label: "Appointment Requests",   href: "/admin/appointment-requests" },
    { label: "Settings",               href: "/admin/settings" },
  ];

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

                {/* Only render badge when count > 0 */}
                {!!item.badge && item.badge > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                    {item.badge > 99 ? "99+" : item.badge}
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