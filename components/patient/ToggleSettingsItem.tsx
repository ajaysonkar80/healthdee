"use client"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface ToggleSettingItemProps {
  title: string
  description: string
  defaultChecked?: boolean
}

export default function ToggleSettingItem({
  title,
  description,
  defaultChecked = false,
}: ToggleSettingItemProps) {
  return (
    <Card className="flex items-center justify-between p-4">
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Switch defaultChecked={defaultChecked} />
    </Card>
  )
}
