"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export interface DoctorRowActionsProps {
  doctorId: string;
  isActive: boolean;
  isDeleting?: boolean;
  onDelete: () => void;
  onToggle: () => void;
}

export function DoctorRowActions({
  doctorId,
  isActive,
  isDeleting = false,
  onDelete,
  onToggle,
}: DoctorRowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/doctors/${doctorId}/edit`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={isDeleting}
        aria-label="Delete doctor"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Switch
        checked={isActive}
        onCheckedChange={onToggle}
        aria-label="Toggle doctor status"
      />
    </div>
  );
}
