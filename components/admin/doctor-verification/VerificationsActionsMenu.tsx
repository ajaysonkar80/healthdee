// components/admin/doctor-verification/VerificationsActionsMenu.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Check, X, MoreHorizontal, Loader2 } from "lucide-react";

interface VerificationActionsMenuProps {
  verificationStatus: "pending" | "verified" | "rejected";
  isLoading?: boolean;
  onView?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export function VerificationActionsMenu({
  verificationStatus,
  isLoading = false,
  onView,
  onApprove,
  onReject,
}: VerificationActionsMenuProps) {
  if (isLoading) {
    return (
      <div className="flex justify-end">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>

        {/* Only show Approve when not already verified */}
        {verificationStatus !== "verified" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onApprove}
              className="text-green-600 focus:text-green-600"
            >
              <Check className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
          </>
        )}

        {/* Only show Reject when not already rejected */}
        {verificationStatus !== "rejected" && (
          <DropdownMenuItem
            onClick={onReject}
            className="text-red-600 focus:text-red-600"
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}