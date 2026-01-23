import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-pink-500 text-white px-6 py-20 text-center">
      <h2 className="text-2xl font-semibold">
        Ready to get started?
      </h2>

      <p className="mt-2 text-sm">
        Join thousands of people who have simplified their healthcare journey.
      </p>

      <Link
        href="/signup"
        className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm text-pink-600"
      >
        Book an Appointment Now
      </Link>
    </section>
  );
}
