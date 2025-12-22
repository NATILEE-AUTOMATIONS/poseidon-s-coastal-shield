import React from 'react';
import doorwayImage from '@/assets/doorway-reveal-image.png';
import coastalCrew from '@/assets/coastal-home-crew.png';
import coastalRoofing from '@/assets/coastal-home-roofing.png';
import aerialPool from '@/assets/aerial-estate-pool.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface DoorwayImageRevealProps {
  progress: number;
  zoomProgress: number;
}

const images = [
  { src: doorwayImage, label: 'Premium Installation' },
  { src: coastalCrew, label: 'Expert Team' },
  { src: coastalRoofing, label: 'Coastal Excellence' },
  { src: aerialPool, label: 'Luxury Estates' },
];

const DoorwayImageReveal: React.FC<DoorwayImageRevealProps> = ({ progress, zoomProgress }) => {
  const isMobile = useIsMobile();
  
  // Mobile: skip fixed overlay - users scroll naturally to ProjectGallerySection below
  if (isMobile) return null;
  
  // Only show when zoom is fully complete (zoomProgress = 1 means we're through the door)
  if (zoomProgress < 0.95) return null;
  
  // Gallery animation starts after zoom completes
  const galleryProgress = Math.max(0, Math.min(1, (zoomProgress - 0.95) / 0.05));
  
  const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
  const easedProgress = easeOutQuart(galleryProgress);

  return (
    <div 
      className="fixed inset-0 z-[250] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
      style={{
        background: `linear-gradient(180deg, 
          hsl(220 25% 8%) 0%,
          hsl(220 30% 12%) 50%,
          hsl(220 25% 8%) 100%
        )`,
        opacity: easedProgress,
      }}
    >
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, hsl(168 60% 30% / 0.15) 0%, transparent 60%)`,
        }}
      />
      
      {/* Title */}
      <h2 
        className="text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12 tracking-tight"
        style={{
          opacity: easedProgress,
          transform: `translateY(${30 * (1 - easedProgress)}px)`,
          textShadow: '0 0 40px hsl(168 80% 50% / 0.3)',
        }}
      >
        Our <span className="text-teal-400">Craftsmanship</span>
      </h2>
      
      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-[85vw] md:max-w-[800px] px-4">
        {images.map((img, index) => {
          // Stagger each image
          const staggerDelay = 0.1 + index * 0.12;
          const imageReveal = Math.max(0, Math.min(1, (galleryProgress - staggerDelay) / 0.3));
          const imageEased = easeOutQuart(imageReveal);
          
          // Different entry directions for visual interest
          const xOffset = index % 2 === 0 ? -40 : 40;
          const yOffset = index < 2 ? -30 : 30;
          
          return (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg md:rounded-2xl"
              style={{
                opacity: imageEased,
                transform: `translate(${xOffset * (1 - imageEased)}px, ${yOffset * (1 - imageEased)}px) scale(${0.85 + imageEased * 0.15})`,
              }}
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-32 md:h-48 object-cover"
              />
              
              {/* Overlay gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              />
              
              {/* Label */}
              <div 
                className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4"
                style={{
                  opacity: imageEased,
                  transform: `translateY(${10 * (1 - imageEased)}px)`,
                }}
              >
                <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                  {img.label}
                </span>
              </div>
              
              {/* Subtle border glow */}
              <div 
                className="absolute inset-0 rounded-lg md:rounded-2xl pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 0 1px hsl(168 50% 50% / 0.2)',
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* CTA Button */}
      <div 
        className="mt-8 md:mt-12"
        style={{
          opacity: Math.max(0, (galleryProgress - 0.6) / 0.4),
          transform: `translateY(${20 * (1 - Math.max(0, (galleryProgress - 0.6) / 0.4))}px)`,
        }}
      >
        <button className="px-6 md:px-8 py-3 md:py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-teal-500/30 pointer-events-auto">
          View All Projects
        </button>
      </div>
    </div>
  );
};

export default DoorwayImageReveal;