import StatsCard from "./StatsCard";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatsCard
        title="Total Doctors"
        value="1,248"
        footerText="+12 this month"
        footerColor="text-green-600"
        icon={<span>🩺</span>}
      />

      <StatsCard
        title="Pending Verifications"
        value="14"
        footerText="Requires review"
        footerColor="text-orange-600"
        icon={<span>📄</span>}
      />

      <StatsCard
        title="Appointment Requests"
        value="89"
        footerText="For today, Oct 24"
        icon={<span>📅</span>}
      />
    </div>
  );
}
