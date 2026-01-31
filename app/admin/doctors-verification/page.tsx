import { Button } from "@/components/ui/button";
import { VerificationFilters } from "@/components/admin/doctor-verification/VerificationFilters";
import { VerificationTable } from "@/components/admin/doctor-verification/VerificationTable";
import { VerificationPagination } from "@/components/admin/doctor-verification/VerificationPagination";
import { VerificationRowData } from "@/components/admin/doctor-verification/VerificationTableRow";
import { Download } from "lucide-react";

const verificationRequests: VerificationRowData[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Jenkins",
    email: "sarah.jenkins@example.com",
    submittedAt: "Oct 24, 2023 · 10:30 AM",
    status: "PENDING",
  },
  {
    id: "2",
    doctorName: "Dr. Robert Fox",
    email: "robert.fox@gmail.com",
    submittedAt: "Oct 24, 2023 · 02:15 PM",
    status: "APPROVED",
  },
  {
    id: "3",
    doctorName: "Dr. Linda Wright",
    email: "l.wright@outlook.com",
    submittedAt: "Oct 23, 2023 · 09:00 AM",
    status: "REJECTED",
  },
  {
    id: "4",
    doctorName: "Dr. David Miller",
    email: "dmiller@company.com",
    submittedAt: "Oct 23, 2023 · 04:45 PM",
    status: "PENDING",
  },
];

export default function DoctorVerificationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Doctor Verification Requests
          </h1>
          <p className="text-sm text-muted-foreground">
            Review and manage incoming doctor verification submissions.
          </p>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <VerificationFilters />

      {/* Table */}
      <VerificationTable data={verificationRequests} />

      {/* Pagination */}
      <VerificationPagination currentPage={1} totalResults={1240} />
    </div>
  );
}
