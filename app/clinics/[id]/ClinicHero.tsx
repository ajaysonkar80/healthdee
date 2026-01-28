import Image from "next/image";
import { Star, MapPin, BadgeCheck } from "lucide-react";

interface ClinicHeroProps {
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  location: string;
  isVerified?: boolean;
}

export default function ClinicHero({
  name,
  imageUrl,
  rating,
  reviewCount,
  location,
  isVerified = true,
}: ClinicHeroProps) {
  return (
    <section className="relative w-full h-90 rounded-2xl overflow-hidden mb-6">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={name}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex flex-col gap-3 max-w-4xl">
          {/* Rating */}
          <div className="flex items-center gap-2 bg-white/90 text-gray-900 w-fit px-3 py-1 rounded-full text-sm font-semibold">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-gray-600">
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {name}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
            {isVerified && (
              <span className="flex items-center gap-1">
                <BadgeCheck className="w-4 h-4 text-blue-400" />
                Verified Clinic
              </span>
            )}

            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
