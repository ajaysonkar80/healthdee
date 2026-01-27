// app/about/_components/about-hero/HeroContent.tsx
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
        Bringing world-class
        <br />
        healthcare to your doorstep.
      </h1>

      <p className="mt-5 text-base text-gray-200 sm:text-lg">
        Dedicated to making health services accessible, transparent, and local
        for every citizen in Bharat.
      </p>

      <div className="mt-8">
        <Link
          href="#mission"
          className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-pink-700"
        >
          Learn Our Mission
          <span aria-hidden>↓</span>
        </Link>
      </div>
    </div>
  );
}
