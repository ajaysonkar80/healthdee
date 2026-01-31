import { Card } from "@/components/ui/card";

export default function ClinicInfo() {
  return (
    <Card className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Clinic Information</h2>
        <p className="font-medium">Heart Care Speciality Clinic</p>
        <p className="text-sm text-muted-foreground mt-1">
          102, MP Nagar Zone II, Near City Mall, Bhopal, Madhya Pradesh - 462011
        </p>

        <p className="mt-4 font-medium">Operating Hours</p>
        <p className="text-sm text-muted-foreground">
          Mon - Sat: 09:00 AM - 08:00 PM
        </p>
        <p className="text-sm text-muted-foreground">Sun: Closed</p>
      </div>

      <div className="bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Map Preview</span>
      </div>
    </Card>
  );
}
