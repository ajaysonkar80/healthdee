import { S3Client } from "@aws-sdk/client-s3"

const endpoint = process.env.S3_ENDPOINT
const region = process.env.S3_REGION || "auto"
const accessKeyId = process.env.S3_ACCESS_KEY
const secretAccessKey = process.env.S3_SECRET_KEY

if (!endpoint || !accessKeyId || !secretAccessKey) {
  throw new Error("S3 environment variables are not configured")
}

export const s3Client = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true, // required for most S3 compatible providers
})