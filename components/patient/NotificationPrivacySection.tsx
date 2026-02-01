import ToggleSettingItem from "./ToggleSettingsItem"

export default function NotificationPrivacySection() {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">Notification & Privacy</h3>

      <div className="space-y-3">
        <ToggleSettingItem
          title="WhatsApp Alerts"
          description="Get appointment reminders and reports on WhatsApp"
          defaultChecked
        />

        <ToggleSettingItem
          title="SMS Notifications"
          description="Traditional text alerts for urgent updates"
        />

        <ToggleSettingItem
          title="Data Privacy"
          description="Only show my medical records to assigned doctors"
          defaultChecked
        />
      </div>
    </section>
  )
}
