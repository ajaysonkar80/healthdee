 import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Download, Camera } from "lucide-react"

export default function ProfileHeader() {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>

            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-7 w-7 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Rajesh Kumar</h2>
              <Badge>Verified Account</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Patient ID: #H-203921 · Joined Oct 2022
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">Change Photo</Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Health Card
          </Button>
        </div>
      </div>
    </Card>
  )
}
