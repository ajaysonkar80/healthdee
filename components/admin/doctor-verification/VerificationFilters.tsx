// components/admin/doctor-verification/VerificationFilters.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_VALUE = "__all__";
const DEBOUNCE_MS = 350;

interface VerificationFiltersProps {
  currentSearch: string;
  currentStatus: string;
}

export function VerificationFilters({
  currentSearch,
  currentStatus,
}: VerificationFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(currentSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      for (const [key, value] of Object.entries(updates)) {
        if (!value || value === ALL_VALUE) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchValue !== currentSearch) {
        updateParams({ search: searchValue || null });
      }
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const hasActiveFilters = currentSearch || currentStatus;

  function clearAll() {
    setSearchValue("");
    router.push(pathname);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-background p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </div>

      {/* Search */}
      <div className="relative min-w-55 flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          label=""
          className="pl-9"
          placeholder="Search name, specialty, RMP, email…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Verification status */}
      <Select
        value={currentStatus || ALL_VALUE}
        onValueChange={(val) =>
          updateParams({
            verificationStatus: val === ALL_VALUE ? null : val,
          })
        }
      >
        <SelectTrigger className="w-42.5">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Requests</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="gap-1 text-muted-foreground"
        >
          <X className="h-3.5 w-3.5" />
          Clear All
        </Button>
      )}
    </div>
  );
}