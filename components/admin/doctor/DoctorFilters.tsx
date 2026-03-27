// components/admin/doctor/DoctorFilters.tsx
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

const DEBOUNCE_MS = 350;

const SPECIALTIES = [
  "Cardiology",
  "Dermatology",
  "General Medicine",
  "Gynecology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology",
];

const ALL_VALUE = "__all__";

interface DoctorFiltersProps {
  currentSearch: string;
  currentVerificationStatus: string|undefined;
  currentSpecialty: string;
}

export function DoctorFilters({
  currentSearch,
  currentVerificationStatus,
  currentSpecialty,
}: DoctorFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(currentSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Always reset to page 1 when filters change
      params.delete("page");

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "" || value === ALL_VALUE) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  // Debounce search → URL update
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

  const hasActiveFilters =
    currentSearch || currentVerificationStatus || currentSpecialty;

  function clearAll() {
    setSearchValue("");
    router.push(pathname);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative min-w-55 flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          label=""
          className="pl-9"
          placeholder="Search by name, specialty, RMP no."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Verification status */}
      <Select
        value={currentVerificationStatus || ALL_VALUE}
        onValueChange={(val) =>
          updateParams({ verificationStatus: val === ALL_VALUE ? null : val })
        }
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Verification" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {/* Specialty */}
      <Select
        value={currentSpecialty || ALL_VALUE}
        onValueChange={(val) =>
          updateParams({ specialty: val === ALL_VALUE ? null : val })
        }
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Specialty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>All Specialties</SelectItem>
          {SPECIALTIES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear all filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="gap-1 text-muted-foreground"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  );
}