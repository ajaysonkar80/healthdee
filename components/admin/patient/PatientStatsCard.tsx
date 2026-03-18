// components/admin/patient/PatientStatsCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PatientStats } from "@/server/repositories/patient.repo";

export function PatientStatsCards({ stats }: { stats: PatientStats }) {
  const cards = [
    { title: "Total Patients",   value: stats.total,       accent: "" },
    { title: "Active",           value: stats.active,      accent: "text-green-600" },
    { title: "Deactivated",      value: stats.deactivated, accent: "text-gray-500" },
    { title: "ABHA Linked",      value: stats.abhaLinked,  accent: "text-blue-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {c.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-semibold ${c.accent}`}>
              {c.value.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}