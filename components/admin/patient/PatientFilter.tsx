// components/admin/patient/PatientFilters.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_VALUE   = "__all__";
const DEBOUNCE_MS = 350;

interface PatientFiltersProps {
  currentSearch: string;
  currentStatus: string;
}

export function PatientFilters({
  currentSearch,
  currentStatus,
}: PatientFiltersProps) {
  const router      = useRouter();
  const pathname    = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(currentSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      for (const [key, value] of Object.entries(updates)) {
        if (!value || value === ALL_VALUE) params.delete(key);
        else params.set(key, value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchValue !== currentSearch)
        updateParams({ search: searchValue || null });
    }, DEBOUNCE_MS);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const hasActiveFilters = currentSearch || currentStatus;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative min-w-55 flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          label=""
          className="pl-9"
          placeholder="Search by name, email, phone, city…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Status */}
      <Select
        value={currentStatus || ALL_VALUE}
        onValueChange={(val) =>
          updateParams({ status: val === ALL_VALUE ? null : val })
        }
      >
        <SelectTrigger className="w-42.5">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="deactivated">Deactivated</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { setSearchValue(""); router.push(pathname); }}
          className="gap-1 text-muted-foreground"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}