import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button} from "../ui/button"

type Activity = {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
};

const activities: Activity[] = [
  {
    id: 1,
    title: "Dr. Smith added",
    description: "New medical professional registration completed",
    time: "2 mins ago",
    icon: "➕",
  },
  {
    id: 2,
    title: "Verification Request",
    description: "New documents submitted by Dr. Elena Rodriguez",
    time: "15 mins ago",
    icon: "📄",
  },
  {
    id: 3,
    title: "New Booking Request",
    description: "Jane Doe requested an appointment with Dr. Smith",
    time: "1 hour ago",
    icon: "📅",
  },
  {
    id: 4,
    title: "System Alert",
    description: "High volume of pending verifications detected (14)",
    time: "3 hours ago",
    icon: "⚠️",
  },
  {
    id: 5,
    title: "Verification Approved",
    description: "Dr. Marcus Thorne has been successfully verified",
    time: "5 hours ago",
    icon: "✅",
  },
];

export default function RecentActivityList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="link" className="text-pink-500">
          View All
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start justify-between border-b pb-4 last:border-b-0"
          >
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-pink-50 text-lg">
                {activity.icon}
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>

            <span className="text-sm text-muted-foreground">
              {activity.time}
            </span>
          </div>
        ))}

        <Button
          variant="ghost"
          className="w-full text-sm text-muted-foreground"
        >
          Load more activities
        </Button>
      </CardContent>
    </Card>
  );
}
