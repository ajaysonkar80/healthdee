import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="group relative rounded-2xl bg-white p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* subtle gradient glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-pink-100/40 via-transparent to-purple-100/40" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
