import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Check, X, MoreHorizontal } from "lucide-react";

interface VerificationActionsMenuProps {
  onView?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export function VerificationActionsMenu({
  onView,
  onApprove,
  onReject,
}: VerificationActionsMenuProps) {
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
          onClick={onApprove}
          className="text-green-600 focus:text-green-600"
        >
          <Check className="mr-2 h-4 w-4" />
          Approve
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
