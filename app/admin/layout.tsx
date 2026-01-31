import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
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
