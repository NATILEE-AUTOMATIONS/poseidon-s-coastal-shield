import React from 'react';
import doorwayImage from '@/assets/doorway-reveal-image.png';

interface DoorwayImageRevealProps {
  zoomProgress: number;
}

const DoorwayImageReveal: React.FC<DoorwayImageRevealProps> = ({ zoomProgress }) => {
  // Image starts appearing at zoomProgress 0.85
  const imageProgress = Math.max(0, Math.min(1, (zoomProgress - 0.85) / 0.15));
  
  // Smooth easing function
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  const easedProgress = easeOutCubic(imageProgress);

  // Animation values
  const opacity = easedProgress;
  const scale = 0.85 + (easedProgress * 0.15); // 0.85 → 1.0
  const translateY = 80 * (1 - easedProgress); // 80px → 0px

  if (zoomProgress < 0.8) return null;

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center"
      style={{
        background: `radial-gradient(
          ellipse at center 35%,
          hsl(40 90% 70%) 0%,
          hsl(32 80% 45%) 40%,
          hsl(25 50% 10%) 100%
        )`,
        opacity: Math.min(1, (zoomProgress - 0.8) / 0.1), // Fade in the background first
      }}
    >
      <div
        className="relative max-w-[70vw] md:max-w-[550px]"
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          transition: 'none',
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
