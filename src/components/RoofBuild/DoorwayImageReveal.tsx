import React from 'react';
import doorwayImage from '@/assets/doorway-reveal-image.png';

interface DoorwayImageRevealProps {
  progress: number; // Main scroll progress 0-1
}

const DoorwayImageReveal: React.FC<DoorwayImageRevealProps> = ({ progress }) => {
  // Show after 85% scroll progress
  const showThreshold = 0.85;
  
  if (progress < showThreshold) return null;
  
  // Animation progress from 0.85 to 0.95
  const imageProgress = Math.max(0, Math.min(1, (progress - showThreshold) / 0.10));
  
  // Smooth easing function
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  const easedProgress = easeOutCubic(imageProgress);

  // Animation values
  const opacity = easedProgress;
  const scale = 0.85 + (easedProgress * 0.15);
  const translateY = 80 * (1 - easedProgress);

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
      style={{
        background: `radial-gradient(
          ellipse at center 35%,
          hsl(40 90% 70%) 0%,
          hsl(32 80% 45%) 40%,
          hsl(25 50% 10%) 100%
        )`,
        opacity: Math.min(1, (progress - showThreshold) / 0.05),
      }}
    >
      <div
        className="relative max-w-[70vw] md:max-w-[550px]"
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        <img
          src={doorwayImage}
          alt="Premium roofing project"
          className="w-full h-auto rounded-xl"
          style={{
            boxShadow: '0 0 60px 20px hsla(32, 80%, 50%, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        />
      </div>
    </div>
  );
};

export default DoorwayImageReveal;