"use server"

import { cookies } from "next/headers"
import { verifyAccessToken } from "@/server/utils/jwt"
import { patientService } from "@/server/services/patient.service"
import { revalidatePath } from "next/cache"

async function getUserId() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const payload = verifyAccessToken(token)

  return payload.sub
}

export async function addEmergencyContactAction(input: {
  name: string
  relationship?: string
  phone: string
  email?: string
  isPrimary?: boolean
}) {
  const userId = await getUserId()

  const result = await patientService.createEmergencyContact(
    userId,
    input
  )

  revalidatePath("/patient/emergency-contacts")

  return result
}

export async function deleteEmergencyContactAction(contactId: string) {
  const userId = await getUserId()

  const result = await patientService.deleteEmergencyContact(
    userId,
    contactId
  )

  revalidatePath("/patient/emergency-contacts")

  return result
}