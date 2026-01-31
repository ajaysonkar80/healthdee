import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface VerificationPaginationProps {
  currentPage: number;
  totalResults: number;
}

export function VerificationPagination({
  currentPage,
  totalResults,
}: VerificationPaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Showing page {currentPage} of {Math.ceil(totalResults / 10)}
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
