import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Single continuous animation from center to off-screen upper-right
  // Starts at 93%, image fully exits by 100%
  const animStart = 0.93;
  if (progress < animStart) return null;

  // Normalize progress: 0 = start, 1 = completely off-screen
  const animProgress = Math.min(1, (progress - animStart) / (1 - animStart));
  
  // Continuous trajectory: center → upper-right → off-screen
  // Start: 55% left, 50% top (center-ish)
  // End: 130% left, -5% top (off-screen upper-right)
  const leftPercent = 55 + (animProgress * 75);  // 55% → 130%
  const topPercent = 50 - (animProgress * 55);   // 50% → -5%
  
  // Scale: grows to full size by 40% of animation, then stays
  const scaleProgress = Math.min(1, animProgress * 2.5); // Reaches 1.0 at 40% 
  const scale = 0.2 + (scaleProgress * 0.8); // 0.2 → 1.0
  
  // Opacity: fade in quickly at start, fade out in last 20%
  const fadeIn = Math.min(1, animProgress * 5); // Fully visible by 20%
  const fadeOut = animProgress > 0.8 ? 1 - ((animProgress - 0.8) / 0.2) : 1;
  const opacity = fadeIn * fadeOut;

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
