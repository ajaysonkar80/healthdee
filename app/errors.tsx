"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-xl font-semibold">
          Something went wrong
        </h1>

        <p className="text-sm text-gray-600">
          We’re having trouble loading this page.
          Please try again.
        </p>

        <button
          onClick={reset}
          className="mt-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
