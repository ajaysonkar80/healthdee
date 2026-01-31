import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Reviews() {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">Patient Reviews</h2>

      <div className="border rounded-lg p-4">
        <div className="flex justify-between">
          <p className="font-medium">Amit K.</p>
          <Badge className="bg-green-100 text-green-700">Verified</Badge>
        </div>
        <p className="text-sm mt-2 text-muted-foreground">
          Very professional and calm. He explained the procedure clearly which
          helped reduce my anxiety.
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex justify-between">
          <p className="font-medium">Suman V.</p>
          <Badge className="bg-green-100 text-green-700">Verified</Badge>
        </div>
        <p className="text-sm mt-2 text-muted-foreground">
          Wait time was minimal and the staff was very cooperative. Truly an
          expert.
        </p>
      </div>

      <Link
        href="#"
        className="text-sm text-primary font-medium inline-block"
      >
        View all 1,240 reviews →
      </Link>
    </Card>
  );
}
