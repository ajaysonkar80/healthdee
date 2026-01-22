import { ResetPasswordForm } from "@/components/domain/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
