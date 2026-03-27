import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface DoctorListItem {
  id: string;
  publicId: string;
  fullName: string | null;
  specialty: string | null;
  // Ensure these match the exact strings from your service/DB
  availablility: "today" | "tommorow" | "unavailable" | null; 
  gender: "male" | "female" | null;
  city: string | null;
  tagline: string | null;
  // ADD THESE MISSING FIELDS:
  profileImageUrl?: string | null;
  experienceYears?: number | null;
  consultationFee?: number | null;
  rating?: number | null;
}

type Props = {
  doctor: DoctorListItem;
};

export default function DoctorCard({ doctor }: Props) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-6 flex gap-6 items-center">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted">
          {doctor.profileImageUrl && (
            <Image
              src={doctor.profileImageUrl}
              alt="Doctor"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-semibold">
            Doctor
          </h3>

          <p className="text-sm text-muted-foreground">
            {doctor.specialty}
          </p>

          <p className="text-sm">
            {doctor.experienceYears ?? 0} years experience
          </p>

          <p className="text-sm font-medium">
            ₹ {doctor.consultationFee ?? "N/A"}
          </p>

          <p className="text-sm text-yellow-600">
            Rating: {doctor.rating}
          </p>
        </div>

        <Link href={`/doctors/${doctor.publicId}`}>
          <Button>
            Book
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}