import { DoctorForm, type DoctorFormValues } from "@/components/admin/doctor/DoctorForm";

interface DoctorEditPageProps {
  params: {
    doctorId: string;
  };
}

const DOCTOR_RECORDS: Record<string, DoctorFormValues> = {
  "1": {
    name: "Dr. Sarah Jenkins",
    email: "sarah.jenkins@healthdee.com",
    npi: "129304122",
    specialty: "Cardiology",
    city: "New York",
    status: "active",
  },
  "2": {
    name: "Dr. Mark Sloan",
    email: "mark.sloan@healthdee.com",
    npi: "554210982",
    specialty: "Pediatrics",
    city: "London",
    status: "active",
  },
};

const FALLBACK_DOCTOR: DoctorFormValues = {
  name: "",
  email: "",
  npi: "",
  specialty: "",
  city: "",
  status: "inactive",
};

export default function DoctorEditPage({ params }: DoctorEditPageProps) {
  const doctor = DOCTOR_RECORDS[params.doctorId] ?? FALLBACK_DOCTOR;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Edit Doctor</h1>
        <p className="text-sm text-muted-foreground">
          Update profile details and status for {doctor.name || "this doctor"}.
        </p>
      </div>

      <DoctorForm defaultValues={doctor} submitLabel="Save Changes" />
    </div>
  );
}
