// components/admin/appointment-requests/AppointmentFilters.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";
import type { AppointmentStatus } from "./AppointmentStatusBadge";

// "all" is a sentinel meaning "no filter" — Radix Select forbids empty string values
type DatePreset = "all" | "today" | "week" | "month";
type StatusFilter = AppointmentStatus | "all";

interface AppointmentFiltersProps {
  currentStatus?: AppointmentStatus;
  currentFrom?: string;
  currentTo?: string;
  hasActiveFilters: boolean;
  onFilter: (filters: {
    status?: AppointmentStatus;
    from?: string;
    to?: string;
  }) => void;
  onClear: () => void;
}

// ─── Date preset → ISO range ──────────────────────────────────────
function getDateRange(preset: DatePreset): {
  from?: string;
  to?: string;
} {
  if (preset === "all") return {};

  const now = new Date();
  const to = now.toISOString();

  if (preset === "today") {
    const from = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).toISOString();
    return { from, to };
  }

  if (preset === "week") {
    const from = new Date(
      now.getTime() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    return { from, to };
  }

  if (preset === "month") {
    const from = new Date(
      now.getTime() - 30 * 24 * 60 * 60 * 1000
    ).toISOString();
    return { from, to };
  }

  return {};
}

export function AppointmentFilters({
  currentStatus,
  currentFrom,
  currentTo,
  hasActiveFilters,
  onFilter,
  onClear,
}: AppointmentFiltersProps) {
  const [localStatus, setLocalStatus] = useState<StatusFilter>(
    currentStatus ?? "all"
  );
  const [localDatePreset, setLocalDatePreset] = useState<DatePreset>("all");

  function handleApply() {
    const dateRange = getDateRange(localDatePreset);
    onFilter({
      status: localStatus === "all" ? undefined : localStatus,
      from: dateRange.from,
      to: dateRange.to,
    });
  }

  function handleClear() {
    setLocalStatus("all");
    setLocalDatePreset("all");
    onClear();
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-background p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </div>

      {/* Date Range */}
      <Select
        value={localDatePreset}
        onValueChange={(v) => setLocalDatePreset(v as DatePreset)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Last 7 days</SelectItem>
          <SelectItem value="month">Last 30 days</SelectItem>
        </SelectContent>
      </Select>

      {/* Status — values match AppointmentStatus enum */}
      <Select
        value={localStatus}
        onValueChange={(v) => setLocalStatus(v as StatusFilter)}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-2">
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="gap-1 text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
        <Button size="sm" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}