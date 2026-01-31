import { Badge } from "@/components/ui/badge";

export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

interface VerificationStatusBadgeProps {
  status: VerificationStatus;
}

export function VerificationStatusBadge({
  status,
}: VerificationStatusBadgeProps) {
  const styles: Record<VerificationStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    APPROVED: "bg-green-100 text-green-700 hover:bg-green-100",
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
