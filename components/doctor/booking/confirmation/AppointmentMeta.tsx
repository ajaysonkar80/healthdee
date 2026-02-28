import { Calendar, Clock, MapPin } from "lucide-react";

type AppointmentMetaProps = {
  appointment: {
    date: string;
    time: string;
    location?: string;
  };
};

export default function AppointmentMeta({
  appointment,
}: AppointmentMetaProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
      {/* Date */}
      <div className="flex items-start gap-3">
        <Calendar className="h-5 w-5 text-green-500 mt-0.5" />
        <div>
          <p className="text-xs text-muted-foreground uppercase">Date</p>
          <p className="font-medium">{appointment.date}</p>
        </div>
      </div>

      {/* Time */}
      <div className="flex items-start gap-3">
        <Clock className="h-5 w-5 text-green-500 mt-0.5" />
        <div>
          <p className="text-xs text-muted-foreground uppercase">Time Slot</p>
          <p className="font-medium">{appointment.time}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
        <div>
          <p className="text-xs text-muted-foreground uppercase">Location</p>
          <p className="font-medium">{appointment.location}</p>
        </div>
      </div>
    </div>
  );
}
