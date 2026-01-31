import StatsGrid from "@/components/admin/StatsGrid";
import RecentActivityList from "@/components/admin/RecentActivity";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <RecentActivityList />
    </div>
  );
}
