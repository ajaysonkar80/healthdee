import NotificationPrivacySection from "@/components/patient/NotificationPrivacySection"
import { patientService } from "@/server/services/patient.service"
import { verifyAccessToken } from "@/server/utils/jwt"
import { cookies } from "next/headers"

export default async function NotificationsPage() {

  const cookieStore = await cookies()

  const token = cookieStore.get("access_token")?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const payload = verifyAccessToken(token)

  const userId = payload.sub

  const data = await patientService.getFullPatientProfile(
    userId,
    userId
  )

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <NotificationPrivacySection
        preferences={data.preferences ?? {}}
      />
    </main>
  )
}