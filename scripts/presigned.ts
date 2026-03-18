import "dotenv/config"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://cloud.fsd1.gozunga.com:6780",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
})

async function testPresign() {
  const command = new GetObjectCommand({
    Bucket: "healthdee",
    Key: "test.txt",
  })

  const url = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  })

  console.log("Presigned URL:")
  console.log(url)
}

testPresign()