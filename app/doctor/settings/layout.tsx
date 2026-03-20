// app/doctor/settings/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import SettingsTabs from "@/components/doctor/settings/SettingsTab";

export default async function DoctorSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  try {
    const payload = verifyAccessToken(token);
    if (payload.role !== "doctor") redirect("/login");
  } catch {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, professional info, and preferences.
        </p>
      </div>
      <SettingsTabs />
      {children}
    </div>
  );
}