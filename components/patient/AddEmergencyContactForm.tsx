"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addEmergencyContactAction } from "@/server/actions/emergencyContacts.actions"

export default function AddEmergencyContactForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [relationship, setRelationship] = useState("")

  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      await addEmergencyContactAction({
        name,
        phone,
        relationship,
      })

      setName("")
      setPhone("")
      setRelationship("")
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border rounded-lg p-4"
    >
      <Input
        placeholder="Name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        placeholder="Relationship"
        label="Relationship"
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
      />

      <Input
        placeholder="Phone Number"
        label="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <Button type="submit" disabled={isPending}>
        Add Contact
      </Button>
    </form>
  )
}