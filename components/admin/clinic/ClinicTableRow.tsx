import Link from "next/link";
import { TableRow, TableCell } from "@/components/ui/table";
import { ClinicStatusBadge } from "./ClinicStatusBadge";
import { Pencil } from "lucide-react";

export interface ClinicRowData {
  id: string;
  name: string;
  city: string;
  linkedDoctors: number;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
}

interface ClinicTableRowProps {
  clinic: ClinicRowData;
}

export function ClinicTableRow({ clinic }: ClinicTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{clinic.name}</TableCell>

      <TableCell className="text-muted-foreground">
        {clinic.city}
      </TableCell>

      <TableCell>{clinic.linkedDoctors}</TableCell>

      <TableCell>
        <ClinicStatusBadge status={clinic.status} />
      </TableCell>

      <TableCell className="text-right">
        <Link
          href={`/admin/clinic/${clinic.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          <Pencil className="h-4 w-4" />
          Edit Info
        </Link>
      </TableCell>
    </TableRow>
  );
}
