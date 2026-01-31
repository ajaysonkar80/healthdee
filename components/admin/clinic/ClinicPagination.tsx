import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ClinicPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ClinicPagination({
  currentPage,
  totalPages,
}: ClinicPaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing page {currentPage} of {totalPages}
      </p>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
