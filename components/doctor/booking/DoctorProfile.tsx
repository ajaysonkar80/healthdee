import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default function DoctorProfile() {
  return (
    <Card className="p-6 flex gap-6 items-start">
      {/* Avatar */}
      <div className="relative h-24 w-24 rounded-full overflow-hidden border">
  <Image
    src="/doctor-2.jpg"
    alt="Dr. Rajesh Sharma"
    fill
    className="object-cover"
  />
  <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
</div>


      {/* Info */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold leading-tight">
              Dr. Rajesh Sharma
            </h1>
            <p className="text-sm text-muted-foreground">
              MBBS, MD (Cardiology)
            </p>
          </div>

          <Button size="icon" variant="ghost">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="secondary">15+ Years Experience</Badge>
          <Badge className="bg-green-100 text-green-700">
            Heart Specialist
          </Badge>
          <Badge className="bg-blue-100 text-blue-700">
            Top Rated
          </Badge>
        </div>

        {/* Languages */}
        <p className="text-sm text-muted-foreground mt-3">
          Hindi, English, Marathi
        </p>
      </div>
    </Card>
  );
}
