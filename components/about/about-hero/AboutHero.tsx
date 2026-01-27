// app/about/_components/about-hero/AboutHero.tsx

import HeroContent from "./HeroContent";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden rounded-b-3xl bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/doctors.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10">
      

        <div className="flex min-h-[520px] items-center justify-center pb-20 pt-12">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
