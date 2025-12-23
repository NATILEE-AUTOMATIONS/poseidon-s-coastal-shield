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

  // Track when page is being hidden (for iOS Safari BFCache)
  useEffect(() => {
    const handlePageHide = () => {
      sessionStorage.setItem('wasHidden', 'true');
    };
    
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

  // Check on mount if returning from cached state
  useEffect(() => {
    const wasHidden = sessionStorage.getItem('wasHidden');
    const isMobileViewport = window.innerWidth < 768;
    
    if (wasHidden === 'true' && isMobileViewport) {
      sessionStorage.removeItem('wasHidden');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      resetProgress();
    }
  }, [resetProgress]);

  // Focus event handler - fallback for iOS Safari
  useEffect(() => {
    const handleFocus = () => {
      const isMobileViewport = window.innerWidth < 768;
      const wasHidden = sessionStorage.getItem('wasHidden');
      
      if (isMobileViewport && wasHidden === 'true') {
        sessionStorage.removeItem('wasHidden');
        window.location.reload();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Handle visibility change (tab switching, app switching on mobile)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hasBeenHiddenRef.current = true;
        sessionStorage.setItem('wasHidden', 'true');
      } else if (document.visibilityState === 'visible' && hasBeenHiddenRef.current) {
        const isMobileViewport = window.innerWidth < 768;
        
        if (isMobileViewport) {
          sessionStorage.removeItem('wasHidden');
          window.location.reload();
          return;
        }
        
        // Desktop: existing reset logic
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
        const isMobileViewport = window.innerWidth < 768;
        
        if (isMobileViewport) {
          sessionStorage.removeItem('wasHidden');
          window.location.reload();
          return;
        }
        
        // Desktop: existing reset logic
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
