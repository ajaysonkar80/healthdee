import ClinicPageLayout from "./ClinicPageLayout";
import ClinicHero from "./ClinicHero";
import ClinicSummary from "./ClinicSummary";
import ClinicDetails from "./ClinicDetails";
import ClinicServices from "./ClinicServices";
import ClinicDoctors from "./ClinicDoctors";
import ClinicSidebar from "./ClinicSidebar";

export default async function ClinicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const clinic = {
    id,
    name: "City General Hospital & Multispecialty Center",
    heroImage: "/hospital.jpg",
    logo: "/clinic-logo.jpg",
    rating: 4.8,
    reviews: 120,
    location: "MG Road, Jaipur",
    specialty: "Multispecialty Care",
    experienceYears: 15,
    address: "123 MG Road, Jaipur, Rajasthan",
    phone: "+91 98765 43210",
    isOpen: true,
    openTime: "09:00 AM",
    closeTime: "08:00 PM",
    services: [
      "General Medicine",
      "Pediatrics",
      "Cardiology",
      "Dental Care",
      "Diagnostics & Lab",
      "Vaccinations",
    ],
    doctors: [
      {
        id: "1",
        name: "Dr. Amit Sharma",
        specialty: "Cardiologist",
        experienceYears: 12,
        imageUrl: "/doctor-2.jpg",
      },
      {
        id: "2",
        name: "Dr. Priya Singh",
        specialty: "Pediatrician",
        experienceYears: 8,
        imageUrl: "/doctor-1.jpg",
      },
    ],
    operatingHours: [
      { day: "Mon - Fri", time: "08:00 AM - 09:00 PM" },
      { day: "Saturday", time: "09:00 AM - 06:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    amenities: ["Parking", "Wheelchair", "Free WiFi", "Insurance"],
    mapEmbedUrl:
      "https://www.google.com/maps/dir/?api=1&destination=City+General+Hospital+Jaipur+Rajasthan",
  };

  return (
    <ClinicPageLayout
      sidebar={
        <ClinicSidebar
          operatingHours={clinic.operatingHours}
          amenities={clinic.amenities}
          mapEmbedUrl={clinic.mapEmbedUrl}
          address={clinic.address}
        />
      }
    >
      <ClinicHero
        name={clinic.name}
        imageUrl={clinic.heroImage}
        rating={clinic.rating}
        reviewCount={clinic.reviews}
        location={clinic.location}
        isVerified
      />

      <ClinicSummary
        name={clinic.name}
        logoUrl={clinic.logo}
        specialty={clinic.specialty}
        experienceYears={clinic.experienceYears}
        directionsUrl={`https://maps.google.com?q=${clinic.address}`}
      />

      <ClinicDetails
        address={clinic.address}
        phone={clinic.phone}
        isOpen={clinic.isOpen}
        openTime={clinic.openTime}
        closeTime={clinic.closeTime}
        shareUrl={`https://healthdee.vercel.app/clinics/${id}`}
      />

      <ClinicServices services={clinic.services} />
      <ClinicDoctors doctors={clinic.doctors} clinicId={id} />
    </ClinicPageLayout>
  );
}
