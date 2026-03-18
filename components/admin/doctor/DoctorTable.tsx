// components/admin/doctor/DoctorTable.tsx
"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DoctorRowActions } from "@/components/admin/doctor/DoctorRowAction";

/* -------------------------------------------------------
   Inline types (avoids module resolution issues)
------------------------------------------------------- */

export type DoctorRow = {
  id: string;
  publicId: string;
  fullName: string | null;
  specialty: string;
  experienceYears: number | null;
  consultationFee: number | null;
  rating: number;
  profileImageUrl: string | null;
  rmpRegistrationNumber: string;
  verificationStatus: "pending" | "verified" | "rejected";
  isActive: boolean | null;
  createdAt: Date | null;
  userId: string;
  userStatus: string;
};

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

function getInitials(fullName: string | null, publicId: string): string {
  if (fullName) {
    return fullName
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return publicId.slice(0, 2).toUpperCase();
}

function VerificationBadge({
  status,
}: {
  status: "pending" | "verified" | "rejected";
}) {
  const classMap: Record<"pending" | "verified" | "rejected", string> = {
    verified: "bg-green-100 text-green-700",
    pending: "bg-orange-100 text-orange-700",
    rejected: "bg-red-100 text-red-600",
  };

  return (
    <Badge className={classMap[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

/* -------------------------------------------------------
   Component
------------------------------------------------------- */

interface DoctorTableProps {
  data: DoctorRow[];
}

export function DoctorTable({ data }: DoctorTableProps) {
  const router = useRouter();

  // Map of doctorId → optimistic isActive value
  // Only populated while a toggle is in-flight or immediately after
  const [optimisticState, setOptimisticState] = useState<
    Record<string, boolean>
  >({});
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = useCallback(
    async (doctorId: string, currentIsActive: boolean) => {
      if (togglingId) return; // prevent double-click

      const nextValue = !currentIsActive;

      // Optimistic update
      setOptimisticState((prev) => ({ ...prev, [doctorId]: nextValue }));
      setTogglingId(doctorId);

      try {
        const res = await fetch(`/api/doctors/${doctorId}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: nextValue }),
        });

        if (!res.ok) {
          // Roll back
          setOptimisticState((prev) => ({
            ...prev,
            [doctorId]: currentIsActive,
          }));
          console.error("Failed to update doctor status");
          return;
        }

        // Trigger server component re-fetch so counts in StatsCards refresh too
        router.refresh();
      } catch (err) {
        // Roll back on network error
        setOptimisticState((prev) => ({
          ...prev,
          [doctorId]: currentIsActive,
        }));
        console.error("Toggle error:", err);
      } finally {
        setTogglingId(null);
      }
    },
    [togglingId, router]
  );

  if (data.length === 0) {
    return (
      <div className="rounded-lg border bg-background px-6 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          No doctors found matching the current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>RMP No.</TableHead>
            <TableHead>Fee (₹)</TableHead>
            <TableHead>Verification</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((doctor) => {
            const doctorId = doctor.id;
            const resolvedIsActive =
              doctorId in optimisticState
                ? optimisticState[doctorId]
                : doctor.isActive ?? false;

            return (
              <TableRow key={doctorId}>
                {/* Doctor name + avatar */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      {doctor.profileImageUrl && (
                        <AvatarImage
                          src={doctor.profileImageUrl}
                          alt={doctor.fullName ?? doctor.publicId}
                        />
                      )}
                      <AvatarFallback className="text-xs">
                        {getInitials(doctor.fullName, doctor.publicId)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {doctor.fullName ?? "—"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {doctor.publicId}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Specialty */}
                <TableCell className="text-sm">{doctor.specialty}</TableCell>

                {/* RMP registration */}
                <TableCell className="font-mono text-xs">
                  {doctor.rmpRegistrationNumber}
                </TableCell>

                {/* Consultation fee */}
                <TableCell className="text-sm">
                  {doctor.consultationFee != null
                    ? `₹${doctor.consultationFee.toLocaleString("en-IN")}`
                    : "—"}
                </TableCell>

                {/* Verification badge */}
                <TableCell>
                  <VerificationBadge status={doctor.verificationStatus} />
                </TableCell>

                {/* Active / inactive badge */}
                <TableCell>
                  <Badge
                    className={
                      resolvedIsActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }
                  >
                    {resolvedIsActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex justify-center">
                    <DoctorRowActions
                      doctorId={doctorId}
                      isActive={resolvedIsActive}
                      isToggling={togglingId === doctorId}
                      onToggle={() =>
                        handleToggle(doctorId, resolvedIsActive)
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}