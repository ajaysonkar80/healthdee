"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const times = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "02:00 PM",
  "03:30 PM",
  "04:00 PM",
  "06:00 PM",
  "07:00 PM",
];

export default function BookingPanel() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Card className="p-6 sticky top-24 h-fit">
      <h2 className="text-lg font-semibold mb-4">Book Appointment</h2>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {times.map((time) => (
          <Button
            key={time}
            variant={selected === time ? "default" : "outline"}
            onClick={() => setSelected(time)}
          >
            {time}
          </Button>
        ))}
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span>Consultation Fee</span>
        <span className="font-semibold">₹500</span>
      </div>

      <Button className="w-full">Confirm Appointment</Button>

      <p className="text-xs text-center text-muted-foreground mt-2">
        No booking fees. Pay at the clinic.
      </p>
    </Card>
  );
}
