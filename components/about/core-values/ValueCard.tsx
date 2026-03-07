// app/about/_components/core-values/ValueCard.tsx
import type { ReactNode } from "react";

type ValueCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function ValueCard({
  icon,
  title,
  description,
}: ValueCardProps) {
  return (
    <div className="group flex flex-col items-center rounded-2xl border border-pink-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Icon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-md transition group-hover:scale-110">
        <div className="text-2xl">{icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
}
