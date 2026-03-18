// app/admin/doctors/page.tsx
import { doctorService } from "@/server/services/doctor.service";
import DoctorsPageClient from "./DoctorsPageClient";
import type { DoctorVerificationStatus } from "@/db/schema";

const PAGE_LIMIT = 10;

interface SearchParams {
  page?: string;
  search?: string;
  verificationStatus?: string;
  specialty?: string;
}

export default async function AdminDoctorsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const search = params.search?.trim() || undefined;
  const verificationStatus = (
    ["pending", "verified", "rejected"].includes(
      params.verificationStatus ?? ""
    )
      ? params.verificationStatus
      : undefined
  ) as DoctorVerificationStatus | undefined;
  const specialty = params.specialty?.trim() || undefined;

  // Parallel fetch: list + stats
  const [listResult, stats] = await Promise.all([
    doctorService.listDoctors({
      limit: PAGE_LIMIT,
      offset: (page - 1) * PAGE_LIMIT,
      search,
      verificationStatus,
      specialty,
    }),
    doctorService.getDoctorStats(),
  ]);

  return (
    <DoctorsPageClient
      initialDoctors={listResult.data}
      total={listResult.total}
      page={page}
      limit={PAGE_LIMIT}
      stats={stats}
      currentSearch={search ?? ""}
      currentVerificationStatus={params.verificationStatus ?? ""}
      currentSpecialty={specialty ?? ""}
    />
  );
}