import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoofBuildSection from "@/components/RoofBuildSection";
import BeachSunsetSection from "@/components/BeachSunset/BeachSunsetSection";
import { ScrollProvider } from "@/context/ScrollContext";

const Index = () => {
  return (
    <ScrollProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <RoofBuildSection />
        <BeachSunsetSection />
      </main>
    </ScrollProvider>
  );
};

export default Index;
