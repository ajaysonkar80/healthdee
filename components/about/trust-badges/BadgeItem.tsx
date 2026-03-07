// app/about/_components/trust-badges/BadgeItem.tsx
import type { ReactNode } from "react";

type BadgeItemProps = {
  icon: ReactNode;
  label: string;
};

export default function BadgeItem({ icon, label }: BadgeItemProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
  );
}
