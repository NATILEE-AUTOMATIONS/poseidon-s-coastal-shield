import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import inProgressImage from '@/assets/coastal-roof-inprogress.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  const galleryStart = 0.92;
  
  if (progress < galleryStart - 0.01) return null;

  // Easing functions
  const easeInOutQuad = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  // === SINGLE CONTINUOUS MOTION: APPEAR → SHINE → FLY PAST ===
  // Image 1: 92% → 100% (full 8% scroll range)
  const img1Start = 0.92;
  const img1End = 1.0;
  const img1Raw = progress > img1Start 
    ? Math.min(1, (progress - img1Start) / (img1End - img1Start))
    : 0;

  // Image 2: 93% → 100% (slightly delayed start)
  const img2Start = 0.93;
  const img2End = 1.0;
  const img2Raw = progress > img2Start 
    ? Math.min(1, (progress - img2Start) / (img2End - img2Start))
    : 0;

  // Gallery background opacity - fades in then out
  const bgOpacity = img1Raw < 0.5 
    ? Math.min(1, img1Raw * 3) 
    : Math.max(0, 1 - (img1Raw - 0.5) * 2);

  // === SCALE ===
  const img1ScaleProgress = easeInOutQuad(img1Raw);
  const img2ScaleProgress = easeInOutQuad(img2Raw);

  // Mobile: gentle scale 0.7 → 1.0 | Desktop: dramatic 0.5 → 1.5
  const img1Scale = isMobile 
    ? 0.7 + (img1ScaleProgress * 0.3) 
    : 0.5 + (img1ScaleProgress * 1.0);
  const img2Scale = isMobile 
    ? 0.65 + (img2ScaleProgress * 0.35) 
    : 0.45 + (img2ScaleProgress * 0.95);

  // === POSITION ===
  // Mobile: slide up from bottom, stay centered
  // Desktop: fly to corners
  const img1Top = isMobile 
    ? 80 - (img1Raw * 65) // 80% → 15% (slides up)
    : 40 - (img1Raw * 60);
  const img1Right = isMobile ? undefined : 30 - (img1Raw * 80);
  
  const img2Top = isMobile 
    ? 90 - (img2Raw * 35) // 90% → 55% (slides up, below img1)
    : undefined;
  const img2Left = isMobile ? undefined : 30 - (img2Raw * 70);
  const img2Bottom = isMobile ? undefined : 35 - (img2Raw * 55);

  // === OPACITY: Quick fade-in only, stay fully visible ===
  const img1Opacity = img1Raw < 0.15 
    ? img1Raw / 0.15 
    : 1.0;

  const img2Opacity = img2Raw < 0.15 
    ? img2Raw / 0.15 
    : 1.0;

  // === ROTATION: Desktop only ===
  const img1RotateY = isMobile ? 0 : -15 + (img1Raw * 25);
  const img2RotateY = isMobile ? 0 : 15 - (img2Raw * 22);

  // === SHINE: Happens during first half (while approaching) ===
  const img1ShineProgress = Math.min(1, img1Raw * 2);
  const img2ShineProgress = Math.min(1, img2Raw * 2);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 105,
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, 
          hsl(25 40% 15% / ${bgOpacity * 0.95}) 0%, 
          hsl(20 30% 8% / ${bgOpacity}) 50%,
          hsl(15 20% 5% / ${bgOpacity}) 100%)`,
      }}
    >
      {/* Warm ambient glow in center */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, 
            hsl(32 70% 45% / ${0.15 * bgOpacity}) 0%, 
            transparent 70%)`,
        }}
      />

      {/* Image 1 - Mobile: centered, slides up | Desktop: flies to top-right */}
      {img1Raw > 0 && img1Opacity > 0 && (
        <div
          className="absolute"
          style={{
            top: `${img1Top}%`,
            ...(isMobile 
              ? { left: '50%', transform: `translateX(-50%) scale(${img1Scale})` }
              : { right: `${img1Right}%`, transform: `scale(${img1Scale}) rotateY(${img1RotateY}deg)` }
            ),
            opacity: img1Opacity,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            zIndex: 2,
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: isMobile ? '24px' : '20px',
              boxShadow: `
                0 4px 20px hsl(0 0% 0% / 0.4),
                0 8px 40px hsl(0 0% 0% / 0.5),
                0 16px 60px hsl(0 0% 0% / 0.6),
                0 32px 100px hsl(0 0% 0% / 0.7),
                0 0 60px hsl(32 80% 50% / ${0.35 * img1ShineProgress}),
                inset 0 1px 0 hsl(40 60% 80% / 0.1)
              `,
              border: `2px solid hsl(168 70% 45% / ${0.5 * img1ShineProgress})`,
            }}
          >
            <img
              src={coastalRoofImage}
              alt="Completed coastal roof project"
              style={{
                width: isMobile ? '85vw' : '55vw',
                maxWidth: isMobile ? 'none' : '700px',
                height: 'auto',
                maxHeight: isMobile ? '40vh' : '50vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Shine sweep effect - happens during first half */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(
                  110deg,
                  transparent 20%,
                  hsl(45 90% 95% / ${0.2 * img1ShineProgress}) 40%,
                  hsl(45 90% 95% / ${0.35 * img1ShineProgress}) 50%,
                  hsl(45 90% 95% / ${0.2 * img1ShineProgress}) 60%,
                  transparent 80%
                )`,
                transform: `translateX(${-120 + (img1ShineProgress * 240)}%)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Image 2 - Mobile: centered, slides up below img1 | Desktop: flies to bottom-left */}
      {img2Raw > 0 && img2Opacity > 0 && (
        <div
          className="absolute"
          style={{
            ...(isMobile 
              ? { top: `${img2Top}%`, left: '50%', transform: `translateX(-50%) scale(${img2Scale})` }
              : { bottom: `${img2Bottom}%`, left: `${img2Left}%`, transform: `scale(${img2Scale}) rotateY(${img2RotateY}deg)` }
            ),
            opacity: img2Opacity,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            zIndex: 1,
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: isMobile ? '20px' : '16px',
              boxShadow: `
                0 4px 16px hsl(0 0% 0% / 0.35),
                0 8px 32px hsl(0 0% 0% / 0.45),
                0 16px 50px hsl(0 0% 0% / 0.55),
                0 24px 80px hsl(0 0% 0% / 0.65),
                0 0 50px hsl(168 70% 45% / ${0.3 * img2ShineProgress}),
                inset 0 1px 0 hsl(40 60% 80% / 0.08)
              `,
              border: `2px solid hsl(32 70% 50% / ${0.45 * img2ShineProgress})`,
            }}
          >
            <img
              src={inProgressImage}
              alt="Roof installation in progress"
              style={{
                width: isMobile ? '80vw' : '45vw',
                maxWidth: isMobile ? 'none' : '550px',
                height: 'auto',
                maxHeight: isMobile ? '35vh' : '42vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Shine sweep effect - happens during first half */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(
                  110deg,
                  transparent 20%,
                  hsl(45 90% 95% / ${0.15 * img2ShineProgress}) 40%,
                  hsl(45 90% 95% / ${0.25 * img2ShineProgress}) 50%,
                  hsl(45 90% 95% / ${0.15 * img2ShineProgress}) 60%,
                  transparent 80%
                )`,
                transform: `translateX(${-120 + (img2ShineProgress * 240)}%)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery3D;
