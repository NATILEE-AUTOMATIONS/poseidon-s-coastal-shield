import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoofBuildSection from "@/components/RoofBuildSection";
import { ScrollProvider } from "@/context/ScrollContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <ScrollProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        {!isMobile && <RoofBuildSection />}
      </main>
    </ScrollProvider>
  );
};

export default Index;
