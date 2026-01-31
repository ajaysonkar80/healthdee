import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import BookingConfirmationHero from "@/components/doctor/booking/confirmation/BookingConfirmationHero";
import BookingSummaryCard from "@/components/doctor/booking/confirmation/BookingSummaryCard";
import BookingActions from "@/components/doctor/booking/confirmation/BookingActions";
import WhatToExpect from "@/components/doctor/booking/confirmation/WhatToExpect";
import SupportFooter from "@/components/doctor/booking/confirmation/SupportFooter";

export default function BookingConfirmedPage() {
  // Mock booking data (API-ready)
  const bookingData = {
    doctor: {
      name: "Dr. Anjali Sharma",
      specialty: "Senior Cardiologist",
      experience: "12 years experience",
      rating: 4.9,
      reviews: 450,
      avatar: "/doctor-anjali.jpg",
    },
    appointment: {
      date: "Monday, 24th Oct 2023",
      time: "10:30 AM - 11:00 AM",
      location: "City General Hospital, Civil Lines",
    },
  };

  return (
    <>
      <Header />

      <main className="px-6">
        {/* Confirmation */}
        <BookingConfirmationHero doctorName={bookingData.doctor.name} />

        {/* Summary Card */}
        <BookingSummaryCard
          doctor={bookingData.doctor}
          appointment={bookingData.appointment}
        />

        {/* Actions */}
        <BookingActions />

        {/* What to Expect */}
        <WhatToExpect />

        {/* Support */}
        <SupportFooter />
      </main>

      <Footer />
    </>
  );
}
