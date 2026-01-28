import { Stethoscope } from "lucide-react";

interface ClinicServicesProps {
  services: string[];
}

export default function ClinicServices({ services }: ClinicServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Stethoscope className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Services Offered
        </h3>
      </div>

      {/* Services */}
      <div className="flex flex-wrap gap-3">
        {services.map((service) => (
          <span
            key={service}
            className="px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition"
          >
            {service}
          </span>
        ))}
      </div>
    </section>
  );
}
