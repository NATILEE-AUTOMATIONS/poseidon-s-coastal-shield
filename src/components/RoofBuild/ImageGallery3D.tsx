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
  
  // Two phases:
  // Phase 1 (0 - 0.6): Image approaches from distance
  // Phase 2 (0.6 - 1.0): User walks past image
  const approachEnd = 0.6;
  const isApproaching = animProgress <= approachEnd;
  
  // Easing functions
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  const easeInQuad = (x: number) => x * x;
  
  // --- PHASE 1: Approaching (image comes toward you) ---
  let scale: number;
  let translateZ: number;
  let translateX: number;
  let translateY: number;
  let rotateY: number;
  let opacity: number;
  let blur: number;
  
  if (isApproaching) {
    // Normalize within approach phase
    const approachProgress = animProgress / approachEnd;
    const easedApproach = easeOutCubic(approachProgress);
    
    // Scale: starts tiny (0.2), grows to full size (1.0)
    scale = 0.2 + easedApproach * 0.8;
    
    // Z translation: starts far (-500), comes to 0
    translateZ = -500 + easedApproach * 500;
    
    // X/Y: starts slightly offset, centers
    translateX = (1 - easedApproach) * (isMobile ? 0 : 50);
    translateY = (1 - easedApproach) * -30;
    
    // Rotation: slight wobble as it approaches
    rotateY = (1 - easedApproach) * -8;
    
    // Opacity: fade in quickly
    opacity = Math.min(1, approachProgress * 3);
    
    // Blur: starts blurry, sharpens
    blur = (1 - easedApproach) * 8;
    
  } else {
    // --- PHASE 2: Walking past (image slides to side and recedes) ---
    const passProgress = (animProgress - approachEnd) / (1 - approachEnd);
    const easedPass = easeInQuad(passProgress);
    
    // Scale: shrinks slightly as we pass
    scale = 1.0 - easedPass * 0.3;
    
    // Z: moves behind us
    translateZ = easedPass * -200;
    
    // X: slides dramatically to the left (we're walking past on the right)
    translateX = isMobile ? -easedPass * 120 : -easedPass * 200;
    
    // Y: drops slightly as we pass
    translateY = easedPass * 50;
    
    // Rotation: rotates as we pass (like looking back at it)
    rotateY = easedPass * 35;
    
    // Opacity: stays visible then fades at the very end
    opacity = passProgress < 0.7 ? 1 : 1 - (passProgress - 0.7) / 0.3;
    
    // Blur: slight blur as it recedes
    blur = easedPass * 4;
  }
  
  // Background opacity
  const bgOpacity = Math.min(1, animProgress * 2.5);
  
  // Shine effect during approach
  const shineProgress = isApproaching ? Math.min(1, animProgress / approachEnd * 1.5) : 1;

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
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `
            translateX(calc(-50% + ${translateX}px)) 
            translateY(calc(-50% + ${translateY}px)) 
            translateZ(${translateZ}px) 
            scale(${scale}) 
            rotateY(${rotateY}deg)
          `,
          opacity,
          filter: `blur(${blur}px)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter',
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
