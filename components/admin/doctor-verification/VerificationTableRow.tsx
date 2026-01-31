import { TableCell, TableRow } from "@/components/ui/table";
import { VerificationStatusBadge, VerificationStatus } from "./VerificationStatusBadge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface VerificationRowData {
  id: string;
  doctorName: string;
  email: string;
  avatarUrl?: string;
  submittedAt: string;
  status: VerificationStatus;
}

interface VerificationTableRowProps {
  data: VerificationRowData;
}

export function VerificationTableRow({ data }: VerificationTableRowProps) {
  return (
    <TableRow>
      {/* Doctor Info */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={data.avatarUrl} />
            <AvatarFallback>
              {data.doctorName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{data.doctorName}</p>
            <p className="text-sm text-muted-foreground">{data.email}</p>
          </div>
        </div>
      </TableCell>

      {/* Date */}
      <TableCell className="text-muted-foreground">
        {data.submittedAt}
      </TableCell>

      {/* Status */}
      <TableCell>
        <VerificationStatusBadge status={data.status} />
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
              Approve
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
