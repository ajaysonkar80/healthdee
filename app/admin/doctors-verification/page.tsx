// app/admin/doctors-verification/page.tsx
import { doctorService } from "@/server/services/doctor.service";
import DoctorsVerificationClient from "./DoctorsVerificationClient";
import type { VerificationRowData } from "@/components/admin/doctor-verification/VerificationTableRow";
import type { DoctorVerificationStatus } from "@/db/schema";

const PAGE_LIMIT = 10;

interface SearchParams {
  page?: string;
  search?: string;
  verificationStatus?: string;
}

export default async function DoctorVerificationPage({
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

  // Single parallel fetch — one DB call per query
  const [listResult, stats] = await Promise.all([
    doctorService.listDoctorsForVerification({
      limit: PAGE_LIMIT,
      offset: (page - 1) * PAGE_LIMIT,
      search,
      verificationStatus,
    }),
    doctorService.getVerificationStats(),
  ]);

  // Map repo shape → VerificationRowData
  const rows: VerificationRowData[] = listResult.data.map((d) => ({
    id: d.id,
    doctorName: d.fullName,
    email: d.email ?? null,
    avatarUrl: d.profileImageUrl,
    specialty: d.specialty,
    rmpRegistrationNumber: d.rmpRegistrationNumber,
    submittedAt: d.createdAt,
    verificationStatus: d.verificationStatus,
  }));

  return (
    <DoctorsVerificationClient
      initialData={rows}
      total={listResult.total}
      page={page}
      limit={PAGE_LIMIT}
      stats={stats}
      currentSearch={search ?? ""}
      currentStatus={params.verificationStatus ?? ""}
    />
  );
}