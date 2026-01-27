// app/about/_components/final-cta/FinalCTA.tsx
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl bg-pink-50 px-8 py-14 text-center shadow-sm">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Ready to experience better care?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
            Join our growing community of thousands of families who trust
            HealthTech for their daily medical needs.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/consultation"
              className="rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
            >
              Start Your Consultation
            </Link>

            <Link
              href="/locations"
              className="rounded-full border border-pink-600 px-6 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-100"
            >
              Locate a Center
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
