export default function AppointmentSlot({
  time,
  selected,
}: {
  time: string;
  selected?: boolean;
}) {
  return (
    <button
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
        selected
          ? 'border-pink-600 bg-pink-600 text-white'
          : 'border-gray-200 text-gray-700 hover:border-pink-600 hover:text-pink-600'
      }`}
    >
      {time}
    </button>
  );
}
