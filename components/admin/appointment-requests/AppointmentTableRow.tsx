import { TableCell, TableRow } from "@/components/ui/table";
import { AppointmentStatusBadge, AppointmentStatus } from "./AppointmentStatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface AppointmentRowData {
  id: string;
  patientName: string;
  patientEmail: string;
  patientAvatar?: string;
  doctorName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

interface AppointmentTableRowProps {
  data: AppointmentRowData;
}

export function AppointmentTableRow({ data }: AppointmentTableRowProps) {
  return (
    <TableRow>
      {/* Patient */}
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
            <p className="text-sm text-muted-foreground">
              {data.patientEmail}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Doctor */}
      <TableCell className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        {data.doctorName}
      </TableCell>

      {/* Date & Time */}
      <TableCell>
        <p className="font-medium">{data.date}</p>
        <p className="text-sm text-muted-foreground">{data.time}</p>
      </TableCell>

      {/* Status */}
      <TableCell>
        <AppointmentStatusBadge status={data.status} />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-green-600">
              Accept
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
