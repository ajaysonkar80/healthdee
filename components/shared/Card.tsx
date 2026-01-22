import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      {children}
    </div>
  );
}
