export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-3">
        <h1 className="text-xl font-semibold">
          Page not found
        </h1>
        <p className="text-sm text-gray-600">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
      </div>
    </main>
  );
}
