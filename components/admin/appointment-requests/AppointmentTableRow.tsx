// components/admin/appointment-requests/AppointmentTableRow.tsx
"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import type { AppointmentStatus } from "./AppointmentStatusBadge";
import { AppointmentStatusBadge } from "./AppointmentStatusBadge";
import { AppointmentActionsMenu } from "./AppointmentActionsMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface AppointmentRowData {
  id: string;
  patientName: string;
  patientAvatar?: string;
  doctorName: string;
  scheduledAt: Date;
  status: AppointmentStatus;
}

interface AppointmentTableRowProps {
  data: AppointmentRowData;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  loadingId?: string | null;
}

export function AppointmentTableRow({
  data,
  onAccept,
  onReject,
  loadingId,
}: AppointmentTableRowProps) {
  const dateObj = new Date(data.scheduledAt);

  const date = dateObj.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isLoading = loadingId === data.id;

  const canAccept = data.status === "PENDING";
  const canReject =
    data.status === "PENDING" || data.status === "CONFIRMED";

  return (
    <TableRow className={isLoading ? "opacity-50" : ""}>
      {/* Patient */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={data.patientAvatar} />
            <AvatarFallback>{data.patientName.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="font-medium">{data.patientName}</p>
        </div>
      </TableCell>

      {/* Doctor */}
      <TableCell className="text-muted-foreground">
        {data.doctorName}
      </TableCell>

      {/* Date & Time */}
      <TableCell>
        <p className="font-medium">{date}</p>
        <p className="text-sm text-muted-foreground">{time}</p>
      </TableCell>

      {/* Status */}
      <TableCell>
        <AppointmentStatusBadge status={data.status} />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <AppointmentActionsMenu
          isLoading={isLoading}
          canAccept={canAccept}
          canReject={canReject}
          onAccept={canAccept ? () => onAccept?.(data.id) : undefined}
          onReject={canReject ? () => onReject?.(data.id) : undefined}
        />
      </TableCell>
    </TableRow>
  );
}