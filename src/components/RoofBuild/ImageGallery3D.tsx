import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Animation starts at 88% scroll (extended range for full drive-by)
  const animStart = 0.88;
  if (progress < animStart) return null;

  // Normalize progress: 0 = start, 1 = end of animation
  const animProgress = Math.min(1, (progress - animStart) / (1 - animStart));
  
  // Position: Start center-right, drift LEFT and exit off-screen left
  // 55% → -30% (continuous leftward movement)
  const leftPercent = 55 - (animProgress * 85); // 55% → -30%
  
  // Scale: Grows as it approaches, peaks as it passes
  // 0.2 → 1.2 (grows throughout, peaks near end)
  const scale = 0.2 + (animProgress * 1.0); // 0.2 → 1.2
  
  // Vertical position: slight rise then fall as it passes
  const topPercent = 50 - (Math.sin(animProgress * Math.PI) * 15); // 50% → 35% → 50%
  
  // Opacity: Quick fade in, fade out in last 25%
  const fadeOutStart = 0.75;
  const opacity = animProgress < 0.1 
    ? animProgress * 10 // Quick fade in
    : animProgress > fadeOutStart 
      ? 1 - ((animProgress - fadeOutStart) / (1 - fadeOutStart)) // Fade out
      : 1;

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 105,
        perspective: '1200px',
        background: `radial-gradient(ellipse 80% 60% at 70% 30%, 
          hsl(25 40% 15% / ${Math.min(opacity, 0.95)}) 0%, 
          hsl(20 30% 8% / ${Math.min(opacity, 1)}) 50%,
          hsl(15 20% 5% / ${Math.min(opacity, 1)}) 100%)`,
      }}
    >
      {/* The Image - continuous drive-by from right to left */}
      <div
        className="absolute"
        style={{
          left: `${leftPercent}%`,
          top: `${topPercent}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: isMobile ? '16px' : '12px',
            boxShadow: `
              0 4px 20px hsl(0 0% 0% / 0.4),
              0 8px 40px hsl(0 0% 0% / 0.5),
              0 16px 60px hsl(0 0% 0% / 0.6)
            `,
          }}
        >
          <img
            src={coastalRoofImage}
            alt="Completed coastal roof project"
            style={{
              width: isMobile ? '80vw' : '45vw',
              maxWidth: isMobile ? 'none' : '580px',
              height: 'auto',
              maxHeight: isMobile ? '45vh' : '42vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery3D;
