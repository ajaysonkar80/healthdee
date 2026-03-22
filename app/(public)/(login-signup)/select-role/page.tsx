// app/(public)/(login-signup)/select-role/page.tsx
// Server component — reads onboarding_token cookie to protect this page.
// Direct URL access without a valid onboarding session → /signup

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyOnboardingToken } from "@/server/utils/jwt";
import { SelectRoleForm } from "@/components/auth/SelectRoleForm";

export default async function SelectRolePage() {
  const cookieStore     = await cookies();
  const onboardingToken = cookieStore.get("onboarding_token")?.value;

  // No token → not in signup flow → redirect to signup
  if (!onboardingToken) redirect("/signup");

  try {
    const payload = verifyOnboardingToken(onboardingToken);
    // Must be at role_selection stage
    if (payload.stage !== "role_selection") redirect("/verify-email");
  } catch {
    // Expired or invalid → restart signup
    redirect("/signup");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="mb-4 text-center absolute top-8 left-1/2 -translate-x-1/2">
        <h1 className="text-xl font-bold text-pink-600">HealthDee</h1>
      </div>
      <SelectRoleForm />
    </div>
  );
}