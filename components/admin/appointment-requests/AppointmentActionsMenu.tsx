// components/admin/appointment-requests/AppointmentActionsMenu.tsx

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Check, X, MoreHorizontal, Loader2 } from "lucide-react";

interface AppointmentActionsMenuProps {
  isLoading?: boolean;
  canAccept?: boolean;
  canReject?: boolean;
  onView?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export function AppointmentActionsMenu({
  isLoading = false,
  canAccept = false,
  canReject = false,
  onView,
  onAccept,
  onReject,
}: AppointmentActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>

        {(canAccept || canReject) && <DropdownMenuSeparator />}

        {canAccept && (
          <DropdownMenuItem
            onClick={onAccept}
            className="text-green-600 focus:text-green-600"
            disabled={isLoading}
          >
            <Check className="mr-2 h-4 w-4" />
            Accept
          </DropdownMenuItem>
        )}

        {canReject && (
          <DropdownMenuItem
            onClick={onReject}
            className="text-red-600 focus:text-red-600"
            disabled={isLoading}
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}