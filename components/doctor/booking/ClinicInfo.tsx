import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

export default function ClinicInformation() {
  const isOpen = true;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Clinic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Info */}
        <div className="space-y-4">
          {/* Clinic Name */}
          <div>
            <p className="font-medium">Heart Care Speciality Clinic</p>

            <div className="flex items-start gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>
                102, MP Nagar Zone II, Near City Mall, <br />
                Bhopal, Madhya Pradesh - 462011
              </span>
            </div>
          </div>

          {/* Hours */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4" />
              <p className="font-medium">Operating Hours</p>
            </div>

            <p className="text-sm text-muted-foreground">
              Mon – Sat: 09:00 AM – 08:00 PM
            </p>
            <p className="text-sm text-muted-foreground">
              Sun: Closed
            </p>

            <Badge
              className={`mt-2 ${
                isOpen
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isOpen ? "Currently Open" : "Closed"}
            </Badge>
          </div>
        </div>

        {/* Map Preview */}
        <div className="w-full h-55 rounded-lg overflow-hidden border">
      <iframe
        title="Clinic Location"
        src="https://www.google.com/maps?q=Vijay+Nagar+Indore+Madhya+Pradesh&output=embed"
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
      </div>
    </Card>
  );
}
