// app/admin/patients/PatientsPageClient.tsx
"use client";

import { Suspense } from "react";
import { PatientStatsCards } from "@/components/admin/patient/PatientStatsCard";
import { PatientFilters } from "@/components/admin/patient/PatientFilter";
import { PatientTable } from "@/components/admin/patient/PatientTable";
import { PatientPagination } from "@/components/admin/patient/PatientPagination";
import type { AdminPatientRow, PatientStats } from "@/server/repositories/patient.repo";

/* -------------------------------------------------------
   Suspense skeletons
------------------------------------------------------- */
function FiltersSkeleton() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="h-10 min-w-55 flex-1 animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-42.5 animate-pulse rounded-md bg-muted" />
    </div>
  );
}

function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="h-4 w-44 animate-pulse rounded bg-muted" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-8 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   Props
------------------------------------------------------- */
interface PatientsPageClientProps {
  initialData: AdminPatientRow[];
  total: number;
  page: number;
  limit: number;
  stats: PatientStats;
  currentSearch: string;
  currentStatus: string;
}

/* -------------------------------------------------------
   Component
------------------------------------------------------- */
export default function PatientsPageClient({
  initialData,
  total,
  page,
  limit,
  stats,
  currentSearch,
  currentStatus,
}: PatientsPageClientProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Patients</h1>
        <p className="text-sm text-muted-foreground">
          All registered patients on the platform.
        </p>
      </div>

      {/* Stats */}
      <PatientStatsCards stats={stats} />

      {/* Filters */}
      <Suspense fallback={<FiltersSkeleton />}>
        <PatientFilters
          currentSearch={currentSearch}
          currentStatus={currentStatus}
        />
      </Suspense>

      {/* Table */}
      <PatientTable data={initialData} />

      {/* Pagination */}
      <Suspense fallback={<PaginationSkeleton />}>
        <PatientPagination
          currentPage={page}
          totalResults={total}
          pageSize={limit}
        />
      </Suspense>
    </div>
  );
}