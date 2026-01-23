import  Header  from "@/components/layout/Header";
import  Footer  from "@/components/layout/Footer";
import  HeroSection from "@/components/home/HeroSection";
import  SpecialtiesSection  from "@/components/home/SpecialtiesSection";
import  HowItWorksSection  from "@/components/home/HowItWorksSection";
import  TrustStatsSection  from "@/components/home/TrustStatsSection";
import  CTASection  from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <main className="bg-[#FFF7F9]">
      <Header />
      <HeroSection />
      <SpecialtiesSection />
      <HowItWorksSection />
      <TrustStatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
