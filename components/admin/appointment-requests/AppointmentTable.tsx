//Appointments table
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  AppointmentTableRow,
  AppointmentRowData,
} from "./AppointmentTableRow";

interface AppointmentTableProps {
  data: AppointmentRowData[];
}

export function AppointmentTable({ data }: AppointmentTableProps) {
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
                <AppointmentTableRow key={item.id} data={item} />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
