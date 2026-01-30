"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-xl font-semibold">
          Something went wrong
        </h1>

        <p className="text-sm text-gray-600">
          We’re having trouble loading this page.
          Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
