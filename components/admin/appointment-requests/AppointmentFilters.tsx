import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

export function AppointmentFilters() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-background p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </div>

      {/* Date Filter */}
      <Select defaultValue="today">
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select defaultValue="all">
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Requests</SelectItem>
          <SelectItem value="requested">Requested</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="ghost" className="ml-auto">
        Clear All
      </Button>

      <Button>Apply Filters</Button>
    </div>
  );
}
