import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoofBuildSection from "@/components/RoofBuildSection";
import ProjectGallerySection from "@/components/ProjectGallerySection";
import { ScrollProvider, useScrollContext } from "@/context/ScrollContext";

const IndexContent = () => {
  const { resetProgress } = useScrollContext();
  const hasBeenHiddenRef = useRef(false);

  // Fix mobile caching: disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Handle visibility change (tab switching, app switching on mobile)
  // Only reset if page was previously hidden (not on initial load)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hasBeenHiddenRef.current = true;
      } else if (document.visibilityState === 'visible' && hasBeenHiddenRef.current) {
        // Only reset if we were previously hidden
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        resetProgress();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [resetProgress]);

  // Handle pageshow events - ONLY reset on BFCache restore (event.persisted = true)
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Only reset when coming from BFCache, not on initial load
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
      }
    };
    
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [resetProgress]);

  // Ensure clean state on mount (just scroll, no resetProgress to avoid blocker)
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
