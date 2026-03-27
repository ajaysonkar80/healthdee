// app/admin/doctors/DoctorsPageClient.tsx
"use client";

import { Suspense } from "react";
import Link from "next/link";
import { PlusCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/admin/doctor/StatsCard";
import { DoctorFilters } from "@/components/admin/doctor/DoctorFilters";
import { DoctorTable } from "@/components/admin/doctor/DoctorTable";
import { DoctorPagination } from "@/components/admin/doctor/DoctorPagination";
import { BulkHelpCards } from "@/components/admin/doctor/BulkHelpCards";
import type { DoctorRow } from "@/components/admin/doctor/DoctorTable";
import { DoctorVerificationSchema, DoctorVerificationStatus } from "@/db/schema";
type DoctorStats = {
  total: number;
  verified: number;
  pending: number;
  active: number;
};

interface DoctorsPageClientProps {
  initialDoctors: any[];
  total: number;
  page: number;
  limit: number;
  stats: DoctorStats;
  currentSearch: string|null|undefined;
  currentVerificationStatus: DoctorVerificationStatus | undefined;
  currentSpecialty: string|null|undefined;
}

/* -------------------------------------------------------
   Fallback skeletons shown during Suspense boundaries.
   useSearchParams() suspends on first SSR render, so
   DoctorFilters and DoctorPagination each need their own
   boundary — otherwise Next.js throws a hydration mismatch.
------------------------------------------------------- */

function FiltersSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="h-10 min-w-55 flex-1 animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-45 animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-45 animate-pulse rounded-md bg-muted" />
    </div>
  );
}

function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-8 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default function DoctorsPageClient({
  initialDoctors,
  total,
  page,
  limit,
  stats,
  currentSearch,
  currentVerificationStatus,
  currentSpecialty,
}: DoctorsPageClientProps) {
  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Doctors</h1>
          <p className="text-sm text-muted-foreground">
            Manage all registered doctor profiles on the platform.
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/doctor/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Doctor
          </Link>
        </Button>
      </div>

      {/* ── Stats cards (no useSearchParams, no Suspense needed) ── */}
      <StatsCards stats={stats} />

      {/* ── Info / help cards ── */}
      <BulkHelpCards />

      {/* ── Filters — wrapped in Suspense because useSearchParams()
           causes a hydration mismatch if rendered without a boundary ── */}
      <Suspense fallback={<FiltersSkeleton />}>
        <DoctorFilters
          currentSearch={currentSearch??""}
          currentVerificationStatus={currentVerificationStatus}
          currentSpecialty={currentSpecialty??""}
        />
      </Suspense>

      {/* ── Table (data comes from server, no useSearchParams) ── */}
      <DoctorTable data={initialDoctors} />

      {/* ── Pagination — same reason as DoctorFilters ── */}
      <Suspense fallback={<PaginationSkeleton />}>
        <DoctorPagination
          currentPage={page}
          totalResults={total}
          pageSize={limit}
        />
      </Suspense>
    </div>
  );
}