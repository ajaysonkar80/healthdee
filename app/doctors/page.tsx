import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import DoctorsTopBar from "@/components/doctors/DoctorsTopBar";
import DoctorsFilters from "@/components/doctors/DoctorsFilter";
import DoctorsPagination from "@/components/doctors/DoctorsPagination";
import type {
  DoctorListItem,
} from "@/components/doctors/DoctorsCard";
import DoctorCard from "@/components/doctors/DoctorsCard";

import { doctorService } from "@/server/services/doctor.service";

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
  searchParams: Promise<{
    search?: string;
    minFee?: string;
    maxFee?: string;
    page?: string;
  }>;
}) {
  // ✅ Next 15 requires unwrapping searchParams
  const resolvedSearchParams = await searchParams;

  let result: DoctorsResponse;

  try {
    result = await doctorService.getPublicDoctors({
      search: resolvedSearchParams.search,
      minFee: resolvedSearchParams.minFee,
      maxFee: resolvedSearchParams.maxFee,
      page: resolvedSearchParams.page,
      limit: PAGE_SIZE,
    });
  } catch {
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

  const { data, pagination } = result;

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <DoctorsTopBar />

        <div className="flex flex-col lg:flex-row gap-8">
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
                <p className="text-muted-foreground">
                  No doctors found.
                </p>
              )}
            </div>

            <DoctorsPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}