import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import inProgressImage from '@/assets/coastal-roof-inprogress.png';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  // Gallery starts appearing at 84% scroll
  const galleryStart = 0.84;
  
  // Don't render until we're close to gallery time
  if (progress < galleryStart - 0.02) return null;

  // Easing functions
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  const easeOutBack = (x: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  // Image 1 (Main - completed roof): 84% → 92%
  const img1Start = 0.84;
  const img1End = 0.92;
  const img1Raw = progress > img1Start 
    ? Math.min(1, (progress - img1Start) / (img1End - img1Start))
    : 0;
  const img1Progress = easeOutBack(img1Raw);
  const img1Smooth = easeOutCubic(img1Raw);

  // Image 2 (Secondary - in progress): 88% → 96%
  const img2Start = 0.88;
  const img2End = 0.96;
  const img2Raw = progress > img2Start 
    ? Math.min(1, (progress - img2Start) / (img2End - img2Start))
    : 0;
  const img2Progress = easeOutBack(img2Raw);
  const img2Smooth = easeOutCubic(img2Raw);

  // Subtle floating after settled
  const floatTime = progress * 20;
  const float1 = img1Raw > 0.9 ? Math.sin(floatTime) * 4 * (img1Raw - 0.9) / 0.1 : 0;
  const float2 = img2Raw > 0.9 ? Math.sin(floatTime * 1.3 + 1) * 3 * (img2Raw - 0.9) / 0.1 : 0;

  // Image 1 transforms - comes from right, rotates into place
  const img1Scale = 0.1 + (img1Progress * 0.9); // 0.1 → 1.0
  const img1RotateY = -35 + (img1Smooth * 32); // -35° → -3°
  const img1RotateX = 8 - (img1Smooth * 6); // 8° → 2°
  const img1X = 60 - (img1Smooth * 45); // 60% → 15% from center
  const img1Y = -30 + (img1Smooth * 25) + float1; // -30% → -5%
  const img1Opacity = Math.min(1, img1Raw * 4);

  // Image 2 transforms - comes from left, rotates opposite direction
  const img2Scale = 0.1 + (img2Progress * 0.75); // 0.1 → 0.85
  const img2RotateY = 40 - (img2Smooth * 32); // 40° → 8°
  const img2RotateX = -10 + (img2Smooth * 7); // -10° → -3°
  const img2X = -70 + (img2Smooth * 45); // -70% → -25% from center
  const img2Y = 40 - (img2Smooth * 20) + float2; // 40% → 20%
  const img2Opacity = Math.min(1, img2Raw * 4);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 102, // Above warm light overlay (z-100)
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* Single preserve-3d container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Image 1 - Main completed roof (appears first, right side) */}
        {img1Raw > 0 && (
          <div
            className="absolute"
            style={{
              transform: `
                translate(${img1X}%, ${img1Y}%)
                scale(${img1Scale})
                rotateY(${img1RotateY}deg)
                rotateX(${img1RotateX}deg)
              `,
              opacity: img1Opacity,
              zIndex: 104,
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '16px',
                boxShadow: `
                  0 50px 100px -20px rgba(0, 0, 0, 0.9),
                  0 30px 60px -15px rgba(0, 0, 0, 0.7),
                  0 0 80px hsl(32 80% 50% / ${0.4 * img1Smooth}),
                  0 0 40px hsl(168 60% 45% / ${0.2 * img1Smooth})
                `,
                border: `2px solid hsl(168 70% 50% / ${0.4 * img1Smooth})`,
              }}
            >
              <img
                src={coastalRoofImage}
                alt="Beautiful completed coastal roof project by Poseidon Roofing"
                style={{
                  maxWidth: '42vw',
                  maxHeight: '38vh',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Shine sweep effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(
                    120deg,
                    transparent 30%,
                    hsl(40 80% 95% / ${0.15 * img1Smooth}) 45%,
                    hsl(40 80% 95% / ${0.25 * img1Smooth}) 50%,
                    hsl(40 80% 95% / ${0.15 * img1Smooth}) 55%,
                    transparent 70%
                  )`,
                  transform: `translateX(${-100 + (img1Raw * 200)}%)`,
                }}
              />
            </div>
          </div>
        )}

        {/* Image 2 - In progress shot (appears second, left side) */}
        {img2Raw > 0 && (
          <div
            className="absolute"
            style={{
              transform: `
                translate(${img2X}%, ${img2Y}%)
                scale(${img2Scale})
                rotateY(${img2RotateY}deg)
                rotateX(${img2RotateX}deg)
              `,
              opacity: img2Opacity,
              zIndex: 103,
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '14px',
                boxShadow: `
                  0 40px 80px -15px rgba(0, 0, 0, 0.85),
                  0 25px 50px -12px rgba(0, 0, 0, 0.6),
                  0 0 60px hsl(168 70% 45% / ${0.3 * img2Smooth}),
                  0 0 30px hsl(32 70% 50% / ${0.15 * img2Smooth})
                `,
                border: `2px solid hsl(32 70% 55% / ${0.35 * img2Smooth})`,
              }}
            >
              <img
                src={inProgressImage}
                alt="Aerial view of roof installation in progress"
                style={{
                  maxWidth: '32vw',
                  maxHeight: '30vh',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Shine sweep effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(
                    120deg,
                    transparent 30%,
                    hsl(40 80% 95% / ${0.12 * img2Smooth}) 45%,
                    hsl(40 80% 95% / ${0.2 * img2Smooth}) 50%,
                    hsl(40 80% 95% / ${0.12 * img2Smooth}) 55%,
                    transparent 70%
                  )`,
                  transform: `translateX(${-100 + (img2Raw * 200)}%)`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery3D;
