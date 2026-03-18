import { GetObjectCommand } from "@aws-sdk/client-s3"
import { s3Client } from "./s3.client"

export async function getFileStream(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
  })

  const response = await s3Client.send(command)

  return {
    stream: response.Body,
    contentType: response.ContentType || "application/octet-stream",
  }
}