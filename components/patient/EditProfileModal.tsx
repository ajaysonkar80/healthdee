"use client"

import { useState } from "react"
import { updatePatientProfileAction } from "@/server/actions/patientProfile.actions"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PatientProfile {
  fullName?: string | null
  dateOfBirth?: string | Date | null
  gender?: string | null
  bloodGroup?: string | null
  phone?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  country?: string | null
}

interface Props {
  profile: PatientProfile
}

export default function EditProfileModal({ profile }: Props) {

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Edit Details
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">

        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData: FormData) => {
            await updatePatientProfileAction(formData)
            setOpen(false)
          }}
          className="space-y-4"
        >

          <Input
            label="Full Name"
            name="fullName"
            defaultValue={profile?.fullName ?? ""}
          />

          <div className="grid grid-cols-2 gap-4">

            <Input
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              defaultValue={
                profile?.dateOfBirth
                  ? new Date(profile.dateOfBirth)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
            />

            <Input
              label="Gender"
              name="gender"
              defaultValue={profile?.gender ?? ""}
            />

          </div>

          <Input
            label="Blood Group"
            name="bloodGroup"
            defaultValue={profile?.bloodGroup ?? ""}
          />

          <Input
            label="Phone"
            name="phone"
            defaultValue={profile?.phone ?? ""}
          />

          <Input
            label="Address Line 1"
            name="addressLine1"
            defaultValue={profile?.addressLine1 ?? ""}
          />

          <Input
            label="Address Line 2"
            name="addressLine2"
            defaultValue={profile?.addressLine2 ?? ""}
          />

          <div className="grid grid-cols-2 gap-4">

            <Input
              label="City"
              name="city"
              defaultValue={profile?.city ?? ""}
            />

            <Input
              label="State"
              name="state"
              defaultValue={profile?.state ?? ""}
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <Input
              label="Postal Code"
              name="postalCode"
              defaultValue={profile?.postalCode ?? ""}
            />

            <Input
              label="Country"
              name="country"
              defaultValue={profile?.country ?? "IN"}
            />

          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Save Changes
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  )
}