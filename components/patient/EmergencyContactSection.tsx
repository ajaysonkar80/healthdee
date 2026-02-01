"use client"

import EmergencyContactItem from "./EmergencyContactItem"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

export default function EmergencyContactsSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Emergency Contacts</h3>
          <Badge variant="destructive" className="text-xs">
            Critical
          </Badge>
        </div>

        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="space-y-3">
        <EmergencyContactItem
          name="Sunita Kumar"
          relation="Wife · Primary Contact"
          
        />

        <EmergencyContactItem
          name="Amit Singh"
          relation="Brother"
        />
      </div>
    </section>
  )
}
