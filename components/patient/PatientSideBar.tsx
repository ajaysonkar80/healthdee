"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-select"
import {
  User,
  Phone,
  Bell,
  Shield,
  HelpCircle,
  AlertTriangle,
  Settings,
  Calendar,
  FileHeart,
  TriangleAlert
} from "lucide-react"

const navItems = [
  {
    label: "Personal Details",
    href: "/patient",
    icon: User,
  },
  {
    label: "Appointments",
    href: "/patient/appointments",
    icon: Calendar,
  },
  {
    label: "Emergency Contacts",
    href: "/patient/emergency-contacts",
    icon: Phone,
  },
  {
    label: "Notification Prefs",
    href: "/patient/notifications",
    icon: Bell,
  },
  {
    label: "Privacy & Security",
    href: "/patient/privacy",
    icon: Shield,
  },
  {
    label: "Help & Support",
    href: "/patient/help",
    icon: HelpCircle,
  },
  {
    label: "Medical Records",
    href: "/patient/medical-records",
    icon: FileHeart,
  },
  {
    label: "Danger Zone",
    href: "/patient/danger-zone",
    icon: AlertTriangle,
  },
  {
    label: "Settings",
    href: "/patient/settings",
    icon: Settings,
  }
]

export default function PatientSidebar() {
  const pathname = usePathname()

  return (
    <Card className="h-fit p-4">
      <div className="mb-4 space-y-1">
        <p className="text-sm font-semibold">Rajesh Kumar</p>
        <p className="text-xs text-muted-foreground">ID: #H-203921</p>
      </div>

      <Separator className="my-3" />

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Button
              key={item.href}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                !isActive && "text-muted-foreground"
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          )
        })}
      </nav>
    </Card>
  )
}
