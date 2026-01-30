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
        min-h-12
        rounded-xl
        bg-accent-primary
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
