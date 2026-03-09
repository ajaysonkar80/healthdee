import InfoFieldCard from "./PersonalInfoFieldCard"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

interface Profile {
  fullName?: string | null
  dateOfBirth?: Date | null
  bloodGroup?: string | null
  gender?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  country?: string | null
}

interface Props {
  profile: Profile
}

function calculateAge(dob: Date) {
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()

  const m = today.getMonth() - dob.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--
  }

  return age
}

export default function PersonalInformationSection({ profile }: Props) {

  const dobFormatted = profile.dateOfBirth
    ? new Date(profile.dateOfBirth).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  const age = profile.dateOfBirth
    ? calculateAge(new Date(profile.dateOfBirth))
    : null

  const dobDisplay = dobFormatted
    ? `${dobFormatted} (${age} yrs)`
    : "Not provided"

  const address = [
    profile.addressLine1,
    profile.addressLine2,
    profile.city,
    profile.state,
    profile.postalCode,
    profile.country,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Personal Information
        </h3>

        <Button variant="ghost" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Details
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <InfoFieldCard
          label="Full Legal Name"
          value={profile.fullName ?? "Not provided"}
        />

        <InfoFieldCard
          label="Date of Birth"
          value={dobDisplay}
        />

        <InfoFieldCard
          label="Blood Group"
          value={profile.bloodGroup ?? "Unknown"}
          highlight
        />

        <InfoFieldCard
          label="Gender"
          value={profile.gender ?? "Not provided"}
        />

      </div>

      <InfoFieldCard
        label="Residential Address"
        value={address || "Not provided"}
      />

    </section>
  )
}