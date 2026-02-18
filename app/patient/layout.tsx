import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PatientTopNav from "@/components/patient/PatientTopNav";
import PatientSidebar from "@/components/patient/PatientSideBar";
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

  if (!token) {
    redirect("/login");
  }

  try {
    const payload = verifyAccessToken(token);

    if (payload.role !== "patient") {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔵 Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-screen-2xl px-6 py-4">
          <PatientTopNav />
        </div>
      </header>

      {/* 🟢 Dashboard Body */}
      <div className="mx-auto flex max-w-screen-2xl">
        {/* 🧱 Sticky Sidebar */}
        <aside className="hidden md:block w-72 border-r border-gray-200 bg-white">
          <div className="sticky top-18 h-[calc(100vh-72px)] overflow-y-auto p-6">
            <PatientSidebar />
          </div>
        </aside>

        {/* 📄 Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
