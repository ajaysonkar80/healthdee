import { ClinicStatCard } from "./ClinicStatCard";

interface ClinicStatsProps {
  totalClinics: number;
  activeCities: number;
  linkedDoctors: number;
}

export function ClinicStats({
  totalClinics,
  activeCities,
  linkedDoctors,
}: ClinicStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ClinicStatCard
        title="Total Clinics"
        value={totalClinics}
        meta="+12 this month"
        metaColor="green"
      />

      <ClinicStatCard
        title="Active Cities"
        value={activeCities}
        meta="Nationwide coverage"
        metaColor="gray"
      />

      <ClinicStatCard
        title="Linked Doctors"
        value={linkedDoctors}
        meta="3.6 avg per clinic"
        metaColor="blue"
      />
    </div>
  );
}
