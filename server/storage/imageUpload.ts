import { PutObjectCommand } from "@aws-sdk/client-s3"
import { randomUUID } from "crypto"
import { s3Client } from "./s3.client"

const bucket = process.env.S3_BUCKET

if (!bucket) {
  throw new Error("S3_BUCKET is not configured")
}

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function uploadImage(
  file: File,
  folder: string,
  userId: string
) {
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type")
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File exceeds 5MB limit")
  }

  const ext = "webp"
  const fileName = `${randomUUID()}.${ext}`

  const key = `${folder}/${userId}/${fileName}`

  const buffer = Buffer.from(await file.arrayBuffer())

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  })
  try {
  await s3Client.send(command)
  } catch (e) {
  console.error("S3 Upload Failed:", e)
}

  const publicUrl = `${process.env.S3_ENDPOINT}/${bucket}/${key}`

  return {
    key,
    url: publicUrl,
  }
}