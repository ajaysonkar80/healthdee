import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Review = {
  id: string;
  patientName: string;
  comment: string;
  isVerified: boolean;
};

type ReviewsProps = {
  reviews: Review[];
};

export default function Reviews({ reviews }: ReviewsProps) {
  if (!reviews.length) return null;

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">
        Patient Reviews
      </h2>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="border rounded-lg p-4"
        >
          <div className="flex justify-between">
            <p className="font-medium">
              {review.patientName}
            </p>

            {review.isVerified && (
              <Badge className="bg-green-100 text-green-700">
                Verified
              </Badge>
            )}
          </div>

          <p className="text-sm mt-2 text-muted-foreground">
            {review.comment}
          </p>
        </div>
      ))}
    </Card>
  );
}