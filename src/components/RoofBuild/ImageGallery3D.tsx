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
  
  // Simple fade in from zero
  const opacity = Math.min(1, animProgress * 3); // Quick fade in over first 33%

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{
        zIndex: 105,
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, 
          hsl(25 40% 15% / ${opacity * 0.95}) 0%, 
          hsl(20 30% 8% / ${opacity}) 50%,
          hsl(15 20% 5% / ${opacity}) 100%)`,
      }}
    >
      {/* The Image */}
      <div
        style={{
          opacity,
          transition: 'opacity 0.1s ease-out',
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
              width: isMobile ? '85vw' : '50vw',
              maxWidth: isMobile ? 'none' : '600px',
              height: 'auto',
              maxHeight: isMobile ? '50vh' : '45vh',
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
