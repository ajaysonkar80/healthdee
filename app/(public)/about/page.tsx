// app/about/page.tsx
import AboutHero from "@/components/about/about-hero/AboutHero";
import OurStory from "@/components/about/our-story/OurStory";
import TrustBadges from "@/components/about/trust-badges/TrustBadges";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/about/final-cta/FinalCTA";
import CoreValues from "@/components/about/core-values/CoreValues";

export default function AboutPage() {
  return (
    <>
      <Header/>
      <AboutHero />
      <OurStory/>
      <TrustBadges/>
      <CoreValues/>
      <FinalCTA/>
      <Footer/>
    </>
  );
}
