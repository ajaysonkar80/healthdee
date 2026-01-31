import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function DoctorProfile() {
  return (
    <Card className="p-6 flex gap-6 items-center">
      <Image
        src="/doctor.jpg"
        alt="Dr. Rajesh Sharma"
        width={96}
        height={96}
        className="rounded-full border"
      />

      <div className="flex-1">
        <h1 className="text-2xl font-semibold">Dr. Rajesh Sharma</h1>
        <p className="text-sm text-muted-foreground">
          MBBS, MD (Cardiology)
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="secondary">15+ Years Experience</Badge>
          <Badge className="bg-green-100 text-green-700">Heart Specialist</Badge>
          <Badge className="bg-blue-100 text-blue-700">Top Rated</Badge>
        </div>

        <p className="text-sm mt-3 text-muted-foreground">
          Hindi, English, Marathi
        </p>
      </div>
    </Card>
  );
}
