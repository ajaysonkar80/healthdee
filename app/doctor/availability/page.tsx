"use client";

import { useEffect, useState } from "react";

type DayAvailability = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const defaultTimeOptions = [
  "06:00","07:00","08:00","09:00","10:00",
  "11:00","12:00","13:00","14:00","15:00",
  "16:00","17:00","18:00","19:00","20:00",
];

export default function DoctorAvailabilityPage() {
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* --------------------------------------------------
     Fetch existing availability
  --------------------------------------------------- */
  useEffect(() => {
    async function fetchAvailability() {
      const res = await fetch("/api/doctor/availability");
      const data = await res.json();

      if (res.ok) {
        setAvailability(data);
      }

      setLoading(false);
    }

    fetchAvailability();
  }, []);

  /* --------------------------------------------------
     Handle change
  --------------------------------------------------- */
  function updateDay(
    dayOfWeek: number,
    field: keyof DayAvailability,
    value: string | boolean
  ) {
    setAvailability((prev) =>
      prev.map((day) =>
        day.dayOfWeek === dayOfWeek
          ? { ...day, [field]: value }
          : day
      )
    );
  }

  /* --------------------------------------------------
     Save availability
  --------------------------------------------------- */
  async function handleSave() {
    setSaving(true);

    const res = await fetch("/api/doctor/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availability }),
    });

    setSaving(false);

    if (res.ok) {
      alert("Availability updated successfully");
    } else {
      alert("Failed to update availability");
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  /* --------------------------------------------------
     Ensure 7 days exist
  --------------------------------------------------- */
  const normalizedAvailability = days.map((_, index) => {
    const existing = availability.find(
      (a) => a.dayOfWeek === index
    );

    return (
      existing || {
        dayOfWeek: index,
        startTime: "09:00",
        endTime: "17:00",
        isActive: false,
      }
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        Manage Weekly Availability
      </h1>

      <div className="space-y-4">
        {normalizedAvailability.map((day) => (
          <div
            key={day.dayOfWeek}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="font-medium w-32">
              {days[day.dayOfWeek]}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={day.isActive}
                  onChange={(e) =>
                    updateDay(
                      day.dayOfWeek,
                      "isActive",
                      e.target.checked
                    )
                  }
                />
                Available
              </label>

              <select
                disabled={!day.isActive}
                value={day.startTime}
                onChange={(e) =>
                  updateDay(
                    day.dayOfWeek,
                    "startTime",
                    e.target.value
                  )
                }
                className="border rounded px-2 py-1"
              >
                {defaultTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <span>-</span>

              <select
                disabled={!day.isActive}
                value={day.endTime}
                onChange={(e) =>
                  updateDay(
                    day.dayOfWeek,
                    "endTime",
                    e.target.value
                  )
                }
                className="border rounded px-2 py-1"
              >
                {defaultTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Availability"}
      </button>
    </div>
  );
}