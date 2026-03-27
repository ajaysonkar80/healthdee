// healthdee-main/components/auth/EmailVerificationStep.tsx
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmailVerificationStep({ email }: { email: string }) {
  return (
    <div className="text-center space-y-4 py-8">
      <div className="flex justify-center">
        <div className="bg-blue-50 p-4 rounded-full">
          <MailCheck className="w-12 h-12 text-blue-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
      <p className="text-gray-600">
        We've sent a verification link to <span className="font-semibold">{email}</span>. 
        Please click the link to activate your account.
      </p>
      <div className="pt-4">
        <Button 
          variant="outline" 
          onClick={() => window.location.href = "/login"} 
          className="w-full"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
}