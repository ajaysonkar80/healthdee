"use client"

import { useState, useTransition } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { updatePreferenceAction } from "@/server/actions/patient.actions"

interface ToggleSettingItemProps {
  title: string
  description: string
  field: string
  defaultChecked?: boolean
}

export default function ToggleSettingItem({
  title,
  description,
  field,
  defaultChecked = false,
}: ToggleSettingItemProps) {

  const [checked, setChecked] = useState(defaultChecked)
  const [isPending, startTransition] = useTransition()

  const handleToggle = (value: boolean) => {
    setChecked(value)

    startTransition(async () => {
      try {
        await updatePreferenceAction(field, value)
      } catch (err) {
        console.error(err)
        setChecked(!value)
      }
    })
  }

  return (
    <Card className="flex items-center justify-between p-4">
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Switch
        checked={checked}
        disabled={isPending}
        onCheckedChange={handleToggle}
      />
    </Card>
  )
}