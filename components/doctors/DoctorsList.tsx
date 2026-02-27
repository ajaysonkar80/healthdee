import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type DoctorListItem = {
  id: string;
  publicId: string;
  specialty: string;
  experienceYears: number | null;
  rating: number;
  profileImageUrl: string | null;
  consultationFee: number | null;
};

type Props = {
  doctors: DoctorListItem[];
};

export default function DoctorsList({ doctors }: Props) {
  if (doctors.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        No doctors found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {doctors.map((doctor) => (
        <Card key={doctor.id}>
          <CardContent className="flex gap-4 p-6 items-center">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
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
      ))}
    </div>
  );
}