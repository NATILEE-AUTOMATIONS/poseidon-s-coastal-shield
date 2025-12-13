import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import multilevelRoofTeam from '@/assets/multilevel-roof-team.png';
import TestimonialReveal from './TestimonialReveal';

interface MobileImageGalleryProps {
  progress: number;
}

const images = [
  { src: coastalRoofImage, alt: 'Completed coastal roof project', caption: 'Coastal NC Estate' },
  { src: coastalRoofInProgress, alt: 'Coastal roof in progress', caption: 'Project in Progress' },
  { src: aerialEstatePool, alt: 'Aerial view of estate with pool', caption: 'Aerial View' },
  { src: multilevelRoofTeam, alt: 'Multilevel coastal home with roofing crew', caption: 'Our Team at Work' },
];

// Smooth spring-like easing
const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const MobileImageGallery: React.FC<MobileImageGalleryProps> = ({ progress }) => {
  // Gallery starts at 75% scroll, ends at 100%
  const galleryStart = 0.75;
  const galleryEnd = 1.0;
  
  // Don't render until gallery starts
  if (progress < galleryStart - 0.02) return null;
  
  // Normalize progress within gallery range (0 to 1)
  const galleryProgress = Math.max(0, Math.min(1, (progress - galleryStart) / (galleryEnd - galleryStart)));
  
  // Each image gets 25% of the gallery progress (4 images)
  const getActiveImage = (): number => {
    if (galleryProgress < 0.25) return 0;
    if (galleryProgress < 0.50) return 1;
    if (galleryProgress < 0.75) return 2;
    return 3;
  };
  
  const activeIndex = getActiveImage();
  
  // Calculate transition progress for current image (0 to 1 within its segment)
  const getImageProgress = (index: number): number => {
    const segmentSize = 0.25;
    const segmentStart = index * segmentSize;
    const segmentEnd = segmentStart + segmentSize;
    
    if (galleryProgress < segmentStart) return 0;
    if (galleryProgress >= segmentEnd) return 1;
    return (galleryProgress - segmentStart) / segmentSize;
  };
  
  // Background fade in
  const bgOpacity = Math.min(1, galleryProgress * 4); // Fully visible by 25%
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center"
      style={{
        zIndex: 105,
        opacity: bgOpacity,
        background: `radial-gradient(ellipse 100% 80% at 50% 40%, 
          hsl(25 40% 12%) 0%, 
          hsl(20 30% 6%) 60%,
          hsl(15 25% 4%) 100%)`,
      }}
    >
      {/* Progress dots */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: index === activeIndex 
                ? 'hsl(168 80% 55%)' 
                : 'hsl(168 30% 25%)',
              boxShadow: index === activeIndex 
                ? '0 0 12px hsl(168 80% 55% / 0.8), 0 0 24px hsl(168 80% 55% / 0.4)' 
                : 'none',
              transform: index === activeIndex ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>
      
      {/* Image container */}
      <div className="relative w-full h-[60vh] flex items-center justify-center px-6">
        {images.map((image, index) => {
          const imageProgress = getImageProgress(index);
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isFuture = index > activeIndex;
          
          // Entry animation (0 to 0.3 of segment)
          const entryProgress = Math.min(1, imageProgress / 0.3);
          const easedEntry = easeOutBack(entryProgress);
          
          // Exit animation (0.7 to 1.0 of segment)
          const exitProgress = imageProgress > 0.7 
            ? (imageProgress - 0.7) / 0.3 
            : 0;
          
          // Scale: starts small, grows to full, shrinks slightly on exit
          let scale = 0.6;
          if (isActive || isPast) {
            if (imageProgress <= 0.3) {
              scale = 0.6 + (easedEntry * 0.4); // 0.6 → 1.0
            } else if (imageProgress > 0.7) {
              scale = 1.0 - (exitProgress * 0.15); // 1.0 → 0.85
            } else {
              scale = 1.0;
            }
          }
          
          // Y position: slides up from below, then slides up and out
          let translateY = 100;
          if (isActive || isPast) {
            if (imageProgress <= 0.3) {
              translateY = 100 - (easedEntry * 100); // 100 → 0
            } else if (imageProgress > 0.7) {
              translateY = -(exitProgress * 60); // 0 → -60
            } else {
              translateY = 0;
            }
          }
          
          // Opacity
          let opacity = 0;
          if (isPast && imageProgress >= 1) {
            opacity = 0;
          } else if (isActive || isPast) {
            if (imageProgress <= 0.15) {
              opacity = imageProgress / 0.15;
            } else if (imageProgress > 0.75) {
              opacity = 1 - ((imageProgress - 0.75) / 0.25);
            } else {
              opacity = 1;
            }
          }
          
          // Keep last image visible
          if (index === 3 && galleryProgress >= 0.75) {
            opacity = 1;
            scale = 1.0;
            translateY = 0;
          }
          
          if (isFuture || opacity <= 0) return null;
          
          return (
            <div
              key={index}
              className="absolute w-full flex flex-col items-center"
              style={{
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                transition: 'none', // Scroll-driven, no CSS transition
                willChange: 'transform, opacity',
              }}
            >
              {/* Image card */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: '20px',
                  boxShadow: `
                    0 0 30px hsl(168 60% 40% / 0.2),
                    0 8px 32px hsl(0 0% 0% / 0.5),
                    0 16px 64px hsl(0 0% 0% / 0.4),
                    inset 0 0 0 1px hsl(168 50% 50% / 0.15)
                  `,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="block"
                  style={{
                    width: '85vw',
                    maxWidth: '400px',
                    height: 'auto',
                    maxHeight: '50vh',
                    objectFit: 'cover',
                  }}
                />
              </div>
              
              {/* Caption */}
              <div 
                className="mt-4 text-center"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `translateY(${isActive ? 0 : 10}px)`,
                  transition: 'all 0.3s ease-out',
                }}
              >
                <span 
                  className="text-sm font-medium tracking-wider uppercase"
                  style={{
                    color: 'hsl(35 70% 65%)',
                    textShadow: '0 0 20px hsl(35 80% 50% / 0.5)',
                  }}
                >
                  {image.caption}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Testimonial */}
      <TestimonialReveal progress={progress} />
    </div>
  );
};

export default MobileImageGallery;
