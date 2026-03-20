// app/doctor/settings/security/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { doctorService } from "@/server/services/doctor.service";
import SecuritySettingsForm from "@/components/doctor/settings/SecuritySettingsForm";

export default async function SecuritySettingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  let actorUserId: string;
  try {
    const payload = verifyAccessToken(token);
    if (payload.role !== "doctor") redirect("/login");
    actorUserId = payload.sub as string;
  } catch {
    redirect("/login");
  }

  const prefs = await doctorService
    .getDoctorPreferences(actorUserId)
    .catch(() => null);

  return <SecuritySettingsForm prefs={prefs} />;
}