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
        // Force to top immediately
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        resetProgress();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [resetProgress]);

  // Handle ALL pageshow events (BFCache and regular navigation)
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // Force to top immediately - multiple methods for maximum compatibility
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      resetProgress();
      
      // Extra scroll reset after a delay for stubborn browsers
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.dispatchEvent(new Event('scroll'));
      }, 100);
    };
    
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [resetProgress]);

  // Ensure clean state on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
