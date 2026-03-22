// app/doctor/layout.tsx
import { cookies, headers } from "next/headers";
import { redirect }         from "next/navigation";
import { verifyAccessToken }from "@/server/utils/jwt";
import { doctorRepo }       from "@/server/repositories/doctor.repo";
import Sidebar              from "@/components/doctor/dashboard/Sidebar";
import Header               from "@/components/doctor/dashboard/Header";

export default async function DoctorLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token       = cookieStore.get("access_token")?.value;
  if (!token) redirect("/login");

  let actorUserId: string;
  try {
    const payload = verifyAccessToken(token);
    if (payload.role !== "doctor") redirect("/login");
    actorUserId = payload.sub as string;
  } catch {
    redirect("/login");
  }

  // Read current pathname (set by middleware.ts)
  const headersList = await headers();
  const pathname    = headersList.get("x-pathname") ?? "";

  const isOnboarding   = pathname === "/doctor/onboarding";
  const isVerification = pathname.startsWith("/doctor/verification");

  const doctor = await doctorRepo.getDoctorByUserId(actorUserId).catch(() => null);

  // ── Onboarding gate ──
  if (!isOnboarding) {
    if (!doctor) {
      redirect("/doctor/onboarding");
    }

    const onboardingComplete = !!(
      doctor.fullName &&
      doctor.specialty &&
      doctor.rmpRegistrationNumber
    );

    if (!onboardingComplete) {
      redirect("/doctor/onboarding");
    }

    // ── Verification gate ──
    if (!isVerification && doctor.verificationStatus !== "verified") {
      redirect("/doctor/verification");
    }
  }

  // Onboarding + verification pages render without sidebar
  if (isOnboarding || isVerification) {
    return <>{children}</>;
  }

  const doctorName = doctor?.fullName ?? "Doctor";
  const specialty  = doctor?.specialty ?? "";
  const avatarUrl  = doctor?.profileImageUrl ?? null;
  const isActive   = doctor?.isActive ?? false;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar doctorName={doctorName} specialty={specialty} isActive={isActive} />
      <div className="flex flex-1 flex-col border-l border-gray-200 bg-gray-50">
        <Header doctorName={doctorName} avatarUrl={avatarUrl} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}