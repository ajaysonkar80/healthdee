import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import DoctorProfile from "@/components/doctor/booking/DoctorProfile";
import DoctorStats from "@/components/doctor/booking/DoctorStats";
import AboutDoctor from "@/components/doctor/booking/AboutDoctor";
import Reviews from "@/components/doctor/booking/Reviews";
import BookingPanel from "@/components/doctor/booking/BookingPanel";

import { doctorService } from "@/server/services/doctor.service";

type PageProps = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function DoctorDetailPage({
  params,
}: PageProps) {
  // ✅ Next 15: unwrap params
  const { publicId } = await params;

  let doctor;

  try {
    doctor =
      await doctorService.getDoctorDetailByPublicId(
        publicId
      );
  } catch {
    notFound();
  }

  if (!doctor) {
    notFound();
  }

  /* -----------------------------------------
     Fetch Reviews (limit 5)
  ------------------------------------------ */

  const rawReviews =
    await doctorService.getDoctorReviews(
      doctor.id,
      5
    );

  const reviews = rawReviews.map((review) => ({
    ...review,
    isVerified: review.isVerified ?? false,
  }));

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE - Doctor Details */}
        <div className="lg:col-span-2 space-y-6">
          <DoctorProfile
            fullName={doctor.fullName ?? ""}
            degrees={doctor.degrees ?? ""}
            specialty={doctor.specialty ?? ""}
            languages={doctor.languages ?? ""}
            experienceYears={
              doctor.experienceYears ?? 0
            }
            profileImageUrl={
              doctor.profileImageUrl ?? ""
            }
            isTopRated={
              doctor.isTopRated ?? false
            }
            tagline={doctor.tagline ?? ""}
          />

          <DoctorStats
            consultationFee={
              doctor.consultationFee ?? 0
            }
            rating={doctor.rating ?? 0}
          />

          <AboutDoctor
            fullName={doctor.fullName ?? ""}
            bio={doctor.bio ?? ""}
          />

          <Reviews reviews={reviews} />
        </div>

        {/* RIGHT SIDE - Booking Panel */}
        <BookingPanel doctorId={doctor.id} />
      </main>

      <Footer />
    </>
  );
}