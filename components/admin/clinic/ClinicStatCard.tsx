import { Card,CardContent } from "@/components/ui/card";

interface ClinicStatCardProps {
  title: string;
  value: string | number;
  meta?: string;
  metaColor?: "green" | "blue" | "gray";
}

export function ClinicStatCard({
  title,
  value,
  meta,
  metaColor = "gray",
}: ClinicStatCardProps) {
  const metaColorClasses: Record<typeof metaColor, string> = {
    green: "text-green-600",
    blue: "text-blue-600",
    gray: "text-muted-foreground",
  };

  return (
    <Card className="rounded-xl">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{title}</p>

        <div className="mt-2 text-3xl font-semibold text-foreground">
          {value}
        </div>

        {meta && (
          <p className={`mt-2 text-sm ${metaColorClasses[metaColor]}`}>
            {meta}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
