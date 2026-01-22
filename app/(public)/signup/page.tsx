import { SignupForm } from "@/components/domain/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}
