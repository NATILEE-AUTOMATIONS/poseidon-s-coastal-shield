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

  // Image 2 flip timing (0.94 - 0.98) - REVERSIBLE
  const flipStart = 0.94;
  const flipEnd = 0.98;
  const flipProgress = Math.max(0, Math.min(1, (progress - flipStart) / (flipEnd - flipStart)));

  if (image1EnterProgress <= 0) return null;

  // Image 1: Entrance animation only - STAYS IN PLACE after entering
  const enterEased = easeOutBack(image1EnterProgress);
  const image1Scale = enterEased; // Just entrance scale, no flip-out
  const image1Opacity = 1; // Always visible once entered
  
  // Subtle shadow on Image 1 when Image 2 is flipping in (being covered effect)
  const image1CoverShadow = flipProgress * 0.3; // Darkens slightly as Image 2 covers it
  
  // Image 2: 3D flip in/out (REVERSIBLE based on scroll direction)
  const flipInEased = easeOutQuad(flipProgress);
  const image2RotateY = -90 + (flipInEased * 90); // -90° → 0° (scroll down) or 0° → -90° (scroll up)
  const image2Scale = 0.95 + (flipInEased * 0.05); // 0.95 → 1
  const image2Opacity = flipInEased; // Smooth opacity tied to rotation
  const image2OffsetY = (1 - flipInEased) * 10; // Slight vertical offset when landing

  // Dynamic shadow based on rotation
  const image2ShadowX = (1 - flipInEased) * -25; // shadow shifts as it rotates

  const containerOpacity = image1EnterProgress > 0 ? 1 : 0;

  return (
    <div 
      className="fixed inset-0 z-[110] flex flex-col items-center overflow-y-auto py-8 gap-8"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        pointerEvents: image1EnterProgress > 0 ? 'auto' : 'none',
        scrollSnapType: 'y mandatory',
      }}
    >
      {/* Image 1 - first card in vertical stack */}
      <div
        className="flex-shrink-0"
        style={{
          transform: `scale(${image1Scale})`,
          opacity: image1Opacity,
          willChange: 'transform, opacity',
          perspective: '1200px',
          scrollSnapAlign: 'center',
        }}
      >
        <img
          src={coastalRoofImage}
          alt="Beautiful coastal roof project"
          className="w-[85vw] max-h-[50vh] object-cover rounded-lg"
          style={{
            boxShadow: `
              0 0 30px hsl(35 60% 50% / 0.4),
              0 0 60px hsl(35 50% 40% / 0.3),
              0 0 100px hsl(168 70% 45% / 0.15),
              0 25px 50px hsl(0 0% 0% / 0.5)
            `,
          }}
        />
      </div>

      {/* Image 2 - spins in below Image 1 */}
      <div
        className="flex-shrink-0"
        style={{
          transform: `rotateY(${image2RotateY}deg) scale(${image2Scale})`,
          opacity: image2Opacity,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
          perspective: '1200px',
          scrollSnapAlign: 'center',
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
    </div>
  );
};

export default MobileFirstImage;
