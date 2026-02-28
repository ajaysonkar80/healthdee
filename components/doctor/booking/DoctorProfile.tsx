import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

type DoctorProfileProps = {
  fullName: string | null;
  degrees: string | null;
  specialty: string;
  languages: string | null;
  experienceYears: number | null;
  profileImageUrl: string | null;
  isTopRated: boolean;
  tagline: string | null;
};

export default function DoctorProfile({
  fullName,
  degrees,
  specialty,
  languages,
  experienceYears,
  profileImageUrl,
  isTopRated,
  tagline,
}: DoctorProfileProps) {
  const imageSrc =
    profileImageUrl ??
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80";

  return (
    <Card className="p-6 flex gap-6 items-start">
      <div className="relative h-24 w-24 rounded-full overflow-hidden border">
        <Image
          src={imageSrc}
          alt={fullName ?? "Doctor"}
          fill
          className="object-cover"
        />
        <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold leading-tight">
              {fullName ?? "Doctor"}
            </h1>

            {degrees && (
              <p className="text-sm text-muted-foreground">
                {degrees}
              </p>
            )}
          </div>

          <Button size="icon" variant="ghost">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {experienceYears !== null && (
            <Badge variant="secondary">
              {experienceYears}+ Years Experience
            </Badge>
          )}

          <Badge className="bg-green-100 text-green-700">
            {tagline ?? specialty}
          </Badge>

          {isTopRated && (
            <Badge className="bg-blue-100 text-blue-700">
              Top Rated
            </Badge>
          )}
        </div>

        {languages && (
          <p className="text-sm text-muted-foreground mt-3">
            {languages}
          </p>
        )}
      </div>
    </Card>
  );
}