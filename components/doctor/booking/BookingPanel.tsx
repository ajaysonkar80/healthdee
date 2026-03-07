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
mode?: "create" | "reschedule";
appointmentId?: string;
onSuccessAction?: () => void;
};

export default function BookingPanel({
doctorId,
mode = "create",
appointmentId,
onSuccessAction,
}: Props) {

const router = useRouter();

const [availability, setAvailability] = useState<Availability[]>([]);
const [appointments, setAppointments] = useState<Appointment[]>([]);
const [selectedDate, setSelectedDate] = useState<string | null>(null);
const [selectedTime, setSelectedTime] = useState<string | null>(null);
const [loading, setLoading] = useState(true);
const [booking, setBooking] = useState(false);

/* ================= FETCH DATA ================= */

useEffect(() => {
async function fetchData() {
try {
const [availabilityRes, appointmentsRes] = await Promise.all([
fetch(`/api/doctors/${doctorId}/availability-public`),
fetch(`/api/doctors/${doctorId}/appointments-public`),
]);

const availabilityJson = await availabilityRes.json();
const appointmentsJson = await appointmentsRes.json();

setAvailability(
Array.isArray(availabilityJson.data) ? availabilityJson.data : []
);

setAppointments(
Array.isArray(appointmentsJson.data) ? appointmentsJson.data : []
);
} catch (error) {
console.error("Failed to load booking data:", error);
} finally {
setLoading(false);
}
}

fetchData();
}, [doctorId]);

/* ================= NEXT 30 DAYS ================= */

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

/* ================= CHECK DAY AVAILABILITY ================= */

function isDayAvailable(date: Date) {
const dayOfWeek = date.getDay();

const dayAvailability = availability.find(
(a) => a.dayOfWeek === dayOfWeek && a.isActive
);

return !!dayAvailability;
}

/* ================= SLOT GENERATION ================= */

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

/* ================= DISABLE LOGIC ================= */

function isSlotDisabled(time: string) {
if (!selectedDate) return true;

const now = new Date();
const slotDateTime = new Date(`${selectedDate}T${time}:00`);

if (slotDateTime < now) return true;

const isBooked = appointments.some((a) => {
const booked = new Date(a.scheduledAt);

return (
booked.toISOString().slice(0, 16) ===
slotDateTime.toISOString().slice(0, 16)
);
});

return isBooked;
}

/* ================= BOOK / RESCHEDULE ================= */

async function handleBooking() {
if (!selectedDate || !selectedTime) return;

setBooking(true);

try {

const scheduledAt = new Date(
`${selectedDate}T${selectedTime}:00`
).toISOString();

/* CREATE */

if (mode === "create") {

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

return;
}

/* RESCHEDULE */

const res = await fetch(
`/api/appointments/${appointmentId}/reschedule`,
{
method: "PATCH",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
scheduledAt,
}),
}
);

if (!res.ok) {
const err = await res.json();
throw new Error(err?.error?.message ?? "Reschedule failed");
}

onSuccessAction?.();

} catch (error) {
console.error("Booking error:", error);
alert("Booking failed");
} finally {
setBooking(false);
}
}

/* ================= LOADING ================= */

if (loading) {
return (

<div className="flex justify-center py-10 text-sm text-gray-500">
Loading available slots...
</div>
);
}

/* ================= PANEL STYLE ================= */

const containerClass =
mode === "create"
? "border p-6 rounded-lg space-y-6 sticky top-6"
: "space-y-6 max-w-md mx-auto";

/* ================= UI ================= */

return (

<div className={containerClass}>

<h2 className="text-lg font-semibold">
{mode === "reschedule"
? "Choose a new time slot"
: "Book Appointment"}
</h2>

{/* DATE SELECTOR */}

<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

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
className={`min-w-22.5 px-3 py-2 rounded-md border text-sm font-medium whitespace-nowrap transition
${selectedDate === iso
? "bg-blue-600 text-white border-blue-600"
: "bg-white hover:bg-gray-50"}
${disabled ? "opacity-40 cursor-not-allowed" : ""}
`}

>

{date.toDateString().slice(0, 10)} </button>
);
})}

</div>

{/* TIME SLOTS */}

{selectedDate && (

<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

{availableSlots.map((time) => {

const disabled = isSlotDisabled(time);

return (
<button
key={time}
disabled={disabled}
onClick={() => setSelectedTime(time)}
className={`py-3 rounded-md border text-sm font-medium transition w-full
${selectedTime === time
? "bg-blue-600 text-white border-blue-600"
: "bg-white hover:bg-gray-50"}
${disabled
? "opacity-40 cursor-not-allowed"
: ""}
`}

>

{time} </button>
);
})}

</div>

)}

{/* CTA BUTTON */}

<button
disabled={!selectedTime || booking}
onClick={handleBooking}
className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"

>

{booking
? mode === "reschedule"
? "Rescheduling..."
: "Booking..."
: mode === "reschedule"
? "Reschedule Appointment"
: "Book Appointment"}

</button>

</div>
);
}
