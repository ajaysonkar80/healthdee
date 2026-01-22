import { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`
        w-full
        min-h-[48px]
        rounded-xl
        bg-[#F26A8D]
        text-white
        font-semibold
        text-base
        flex
        items-center
        justify-center
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
}
