import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoofBuildSection from "@/components/RoofBuildSection";
import MobileFirstImage from "@/components/RoofBuild/MobileFirstImage";
import { ScrollProvider } from "@/context/ScrollContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <ScrollProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <RoofBuildSection />
        {/* Mobile gallery - natural scroll section after roof animation */}
        {isMobile && <MobileFirstImage />}
      </main>
    </ScrollProvider>
  );
};

export default Index;
