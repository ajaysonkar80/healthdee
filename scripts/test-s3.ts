import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import fs from "fs"
import path from "path"
import "dotenv/config"

const s3 = new S3Client({
  region: "SiouxFalls",
  endpoint: "https://cloud.fsd1.gozunga.com:6780",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
})

async function testUpload() {
  try {
    const filePath = path.resolve("./scripts/test.txt")

    const fileBuffer = fs.readFileSync(filePath)

    const command = new PutObjectCommand({
      Bucket: "healthdee",
      Key: "test.txt",
      Body: fileBuffer,
      ContentType: "text/plain",
    })

    const res = await s3.send(command)

    console.log("Upload successful ✅")
    console.log(res)

  } catch (error) {
    console.error("Upload failed ❌")
    console.error(error)
  }
}

testUpload()