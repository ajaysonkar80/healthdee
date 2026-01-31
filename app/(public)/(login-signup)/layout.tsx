import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen ">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-3 w-3 rounded bg-pink-500" />
          HealthTech Portal
        </div>

        <nav className="flex gap-3">
          <Link href="/help" className="text-sm text-pink-600">
            Help
          </Link>
          <Link href="/support" className="text-sm text-gray-600">
            Support
          </Link>
        </nav>
      </header>

      {/* Content */}
      <section className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden flex-col justify-center px-16 lg:flex">
          <span className="mb-4 inline-block w-fit rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
            🔒 Secure Access
          </span>

          <h1 className="text-4xl font-bold leading-tight">
            Empowering Healthcare
            <br />
            Professionals.
          </h1>

          <p className="mt-4 max-w-md text-gray-600">
            Join thousands of doctors providing digital care on a platform
            designed for trust and efficiency.
          </p>

          

          {/* Image */}
          <div className="relative mt-10 h-64 overflow-hidden rounded-2xl">
            <Image
              src="/clinic.jpg"
              alt="Modern healthcare clinic interior"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE (FORM SLOT) */}
        <div className="flex min-h-screen justify-center px-4 pt-10">
          {children}
        </div>
      </section>
    </main>
  );
}
