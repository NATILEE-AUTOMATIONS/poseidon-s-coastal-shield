import React, { useRef, useEffect, useState } from 'react';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import coastalHomeCrew from '@/assets/coastal-home-crew.png';
import coastalRoofInprogress from '@/assets/coastal-roof-inprogress.png';
import coastalRoofProject from '@/assets/coastal-roof-project.png';

interface MobileImageGalleryProps {
  progress: number;
}

const images = [
  { src: aerialEstatePool, alt: 'Aerial view of estate with pool', caption: 'Premium Estate Roofing' },
  { src: coastalHomeCrew, alt: 'Coastal home with crew', caption: 'Expert Installation Team' },
  { src: coastalRoofInprogress, alt: 'Coastal roof in progress', caption: 'Precision Craftsmanship' },
  { src: coastalRoofProject, alt: 'Completed coastal roof project', caption: 'Stunning Results' },
];

const MobileImageGallery: React.FC<MobileImageGalleryProps> = ({ progress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [firstImageReady, setFirstImageReady] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Show gallery when door opens (progress > 0.80)
  useEffect(() => {
    if (progress >= 0.80 && !isVisible) {
      setIsVisible(true);
    }
  }, [progress, isVisible]);

  // First image expansion animation sequence
  useEffect(() => {
    if (!isVisible) return;
    
    // Start first image expansion after a brief delay
    const expandTimer = setTimeout(() => {
      setFirstImageReady(true);
    }, 100);
    
    // Enable scrolling after first image animation completes
    const scrollTimer = setTimeout(() => {
      setIsScrollEnabled(true);
    }, 900);
    
    return () => {
      clearTimeout(expandTimer);
      clearTimeout(scrollTimer);
    };
  }, [isVisible]);

  // Intersection Observer for active slide detection
  useEffect(() => {
    if (!isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    slidesRef.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[110]"
      style={{
        overflowY: isScrollEnabled ? 'scroll' : 'hidden',
        scrollSnapType: isScrollEnabled ? 'y mandatory' : 'none',
        WebkitOverflowScrolling: 'touch',
        background: `radial-gradient(ellipse 120% 100% at 50% 0%, 
          hsl(35 98% 75% / 0.95) 0%, 
          hsl(30 95% 65% / 0.85) 20%,
          hsl(25 85% 50% / 0.7) 40%,
          hsl(20 75% 35% / 0.5) 60%,
          hsl(15 40% 15%) 85%,
          hsl(168 50% 8%) 100%)`,
      }}
    >
      {/* Swipe hint - only after first image is ready */}
      <div 
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[120] text-center transition-opacity duration-1000"
        style={{ 
          opacity: activeIndex === 0 && isScrollEnabled ? 0.8 : 0,
          pointerEvents: 'none'
        }}
      >
        <p className="text-sm font-light tracking-widest uppercase" style={{ color: 'hsl(35 70% 85%)' }}>
          Swipe to explore
        </p>
        <div className="mt-2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto opacity-60">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="hsl(35 70% 75%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Image slides */}
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el)}
          data-index={index}
          className="h-screen w-full flex flex-col items-center justify-center px-4"
          style={{ scrollSnapAlign: 'center' }}
        >
          <div 
            className="relative"
            style={{
              // First image: expand from zero. Others: normal scale behavior
              transform: index === 0 
                ? (firstImageReady ? 'scale(1)' : 'scale(0)')
                : (activeIndex === index ? 'scale(1)' : 'scale(0.9)'),
              opacity: index === 0 
                ? (firstImageReady ? 1 : 0)
                : (activeIndex === index ? 1 : 0.4),
              transition: index === 0 
                ? 'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease-out'
                : 'all 700ms ease-out',
            }}
          >
            {/* Ambient glow behind image */}
            <div 
              className="absolute inset-0 rounded-2xl blur-3xl transition-opacity duration-700"
              style={{
                background: 'radial-gradient(circle, hsl(35 80% 55% / 0.5) 0%, transparent 70%)',
                transform: 'scale(1.2)',
                opacity: activeIndex === index ? 1 : 0,
              }}
            />
            
            {/* Image */}
            <img
              src={image.src}
              alt={image.alt}
              className="relative w-[88vw] max-h-[60vh] object-cover rounded-2xl"
              style={{
                boxShadow: activeIndex === index 
                  ? `0 0 0 1px hsl(168 70% 45% / 0.3),
                     0 8px 32px hsl(0 0% 0% / 0.4),
                     0 0 60px hsl(35 80% 55% / 0.3),
                     0 0 100px hsl(35 70% 50% / 0.2)`
                  : '0 8px 32px hsl(0 0% 0% / 0.3)',
              }}
            />

            {/* Caption */}
            <p 
              className="mt-6 text-center text-lg font-light tracking-wide transition-all duration-500"
              style={{
                color: 'hsl(35 70% 75%)',
                textShadow: '0 0 20px hsl(35 80% 50% / 0.5)',
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              {image.caption}
            </p>
          </div>
        </div>
      ))}

      {/* Final CTA slide */}
      <div 
        data-index={images.length}
        ref={(el) => (slidesRef.current[images.length] = el)}
        className="h-screen w-full flex flex-col items-center justify-center px-6"
        style={{ scrollSnapAlign: 'center' }}
      >
        <h2 
          className="text-3xl font-light text-center mb-6 tracking-wide"
          style={{ 
            color: 'hsl(168 70% 55%)',
            textShadow: '0 0 30px hsl(168 70% 50% / 0.5)'
          }}
        >
          Ready for your new roof?
        </h2>
        <button
          className="px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, hsl(168 70% 40%) 0%, hsl(30 85% 50%) 100%)',
            color: 'hsl(0 0% 100%)',
            boxShadow: '0 0 30px hsl(168 70% 45% / 0.4), 0 0 60px hsl(30 80% 50% / 0.3)',
          }}
        >
          Free Assessment
        </button>
      </div>

      {/* Progress dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-[120]">
        {images.map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: i === activeIndex 
                ? 'hsl(35 80% 60%)' 
                : 'hsl(0 0% 40%)',
              boxShadow: i === activeIndex 
                ? '0 0 12px hsl(35 80% 55% / 0.8), 0 0 24px hsl(35 70% 50% / 0.5)' 
                : 'none',
              transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
        {/* Extra dot for CTA */}
        <div
          className="w-2.5 h-2.5 rounded-full transition-all duration-300"
          style={{
            background: activeIndex >= images.length 
              ? 'hsl(168 70% 55%)' 
              : 'hsl(0 0% 40%)',
            boxShadow: activeIndex >= images.length 
              ? '0 0 12px hsl(168 70% 50% / 0.8)' 
              : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default MobileImageGallery;
