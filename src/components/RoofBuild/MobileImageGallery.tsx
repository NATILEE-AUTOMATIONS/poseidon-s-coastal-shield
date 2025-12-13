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

const MobileImageGallery: React.FC<MobileImageGalleryProps> = ({ progress }) => {
  // Gallery starts at 80% (when door zoom completes), ends at 100%
  const galleryStart = 0.80;
  const galleryEnd = 1.0;
  
  // Don't render until we're close to gallery start
  if (progress < galleryStart - 0.02) return null;
  
  // Normalize progress within gallery range (0 to 1)
  const galleryProgress = Math.max(0, Math.min(1, (progress - galleryStart) / (galleryEnd - galleryStart)));
  
  // Each image gets 25% of the gallery (4 images)
  const getActiveImage = (): number => {
    if (galleryProgress < 0.25) return 0;
    if (galleryProgress < 0.50) return 1;
    if (galleryProgress < 0.75) return 2;
    return 3;
  };
  
  const activeIndex = getActiveImage();
  
  // Calculate animation progress for each image (0 to 1 within its segment)
  const getImageProgress = (index: number): number => {
    const segmentSize = 0.25;
    const segmentStart = index * segmentSize;
    const segmentEnd = segmentStart + segmentSize;
    
    if (galleryProgress < segmentStart) return 0;
    if (galleryProgress >= segmentEnd) return 1;
    return (galleryProgress - segmentStart) / segmentSize;
  };
  
  // Warm doorway background that fades as gallery progresses
  const bgWarmth = Math.max(0, 1 - galleryProgress * 0.5);
  const bgOpacity = Math.min(1, galleryProgress * 5); // Quick fade in
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center"
      style={{
        zIndex: 105,
        opacity: bgOpacity,
        background: `radial-gradient(ellipse 120% 100% at 50% 30%, 
          hsl(35 ${85 * bgWarmth}% ${70 * bgWarmth + 10}% / ${0.6 * bgWarmth}) 0%,
          hsl(30 ${75 * bgWarmth}% ${50 * bgWarmth + 8}% / ${0.4 * bgWarmth}) 30%,
          hsl(25 40% 12%) 60%,
          hsl(20 30% 6%) 100%)`,
      }}
    >
      {/* Progress dots */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className="w-2.5 h-2.5 rounded-full transition-all duration-500"
            style={{
              backgroundColor: index === activeIndex 
                ? 'hsl(35 80% 60%)' 
                : index < activeIndex 
                  ? 'hsl(168 50% 40%)' 
                  : 'hsl(0 0% 30%)',
              boxShadow: index === activeIndex 
                ? '0 0 15px hsl(35 90% 55% / 0.9), 0 0 30px hsl(35 80% 50% / 0.5)' 
                : 'none',
              transform: index === activeIndex ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </div>
      
      {/* Image container - centered emergence */}
      <div className="relative w-full h-[65vh] flex items-center justify-center">
        {images.map((image, index) => {
          const imageProgress = getImageProgress(index);
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isFuture = index > activeIndex;
          
          // EMERGE animation: scale up from center, no Y movement
          // Entry: 0-40% of segment, Hold: 40-70%, Exit: 70-100%
          
          // Scale: starts small (emerging from light), grows full, shrinks on exit
          let scale = 0.3;
          if (imageProgress <= 0.4) {
            // Entry: 0.3 → 1.0 with overshoot
            const t = imageProgress / 0.4;
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            scale = 0.3 + eased * 0.75; // peaks at 1.05
          } else if (imageProgress <= 0.7) {
            // Hold: settle to 1.0
            scale = 1.05 - (imageProgress - 0.4) * 0.167; // 1.05 → 1.0
          } else {
            // Exit: 1.0 → 0.85
            const t = (imageProgress - 0.7) / 0.3;
            scale = 1.0 - t * 0.15;
          }
          
          // Blur: starts blurry (from light), sharpens, slight blur on exit
          let blur = 15;
          if (imageProgress <= 0.3) {
            blur = 15 - (imageProgress / 0.3) * 15; // 15 → 0
          } else if (imageProgress <= 0.75) {
            blur = 0;
          } else {
            blur = ((imageProgress - 0.75) / 0.25) * 8; // 0 → 8
          }
          
          // Opacity: fade in, hold, fade out
          let opacity = 0;
          if (imageProgress <= 0.2) {
            opacity = imageProgress / 0.2; // 0 → 1
          } else if (imageProgress <= 0.8) {
            opacity = 1;
          } else {
            opacity = 1 - ((imageProgress - 0.8) / 0.2); // 1 → 0
          }
          
          // Keep last image visible
          if (index === 3 && galleryProgress >= 0.75) {
            opacity = Math.max(opacity, 0.9);
            scale = Math.max(scale, 0.95);
            blur = Math.min(blur, 2);
          }
          
          // Golden glow intensity (strongest during entry)
          const glowIntensity = imageProgress <= 0.4 
            ? 1 - (imageProgress / 0.4) 
            : 0;
          
          if (isFuture || (isPast && imageProgress >= 1)) return null;
          
          return (
            <div
              key={index}
              className="absolute flex flex-col items-center justify-center"
              style={{
                opacity,
                transform: `scale(${scale})`,
                filter: `blur(${blur}px)`,
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* Golden emergence glow behind image */}
              <div
                className="absolute inset-0 -m-8 rounded-3xl"
                style={{
                  background: `radial-gradient(circle, 
                    hsl(35 90% 65% / ${0.6 * glowIntensity}) 0%,
                    hsl(30 80% 50% / ${0.3 * glowIntensity}) 50%,
                    transparent 80%)`,
                  transform: 'scale(1.5)',
                  filter: 'blur(30px)',
                }}
              />
              
              {/* Image card */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: '16px',
                  boxShadow: `
                    0 0 ${40 + glowIntensity * 40}px hsl(35 80% 55% / ${0.2 + glowIntensity * 0.4}),
                    0 10px 40px hsl(0 0% 0% / 0.6),
                    0 20px 60px hsl(0 0% 0% / 0.4),
                    inset 0 0 0 1px hsl(35 60% 60% / ${0.1 + glowIntensity * 0.2})
                  `,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="block"
                  style={{
                    width: '88vw',
                    maxWidth: '420px',
                    height: 'auto',
                    maxHeight: '55vh',
                    objectFit: 'cover',
                  }}
                />
              </div>
              
              {/* Caption */}
              <div 
                className="mt-5 text-center"
                style={{
                  opacity: isActive && imageProgress > 0.3 && imageProgress < 0.85 ? 1 : 0,
                  transform: `translateY(${isActive && imageProgress > 0.3 ? 0 : 15}px)`,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <span 
                  className="text-sm font-medium tracking-widest uppercase"
                  style={{
                    color: 'hsl(35 75% 65%)',
                    textShadow: '0 0 25px hsl(35 90% 55% / 0.7), 0 2px 10px hsl(0 0% 0% / 0.5)',
                    letterSpacing: '0.2em',
                  }}
                >
                  {image.caption}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Testimonial at bottom */}
      <TestimonialReveal progress={progress} />
    </div>
  );
};

export default MobileImageGallery;
