import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Animation from center to upper-right, stays visible at end
  const animStart = 0.93;
  if (progress < animStart) return null;

  const animProgress = Math.min(1, (progress - animStart) / (1 - animStart));
  
  // Trajectory: center → upper-right (stays on screen)
  const leftPercent = 55 + (animProgress * 30);  // 55% → 85%
  const topPercent = 50 - (animProgress * 25);   // 50% → 25%
  
  // Scale: grows to full size by 40% of animation, then stays
  const scaleProgress = Math.min(1, animProgress * 2.5);
  const scale = 0.2 + (scaleProgress * 0.8); // 0.2 → 1.0
  
  // Opacity: fade in quickly, stay visible
  const opacity = Math.min(1, animProgress * 5);

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
      {/* The Image - continuous animation from center to off-screen upper-right */}
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
