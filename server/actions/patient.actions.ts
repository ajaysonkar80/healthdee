"use server"

import { cookies } from "next/headers"
import { verifyAccessToken } from "@/server/utils/jwt"
import { patientService } from "@/server/services/patient.service"

async function getUserIdFromCookie(): Promise<string> {
  const cookieStore = await cookies()

  const token = cookieStore.get("access_token")?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const payload = verifyAccessToken(token)

  return payload.sub
}

export async function updatePreferenceAction(
  field: string,
  value: boolean
) {
  const userId = await getUserIdFromCookie()

  return patientService.updateUserPreferences(userId, {
    [field]: value,
  })
}