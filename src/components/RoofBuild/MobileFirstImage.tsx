import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';

interface MobileFirstImageProps {
  progress: number;
}

const easeOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  const imageStart = 0.80;
  const imageDuration = 0.08;
  
  const imageProgress = progress >= imageStart 
    ? Math.min(1, (progress - imageStart) / imageDuration) 
    : 0;

  if (imageProgress <= 0) return null;

  const easedProgress = easeOutBack(imageProgress);
  const scale = easedProgress;
  const opacity = Math.min(1, imageProgress * 2);

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${opacity * 0.95}) 0%, hsl(25 30% 8% / ${opacity * 0.98}) 100%)`,
        pointerEvents: imageProgress > 0 ? 'auto' : 'none',
      }}
    >
      <div
        className="relative"
        style={{
          transform: `scale(${scale})`,
          opacity,
          transition: 'none',
          willChange: 'transform, opacity',
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
