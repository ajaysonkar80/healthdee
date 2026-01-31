import { Card } from "@/components/ui/card";
import DoctorSummary from "./DoctorSummary";
import AppointmentMeta from "./AppointmentMeta";

type BookingSummaryCardProps = {
  doctor: {
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    reviews: number;
    avatar: string;
  };
  appointment: {
    date: string;
    time: string;
    location: string;
  };
};

export default function BookingSummaryCard({
  doctor,
  appointment,
}: BookingSummaryCardProps) {
  return (
    <Card className="max-w-3xl mx-auto p-6">
      <DoctorSummary doctor={doctor} />
      <AppointmentMeta appointment={appointment} />
    </Card>
  );
}
