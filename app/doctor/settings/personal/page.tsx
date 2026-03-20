// app/doctor/settings/personal/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { doctorService } from "@/server/services/doctor.service";
import PersonalDetailsForm from "@/components/doctor/settings/PersonalDetailsForm";

export default async function PersonalSettingsPage() {
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

  const profile = await doctorService
    .getDoctorSettingsProfile(actorUserId)
    .catch(() => null);

  return <PersonalDetailsForm profile={profile} />;
}