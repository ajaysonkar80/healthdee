// components/doctor/dashboard/CurrentlyConsulting.tsx
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CurrentConsultation = {
  id:             string;
  scheduledAt:    Date;
  patientName:    string;
  profileImageUrl: string | null;
  gender:         string | null;
  bloodGroup:     string | null;
  allergies:      string | null;
  city:           string | null;
};

interface CurrentlyConsultingProps {
  consultation: CurrentConsultation | null;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default function CurrentlyConsulting({
  consultation,
}: CurrentlyConsultingProps) {
  if (!consultation) {
    return (
      <div className="rounded-xl border bg-white p-5">
        <h3 className="font-semibold text-gray-900">Currently Consulting</h3>
        <p className="mt-3 text-sm text-gray-400">
          No active consultation right now.
        </p>
      </div>
    );
  }

  const { patientName, profileImageUrl, gender, bloodGroup, allergies, city } =
    consultation;

  const infoCards = [
    { label: "Gender",       value: gender     ?? "—" },
    { label: "Blood Group",  value: bloodGroup ?? "—" },
    { label: "City",         value: city       ?? "—" },
  ];

  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Currently Consulting</h3>
        <Link
          href={`/doctor/appointments/${consultation.id}`}
          className="text-xs font-medium text-pink-600 hover:underline"
        >
          View Details
        </Link>
      </div>

      {/* Patient header */}
      <div className="mt-4 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          {profileImageUrl && (
            <AvatarImage src={profileImageUrl} alt={patientName} />
          )}
          <AvatarFallback className="bg-pink-100 text-pink-600 text-sm font-semibold">
            {getInitials(patientName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-gray-900">{patientName}</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-600">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
            In Progress
          </span>
        </div>
      </div>

      {/* Info grid */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {infoCards.map((c) => (
          <InfoCard key={c.label} label={c.label} value={c.value} />
        ))}
      </div>

      {/* Allergies alert */}
      {allergies && (
        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2">
          <p className="text-xs font-medium text-yellow-700">
            ⚠ Allergies: {allergies}
          </p>
        </div>
      )}
    </div>
  );
}