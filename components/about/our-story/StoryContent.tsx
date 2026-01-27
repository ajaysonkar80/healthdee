// app/about/_components/our-story/StoryContent.tsx
import ImpactInlineStats from './ImpactInlineStats'

export default function StoryContent() {
  return (
    <div>
      {/* Badge */}
      <span className="inline-block rounded-full bg-pink-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-pink-600">
        Our Story
      </span>

      {/* Title */}
      <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Bridging the healthcare gap
        <br />
        in Tier-2 and Tier-3 cities
      </h2>

      {/* Description */}
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
        <p>
          Founded with a vision that quality medical care shouldn&apos;t be a
          privilege of the metros. Our journey started in the heart of local
          communities, understanding your needs and building trust through
          every consultation.
        </p>

        <p>
          We saw families traveling over 200km for basic diagnostics. We saw
          elderly patients struggling with complex medical jargon. HealthTech
          was born to change this — bringing technology and expert doctors
          directly to your city.
        </p>
      </div>

      {/* Inline Stats */}
      <ImpactInlineStats />
    </div>
  );
}
