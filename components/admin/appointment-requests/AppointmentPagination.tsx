// components/admin/appointment-requests/AppointmentPagination.tsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppointmentPaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function AppointmentPagination({
  currentPage,
  totalResults,
  pageSize,
  onPageChange,
}: AppointmentPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const start = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalResults);

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <span>
        {totalResults === 0
          ? "No results"
          : `Showing ${start}–${end} of ${totalResults}`}
      </span>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!isFirst) onPageChange(currentPage - 1);
              }}
              aria-disabled={isFirst}
              className={
                isFirst ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <span className="px-3 py-2 text-sm">
              {currentPage} / {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!isLast) onPageChange(currentPage + 1);
              }}
              aria-disabled={isLast}
              className={
                isLast ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}