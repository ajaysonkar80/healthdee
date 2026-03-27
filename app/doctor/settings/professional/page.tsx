// app/doctor/settings/professional/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/server/utils/jwt";
import { doctorService } from "@/server/services/doctor.service";
import ProfessionalDetailsForm from "@/components/doctor/settings/ProfessionalDetailsForm";

export default async function ProfessionalSettingsPage() {
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

  // Fetch profile. If it fails, return null to let the form handle empty state
  const profile = await doctorService
    .getDoctorSettingsProfile(actorUserId)
    .catch((err) => {
      console.error("Error fetching professional settings:", err);
      return null;
    });

  return <ProfessionalDetailsForm profile={profile} />;
}