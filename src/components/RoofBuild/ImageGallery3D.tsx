import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Animation starts at 93% scroll (after door zoom completes)
  const animStart = 0.85;
  if (progress < animStart) return null;

  // Normalize progress: 0 = start, 1 = end of animation (now has more room)
  const animProgress = Math.min(1, (progress - animStart) / (1 - animStart));
  
  // Start small, grow to viewable size, then continue off screen
  const scale = animProgress < 0.5 
    ? 0.2 + (animProgress * 2 * 0.8) // 0.2 → 1.0 in first half
    : 1.0; // Stay at full size in second half
  
  const opacity = animProgress < 0.1 
    ? animProgress * 10 // Quick fade in
    : animProgress > 0.85 
      ? Math.max(0, 1 - ((animProgress - 0.85) / 0.15)) // Fade out at end
      : 1;
  
  // Position: Start at CENTER, move to UPPER RIGHT, then continue OFF SCREEN
  // First half (0-50%): center to upper right
  // Second half (50-100%): upper right to off screen right
  const leftPercent = animProgress < 0.5
    ? 55 + (animProgress * 2 * 30) // 55% → 85% in first half
    : 85 + ((animProgress - 0.5) * 2 * 40); // 85% → 125% in second half (off screen)
  const topPercent = animProgress < 0.5
    ? 50 - (animProgress * 2 * 25) // 50% → 25% in first half
    : 25 - ((animProgress - 0.5) * 2 * 15); // 25% → 10% continue up slightly

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 105,
        background: `radial-gradient(ellipse 80% 60% at 70% 30%, 
          hsl(25 40% 15% / ${opacity * 0.95}) 0%, 
          hsl(20 30% 8% / ${opacity}) 50%,
          hsl(15 20% 5% / ${opacity}) 100%)`,
      }}
    >
      {/* The Image - animates from center to upper right */}
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
