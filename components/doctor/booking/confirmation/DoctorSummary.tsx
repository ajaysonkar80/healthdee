import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";
import Link from "next/link";

type DoctorSummaryProps = {
  doctor: {
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    reviews: number;
    avatar: string;
  };
};

export default function DoctorSummary({ doctor }: DoctorSummaryProps) {
  return (
    <div className="flex items-center justify-between gap-6 pb-6 border-b">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative h-16 w-16 rounded-full overflow-hidden border">
          <Image
            src={doctor.avatar}
            alt={doctor.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <Badge className="mb-1 bg-green-100 text-green-700">
            Verified Specialist
          </Badge>

          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">
            {doctor.specialty} • {doctor.experience}
          </p>

          <div className="flex items-center gap-1 text-sm mt-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{doctor.rating}</span>
            <span className="text-muted-foreground">
              ({doctor.reviews}+ Reviews)
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link href="/doctors/profile">
        <Button variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          View Profile
        </Button>
      </Link>
    </div>
  );
}
