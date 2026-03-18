"use server"

import { cookies } from "next/headers"
import { verifyAccessToken } from "@/server/utils/jwt"
import { patientService } from "@/server/services/patient.service"
import { revalidatePath } from "next/cache"

function getString(formData: FormData, key: string) {
  const value = formData.get(key)
  if (!value) return undefined
  return String(value)
}

export async function updatePatientProfileAction(formData: FormData) {

  const cookieStore = await cookies()

  const token = cookieStore.get("access_token")?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const payload = verifyAccessToken(token)

  const userId = payload.sub

  const input = {
    fullName: getString(formData, "fullName"),
    gender: getString(formData, "gender"),
    bloodGroup: getString(formData, "bloodGroup"),
    phone: getString(formData, "phone"),
    addressLine1: getString(formData, "addressLine1"),
    addressLine2: getString(formData, "addressLine2"),
    city: getString(formData, "city"),
    state: getString(formData, "state"),
    postalCode: getString(formData, "postalCode"),
    country: getString(formData, "country"),
    dateOfBirth: formData.get("dateOfBirth")
      ? new Date(String(formData.get("dateOfBirth")))
      : undefined,
  }

  await patientService.updatePatientProfile(
    userId,
    userId,
    input
  )

  revalidatePath("/patient")
}