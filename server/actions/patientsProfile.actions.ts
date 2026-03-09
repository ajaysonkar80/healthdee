"use server"

import { cookies } from "next/headers"
import { verifyAccessToken } from "@/server/utils/jwt"
import { patientService } from "@/server/services/patient.service"

export async function getPatientProfileAction() {
const cookieStore = await cookies()

const token = cookieStore.get("access_token")?.value

if (!token) {
throw new Error("Unauthorized")
}

const payload = verifyAccessToken(token)

const userId = payload.sub

return patientService.getFullPatientProfile(userId, userId)
}