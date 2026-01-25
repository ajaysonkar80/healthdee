export default function CurrentlyConsulting() {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="font-semibold text-gray-900">
        Currently Consulting
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Suman Verma, 42y • Female
      </p>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <InfoCard label="Blood Pressure" value="120/80" />
        <InfoCard label="Heart Rate" value="72 bpm" />
        <InfoCard label="Weight" value="64 kg" />
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 font-semibold text-gray-900">{value}</p>
    </div>
  );
}
