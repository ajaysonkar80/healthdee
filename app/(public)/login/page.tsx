// app/(public)/login/page.tsx
import { LoginForm } from "@/components/domain/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
