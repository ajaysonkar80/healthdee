// components/admin/doctor/DoctorRowAction.tsx
"use client";

import Link from "next/link";
import { Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export interface DoctorRowActionsProps {
  doctorId: string;
  isActive: boolean;
  isToggling?: boolean;
  onToggle: () => void;
}

export function DoctorRowActions({
  doctorId,
  isActive,
  isToggling = false,
  onToggle,
}: DoctorRowActionsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Edit — links to existing admin/doctor/[doctorId]/edit page */}
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/doctor/${doctorId}/edit`}>
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit doctor</span>
        </Link>
      </Button>

      {/* Active toggle — calls PATCH /api/doctors/[id] */}
      {isToggling ? (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : (
        <Switch
          checked={isActive}
          onCheckedChange={onToggle}
          aria-label={isActive ? "Deactivate doctor" : "Activate doctor"}
        />
      )}
    </div>
  );
}