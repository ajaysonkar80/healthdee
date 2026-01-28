import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
interface ClinicPageLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function ClinicPageLayout({
  children,
  sidebar,
}: ClinicPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header/>

      {/* Page Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            {/* Main Content */}
            <section>{children}</section>

            {/* Sidebar */}
            <aside className="space-y-6">{sidebar}</aside>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
}
