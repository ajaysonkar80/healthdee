import ProfileSettings from '@/components/doctor/settings/ProfileSettings';
import ClinicSettings from '@/components/doctor/settings/ClinicSettings';
import NotificationSettings from '@/components/doctor/settings/NotificationSettings';
import SecuritySettings from '@/components/doctor/settings/SecuritySettings';

export default function DoctorSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Settings
      </h1>

      <ProfileSettings />
      <ClinicSettings />
      <NotificationSettings />
      <SecuritySettings />
    </div>
  );
}
