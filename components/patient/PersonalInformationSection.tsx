import InfoFieldCard from "./PersonalInfoFieldCard"
import EditProfileModal from "./EditProfileModal"

interface Profile {
  fullName?: string | null
  gender?: string | null
  bloodGroup?: string | null
  dateOfBirth?: Date | null
  phone?: string | null
  addressLine1?: string | null
  addressLine2?:string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  country?: string | null
  heightCm?: number | null
  weightKg?: number | null
  allergies?: string | null
  chronicConditions?: string | null
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

  const age =
    profile.dateOfBirth ? calculateAge(new Date(profile.dateOfBirth)) : null

  const dobFormatted = profile.dateOfBirth
    ? new Date(profile.dateOfBirth).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not provided"

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Personal Information
        </h3>

        <EditProfileModal profile={profile} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <InfoFieldCard
          label="Full Name"
          value={profile.fullName ?? "Not provided"}
        />

        <InfoFieldCard
          label="Gender"
          value={profile.gender ?? "Not provided"}
        />

        <InfoFieldCard
          label="Blood Group"
          value={profile.bloodGroup ?? "Unknown"}
          highlight
        />

        <InfoFieldCard
          label="Date of Birth"
          value={dobFormatted}
        />

        <InfoFieldCard
          label="Age"
          value={age ? `${age} years` : "Not available"}
        />

        <InfoFieldCard
          label="Phone"
          value={profile.phone ?? "Not provided"}
        />

        <InfoFieldCard
          label="Address Line 1"
          value={profile.addressLine1 ?? "Not provided"}
        />

        <InfoFieldCard
          label="Address Line 2"
          value={profile.addressLine2 ?? "Not provided"}
        />

        <InfoFieldCard
          label="City"
          value={profile.city ?? "Not provided"}
        />

        <InfoFieldCard
          label="State"
          value={profile.state ?? "Not provided"}
        />

        <InfoFieldCard
          label="Postal Code"
          value={profile.postalCode ?? "Not provided"}
        />

        <InfoFieldCard
          label="Country"
          value={profile.country ?? "Not provided"}
        />

        <InfoFieldCard
          label="Height"
          value={
            profile.heightCm ? `${profile.heightCm} cm` : "Not provided"
          }
        />

        <InfoFieldCard
          label="Weight"
          value={
            profile.weightKg ? `${profile.weightKg} kg` : "Not provided"
          }
        />

        <InfoFieldCard
          label="Allergies"
          value={profile.allergies ?? "None recorded"}
        />

        <InfoFieldCard
          label="Chronic Conditions"
          value={profile.chronicConditions ?? "None recorded"}
        />

      </div>

    </section>
  )
}