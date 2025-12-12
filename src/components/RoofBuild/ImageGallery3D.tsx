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
  
  // --- PHASE 1: Approaching (image flies toward you from the void) ---
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
    
    // Scale: starts tiny (0.15), grows to full size (1.0)
    scale = 0.15 + easedApproach * 0.85;
    
    // Z translation: starts very far (-800), comes to 0 (at eye level)
    translateZ = -800 + easedApproach * 800;
    
    // X/Y: stays perfectly centered throughout approach
    translateX = 0;
    translateY = 0;
    
    // Rotation: no rotation during approach, straight on
    rotateY = 0;
    
    // Opacity: quick fade in
    opacity = Math.min(1, approachProgress * 2.5);
    
    // Blur: starts blurry (distant), sharpens as it arrives
    blur = (1 - easedApproach) * 12;
    
  } else {
    // --- PHASE 2: Walking past (you continue forward, image recedes behind you) ---
    const passProgress = (animProgress - approachEnd) / (1 - approachEnd);
    const easedPass = easeInQuad(passProgress);
    
    // Scale: shrinks as it recedes into distance behind you
    scale = 1.0 - easedPass * 0.6;
    
    // Z: moves behind you (negative = receding into distance)
    translateZ = -easedPass * 600;
    
    // X: subtle drift to one side as you walk past (perspective effect)
    translateX = isMobile ? -easedPass * 80 : -easedPass * 120;
    
    // Y: slight upward drift (looking back over shoulder effect)
    translateY = -easedPass * 30;
    
    // Rotation: angled view as you pass by it
    rotateY = easedPass * 25;
    
    // Opacity: stays visible then fades as it's fully behind you
    opacity = 1 - easedPass * 0.9;
    
    // Blur: slight blur as it recedes
    blur = easedPass * 6;
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
