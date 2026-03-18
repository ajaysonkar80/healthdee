"use client"

import { useRef, useState, useTransition } from "react"
import Image from "next/image"
import imageCompression from "browser-image-compression"
import { uploadAvatarAction } from "@/server/actions/uploadAvatar.actions"
import { Camera } from "lucide-react"

interface Props {
  userId?: string | null
}

export default function AvatarUploader({ userId }: Props) {

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(userId ?? null)
  const [isPending, startTransition] = useTransition()

  function openFilePicker() {
    inputRef.current?.click()
  }

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]
    if (!file) return

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: "image/webp",
      initialQuality: 0.8,
    }

    try {
      const compressed = await imageCompression(file, options)

      const previewUrl = URL.createObjectURL(compressed)
      setPreview(previewUrl)

      startTransition(async () => {

        const formData = new FormData()
        formData.append("file", compressed)

        const result = await uploadAvatarAction(formData)

        //setPreview(result.url)
      })

    } catch (err) {
      console.error("Image upload failed", err)
    }
  }

  return (
    <div className="relative">

      {/* Avatar */}
      <div
        onClick={openFilePicker}
        className="
        w-24 h-24
        rounded-full
        overflow-hidden
        cursor-pointer
        relative
        group
        border
        bg-gray-100
      "
      >

        {preview ? (
          <Image
            src={preview}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No Image
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className="
          absolute inset-0
          bg-black/40
          opacity-0
          group-hover:opacity-100
          transition
          flex
          items-center
          justify-center
        "
        >
          <Camera className="text-white w-6 h-6" />
        </div>

        {/* Loading Overlay */}
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm">
            Uploading...
          </div>
        )}

      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

    </div>
  )
}