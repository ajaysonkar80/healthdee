"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { AppointmentStatusBadge, AppointmentStatus } from "./AppointmentStatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
}

export function AppointmentTableRow({ data }: AppointmentTableRowProps) {
  const dateObj = new Date(data.scheduledAt);

  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={data.patientAvatar} />
            <AvatarFallback>
              {data.patientName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{data.patientName}</p>
            
          </div>
        </div>
      </TableCell>

      <TableCell>
        {data.doctorName}
      </TableCell>

      <TableCell>
        <p className="font-medium">{date}</p>
        <p className="text-sm text-muted-foreground">{time}</p>
      </TableCell>

      <TableCell>
        <AppointmentStatusBadge status={data.status} />
      </TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>

            <DropdownMenuItem
              className="text-green-600"
              onClick={async () => {
                await fetch(`/api/appointments/${data.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: "CONFIRMED" }),
                });
                location.reload();
              }}
            >
              Accept
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600"
              onClick={async () => {
                await fetch(`/api/appointments/${data.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: "CANCELLED" }),
                });
                location.reload();
              }}
            >
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
