import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ClinicStats } from "@/components/admin/clinic/ClinicStats";
import { ClinicTable } from "@/components/admin/clinic/ClinicTable";
import { ClinicPagination } from "@/components/admin/clinic/ClinicPagination";
import { ClinicRowData } from "@/components/admin/clinic/ClinicTableRow";

const clinics: ClinicRowData[] = [
  {
    id: "1",
    name: "City Health Center",
    city: "New York",
    linkedDoctors: 24,
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Green Valley Clinic",
    city: "Austin",
    linkedDoctors: 12,
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Riverside Medical",
    city: "Chicago",
    linkedDoctors: 38,
    status: "PENDING",
  },
  {
    id: "4",
    name: "Sunset Family Care",
    city: "Los Angeles",
    linkedDoctors: 15,
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "North Star Health",
    city: "Seattle",
    linkedDoctors: 9,
    status: "INACTIVE",
  },
];

export default function ClinicManagementPage() {
  return (
    <div className="space-y-6">
      {/* Page Title + Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Clinic Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor healthtech facility partnerships.
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/clinic/new">+ Add New Clinic</Link>
        </Button>
      </div>

      {/* Stats */}
      <ClinicStats
        totalClinics={124}
        activeCities={18}
        linkedDoctors={452}
      />

      {/* Table */}
      <ClinicTable clinics={clinics} />

      {/* Pagination */}
      <ClinicPagination currentPage={1} totalPages={3} />
    </div>
  );
}
