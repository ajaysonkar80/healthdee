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
}

export function AppointmentPagination({
  currentPage,
  totalResults,
}: AppointmentPaginationProps) {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Showing page {currentPage} of {totalPages} requests
      </span>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
