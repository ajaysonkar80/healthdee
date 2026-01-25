'use client';

export default function DoctorDashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold text-gray-900">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="mt-4 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
      >
        Try again
      </button>
    </div>
  );
}
