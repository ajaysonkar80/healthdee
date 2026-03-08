import EmergencyContactsSection from "@/components/patient/EmergencyContactSection"
import { patientService } from "@/server/services/patient.service"
import { verifyAccessToken } from "@/server/utils/jwt"
import { cookies } from "next/headers"

export default async function EmergencyContactsPage() {

  const cookieStore = await cookies()

  const token = cookieStore.get("access_token")?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const payload = verifyAccessToken(token)

  const userId = payload.sub

  const contacts = await patientService.getEmergencyContacts(
    userId,
    userId
  )

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <EmergencyContactsSection
        contacts={contacts.map((c) => ({
          id: c.id,
          name: c.name,
          relationship: c.relationship ?? undefined,
          phone: c.phone,
          isPrimary: c.isPrimary,
        }))}
      />
    </main>
  )
}