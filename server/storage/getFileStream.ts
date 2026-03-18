import { GetObjectCommand } from "@aws-sdk/client-s3"
import { s3Client } from "./s3.client"

export async function getFileStream(key: string) {
  const bucket = process.env.S3_BUCKET
  if (!bucket) throw new Error("Missing S3_BUCKET environment variable")

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  const response = await s3Client.send(command)

  return {
    stream: response.Body,
    contentType: response.ContentType || "application/octet-stream",
  }
}