import { Clock, CheckCircle, MapPin } from "lucide-react";

interface OperatingHours {
  day: string;
  time: string;
}

interface ClinicSidebarProps {
  operatingHours: OperatingHours[];
  amenities: string[];
  mapEmbedUrl: string;
  address: string;
}

export default function ClinicSidebar({
  operatingHours,
  amenities,
  mapEmbedUrl,
  address,
}: ClinicSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Operating Hours */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <h4 className="text-md font-semibold text-gray-900">
            Operating Hours
          </h4>
        </div>

        <ul className="space-y-2 text-sm">
          {operatingHours.map((item) => (
            <li
              key={item.day}
              className="flex justify-between text-gray-700"
            >
              <span>{item.day}</span>
              <span className="font-medium">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <h4 className="text-md font-semibold text-gray-900">
            Amenities
          </h4>
        </div>

        <ul className="space-y-2">
          {amenities.map((amenity) => (
            <li
              key={amenity}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <CheckCircle className="w-4 h-4 text-green-600" />
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h4 className="text-md font-semibold text-gray-900">
            Location
          </h4>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          {address}
        </p>

        <div className="w-full h-48 rounded-xl overflow-hidden border">
          <iframe
            src={mapEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
