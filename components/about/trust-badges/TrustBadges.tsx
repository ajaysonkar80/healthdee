// app/about/_components/trust-badges/TrustBadges.tsx
import {
  ShieldCheckIcon,
  LockClosedIcon,
  UserGroupIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import BadgeItem from "./BadgeItem";

const badges = [
  {
    label: "ISO 27001 Certified",
    icon: <ShieldCheckIcon className="h-6 w-6" />,
  },
  {
    label: "HIPAA Compliant",
    icon: <LockClosedIcon className="h-6 w-6" />,
  },
  {
    label: "MCI Registered Doctors",
    icon: <UserGroupIcon className="h-6 w-6" />,
  },
  {
    label: "Data Privacy Shield",
    icon: <IdentificationIcon className="h-6 w-6" />,
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Section Title */}
        <p className="mb-12 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
          Trusted & Certified By
        </p>

        {/* Badges */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {badges.map((badge) => (
            <BadgeItem
              key={badge.label}
              icon={badge.icon}
              label={badge.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
