import { Card,CardContent,CardHeader } from "../ui/Card";
import { Badge } from "../ui/badge";
import { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  footerText?: string;
  footerColor?: string;
};

export default function StatsCard({
  title,
  value,
  icon,
  footerText,
  footerColor = "text-muted-foreground",
}: StatsCardProps) {
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>
        <Badge variant="outline" className="p-2">
          {icon}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {footerText && (
          <p className={`mt-1 text-sm ${footerColor}`}>{footerText}</p>
        )}
      </CardContent>
    </Card>
  );
}
