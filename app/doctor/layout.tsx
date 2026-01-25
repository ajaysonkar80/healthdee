import Sidebar from '@/components/doctor/dashboard/Sidebar';
import Header from '@/components/doctor/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Column */}
      <div className="flex flex-1 flex-col bg-gray-50 border-l border-gray-200">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
