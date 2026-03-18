import { NextRequest } from "next/server"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { s3Client } from "@/server/storage/s3.client"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {

    // Next.js 16 requires awaiting params
    const { path } = await context.params

    if (!path || path.length === 0) {
      return new Response("Invalid file path", { status: 400 })
    }

    const key = path.join("/")

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
    })

    const response = await s3Client.send(command)

    if (!response.Body) {
      return new Response("File not found", { status: 404 })
    }

    const stream = response.Body as ReadableStream

    const headers = new Headers()

    headers.set(
      "Content-Type",
      response.ContentType || "application/octet-stream"
    )

    headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    )

    if (response.ContentLength) {
      headers.set("Content-Length", response.ContentLength.toString())
    }

    if (response.ETag) {
      headers.set("ETag", response.ETag)
    }

    return new Response(stream, {
      status: 200,
      headers,
    })

  } catch (error: any) {

    console.error("File proxy error:", error)

    /**
     * Graceful fallback for missing avatars
     */
    if (error?.name === "NoSuchKey") {
      return Response.redirect(
        new URL("/avatar.png", process.env.NEXT_PUBLIC_APP_URL),
        302
      )
    }

    return new Response("Internal server error", { status: 500 })
  }
}