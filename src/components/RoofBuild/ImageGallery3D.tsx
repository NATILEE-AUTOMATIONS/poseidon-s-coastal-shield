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

  // Image 1 (Main - completed roof): 92% → 98%
  const img1Start = 0.92;
  const img1End = 0.98;
  const img1Raw = progress > img1Start 
    ? Math.min(1, (progress - img1Start) / (img1End - img1Start))
    : 0;
  const img1Progress = easeOutBack(Math.min(1, img1Raw));
  const img1Smooth = easeOutCubic(img1Raw);

  // Image 2 (Secondary - in progress): 95% → 100%
  const img2Start = 0.95;
  const img2End = 1.0;
  const img2Raw = progress > img2Start 
    ? Math.min(1, (progress - img2Start) / (img2End - img2Start))
    : 0;
  const img2Progress = easeOutBack(Math.min(1, img2Raw));
  const img2Smooth = easeOutCubic(img2Raw);

  // Subtle floating after images are settled (after 100%)
  const floatActive = progress >= 1.0;
  const floatTime = progress * 30;
  const float1Y = floatActive ? Math.sin(floatTime) * 6 : 0;
  const float2Y = floatActive ? Math.sin(floatTime * 1.2 + 2) * 5 : 0;

  // Gallery background opacity - fades in as images appear
  const bgOpacity = Math.min(1, img1Raw * 2);

  // Image 1 transforms - enters from right, rotates into place
  const img1Scale = 0.3 + (img1Progress * 0.7); // 0.3 → 1.0
  const img1RotateY = -25 + (img1Smooth * 20); // -25° → -5°
  const img1Opacity = Math.min(1, img1Raw * 3);

  // Image 2 transforms - enters from left, rotates opposite
  const img2Scale = 0.2 + (img2Progress * 0.65); // 0.2 → 0.85
  const img2RotateY = 30 - (img2Smooth * 22); // 30° → 8°
  const img2Opacity = Math.min(1, img2Raw * 3);

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

      {/* Image 1 - Main completed roof (top-right) */}
      {img1Raw > 0 && (
        <div
          className="absolute"
          style={{
            top: `calc(10% + ${float1Y}px)`,
            right: '8%',
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
                0 0 60px hsl(32 80% 50% / ${0.35 * img1Smooth}),
                inset 0 1px 0 hsl(40 60% 80% / 0.1)
              `,
              border: `2px solid hsl(168 70% 45% / ${0.5 * img1Smooth})`,
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
                  hsl(45 90% 95% / ${0.2 * img1Smooth}) 40%,
                  hsl(45 90% 95% / ${0.35 * img1Smooth}) 50%,
                  hsl(45 90% 95% / ${0.2 * img1Smooth}) 60%,
                  transparent 80%
                )`,
                transform: `translateX(${-120 + (img1Raw * 240)}%)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Image 2 - In progress shot (bottom-left) */}
      {img2Raw > 0 && (
        <div
          className="absolute"
          style={{
            bottom: `calc(15% + ${float2Y}px)`,
            left: '5%',
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
                0 0 50px hsl(168 70% 45% / ${0.3 * img2Smooth}),
                inset 0 1px 0 hsl(40 60% 80% / 0.08)
              `,
              border: `2px solid hsl(32 70% 50% / ${0.45 * img2Smooth})`,
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
                  hsl(45 90% 95% / ${0.15 * img2Smooth}) 40%,
                  hsl(45 90% 95% / ${0.25 * img2Smooth}) 50%,
                  hsl(45 90% 95% / ${0.15 * img2Smooth}) 60%,
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
