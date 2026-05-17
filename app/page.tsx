import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import VisionBanner from "@/components/sections/VisionBanner";
import BusinessGrid from "@/components/sections/BusinessGrid";
import ImpactSection from "@/components/sections/ImpactSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <VisionBanner />
        <BusinessGrid />
        <ImpactSection />
        <RoadmapSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
