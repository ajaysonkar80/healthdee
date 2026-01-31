import { Badge } from "@/components/ui/badge";

type ClinicStatus = "ACTIVE" | "PENDING" | "INACTIVE";

interface ClinicStatusBadgeProps {
  status: ClinicStatus;
}

export function ClinicStatusBadge({ status }: ClinicStatusBadgeProps) {
  const statusStyles: Record<ClinicStatus, string> = {
    ACTIVE: "bg-green-100 text-green-700 hover:bg-green-100",
    PENDING: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    INACTIVE: "bg-gray-100 text-gray-600 hover:bg-gray-100",
  };

  return (
    <Badge className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </Badge>
  );
}
