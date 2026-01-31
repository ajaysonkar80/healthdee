import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClinicTableRow, ClinicRowData } from "./ClinicTableRow";
import { Card, CardContent } from "@/components/ui/Card";

interface ClinicTableProps {
  clinics: ClinicRowData[];
}

export function ClinicTable({ clinics }: ClinicTableProps) {
  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Clinic Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Linked Doctors</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clinics.map((clinic) => (
              <ClinicTableRow key={clinic.id} clinic={clinic} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
