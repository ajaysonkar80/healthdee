import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import BookingConfirmationHero from "@/components/doctor/booking/confirmation/BookingConfirmationHero";
import BookingSummaryCard from "@/components/doctor/booking/confirmation/BookingSummaryCard";
import BookingActions from "@/components/doctor/booking/confirmation/BookingActions";
import WhatToExpect from "@/components/doctor/booking/confirmation/WhatToExpect";
import SupportFooter from "@/components/doctor/booking/confirmation/SupportFooter";

type AppointmentResponse = {
  id: string;
  scheduledAt: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  doctorId: string;
};

async function getAppointment(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/appointments/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  return data.data as AppointmentResponse;
}

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ appointmentId?: string }>;
}) {
  // ✅ Await searchParams (Next 15 requirement)
  const { appointmentId } = await searchParams;

  if (!appointmentId) {
    notFound();
  }

  const appointment = await getAppointment(appointmentId);

  const date = new Date(appointment.scheduledAt);

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = `${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${new Date(
    date.getTime() + 30 * 60000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const bookingData = {
    doctor: {
      name: "Doctor",
      specialty: "Specialist",
      experience: "",
      rating: 0,
      reviews: 0,
      avatar: "/doctor-placeholder.jpg",
    },
    appointment: {
      date: formattedDate,
      time: formattedTime,
      location: "Clinic Location",
    },
  };

  return (
    <>
      <Header />

      <main className="px-6">
        <BookingConfirmationHero doctorName={bookingData.doctor.name} />

        <BookingSummaryCard
          doctor={bookingData.doctor}
          appointment={bookingData.appointment}
        />

        <BookingActions />
        <WhatToExpect />
        <SupportFooter />
      </main>

      <Footer />
    </>
  );
}