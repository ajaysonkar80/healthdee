import "dotenv/config"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { Readable } from "stream"

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://cloud.fsd1.gozunga.com:6780",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
})

async function streamToString(stream: Readable) {
  const chunks: Buffer[] = []

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString("utf-8")
}

async function testDownload() {
  try {
    const command = new GetObjectCommand({
      Bucket: "healthdee",
      Key: "test.txt", // change if needed
    })

    const response = await s3.send(command)

    const body = await streamToString(response.Body as Readable)

    console.log("✅ File downloaded successfully")
    console.log("Content:")
    console.log(body)

  } catch (err) {
    console.error("❌ Download failed")
    console.error(err)
  }
}

testDownload()