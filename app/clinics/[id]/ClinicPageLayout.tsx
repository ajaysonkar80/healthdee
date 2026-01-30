import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
interface ClinicPageLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  hero:React.ReactNode;
}

export default function ClinicPageLayout({
  hero,
  children,
  sidebar,
}: ClinicPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header/>
{/* 🔥 FULL-WIDTH HERO */}
      <section className="w-full">
        {hero}
      </section>

      {/* CONTENT + SIDEBAR */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            <section>{children}</section>
            <aside>{sidebar}</aside>
          </div>
        </div>
      </main>


      <Footer/>
    </div>
  );
}
