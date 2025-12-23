import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoofBuildSection from "@/components/RoofBuildSection";
import ProjectGallerySection from "@/components/ProjectGallerySection";
import { ScrollProvider, useScrollContext } from "@/context/ScrollContext";

const IndexContent = () => {
  const { resetProgress } = useScrollContext();

  // Fix mobile caching: disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Handle visibility change (tab switching, app switching on mobile)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        window.scrollTo(0, 0);
        resetProgress();
        // Force scroll recalculation
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 50);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [resetProgress]);

  // Handle ALL pageshow events (BFCache and regular navigation)
  useEffect(() => {
    const handlePageShow = () => {
      window.scrollTo(0, 0);
      resetProgress();
      // Delayed reset + force scroll recalculation
      setTimeout(() => {
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('scroll'));
      }, 50);
    };
    
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [resetProgress]);

  // Ensure clean state on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <RoofBuildSection />
      <ProjectGallerySection />
    </main>
  );
};

const Index = () => {
  return (
    <ScrollProvider>
      <IndexContent />
    </ScrollProvider>
  );
};

export default Index;
