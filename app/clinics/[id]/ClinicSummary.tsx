"use client";

import Image from "next/image";
import { Navigation } from "lucide-react";

interface ClinicSummaryProps {
  name: string;
  logoUrl: string;
  specialty: string;
  experienceYears: number;
  directionsUrl: string;
}

export default function ClinicSummary({
  name,
  logoUrl,
  specialty,
  experienceYears,
  directionsUrl,
}: ClinicSummaryProps) {
  const handleBookAppointment = () => {
    alert("Book appointment clicked");
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border">
            <Image src={logoUrl} alt={name} fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {name}
            </h2>
            <p className="text-sm text-blue-600 font-medium">
              {specialty} • {experienceYears}+ Years Experience
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBookAppointment}
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700"
          >
            Book Appointment
          </button>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
        </div>
      </div>
    </section>
  );
}
