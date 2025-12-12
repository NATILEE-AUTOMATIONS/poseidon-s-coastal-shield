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
  
  // === HIGHWAY BILLBOARD EFFECT ===
  // You're driving forward, billboard is stationary on your RIGHT
  // It sweeps across your vision from RIGHT → CENTER → LEFT
  
  // TranslateX: Enters from RIGHT (+50vw), sweeps to LEFT (-60vw)
  const translateXvw = 50 - (animProgress * 110);
  
  // Scale: Grows as it approaches, peaks at ~45% progress, shrinks as it recedes
  const distanceFromPeak = Math.abs(animProgress - 0.45);
  const scaleBase = isMobile ? 0.55 : 0.6;
  const scaleBoost = isMobile ? 0.35 : 0.4;
  const scale = scaleBase + Math.max(0, (1 - distanceFromPeak * 2.2)) * scaleBoost;
  
  // RotateY: Angled toward you (-25°) → flat (0°) → angled away (+25°)
  const rotateY = -25 + (animProgress * 50);
  
  // Opacity: Quick fade in (first 10%), fade out last 15%
  const opacity = animProgress < 0.10 
    ? animProgress * 10 
    : animProgress > 0.85 
      ? (1 - animProgress) / 0.15 
      : 1;
  
  // Background opacity
  const bgOpacity = opacity;
  
  // Shine effect: peaks when billboard is closest (35-55% progress)
  const shineProgress = animProgress > 0.35 && animProgress < 0.55 
    ? 1 - Math.abs(animProgress - 0.45) * 10 
    : 0;

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 105,
        perspective: '1200px',
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
            hsl(32 70% 45% / ${0.12 * bgOpacity}) 0%, 
            transparent 70%)`,
        }}
      />

      {/* The Billboard Image */}
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
          backfaceVisibility: 'hidden',
          zIndex: 5,
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: isMobile ? '16px' : '12px',
            boxShadow: `
              0 4px 20px hsl(0 0% 0% / 0.4),
              0 8px 40px hsl(0 0% 0% / 0.5),
              0 16px 60px hsl(0 0% 0% / 0.6),
              0 32px 100px hsl(0 0% 0% / 0.7),
              0 0 50px hsl(168 70% 45% / ${0.3 * shineProgress}),
              inset 0 1px 0 hsl(40 60% 80% / 0.1)
            `,
            border: `2px solid hsl(168 70% 45% / ${0.4 * shineProgress})`,
          }}
        >
          <img
            src={coastalRoofImage}
            alt="Completed coastal roof project"
            style={{
              width: isMobile ? '70vw' : '45vw',
              maxWidth: isMobile ? 'none' : '550px',
              height: 'auto',
              maxHeight: isMobile ? '45vh' : '40vh',
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
                hsl(45 90% 95% / ${0.15 * shineProgress}) 40%,
                hsl(45 90% 95% / ${0.25 * shineProgress}) 50%,
                hsl(45 90% 95% / ${0.15 * shineProgress}) 60%,
                transparent 80%
              )`,
              transform: `translateX(${-100 + (shineProgress * 200)}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery3D;
