// app/doctor/earnings/page.tsx
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { doctorEarningService } from "@/server/services/doctor_earning.service";
import EarningsSummary from "@/components/doctor/earnings/EarningsSummary";
import EarningsTable from "@/components/doctor/earnings/EarningsTable";
import { EarningsSummarySkeleton } from "@/components/doctor/earnings/EarningsSummarySkeleton";
import { EarningsTableSkeleton } from "@/components/doctor/earnings/EarningsTableSkeleton";

const PAGE_LIMIT = 10;

interface SearchParams {
  page?: string;
}

export default async function DoctorEarningsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  const payload     = verifyAccessToken(token);
  const actorUserId = payload.sub as string;

  const params = await searchParams;
  const page   = Math.max(1, Number(params.page) || 1);

  // Parallel fetch — both hit the doctor_earnings table directly
  const [stats, historyResult] = await Promise.all([
    doctorEarningService
      .getEarningsStats(actorUserId)
      .catch(() => ({
        today: 0, thisWeek: 0, thisMonth: 0, allTime: 0,
        totalCount: 0, patientCount: 0,
      })),
    doctorEarningService
      .getEarningsHistory(actorUserId, {
        limit:  PAGE_LIMIT,
        offset: (page - 1) * PAGE_LIMIT,
      })
      .catch(() => ({ data: [], total: 0 })),
  ]);

  const totalPages = Math.ceil(historyResult.total / PAGE_LIMIT);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Earnings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your consultation earnings and payment history
        </p>
      </div>

      {/* Summary cards */}
      <Suspense fallback={<EarningsSummarySkeleton />}>
        <EarningsSummary stats={stats} />
      </Suspense>

      {/* History table */}
      <Suspense fallback={<EarningsTableSkeleton />}>
        <EarningsTable
          rows={historyResult.data}
          total={historyResult.total}
          currentPage={page}
          pageSize={PAGE_LIMIT}
        />
      </Suspense>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 text-sm">
          {page > 1 && (
            <a href={`/doctor/earnings?page=${page - 1}`}
              className="rounded-full border px-3 py-1 text-gray-600 hover:bg-gray-50">
              ← Prev
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a key={p} href={`/doctor/earnings?page=${p}`}
              className={`rounded-full border px-3 py-1 transition ${
                p === page
                  ? "bg-pink-600 text-white border-pink-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}>
              {p}
            </a>
          ))}
          {page < totalPages && (
            <a href={`/doctor/earnings?page=${page + 1}`}
              className="rounded-full border px-3 py-1 text-gray-600 hover:bg-gray-50">
              Next →
            </a>
          )}
        </div>
      )}
    </div>
  );
}