"use client";

import { Button } from "@/components/ui/button";

interface DoctorDeleteModalProps {
  doctorName: string;
  isOpen: boolean;
  isPending?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DoctorDeleteModal({
  doctorName,
  isOpen,
  isPending = false,
  onClose,
  onConfirm,
}: DoctorDeleteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-foreground">
          Delete doctor profile?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This will permanently remove {doctorName} from the directory. This
          action cannot be undone.
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
