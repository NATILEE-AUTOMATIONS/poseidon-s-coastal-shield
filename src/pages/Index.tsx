import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoofBuildSection from "@/components/RoofBuildSection";
import ProjectGallerySection from "@/components/ProjectGallerySection";
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
        {!isMobile && <ProjectGallerySection />}
      </main>
    </ScrollProvider>
  );
};

export default Index;
