import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoofBuildSection from "@/components/RoofBuildSection";
import DoorRevealSection from "@/components/DoorReveal/DoorRevealSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <RoofBuildSection />
      <DoorRevealSection />
    </main>
  );
};

export default Index;
