import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import type { VerificationRowData } from "./VerificationTableRow";
import { VerificationTableRow } from "./VerificationTableRow";

interface VerificationTableProps {
  data: VerificationRowData[];
}

export function VerificationTable({ data }: VerificationTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <VerificationTableRow key={item.id} data={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
