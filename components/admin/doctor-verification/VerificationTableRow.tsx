// components/admin/doctor-verification/VerificationTableRow.tsx
"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { VerificationStatusBadge } from "./VerificationStatusBadge";
import { VerificationActionsMenu } from "./VerificationsActionsMenu";
import { DoctorInfoCell } from "./DoctorsInfoCell";

export interface VerificationRowData {
  id: string;
  doctorName: string | null;
  email: string | null;
  avatarUrl?: string | null;
  specialty: string;
  rmpRegistrationNumber: string;
  submittedAt: Date | null;
  verificationStatus: "pending" | "verified" | "rejected";
}

interface VerificationTableRowProps {
  data: VerificationRowData;
  isLoading: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function VerificationTableRow({
  data,
  isLoading,
  onApprove,
  onReject,
}: VerificationTableRowProps) {
  const formattedDate = data.submittedAt
    ? new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(data.submittedAt))
    : "—";

  return (
    <TableRow>
      {/* Doctor info */}
      <TableCell>
        <DoctorInfoCell
          name={data.doctorName ?? "Unknown Doctor"}
          email={data.email ?? "—"}
          avatarUrl={data.avatarUrl ?? undefined}
        />
      </TableCell>

      {/* Specialty + RMP */}
      <TableCell>
        <p className="text-sm font-medium">{data.specialty}</p>
        <p className="text-xs text-muted-foreground font-mono">
          {data.rmpRegistrationNumber}
        </p>
      </TableCell>

      {/* Submitted date */}
      <TableCell className="text-sm text-muted-foreground">
        {formattedDate}
      </TableCell>

      {/* Status */}
      <TableCell>
        <VerificationStatusBadge status={data.verificationStatus} />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <VerificationActionsMenu
          verificationStatus={data.verificationStatus}
          isLoading={isLoading}
          onApprove={() => onApprove(data.id)}
          onReject={() => onReject(data.id)}
        />
      </TableCell>
    </TableRow>
  );
}