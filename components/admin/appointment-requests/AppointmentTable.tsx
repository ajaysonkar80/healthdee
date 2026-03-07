import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import type {
  AppointmentRowData} from "./AppointmentTableRow";
import {
  AppointmentTableRow
} from "./AppointmentTableRow";

interface AppointmentTableProps {
  data: AppointmentRowData[];
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  loadingId?: string | null;
}

export function AppointmentTable({
  data,
  onAccept,
  onReject,
  loadingId,
}: AppointmentTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <td
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No appointments found.
                </td>
              </TableRow>
            ) : (
              data.map((item) => (
                <AppointmentTableRow
                  key={item.id}
                  data={item}
                  onAccept={onAccept}
                  onReject={onReject}
                  loadingId={loadingId}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}