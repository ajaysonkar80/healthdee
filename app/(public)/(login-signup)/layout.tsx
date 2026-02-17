import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="inline-block h-3 w-3 rounded bg-pink-500" />
          HealthTech Portal
        </div>

        <nav className="flex gap-4">
          <Link href="/help" className="text-sm text-pink-600 hover:underline">
            Help
          </Link>
          <Link href="/support" className="text-sm text-gray-600 hover:underline">
            Support
          </Link>
        </nav>
      </header>

      {/* Content */}
      <section className="grid min-h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-start px-16 pt-20 bg-gray-50">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-medium text-pink-600">
            🔒 Secure Access
          </span>

          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Empowering Healthcare
            <br />
            Professionals.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-600">
            Join thousands of doctors providing digital care on a platform
            designed for trust and efficiency.
          </p>

          {/* Image */}
          <div className="relative mt-10 h-75 w-full max-w-xl overflow-hidden rounded-2xl">
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

        {/* RIGHT SIDE */}
        <div className="flex items-start justify-center px-6 pt-20 bg-white">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
