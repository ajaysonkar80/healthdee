import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Download, Camera } from "lucide-react"

interface ProfileHeaderProps {
  profile: {
    fullName?: string | null
    profileImageUrl?: string | null
    createdAt?: Date | null
  }
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {

  const name = profile.fullName ?? "Unnamed Patient"

  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const joinedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "Unknown"

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={profile.profileImageUrl ?? "/avatar.png"}
              />
              <AvatarFallback>
                {initials}
              </AvatarFallback>
            </Avatar>

            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-7 w-7 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Name + Meta */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {name}
              </h2>

              <Badge>
                Verified Account
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              Joined {joinedDate}
            </p>
          </div>

        </div>

        {/* Right Actions */}
        <div className="flex gap-3">

          <Button variant="outline">
            Change Photo
          </Button>

          <Button
            disabled
            className="gap-2 cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200"
          >
            <Download className="h-4 w-4 opacity-60" />
            <span>Download Health Card</span>
          </Button>

        </div>

      </div>
    </Card>
  )
}