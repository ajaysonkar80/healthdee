"use client"

import ToggleSettingItem from "./ToggleSettingsItem"

interface NotificationPrivacySectionProps {
  preferences: {
    whatsappAlerts?: boolean
    smsNotifications?: boolean
    shareMedicalRecordsWithDoctors?: boolean
  }
}

export default function NotificationPrivacySection({
  preferences,
}: NotificationPrivacySectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">
        Notification & Privacy
      </h3>

      <div className="space-y-3">
        <ToggleSettingItem
          title="WhatsApp Alerts"
          description="Get appointment reminders and reports on WhatsApp"
          field="whatsappAlerts"
          defaultChecked={preferences?.whatsappAlerts}
        />

        <ToggleSettingItem
          title="SMS Notifications"
          description="Traditional text alerts for urgent updates"
          field="smsNotifications"
          defaultChecked={preferences?.smsNotifications}
        />

        <ToggleSettingItem
          title="Data Privacy"
          description="Only show my medical records to assigned doctors"
          field="shareMedicalRecordsWithDoctors"
          defaultChecked={preferences?.shareMedicalRecordsWithDoctors}
        />
      </div>
    </section>
  )
}