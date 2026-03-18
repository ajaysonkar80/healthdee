// app/admin/doctors-verification/DoctorsVerificationClient.tsx
"use client";

import { Suspense, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VerificationFilters } from "@/components/admin/doctor-verification/VerificationFilters";
import { VerificationTable } from "@/components/admin/doctor-verification/VerificationTable";
import { VerificationPagination } from "@/components/admin/doctor-verification/VerificationPagination";
import type { VerificationRowData } from "@/components/admin/doctor-verification/VerificationTableRow";

/* -------------------------------------------------------
   Stats card type
------------------------------------------------------- */
type VerificationStats = {
  total: number;
  pending: number;
  verified: number;
  rejected: number;
};

/* -------------------------------------------------------
   Props
------------------------------------------------------- */
interface DoctorsVerificationClientProps {
  initialData: VerificationRowData[];
  total: number;
  page: number;
  limit: number;
  stats: VerificationStats;
  currentSearch: string;
  currentStatus: string;
}

/* -------------------------------------------------------
   Suspense fallbacks
------------------------------------------------------- */
function FiltersSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-background p-4">
      <div className="h-4 w-16 animate-pulse rounded bg-muted" />
      <div className="h-10 min-w-55 flex-1 animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-42.5 animate-pulse rounded-md bg-muted" />
    </div>
  );
}

function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-8 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   Stats cards
------------------------------------------------------- */
function VerificationStatsCards({ stats }: { stats: VerificationStats }) {
  const cards = [
    { title: "Total Requests", value: stats.total, accent: "" },
    { title: "Pending",  value: stats.pending,  accent: "text-yellow-600" },
    { title: "Verified", value: stats.verified, accent: "text-green-600" },
    { title: "Rejected", value: stats.rejected, accent: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.title}>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">
              {c.title}
            </p>
            <p className={`mt-1 text-2xl font-semibold ${c.accent}`}>
              {c.value.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   Main client component
------------------------------------------------------- */
export default function DoctorsVerificationClient({
  initialData,
  total,
  page,
  limit,
  stats,
  currentSearch,
  currentStatus,
}: DoctorsVerificationClientProps) {
  const router = useRouter();

  // Tracks which row is currently being acted on
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Optimistic local override: id → new status
  const [optimisticStatus, setOptimisticStatus] = useState<
    Record<string, VerificationRowData["verificationStatus"]>
  >({});

  const callVerifyApi = useCallback(
    async (
      doctorId: string,
      status: "verified" | "rejected"
    ) => {
      if (loadingId) return; // prevent double-click

      // Optimistic update
      setOptimisticStatus((prev) => ({ ...prev, [doctorId]: status }));
      setLoadingId(doctorId);

      try {
        const res = await fetch(`/api/doctors/${doctorId}/verify`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });

        if (!res.ok) {
          // Roll back
          setOptimisticStatus((prev) => {
            const next = { ...prev };
            delete next[doctorId];
            return next;
          });
          console.error("Verification action failed:", await res.text());
          return;
        }

        // Re-run server component so stats + list refresh
        router.refresh();
      } catch (err) {
        // Roll back on network error
        setOptimisticStatus((prev) => {
          const next = { ...prev };
          delete next[doctorId];
          return next;
        });
        console.error("Verification network error:", err);
      } finally {
        setLoadingId(null);
      }
    },
    [loadingId, router]
  );

  // Merge optimistic overrides into the server data before passing to table
  const displayData: VerificationRowData[] = initialData.map((row) =>
    optimisticStatus[row.id]
      ? { ...row, verificationStatus: optimisticStatus[row.id] }
      : row
  );

  return (
    <div className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Doctor Verification
          </h1>
          <p className="text-sm text-muted-foreground">
            Review and manage incoming doctor verification submissions.
          </p>
        </div>

        <Button variant="outline" disabled>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* ── Stats ── */}
      <VerificationStatsCards stats={stats} />

      {/* ── Filters — needs Suspense (useSearchParams) ── */}
      <Suspense fallback={<FiltersSkeleton />}>
        <VerificationFilters
          currentSearch={currentSearch}
          currentStatus={currentStatus}
        />
      </Suspense>

      {/* ── Table ── */}
      <VerificationTable
        data={displayData}
        loadingId={loadingId}
        onApprove={(id) => callVerifyApi(id, "verified")}
        onReject={(id) => callVerifyApi(id, "rejected")}
      />

      {/* ── Pagination — needs Suspense (useSearchParams) ── */}
      <Suspense fallback={<PaginationSkeleton />}>
        <VerificationPagination
          currentPage={page}
          totalResults={total}
          pageSize={limit}
        />
      </Suspense>
    </div>
  );
}