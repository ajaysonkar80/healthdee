import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";

/* ======================================================
   Admin Protected Layout
====================================================== */

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  // 🚫 No token → redirect to login
  if (!token) {
    redirect("/login");
  }

  try {
    const payload = verifyAccessToken(token);

    // 🚫 Not admin → redirect
    if (payload.role !== "admin") {
      redirect("/login");
    }
  } catch {
    // 🚫 Invalid / expired token
    redirect("/login");
  }

  // ✅ Authorized admin → render layout
  return (
    <div className="flex min-h-screen bg-[#fff7f8]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <AdminTopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
