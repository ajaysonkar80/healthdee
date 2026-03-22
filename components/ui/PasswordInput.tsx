"use client";

import type { InputHTMLAttributes } from "react";
import { useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function PasswordInput({ label, ...props }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        type={visible ? "text" : "password"}
        className="
          rounded-lg
          border border-gray-200
          px-3 py-2
          pr-10
          text-sm
          text-gray-900
          focus:outline-none
          focus:ring-2
          focus:ring-pink-400
        "
      />

      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className={`absolute right-3 text-gray-500 text-sm ${label ? "top-9" : "top-2"}`}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? "🙈" : "👁️"}
      </button>
    </div>
  );
}