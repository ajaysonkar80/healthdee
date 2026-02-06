import { DoctorForm } from "@/components/admin/doctor/DoctorForm";

export default function DoctorCreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Add New Doctor
        </h1>
        <p className="text-sm text-muted-foreground">
          Create a new doctor profile and set their availability status.
        </p>
      </div>

      <DoctorForm submitLabel="Create Doctor" />
    </div>
  );
}
