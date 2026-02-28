import { Card } from "@/components/ui/card";

type DoctorStatsProps = {
  consultationFee: number | null;
  rating: number;
};

export default function DoctorStats({
  consultationFee,
  rating,
}: DoctorStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Fee</p>
        <p className="text-lg font-semibold">
          {consultationFee
            ? `₹${consultationFee}`
            : "Not specified"}
        </p>
      </Card>

      <Card className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Rating</p>
        <p className="text-lg font-semibold">
          {rating} / 5
        </p>
      </Card>
    </div>
  );
}