import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Check, X, MoreHorizontal } from "lucide-react";

interface AppointmentActionsMenuProps {
  onView?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export function AppointmentActionsMenu({
  onView,
  onAccept,
  onReject,
}: AppointmentActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onAccept}
          className="text-green-600 focus:text-green-600"
        >
          <Check className="mr-2 h-4 w-4" />
          Accept
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onReject}
          className="text-red-600 focus:text-red-600"
        >
          <X className="mr-2 h-4 w-4" />
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
