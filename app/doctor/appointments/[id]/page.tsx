import Link from 'next/link';

export default function AppointmentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Dummy data (replace with API later)
  const appointment = {
    id: params.id,
    patientName: 'Suman Verma',
    age: 42,
    gender: 'Female',
    time: '10:45 AM',
    status: 'In-Progress',
    type: 'Follow-up',
    symptoms: 'Headache, fatigue',
    notes: 'Patient has a history of Type 2 Diabetes.',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Appointment Details
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {appointment.patientName} • {appointment.time}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/doctor/patients/${appointment.id}`}
            className="rounded-lg border border-pink-600 px-4 py-2 text-sm font-medium text-pink-600 hover:bg-pink-50"
          >
            View File
          </Link>

          <Link
            href="/doctor/prescriptions/new"
            className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
          >
            Write Prescription
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Patient Info */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Patient Information">
            <InfoRow label="Name" value={appointment.patientName} />
            <InfoRow label="Age" value={`${appointment.age} years`} />
            <InfoRow label="Gender" value={appointment.gender} />
            <InfoRow label="Appointment Type" value={appointment.type} />
            <InfoRow label="Status" value={appointment.status} />
          </Section>

          <Section title="Symptoms">
            <p className="text-sm text-gray-700">
              {appointment.symptoms}
            </p>
          </Section>

          <Section title="Doctor Notes">
            <p className="text-sm text-gray-700">
              {appointment.notes}
            </p>
          </Section>
        </div>

        {/* Right: Actions */}
        <div className="space-y-6">
          <Section title="Quick Actions">
            <button className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">
              Resume Consultation
            </button>

            <button className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Mark as Completed
            </button>
          </Section>

          <Section title="Appointment Time">
            <p className="text-sm text-gray-700">
              Scheduled at <span className="font-medium">{appointment.time}</span>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 font-semibold text-gray-900">
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">
        {value}
      </span>
    </div>
  );
}
