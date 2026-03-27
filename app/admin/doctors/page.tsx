// app/admin/doctors/page.tsx
import { doctorService } from "@/server/services/doctor.service";
import DoctorsPageClient from "./DoctorsPageClient";
import type { DoctorVerificationStatus } from "@/db/schema";
import { DoctorVerificationSchema } from "@/db/schema";
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
  
  const specialty = params.specialty?.trim() || undefined;

// FIX: Validate the status from params using the schema
  const validatedStatus = DoctorVerificationSchema.safeParse(params.verificationStatus);
  const verificationStatus = validatedStatus.success ? validatedStatus.data : undefined;

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
      currentVerificationStatus={verificationStatus}
      currentSpecialty={specialty ?? ""}
    />
  );
}