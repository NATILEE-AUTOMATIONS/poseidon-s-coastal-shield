import React from 'react';
import doorwayImage from '@/assets/doorway-reveal-image.png';
import coastalCrew from '@/assets/coastal-home-crew.png';
import coastalRoofing from '@/assets/coastal-home-roofing.png';
import aerialPool from '@/assets/aerial-estate-pool.png';

interface DoorwayImageRevealProps {
  progress: number; // Raw scroll progress 0-1
}

const images = [doorwayImage, coastalCrew, coastalRoofing, aerialPool];

const DoorwayImageReveal: React.FC<DoorwayImageRevealProps> = ({ progress }) => {
  // Show when progress reaches 92% - this is AFTER the door zoom completes
  const showThreshold = 0.92;
  
  if (progress < showThreshold) return null;
  
  // Animation from 0.92 to 0.97
  const revealProgress = Math.max(0, Math.min(1, (progress - showThreshold) / 0.05));
  
  // Smooth easing
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  const easedProgress = easeOutCubic(revealProgress);

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center pointer-events-none"
      style={{
        background: `radial-gradient(
          ellipse at center 35%,
          hsl(40 90% 70%) 0%,
          hsl(32 80% 45%) 40%,
          hsl(25 50% 10%) 100%
        )`,
        opacity: easedProgress,
      }}
    >
      {/* Grid of images */}
      <div className="grid grid-cols-2 gap-4 max-w-[80vw] md:max-w-[700px] p-4">
        {images.map((img, index) => {
          // Stagger each image's appearance
          const staggerDelay = index * 0.15;
          const imageReveal = Math.max(0, Math.min(1, (revealProgress - staggerDelay) / 0.4));
          const imageEased = easeOutCubic(imageReveal);
          
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl"
              style={{
                opacity: imageEased,
                transform: `translateY(${40 * (1 - imageEased)}px) scale(${0.9 + imageEased * 0.1})`,
              }}
            >
              <img
                src={img}
                alt={`Roofing project ${index + 1}`}
                className="w-full h-auto object-cover"
                style={{
                  boxShadow: '0 0 40px 10px hsla(32, 80%, 50%, 0.3), 0 15px 30px -8px rgba(0, 0, 0, 0.4)',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoorwayImageReveal;