import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import DoctorsTopBar from "@/components/doctors/DoctorsTopBar";
import DoctorsFilters from "@/components/doctors/DoctorsFilter";
import DoctorsPagination from "@/components/doctors/DoctorsPagination";
import DoctorCard, { type DoctorListItem } from "@/components/doctors/DoctorsCard";

import { doctorService } from "@/server/services/doctor.service";

// Define the shape of the search parameters for Next.js 15
interface SearchParams {
  search?: string;
  minFee?: string;
  maxFee?: string;
  page?: string;
}

type DoctorsResponse = {
  data: DoctorListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const PAGE_SIZE = 9;

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // ✅ Next 15: Properly unwrap the Promise
  const resolvedParams = await searchParams;

  let result: DoctorsResponse;

  try {
    // Pass parameters with explicit fallbacks to avoid passing 'undefined' 
    // to a service that might not handle it.
    result = await doctorService.getPublicDoctors({
      search: resolvedParams.search ?? "",
      minFee: resolvedParams.minFee ?? "",
      maxFee: resolvedParams.maxFee ?? "",
      page: resolvedParams.page ?? "1",
      limit: PAGE_SIZE,
    });
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    // Fallback state if the service fails
    result = {
      data: [],
      pagination: {
        page: 1,
        limit: PAGE_SIZE,
        total: 0,
        totalPages: 1,
      },
    };
  }

  // Destructure for cleaner access
  const { data, pagination } = result;

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Pass params if TopBar needs to show "Showing results for..." */}
        <DoctorsTopBar total={pagination.total} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters component will read its own state from URL via useSearchParams */}
          <DoctorsFilters />

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.length > 0 ? (
                data.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                   <p className="text-lg font-medium">No doctors found</p>
                   <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>

            {pagination.totalPages > 1 && (
              <DoctorsPagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}