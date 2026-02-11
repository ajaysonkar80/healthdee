import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import PatientSidebar from "@/components/patient/PatientSideBar";
import PatientHeader from "@/components/patient/PatientSideBar";
import { verifyAccessToken } from "@/server/utils/jwt";

/* ======================================================
   Patient Protected Dashboard Layout
====================================================== */

export default async function PatientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  // 🚫 No token → redirect
  if (!token) {
    redirect("/login");
  }

  try {
    const payload = verifyAccessToken(token);

    // 🚫 Not patient → redirect
    if (payload.role !== "patient") {
      redirect("/login");
    }
  } catch {
    // 🚫 Invalid / expired token
    redirect("/login");
  }

  // ✅ Authorized patient → render layout
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <PatientSidebar />

      {/* Right Column */}
      <div className="flex flex-1 flex-col bg-gray-50 border-l border-gray-200">
        {/* Header */}
        <PatientHeader />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
