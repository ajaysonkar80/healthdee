import { Card } from "@/components/ui/card";

export default function DoctorStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Fee</p>
        <p className="text-lg font-semibold">₹500</p>
      </Card>

      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Rating</p>
        <p className="text-lg font-semibold">4.8 / 5</p>
      </Card>

      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Patients</p>
        <p className="text-lg font-semibold">10K+</p>
      </Card>
    </div>
  );
}
