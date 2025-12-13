import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';

interface MobileFirstImageProps {
  progress: number;
}

const easeOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const easeInQuad = (x: number): number => x * x;
const easeOutQuad = (x: number): number => 1 - (1 - x) * (1 - x);

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // Image 1 entrance timing (0.90 - 0.94)
  const image1EnterStart = 0.90;
  const image1EnterEnd = 0.94;
  const image1EnterProgress = progress >= image1EnterStart 
    ? Math.min(1, (progress - image1EnterStart) / (image1EnterEnd - image1EnterStart)) 
    : 0;

  // 3D Flip timing (0.94 - 0.98)
  const flipStart = 0.94;
  const flipEnd = 0.98;
  const flipProgress = progress >= flipStart 
    ? Math.min(1, (progress - flipStart) / (flipEnd - flipStart)) 
    : 0;

  if (image1EnterProgress <= 0) return null;

  // Image 1 entrance animation (unchanged)
  const enterEased = easeOutBack(image1EnterProgress);
  
  // Image 1: 3D flip out (rotates away from viewer)
  const flipOutEased = easeInQuad(flipProgress);
  const image1RotateY = flipOutEased * 90; // 0° → 90°
  const image1Scale = enterEased * (1 - flipOutEased * 0.1); // entrance scale, then 1 → 0.9
  const image1Opacity = flipProgress > 0.5 ? 1 - (flipProgress - 0.5) * 2 : 1; // fade after 50%
  
  // Image 2: 3D flip in (rotates toward viewer)
  const flipInEased = easeOutQuad(flipProgress);
  const image2RotateY = -90 + (flipInEased * 90); // -90° → 0°
  const image2Scale = 0.9 + (flipInEased * 0.1); // 0.9 → 1
  const image2Opacity = flipProgress > 0 ? flipInEased : 0;

  // Dynamic shadow based on rotation
  const image1ShadowX = flipOutEased * 30; // shadow shifts right as it rotates
  const image2ShadowX = (1 - flipInEased) * -30; // shadow shifts left then centers

  const containerOpacity = Math.max(image1Opacity, image2Opacity);

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        pointerEvents: image1EnterProgress > 0 ? 'auto' : 'none',
        perspective: '1200px',
      }}
    >
      {/* Image 2 - flips in from behind */}
      {flipProgress > 0 && (
        <div
          className="absolute"
          style={{
            transform: `rotateY(${image2RotateY}deg) scale(${image2Scale})`,
            opacity: image2Opacity,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
            zIndex: 1,
          }}
        >
          <img
            src={coastalRoofInProgress}
            alt="Coastal roof in progress"
            className="w-[85vw] max-h-[50vh] object-cover rounded-lg"
            style={{
              boxShadow: `
                ${image2ShadowX}px 0 30px hsl(35 60% 50% / 0.4),
                0 0 60px hsl(35 50% 40% / 0.3),
                0 0 100px hsl(168 70% 45% / 0.15),
                0 25px 50px hsl(0 0% 0% / 0.5)
              `,
            }}
          />
        </div>
      )}

      {/* Image 1 - flips out toward viewer */}
      <div
        className="absolute"
        style={{
          transform: `rotateY(${image1RotateY}deg) scale(${image1Scale})`,
          opacity: image1Opacity,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
          zIndex: 2,
        }}
      >
        <img
          src={coastalRoofImage}
          alt="Beautiful coastal roof project"
          className="w-[85vw] max-h-[50vh] object-cover rounded-lg"
          style={{
            boxShadow: `
              ${image1ShadowX}px 0 30px hsl(35 60% 50% / 0.4),
              0 0 60px hsl(35 50% 40% / 0.3),
              0 0 100px hsl(168 70% 45% / 0.15),
              0 25px 50px hsl(0 0% 0% / 0.5)
            `,
          }}
        />
      </div>
    </div>
  );
};

export default MobileFirstImage;
