import Link from "next/link";
import { Plus } from "lucide-react";

import { BulkHelpCards } from "@/components/admin/doctor/BulkHelpCards";
import { DoctorTable } from "@/components/admin/doctor/DoctorTable";
import { StatsCards } from "@/components/admin/doctor/StatsCard";
import { Button } from "@/components/ui/button";

export default function DoctorDirectoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-foreground">
            Doctor Directory
          </h1>

          <Button asChild size="sm" className="gap-2">
            <Link href="/admin/doctors/create">
              <Plus className="h-4 w-4" />
              Add Doctor
            </Link>
          </Button>
        </div>

        <p className="max-w-2xl text-sm text-muted-foreground">
          Manage and monitor medical professionals across your healthcare
          network.
        </p>
      </div>

      <StatsCards />
      <DoctorTable />
      <BulkHelpCards />
    </div>
  );
}
