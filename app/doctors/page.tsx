import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import DoctorsTopBar from "@/components/doctors/DoctorsTopBar";
import DoctorsFilters from "@/components/doctors/DoctorsFilter";
import DoctorsPagination from "@/components/doctors/DoctorsPagination";
import DoctorCard, {
  DoctorListItem,
} from "@/components/doctors/DoctorsCard";

type ApiResponse = {
  data: DoctorListItem[];
  pagination: {
    page: number;
    totalPages: number;
    total: number;
  };
};

const PAGE_SIZE = 9;

async function getDoctors(
  searchParams: {
    search?: string;
    minFee?: string;
    maxFee?: string;
    page?: string;
  }
): Promise<ApiResponse> {
  const params = new URLSearchParams();

  if (searchParams.search) {
    params.set("search", searchParams.search);
  }

  if (searchParams.minFee) {
    params.set("minFee", searchParams.minFee);
  }

  if (searchParams.maxFee) {
    params.set("maxFee", searchParams.maxFee);
  }

  params.set("page", searchParams.page ?? "1");
  params.set("limit", PAGE_SIZE.toString());

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/doctors?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return {
        data: [],
        pagination: {
          page: 1,
          totalPages: 1,
          total: 0,
        },
      };
    }

    return (await res.json()) as ApiResponse;
  } catch {
    return {
      data: [],
      pagination: {
        page: 1,
        totalPages: 1,
        total: 0,
      },
    };
  }
}

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    minFee?: string;
    maxFee?: string;
    page?: string;
  };
}) {
  const { data, pagination } = await getDoctors(searchParams);

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <DoctorsTopBar />

        <div className="flex flex-col lg:flex-row gap-8">
          <DoctorsFilters />

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
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