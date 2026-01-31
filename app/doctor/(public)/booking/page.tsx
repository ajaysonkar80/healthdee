import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DoctorProfile from "@/components/doctor/booking/DoctorProfile";
import DoctorStats from "@/components/doctor/booking/DoctorStats";
import AboutDoctor from "@/components/doctor/booking/AboutDoctor";
import Reviews from "@/components/doctor/booking/Reviews";
import ClinicInfo from "@/components/doctor/booking/ClinicInfo";
import BookingPanel from "@/components/doctor/booking/BookingPanel";

export default function DoctorBookingPage() {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <DoctorProfile />
          <DoctorStats />
          <AboutDoctor />
          <Reviews />
          <ClinicInfo />
        </div>

        <BookingPanel />
      </main>

      <Footer />
    </>
  );
}
