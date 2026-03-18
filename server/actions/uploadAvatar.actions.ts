"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { verifyAccessToken } from "@/server/utils/jwt"

import { uploadImage } from "@/server/storage/imageUpload"
import { db } from "@/db"
import { patientProfiles } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function uploadAvatarAction(formData: FormData) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value

  if (!token) {
    throw new Error("Unauthorized")
  }

  const payload = verifyAccessToken(token)
  const userId = payload.sub

  if (!userId) {
    throw new Error("Invalid user")
  }

  const file = formData.get("file")

  if (!file || !(file instanceof File)) {
    throw new Error("Invalid file upload")
  }

  /**
   * Upload avatar using deterministic key
   * avatars/<userId>.webp
   */
  await uploadImage(file, "avatars", userId)

  /**
   * Update profile timestamp (optional but good practice)
   */
  await db
    .update(patientProfiles)
    .set({
      updatedAt: new Date(),
    })
    .where(eq(patientProfiles.userId, userId))

  /**
   * Revalidate patient page so avatar refreshes
   */
  revalidatePath("/patient")

  return {
    success: true,
  }
}