import { Badge } from "@/components/ui/badge";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const styles: Record<AppointmentStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    CONFIRMED: "bg-green-100 text-green-800 hover:bg-green-100",
    COMPLETED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const labelMap: Record<AppointmentStatus, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labelMap[status]}
    </Badge>
  );
}
