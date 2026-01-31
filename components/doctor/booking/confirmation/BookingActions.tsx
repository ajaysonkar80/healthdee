"use client";

import { Button } from "@/components/ui/button";
import { CalendarPlus, Map } from "lucide-react";

export default function BookingActions() {
  const handleAddToCalendar = () => {
    console.log("Add to calendar");
    // later: Google / Apple calendar logic
  };

  const handleGetDirections = () => {
    console.log("Get directions");
    // later: window.open maps link
  };

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
