// components/admin/doctor-verification/VerificationTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { VerificationTableRow } from "./VerificationTableRow";
import type { VerificationRowData } from "./VerificationTableRow";

interface VerificationTableProps {
  data: VerificationRowData[];
  loadingId: string | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function VerificationTable({
  data,
  loadingId,
  onApprove,
  onReject,
}: VerificationTableProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No verification requests match the current filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty / RMP No.</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <VerificationTableRow
                key={item.id}
                data={item}
                isLoading={loadingId === item.id}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}