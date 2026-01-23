import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FFF7F9]">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-3 w-3 rounded bg-pink-500" />
          HealthTech Portal
        </div>

        <div className="flex gap-3">
          <Link href="/help" className="text-sm text-pink-600">
            Help
          </Link>
          <Link href="/support" className="text-sm text-gray-600">
            Support
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center px-16">
          <span className="mb-4 inline-block w-fit rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
            🔒 Secure Access
          </span>

          <h1 className="text-4xl font-bold leading-tight">
            Empowering Healthcare
            <br />
            Professionals.
          </h1>

          <p className="mt-4 max-w-md text-gray-600">
            Join thousands of doctors providing digital care on a
            platform designed for trust and efficiency.
          </p>

          {/* Security Card */}
          <div className="mt-6 max-w-md rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-pink-100 p-2">🔐</div>
              <div>
                <p className="font-medium">Secure & Encrypted</p>
                <p className="text-sm text-gray-500">
                  HIPAA Compliant | 256-bit Encryption
                </p>
                <button className="mt-2 text-sm text-pink-600">
                  Learn more about our security standards →
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="mt-10 overflow-hidden rounded-2xl">
            <img
              src="/clinic.jpg"
              alt="Clinic"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE (FORM SLOT) */}
        <div className="flex justify-center pt-10 px-4 min-h-screen">
          {children}
        </div>
      </section>
    </main>
  );
}
