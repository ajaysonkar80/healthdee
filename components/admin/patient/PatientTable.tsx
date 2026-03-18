// components/admin/patient/PatientTable.tsx
"use client";

import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AdminPatientRow } from "@/server/repositories/patient.repo";

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

function getInitials(fullName: string | null, id: string): string {
  if (fullName) {
    return fullName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  }
  return id.slice(0, 2).toUpperCase();
}

function formatDate(date: Date | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(date));
}

/* -------------------------------------------------------
   Component
------------------------------------------------------- */

interface PatientTableProps {
  data: AdminPatientRow[];
}

export function PatientTable({ data }: PatientTableProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border bg-background px-6 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          No patients found matching the current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>ABHA</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((patient) => (
            <TableRow key={patient.id}>
              {/* Avatar + name */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    {patient.profileImageUrl && (
                      <AvatarImage
                        src={patient.profileImageUrl}
                        alt={patient.fullName ?? "Patient"}
                      />
                    )}
                    <AvatarFallback className="text-xs">
                      {getInitials(patient.fullName, patient.id)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {patient.fullName ?? (
                        <span className="text-muted-foreground italic">
                          No name
                        </span>
                      )}
                    </p>
                    {patient.gender && (
                      <p className="text-xs text-muted-foreground capitalize">
                        {patient.gender}
                        {patient.bloodGroup
                          ? ` · ${patient.bloodGroup}`
                          : ""}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>

              {/* Email + phone */}
              <TableCell>
                <p className="truncate text-sm">
                  {patient.email ?? (
                    <span className="text-muted-foreground">—</span>
                  )}
                </p>
                {patient.phone && (
                  <p className="text-xs text-muted-foreground">
                    {patient.phone}
                  </p>
                )}
              </TableCell>

              {/* City / State */}
              <TableCell className="text-sm">
                {patient.city || patient.state
                  ? [patient.city, patient.state].filter(Boolean).join(", ")
                  : <span className="text-muted-foreground">—</span>}
              </TableCell>

              {/* ABHA linked */}
              <TableCell>
                {patient.abhaLinked ? (
                  <Badge className="bg-blue-100 text-blue-700">Linked</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-500">—</Badge>
                )}
              </TableCell>

              {/* Account status */}
              <TableCell>
                <Badge
                  className={
                    patient.userStatus === "active"
                      ? "bg-green-100 text-green-700"
                      : patient.userStatus === "deactivated"
                      ? "bg-gray-100 text-gray-500"
                      : "bg-red-100 text-red-600"
                  }
                >
                  {patient.userStatus.charAt(0).toUpperCase() +
                    patient.userStatus.slice(1)}
                </Badge>
              </TableCell>

              {/* Joined date */}
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(patient.joinedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}