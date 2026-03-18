// app/admin/dashboard/page.tsx
import { auditRepo } from "@/server/repositories/audit.repo";
import RecentActivityList from "@/components/admin/RecentActivity";
import StatsGrid from "@/components/admin/StatsGrid";

export default async function AdminDashboardPage() {
  // Fetch 20 entries — client paginates locally in batches of 5.
  // .catch() so a DB issue never crashes the whole dashboard.
  const entries = await auditRepo.getRecent(20).catch(() => []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <StatsGrid/>
        <p className="text-sm text-muted-foreground">
          Overview of platform activity.
        </p>
      </div>

      <RecentActivityList entries={entries} />
    </div>
  );
}