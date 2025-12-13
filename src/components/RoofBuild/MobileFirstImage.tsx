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

const easeOutQuad = (x: number): number => {
  return 1 - (1 - x) * (1 - x);
};

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // Image 1 entrance timing (0.90 - 0.94)
  const image1EnterStart = 0.90;
  const image1EnterEnd = 0.94;
  const image1EnterProgress = progress >= image1EnterStart 
    ? Math.min(1, (progress - image1EnterStart) / (image1EnterEnd - image1EnterStart)) 
    : 0;

  // Image 1 zoom-through timing (0.94 - 0.98)
  const zoomStart = 0.94;
  const zoomEnd = 0.98;
  const zoomProgress = progress >= zoomStart 
    ? Math.min(1, (progress - zoomStart) / (zoomEnd - zoomStart)) 
    : 0;

  if (image1EnterProgress <= 0) return null;

  // Image 1 entrance animation
  const enterEased = easeOutBack(image1EnterProgress);
  
  // Image 1 zoom-through animation
  const zoomEased = easeOutQuad(zoomProgress);
  const image1Scale = enterEased + (zoomEased * 3); // 1 → 4
  const image1Opacity = 1 - zoomEased;
  const image1Blur = zoomEased * 15; // 0 → 15px

  // Image 2 reveal animation (tied to zoom-through)
  const image2Scale = 0.8 + (zoomEased * 0.2); // 0.8 → 1
  const image2Opacity = 0.3 + (zoomEased * 0.7); // 0.3 → 1

  const containerOpacity = Math.max(image1Opacity, image2Opacity);

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        pointerEvents: image1EnterProgress > 0 ? 'auto' : 'none',
      }}
    >
      {/* Image 2 - behind Image 1, revealed as Image 1 zooms through */}
      <div
        className="absolute"
        style={{
          transform: `scale(${image2Scale})`,
          opacity: image2Opacity,
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
              0 0 30px hsl(35 60% 50% / 0.4),
              0 0 60px hsl(35 50% 40% / 0.3),
              0 0 100px hsl(168 70% 45% / 0.15),
              0 25px 50px hsl(0 0% 0% / 0.5)
            `,
          }}
        />
      </div>

      {/* Image 1 - enters, then zooms through camera with blur */}
      <div
        className="absolute"
        style={{
          transform: `scale(${image1Scale})`,
          opacity: image1Opacity,
          filter: `blur(${image1Blur}px)`,
          willChange: 'transform, opacity, filter',
          zIndex: 2,
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
    </div>
  );
};

export default MobileFirstImage;
