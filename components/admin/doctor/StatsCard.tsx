// components/admin/doctor/StatsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Inline type — mirrors server/repositories/doctor.repo getDoctorStats() return shape
type DoctorStats = {
  total: number;
  verified: number;
  pending: number;
  active: number;
};

interface StatsCardsProps {
  stats: DoctorStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Doctors",
      value: stats.total,
      accentClass: "",
    },
    {
      title: "Active",
      value: stats.active,
      accentClass: "text-green-600",
    },
    {
      title: "Verified",
      value: stats.verified,
      accentClass: "text-blue-600",
    },
    {
      title: "Pending Verification",
      value: stats.pending,
      accentClass: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-semibold ${stat.accentClass ?? ""}`}
            >
              {stat.value.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}