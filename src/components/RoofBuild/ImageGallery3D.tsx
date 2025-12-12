import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Animation starts at 93% scroll (after door zoom completes)
  const animStart = 0.93;
  if (progress < animStart) return null;

  // Normalize progress: 0 = start, 1 = end of animation
  const animProgress = Math.min(1, (progress - animStart) / (1 - animStart));
  
  // Start small, grow to viewable size
  const scale = 0.2 + (animProgress * 0.8); // 0.2 → 1.0
  const opacity = Math.min(1, animProgress * 5); // Quick fade in
  
  // Slight drift from further right to final position
  const translateX = 15 - (animProgress * 15); // starts 15% right, ends at 0
  const translateY = -10 + (animProgress * 10); // starts 10% up, ends at 0

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
      {/* The Image - positioned in upper right */}
      <div
        className="absolute"
        style={{
          top: '25%',
          right: '8%',
          transform: `
            translate(${translateX}%, ${translateY}%)
            scale(${scale})
          `,
          transformOrigin: 'top right',
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
