// components/admin/doctor-verification/VerificationStatusBadge.tsx
import { Badge } from "@/components/ui/badge";

// DB-native values — schema uses lowercase, NOT uppercase PENDING/APPROVED/REJECTED
export type VerificationStatus = "pending" | "verified" | "rejected";

interface VerificationStatusBadgeProps {
  status: VerificationStatus;
}

export function VerificationStatusBadge({
  status,
}: VerificationStatusBadgeProps) {
  const styles: Record<VerificationStatus, string> = {
    pending:  "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    verified: "bg-green-100  text-green-700  hover:bg-green-100",
    rejected: "bg-red-100    text-red-700    hover:bg-red-100",
  };

  const labels: Record<VerificationStatus, string> = {
    pending:  "Pending",
    verified: "Verified",
    rejected: "Rejected",
  };

  return (
    <Badge
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </Badge>
  );
}