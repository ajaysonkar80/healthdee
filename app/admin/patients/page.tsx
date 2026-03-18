// app/admin/patients/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { patientService } from "@/server/services/patient.service";
import PatientsPageClient from "./PatientsClientPage";
import type { UserStatus } from "@/db/schema";

const PAGE_LIMIT = 10;

interface SearchParams {
  page?:   string;
  search?: string;
  status?: string;
}

export default async function AdminPatientsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Layout already verified the token so this will always exist,
  // but we guard it properly to satisfy the linter.
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");
  const payload = verifyAccessToken(token);
  const actorUserId = payload.sub as string;

  const params = await searchParams;

  const page   = Math.max(1, Number(params.page) || 1);
  const search = params.search?.trim() || undefined;
  const status = (
    ["active", "deactivated"].includes(params.status ?? "")
      ? params.status
      : undefined
  ) as UserStatus | undefined;

  const [listResult, stats] = await Promise.all([
    patientService.listAdminPatients(actorUserId, {
      limit:  PAGE_LIMIT,
      offset: (page - 1) * PAGE_LIMIT,
      search,
      status,
    }),
    patientService.getPatientStats(actorUserId),
  ]);

  return (
    <PatientsPageClient
      initialData={listResult.data}
      total={listResult.total}
      page={page}
      limit={PAGE_LIMIT}
      stats={stats}
      currentSearch={search ?? ""}
      currentStatus={params.status ?? ""}
    />
  );
}