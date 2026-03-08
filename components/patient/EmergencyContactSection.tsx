"use client"

import { useState, useTransition } from "react"
import EmergencyContactItem from "./EmergencyContactItem"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { addEmergencyContactAction } from "@/server/actions/emergencyContacts.actions"

interface Contact {
  id: string
  name: string
  relationship?: string
  phone: string
  isPrimary?: boolean
}

interface Props {
  contacts: Contact[]
}

export default function EmergencyContactsSection({ contacts }: Props) {
  const hasContacts = contacts && contacts.length > 0

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [phone, setPhone] = useState("")

  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      await addEmergencyContactAction({
        name,
        relationship,
        phone,
      })

      setName("")
      setRelationship("")
      setPhone("")
      setShowForm(false)
    })
  }

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Emergency Contacts</h3>
          <Badge variant="destructive" className="text-xs">
            Critical
          </Badge>
        </div>

        <Button
          size="sm"
          className="gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {/* Add Contact Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 border rounded-lg p-4"
        >
          <Input
            placeholder="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="name"
            required
          />

          <Input
            placeholder="Relationship (wife, brother etc)"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            label="relationship"
          />

          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="phone number"
            required
          />

          <Button type="submit" disabled={isPending}>
            Save Contact
          </Button>
        </form>
      )}

      {/* Empty State */}
      {!hasContacts && !showForm ? (
        <div className="flex items-center justify-center border rounded-lg p-6">
          <span className="text-sm text-muted-foreground">
            No contacts found. Click <strong>Add Contact</strong> to add a new emergency contact.
          </span>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <EmergencyContactItem
              key={contact.id}
              id={contact.id}
              name={contact.name}
              relation={contact.relationship ?? ""}
              phone={contact.phone}
              isPrimary={contact.isPrimary}
            />
          ))}
        </div>
      )}
    </section>
  )
}