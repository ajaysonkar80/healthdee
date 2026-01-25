export default function DoctorCard({
  name,
  speciality,
}: {
  name: string;
  speciality: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-pink-100" />

      <h3 className="mt-3 font-semibold text-gray-900">
        {name}
      </h3>

      <p className="text-sm text-gray-500">{speciality}</p>
    </div>
  );
}
