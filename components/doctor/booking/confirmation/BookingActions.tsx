"use client";

import { Button } from "@/components/ui/button";
import { CalendarPlus, Map } from "lucide-react";

type BookingActionsProps = {
  appointmentId: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
};

export default function BookingActions({
  appointmentId,
  status,
}: BookingActionsProps) {
  const handleAddToCalendar = () => {
    //console.log("Add to calendar", appointmentId);
  };

  const handleGetDirections = () => {
    //console.log("Get directions");
  };

  if (status === "CANCELLED") return null;

  return (
    <section className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6">
      <Button
        size="lg"
        className="gap-2 bg-green-500 hover:bg-green-600"
        onClick={handleAddToCalendar}
      >
        <CalendarPlus className="h-5 w-5" />
        Add to Calendar
      </Button>

      <Button
        size="lg"
        variant="outline"
        className="gap-2"
        onClick={handleGetDirections}
      >
        <Map className="h-5 w-5" />
        Get Directions
      </Button>
    </section>
  );
}