// app/doctor/settings/clinic/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { doctorService } from "@/server/services/doctor.service";
import ClinicSettingsForm from "@/components/doctor/settings/ClinicSettingsForm";

export default async function ClinicSettingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  let actorUserId: string;
  try {
    const payload = verifyAccessToken(token);
    // Strict role check
    if (payload.role !== "doctor") redirect("/login");
    actorUserId = payload.sub as string;
  } catch {
    redirect("/login");
  }

  // Fetch profile and handle potential null result
  const profile = await doctorService
    .getDoctorSettingsProfile(actorUserId)
    .catch((err) => {
      console.error("Failed to fetch doctor settings profile:", err);
      return null;
    });

  // Pass profile to client component (it handles the null case internally)
  return <ClinicSettingsForm profile={profile} />;
}