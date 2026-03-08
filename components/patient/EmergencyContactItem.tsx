"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Trash2 } from "lucide-react"
import { useTransition } from "react"
import { deleteEmergencyContactAction } from "@/server/actions/emergencyContacts.actions"

interface EmergencyContactItemProps {
  id: string
  name: string
  relation: string
  phone: string
  isPrimary?: boolean
}

export default function EmergencyContactItem({
  id,
  name,
  relation,
  phone,
  isPrimary = false,
}: EmergencyContactItemProps) {

  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteEmergencyContactAction(id)
    })
  }

  return (
    <Card className="flex items-center justify-between p-4">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{name}</p>
          {isPrimary && (
            <Badge variant="destructive">Primary</Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {relation}
        </p>
      </div>

      <div className="flex items-center gap-2">

        <a href={`tel:${phone}`}>
          <Button size="icon" variant="ghost">
            <Phone className="h-4 w-4" />
          </Button>
        </a>

        <Button
          size="icon"
          variant="ghost"
          disabled={isPending}
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>

      </div>
    </Card>
  )
}