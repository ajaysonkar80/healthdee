// app/admin/layout.tsx
import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { doctorRepo } from "@/server/repositories/doctor.repo";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) redirect("/login");

  try {
    const payload = verifyAccessToken(token);
    if (payload.role !== "admin") redirect("/login");
  } catch {
    redirect("/login");
  }

  // Fetch pending count — single lightweight query, runs once per layout render.
  // Uses the same getVerificationStats() single-query aggregation (no ECONNRESET risk).
  const stats = await doctorRepo.getVerificationStats().catch(() => ({
    total: 0, pending: 0, verified: 0, rejected: 0,
  }));

  return (
    <div className="flex min-h-screen bg-[#fff7f8]">
      <AdminSidebar pendingVerificationCount={stats.pending} />

      <div className="flex flex-1 flex-col">
        <AdminTopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}