import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Phase 1: Entry animation (93% → 96.5%)
  // Phase 2: Exit animation (96.5% → 100%)
  const animStart = 0.93;
  const animMidpoint = 0.965;
  const animEnd = 1.0;
  
  if (progress < animStart) return null;

  // Easing functions
  const easeInQuad = (x: number) => x * x;
  
  let leftPercent: number;
  let topPercent: number;
  let scale: number;
  let opacity: number;

  if (progress < animMidpoint) {
    // Phase 1: Entry - center to upper-right
    const entryProgress = (progress - animStart) / (animMidpoint - animStart);
    leftPercent = 55 + (entryProgress * 30); // 55% → 85%
    topPercent = 50 - (entryProgress * 25);   // 50% → 25%
    scale = 0.2 + (entryProgress * 0.8);       // 0.2 → 1.0
    opacity = Math.min(1, entryProgress * 3);  // Quick fade in
  } else {
    // Phase 2: Exit - continue right and off-screen
    const exitProgress = (progress - animMidpoint) / (animEnd - animMidpoint);
    const easedExit = easeInQuad(exitProgress); // Accelerate as it exits
    
    leftPercent = 85 + (easedExit * 40);        // 85% → 125% (off-screen right)
    topPercent = 25 - (easedExit * 12);         // 25% → 13% (continue up slightly)
    scale = 1.0 - (easedExit * 0.15);           // 1.0 → 0.85 (subtle shrink)
    opacity = 1 - easeInQuad(exitProgress);     // Fade out near end
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 105,
        background: `radial-gradient(ellipse 80% 60% at 70% 30%, 
          hsl(25 40% 15% / ${Math.min(opacity, 1) * 0.95}) 0%, 
          hsl(20 30% 8% / ${Math.min(opacity, 1)}) 50%,
          hsl(15 20% 5% / ${Math.min(opacity, 1)}) 100%)`,
      }}
    >
      {/* The Image - animates from center to upper right, then exits off-screen */}
      <div
        className="absolute"
        style={{
          left: `${leftPercent}%`,
          top: `${topPercent}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
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
