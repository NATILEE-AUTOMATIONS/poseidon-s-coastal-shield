import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import inProgressImage from '@/assets/coastal-roof-inprogress.png';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  // Gallery appears as user "enters" through the door (door zoom is 80-100%)
  // Start at 92% so images emerge as zoom nears completion
  const galleryStart = 0.92;
  
  // Don't render until we're close to gallery time
  if (progress < galleryStart - 0.01) return null;

  // Easing functions
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  const easeOutBack = (x: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  // === PHASE 1: ENTER (92% → 96%) ===
  const img1Start = 0.92;
  const img1End = 0.96;
  const img1Raw = progress > img1Start 
    ? Math.min(1, (progress - img1Start) / (img1End - img1Start))
    : 0;
  const img1EnterProgress = easeOutBack(Math.min(1, img1Raw));
  const img1EnterSmooth = easeOutCubic(img1Raw);

  const img2Start = 0.93;
  const img2End = 0.97;
  const img2Raw = progress > img2Start 
    ? Math.min(1, (progress - img2Start) / (img2End - img2Start))
    : 0;
  const img2EnterProgress = easeOutBack(Math.min(1, img2Raw));
  const img2EnterSmooth = easeOutCubic(img2Raw);

  // === PHASE 2: HOLD (96% → 97%) - brief pause at hero position ===
  // No additional transforms needed, images stay at their entered position

  // === PHASE 3: EXIT (97% → 100%) ===
  const exitStart = 0.97;
  const exitEnd = 1.0;
  const exitRaw = progress > exitStart 
    ? Math.min(1, (progress - exitStart) / (exitEnd - exitStart))
    : 0;
  const exitProgress = easeOutCubic(exitRaw);

  // Image 1 exit: flies off to the right while scaling up
  const img1ExitOffset = exitProgress * 60; // slides right off screen
  const img1ExitScale = 1 + (exitProgress * 0.6); // 1.0 → 1.6
  const img1ExitOpacity = 1 - exitProgress; // fade out

  // Image 2 exit: flies off to the left while scaling up
  const img2ExitOffset = exitProgress * 50; // slides left off screen
  const img2ExitScale = 0.85 + (exitProgress * 0.55); // 0.85 → 1.4
  const img2ExitOpacity = 1 - exitProgress; // fade out

  // Gallery background opacity - fades in during enter, fades out during exit
  const bgOpacity = Math.min(1, img1Raw * 2.5) * (1 - exitProgress);

  // === COMBINED TRANSFORMS ===
  // Image 1: enter transforms + exit transforms
  const img1Scale = (0.3 + (img1EnterProgress * 0.7)) * (exitRaw > 0 ? img1ExitScale : 1);
  const img1RotateY = -25 + (img1EnterSmooth * 20); // -25° → -5°
  const img1Opacity = Math.min(1, img1Raw * 3) * Math.max(0, img1ExitOpacity);
  const img1RightOffset = 8 - img1ExitOffset; // 8% → -52% (off right edge)

  // Image 2: enter transforms + exit transforms
  const img2Scale = (0.2 + (img2EnterProgress * 0.65)) * (exitRaw > 0 ? img2ExitScale / 0.85 : 1);
  const img2RotateY = 30 - (img2EnterSmooth * 22); // 30° → 8°
  const img2Opacity = Math.min(1, img2Raw * 3) * Math.max(0, img2ExitOpacity);
  const img2LeftOffset = 5 - img2ExitOffset; // 5% → -45% (off left edge)

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 105,
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, 
          hsl(25 40% 15% / ${bgOpacity * 0.95}) 0%, 
          hsl(20 30% 8% / ${bgOpacity}) 50%,
          hsl(15 20% 5% / ${bgOpacity}) 100%)`,
        opacity: bgOpacity,
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

      {/* Image 1 - Main completed roof (top-right, exits right) */}
      {img1Raw > 0 && img1Opacity > 0 && (
        <div
          className="absolute"
          style={{
            top: '10%',
            right: `${img1RightOffset}%`,
            transform: `scale(${img1Scale}) rotateY(${img1RotateY}deg)`,
            opacity: img1Opacity,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '20px',
              boxShadow: `
                0 4px 20px hsl(0 0% 0% / 0.4),
                0 8px 40px hsl(0 0% 0% / 0.5),
                0 16px 60px hsl(0 0% 0% / 0.6),
                0 32px 100px hsl(0 0% 0% / 0.7),
                0 0 60px hsl(32 80% 50% / ${0.35 * img1EnterSmooth}),
                inset 0 1px 0 hsl(40 60% 80% / 0.1)
              `,
              border: `2px solid hsl(168 70% 45% / ${0.5 * img1EnterSmooth})`,
            }}
          >
            <img
              src={coastalRoofImage}
              alt="Completed coastal roof project"
              style={{
                width: '45vw',
                maxWidth: '600px',
                height: 'auto',
                maxHeight: '40vh',
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
                  hsl(45 90% 95% / ${0.2 * img1EnterSmooth}) 40%,
                  hsl(45 90% 95% / ${0.35 * img1EnterSmooth}) 50%,
                  hsl(45 90% 95% / ${0.2 * img1EnterSmooth}) 60%,
                  transparent 80%
                )`,
                transform: `translateX(${-120 + (img1Raw * 240)}%)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Image 2 - In progress shot (bottom-left, exits left) */}
      {img2Raw > 0 && img2Opacity > 0 && (
        <div
          className="absolute"
          style={{
            bottom: '15%',
            left: `${img2LeftOffset}%`,
            transform: `scale(${img2Scale}) rotateY(${img2RotateY}deg)`,
            opacity: img2Opacity,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '16px',
              boxShadow: `
                0 4px 16px hsl(0 0% 0% / 0.35),
                0 8px 32px hsl(0 0% 0% / 0.45),
                0 16px 50px hsl(0 0% 0% / 0.55),
                0 24px 80px hsl(0 0% 0% / 0.65),
                0 0 50px hsl(168 70% 45% / ${0.3 * img2EnterSmooth}),
                inset 0 1px 0 hsl(40 60% 80% / 0.08)
              `,
              border: `2px solid hsl(32 70% 50% / ${0.45 * img2EnterSmooth})`,
            }}
          >
            <img
              src={inProgressImage}
              alt="Roof installation in progress"
              style={{
                width: '35vw',
                maxWidth: '450px',
                height: 'auto',
                maxHeight: '32vh',
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
                  hsl(45 90% 95% / ${0.15 * img2EnterSmooth}) 40%,
                  hsl(45 90% 95% / ${0.25 * img2EnterSmooth}) 50%,
                  hsl(45 90% 95% / ${0.15 * img2EnterSmooth}) 60%,
                  transparent 80%
                )`,
                transform: `translateX(${-120 + (img2Raw * 240)}%)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery3D;
