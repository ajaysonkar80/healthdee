import ProfileHeader from "@/components/patient/ProfileHeader"
import PersonalInformationSection from "@/components/patient/PersonalInformationSection"
import { getPatientProfileAction } from "@/server/actions/patientsProfile.actions"

export default async function PatientSettingsPage() {

const data = await getPatientProfileAction()

const profile = data.profile

if (!profile) {
return <div className="p-6">Profile not found</div>
}

return (
<div className="space-y-6">
<ProfileHeader profile={profile} />
<PersonalInformationSection profile={profile} />
</div>
)
}