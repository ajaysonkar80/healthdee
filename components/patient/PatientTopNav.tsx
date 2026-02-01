import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PatientTopNav() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/patient/dashboard" className="text-lg font-bold">
            HealthTrust
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/patient/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/patient/appointments"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Appointments
            </Link>
            <Link
              href="/patient/records"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Medical Records
            </Link>
            <Link
              href="/patient/settings"
              className="text-sm font-medium text-primary"
            >
              Settings
            </Link>
          </nav>
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
