import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Animation starts at 93% scroll
  const animStart = 0.93;
  if (progress < animStart) return null;

  // Normalize progress: 0 = start, 1 = end of animation
  const animProgress = Math.min(1, (progress - animStart) / (1 - animStart));
  
  // --- LUMA-STYLE LATERAL GALLERY WALK ---
  // Image sweeps from left edge → center → right edge (like walking past a painting)
  
  // TranslateX: sweeps from far left (-60vw) → center (0) → far right (+80vw)
  const translateXvw = -60 + (animProgress * 140);
  
  // Scale: peaks at center (50% progress), smaller at edges
  // Creates perspective effect - bigger when "closer" to you
  const distanceFromCenter = Math.abs(animProgress - 0.5) * 2; // 0 at center, 1 at edges
  const scalePeak = 1 - distanceFromCenter;
  const scale = isMobile 
    ? 0.6 + scalePeak * 0.5  // Mobile: 0.6 → 1.1 → 0.6
    : 0.5 + scalePeak * 0.6; // Desktop: 0.5 → 1.1 → 0.5
  
  // RotateY: angled toward you as it approaches, angled away as it passes
  const rotateY = -15 + (animProgress * 35); // -15° → +20°
  
  // Opacity: fade in first 20%, full visibility middle, fade out last 20%
  const opacity = animProgress < 0.2 
    ? animProgress * 5 
    : animProgress > 0.8 
      ? (1 - animProgress) * 5 
      : 1;
  
  // Background opacity (matches image visibility)
  const bgOpacity = opacity;
  
  // Shine effect: peaks when image is closest (40-60% progress)
  const shineProgress = animProgress > 0.4 && animProgress < 0.6 
    ? 1 - Math.abs(animProgress - 0.5) * 10 
    : 0;

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 105,
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, 
          hsl(25 40% 15% / ${bgOpacity * 0.95}) 0%, 
          hsl(20 30% 8% / ${bgOpacity}) 50%,
          hsl(15 20% 5% / ${bgOpacity}) 100%)`,
      }}
    >
      {/* Warm ambient glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, 
            hsl(32 70% 45% / ${0.15 * bgOpacity}) 0%, 
            transparent 70%)`,
        }}
      />

      {/* The Image */}
      <div
        className="absolute top-1/2"
        style={{
          left: '50%',
          transform: `
            translateX(calc(-50% + ${translateXvw}vw)) 
            translateY(-50%) 
            scale(${scale}) 
            rotateY(${rotateY}deg)
          `,
          opacity,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
          zIndex: 5,
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: isMobile ? '20px' : '16px',
            boxShadow: `
              0 4px 20px hsl(0 0% 0% / 0.4),
              0 8px 40px hsl(0 0% 0% / 0.5),
              0 16px 60px hsl(0 0% 0% / 0.6),
              0 32px 100px hsl(0 0% 0% / 0.7),
              0 0 60px hsl(168 70% 45% / ${0.35 * shineProgress}),
              inset 0 1px 0 hsl(40 60% 80% / 0.1)
            `,
            border: `2px solid hsl(168 70% 45% / ${0.5 * shineProgress})`,
          }}
        >
          <img
            src={coastalRoofImage}
            alt="Completed coastal roof project"
            style={{
              width: isMobile ? '85vw' : '55vw',
              maxWidth: isMobile ? 'none' : '700px',
              height: 'auto',
              maxHeight: isMobile ? '45vh' : '50vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {/* Shine sweep effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                110deg,
                transparent 20%,
                hsl(45 90% 95% / ${0.18 * shineProgress}) 40%,
                hsl(45 90% 95% / ${0.3 * shineProgress}) 50%,
                hsl(45 90% 95% / ${0.18 * shineProgress}) 60%,
                transparent 80%
              )`,
              transform: `translateX(${-120 + (shineProgress * 240)}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery3D;
