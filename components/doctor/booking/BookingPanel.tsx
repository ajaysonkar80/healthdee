"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeSlot = {
  label: string;
  value: string;
};

type SlotGroup = {
  title: string;
  slots: TimeSlot[];
};

const DATE_OPTIONS = [
  { label: "Today", value: "today", day: "24" },
  { label: "Tomorrow", value: "tomorrow", day: "25" },
  { label: "Wed", value: "wed", day: "26" },
  { label: "Thu", value: "thu", day: "27" },
];

const SLOT_GROUPS: SlotGroup[] = [
  {
    title: "Morning",
    slots: [
      { label: "09:00 AM", value: "09:00" },
      { label: "09:30 AM", value: "09:30" },
      { label: "10:00 AM", value: "10:00" },
      { label: "10:30 AM", value: "10:30" },
      { label: "11:00 AM", value: "11:00" },
    ],
  },
  {
    title: "Afternoon",
    slots: [
      { label: "02:00 PM", value: "14:00" },
      { label: "03:30 PM", value: "15:30" },
      { label: "04:00 PM", value: "16:00" },
    ],
  },
  {
    title: "Evening",
    slots: [
      { label: "06:00 PM", value: "18:00" },
      { label: "06:30 PM", value: "18:30", },
      { label: "07:00 PM", value: "19:00" },
    ],
  },
];

export default function BookingPanel() {
  const [selectedDate, setSelectedDate] = useState<string>("today");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const canConfirm = Boolean(selectedDate && selectedSlot);

  return (
    <Card className="p-6 sticky top-24 h-fit">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">Book Appointment</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Select a preferred time slot
      </p>

      {/* Date Selector */}
      <div className="flex gap-2 mb-6">
        {DATE_OPTIONS.map((date) => (
          <button
            key={date.value}
            onClick={() => {
              setSelectedDate(date.value);
              setSelectedSlot(null);
            }}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-16 rounded-lg border text-sm transition",
              selectedDate === date.value
                ? "border-primary bg-primary/10 text-primary"
                : "hover:border-muted-foreground"
            )}
          >
            <span className="font-medium">{date.label}</span>
            <span className="text-xs">{date.day}</span>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="space-y-5">
        {SLOT_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-medium mb-2">{group.title}</p>

            <div className="grid grid-cols-3 gap-2">
              {group.slots.map((slot) => {
                const isSelected = selectedSlot === slot.value;

                return (
                  <button
                    key={slot.value}
                    onClick={() => setSelectedSlot(slot.value)}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-sm transition",
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:border-primary/60"
                    )}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Fee Summary */}
      <div className="flex items-center justify-between mt-6 text-sm">
        <span className="text-muted-foreground">Consultation Fee</span>
        <span className="font-semibold text-base">₹500</span>
      </div>

      {/* CTA */}
      <Button
        className="w-full mt-4"
        disabled={!canConfirm}
        onClick={() => {
          console.log({
            date: selectedDate,
            time: selectedSlot,
          });
        }}
      >
        Confirm Appointment
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-2">
        No booking fees. Pay at the clinic.
      </p>
    </Card>
  );
}
