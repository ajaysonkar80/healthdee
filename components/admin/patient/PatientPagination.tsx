// components/admin/patient/PatientPagination.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PatientPaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize: number;
}

export function PatientPagination({
  currentPage,
  totalResults,
  pageSize,
}: PatientPaginationProps) {
  const router      = useRouter();
  const pathname    = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalResults / pageSize);
  if (totalPages <= 1) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to   = Math.min(currentPage * pageSize, totalResults);

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  function getPageNumbers(): (number | "…")[] {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    const start = Math.max(2, currentPage - 1);
    const end   = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Showing {from}–{to} of {totalResults.toLocaleString()} patients
      </span>

      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8"
          disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((p, i) =>
          p === "…" ? (
            <span key={`e-${i}`} className="px-2">…</span>
          ) : (
            <Button key={p} size="icon" className="h-8 w-8"
              variant={p === currentPage ? "default" : "outline"}
              onClick={() => goToPage(p as number)}>
              {p}
            </Button>
          )
        )}

        <Button variant="outline" size="icon" className="h-8 w-8"
          disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}