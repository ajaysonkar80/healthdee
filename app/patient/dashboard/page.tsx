import PatientSettingsLayout from "@/components/patient/PatientSettingsLayout"
import ProfileHeader from "@/components/patient/ProfileHeader"
import PersonalInformationSection from "@/components/patient/PersonalInformationSection"
import EmergencyContactsSection from "@/components/patient/EmergencyContactSection"
import NotificationPrivacySection from "@/components/patient/NotificationPrivacySection"
import DangerZone from "@/components/patient/DangerZone"

export default function PatientSettingsPage() {
  return (
    <PatientSettingsLayout>
      <ProfileHeader />
      <PersonalInformationSection />
      <EmergencyContactsSection />
      <NotificationPrivacySection />
      <DangerZone />
    </PatientSettingsLayout>
  )
}
