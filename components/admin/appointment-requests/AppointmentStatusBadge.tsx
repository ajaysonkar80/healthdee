import { Badge } from "@/components/ui/badge";

export type AppointmentStatus = "REQUESTED" | "ACCEPTED" | "REJECTED";

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const styles: Record<AppointmentStatus, string> = {
    REQUESTED: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    ACCEPTED: "bg-green-100 text-green-700 hover:bg-green-100",
    REJECTED: "bg-red-100 text-red-700 hover:bg-red-100",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status.toLowerCase()}
    </Badge>
  );
}
