import Image from "next/image";
import Link from "next/link";
import { BriefcaseMedical } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  imageUrl: string;
}

interface ClinicDoctorsProps {
  doctors: Doctor[];
  clinicId: string;
}

export default function ClinicDoctors({
  doctors,
  clinicId,
}: ClinicDoctorsProps) {
  if (!doctors || doctors.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BriefcaseMedical className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Doctors at this Clinic
          </h3>
        </div>

        <Link
          href={`/clinic/${clinicId}/doctors`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex items-center gap-4 border rounded-xl p-4 hover:shadow-sm transition"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden border">
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                {doctor.name}
              </p>
              <p className="text-sm text-gray-600">
                {doctor.specialty}
              </p>
              <p className="text-xs text-gray-500">
                {doctor.experienceYears}+ years experience
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
