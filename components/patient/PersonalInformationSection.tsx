import InfoFieldCard from "./PersonalInfoFieldCard"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export default function PersonalInformationSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Personal Information</h3>

        <Button variant="ghost" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Details
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoFieldCard
          label="Full Legal Name"
          value="Rajesh Kumar Singh"
        />
        <InfoFieldCard
          label="Date of Birth"
          value="12th August 1985 (38 yrs)"
        />
        <InfoFieldCard
          label="Blood Group"
          value="O+ Positive"
          highlight
        />
        <InfoFieldCard
          label="Gender"
          value="Male"
        />
      </div>

      <InfoFieldCard
        label="Residential Address"
        value="House No. 45, Sector 12, Civil Lines, Bhopal, Madhya Pradesh - 462001"
      />
    </section>
  )
}
