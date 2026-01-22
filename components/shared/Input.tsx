import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
}
