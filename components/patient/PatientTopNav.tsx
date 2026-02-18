import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PatientTopNav() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold">
            HealthDee
          </Link>

          
        </div>

        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>

          <Avatar>
            <AvatarImage src="/avatar.png" alt="User avatar" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
