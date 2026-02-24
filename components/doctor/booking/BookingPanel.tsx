"use client";

import { useEffect, useMemo, useState } from "react";
import { generateSlots } from "@/lib/utils/slot";
import { useRouter } from "next/navigation";

type Availability = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

type Appointment = {
  scheduledAt: string;
};

type Props = {
  doctorId: string;
};

export default function BookingPanel({ doctorId }: Props) {
  const router = useRouter();
  console.log("DoctorId:", doctorId);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  /* =====================================================
     Fetch availability + appointments
  ====================================================== */
  useEffect(() => {
    async function fetchData() {
      try {
        const [availabilityRes, appointmentsRes] = await Promise.all([
          fetch(`/api/doctors/${doctorId}/availability-public`),
          fetch(`/api/doctors/${doctorId}/appointments-public`),
        ]);

        const availabilityJson = await availabilityRes.json();
        const appointmentsJson = await appointmentsRes.json();

        // IMPORTANT: Extract .data
        setAvailability(
          Array.isArray(availabilityJson.data)
            ? availabilityJson.data
            : []
        );

        setAppointments(
          Array.isArray(appointmentsJson.data)
            ? appointmentsJson.data
            : []
        );
      } catch (error) {
        console.error("Failed to load booking data:", error);
        setAvailability([]);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [doctorId]);

  /* =====================================================
     Generate next 30 days
  ====================================================== */
  const next30Days = useMemo(() => {
    const days: Date[] = [];
    const now = new Date();

    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      days.push(d);
    }

    return days;
  }, []);

  /* =====================================================
     Check if day has availability
  ====================================================== */
  function isDayAvailable(date: Date) {
    if (!Array.isArray(availability)) return false;

    const dayOfWeek = date.getDay();

    const dayAvailability = availability.find(
      (a) => a.dayOfWeek === dayOfWeek && a.isActive
    );

    return !!dayAvailability;
  }

  /* =====================================================
     Generate slots for selected day
  ====================================================== */
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];

    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();

    const dayAvailability = availability.find(
      (a) => a.dayOfWeek === dayOfWeek && a.isActive
    );

    if (!dayAvailability) return [];

    return generateSlots(
      dayAvailability.startTime,
      dayAvailability.endTime,
      30
    );
  }, [selectedDate, availability]);

  /* =====================================================
     Disable logic
  ====================================================== */
  function isSlotDisabled(time: string) {
    if (!selectedDate) return true;

    const now = new Date();
    const slotDateTime = new Date(`${selectedDate}T${time}:00`);

    // Disable past times
    if (slotDateTime < now) return true;

    // Disable already booked times
    const isBooked = appointments.some((a) => {
      const booked = new Date(a.scheduledAt);

      return (
        booked.toISOString().slice(0, 16) ===
        slotDateTime.toISOString().slice(0, 16)
      );
    });

    return isBooked;
  }

  /* =====================================================
     Booking
  ====================================================== */
  async function handleBooking() {
    if (!selectedDate || !selectedTime) return;

    setBooking(true);

    try {
      const scheduledAt = new Date(
        `${selectedDate}T${selectedTime}:00`
      ).toISOString();

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId,
          scheduledAt,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.data?.id) {
        router.push(
          `/doctors/booking/confirmation?appointmentId=${data.data.id}`
        );
      } else {
        alert("Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed");
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return <div className="border p-6 rounded">Loading...</div>;
  }

  return (
    <div className="border p-6 rounded-lg space-y-6 sticky top-6">
      <h2 className="text-xl font-semibold">Book Appointment</h2>

      {/* ================= DATE SELECTOR ================= */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {next30Days.map((date) => {
          const iso = date.toISOString().split("T")[0];
          const disabled = !isDayAvailable(date);

          return (
            <button
              key={iso}
              disabled={disabled}
              onClick={() => {
                setSelectedDate(iso);
                setSelectedTime(null);
              }}
              className={`px-3 py-2 rounded border whitespace-nowrap ${
                selectedDate === iso
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              {date.toDateString().slice(0, 10)}
            </button>
          );
        })}
      </div>

      {/* ================= TIME SLOTS ================= */}
      {selectedDate && (
        <div className="grid grid-cols-3 gap-2">
          {availableSlots.map((time) => {
            const disabled = isSlotDisabled(time);

            return (
              <button
                key={time}
                disabled={disabled}
                onClick={() => setSelectedTime(time)}
                className={`py-2 rounded border ${
                  selectedTime === time
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                } ${
                  disabled
                    ? "opacity-40 cursor-not-allowed"
                    : ""
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}

      {/* ================= BOOK BUTTON ================= */}
      <button
        disabled={!selectedTime || booking}
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-3 rounded disabled:opacity-50"
      >
        {booking ? "Booking..." : "Book Appointment"}
      </button>
    </div>
  );
}