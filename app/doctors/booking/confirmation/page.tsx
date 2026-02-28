"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import BookingConfirmationHero from "@/components/doctor/booking/confirmation/BookingConfirmationHero";
import BookingSummaryCard from "@/components/doctor/booking/confirmation/BookingSummaryCard";
import BookingActions from "@/components/doctor/booking/confirmation/BookingActions";
import WhatToExpect from "@/components/doctor/booking/confirmation/WhatToExpect";
import SupportFooter from "@/components/doctor/booking/confirmation/SupportFooter";

import { useAuth } from "@/app/context/AuthContext";

type AppointmentWithDoctor = {
  id: string;
  scheduledAt: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  doctor: {
    id: string;
    name: string;
    specialty: string;
    experienceYears: number | null;
    profileImageUrl: string | null;
    rating: number;
  };
};

export default function BookingConfirmedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();

  const [appointment, setAppointment] =
  useState<AppointmentWithDoctor | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  const appointmentId = searchParams.get("appointmentId");

  useEffect(() => {
    async function loadAppointment() {
      if (!appointmentId) {
        router.replace("/");
        return;
      }

      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch(
          `/api/appointments/${appointmentId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          router.replace("/");
          return;
        }

        const json = await res.json();
        setAppointment(json.data);
      } catch (error) {
        console.error("Failed to load appointment:", error);
        router.replace("/");
      } finally {
        setPageLoading(false);
      }
    }

    if (!loading) {
      loadAppointment();
    }
  }, [appointmentId, user, loading, router]);

  if (loading || pageLoading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!appointment) {
    return null;
  }

  const date = new Date(appointment.scheduledAt);

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Header />

      <main className="px-6">
        <BookingConfirmationHero
          doctorName={appointment.doctor.name}
          status={appointment.status}
        />

        <BookingSummaryCard
          doctor={{
            name: appointment.doctor.name,
            specialty: appointment.doctor.specialty,
            experience: `${appointment.doctor.experienceYears ?? 0}+ Years`,
            rating: appointment.doctor.rating,
            reviews: 0,
            avatar:
              appointment.doctor.profileImageUrl ??
              "/doctor-placeholder.jpg",
          }}
          appointment={{
            date: formattedDate,
            time: formattedTime,
            location: "Clinic",
          }}
        />

        <BookingActions
          appointmentId={appointment.id}
          status={appointment.status}
        />

        <WhatToExpect />
        <SupportFooter />
      </main>

      <Footer />
    </>
  );
}