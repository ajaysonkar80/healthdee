"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function DoctorsPagination({
  currentPage,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/doctors?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;

        return (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => goToPage(page)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}