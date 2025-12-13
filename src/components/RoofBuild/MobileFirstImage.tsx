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

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // Image 1 timing
  const image1Start = 0.90;
  const image1Duration = 0.06;
  const image1Progress = progress >= image1Start 
    ? Math.min(1, (progress - image1Start) / image1Duration) 
    : 0;

  // Image 2 timing - starts as image 1 settles
  const image2Start = 0.94;
  const image2Duration = 0.06;
  const image2Progress = progress >= image2Start 
    ? Math.min(1, (progress - image2Start) / image2Duration) 
    : 0;

  if (image1Progress <= 0) return null;

  // Image 1 animations - lock in, then float up when Image 2 arrives
  const eased1 = easeOutBack(image1Progress);
  const scale1 = eased1;
  
  // Image 1 reacts to Image 2 appearing
  const eased2 = easeOutBack(image2Progress);
  const image1TranslateY = eased2 * -120;
  const image1Opacity = 1 - eased2;
  const image1Scale = scale1 * (1 - eased2 * 0.05);

  // Image 2 - rises from below with lock-in snap
  const translateY2 = 150 - (eased2 * 150);
  const opacity2 = eased2;
  const scale2 = eased2;

  const containerOpacity = Math.max(image1Opacity, opacity2);

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        pointerEvents: image1Progress > 0 ? 'auto' : 'none',
      }}
    >
      {/* Image 1 - floats up and fades when Image 2 arrives */}
      <div
        className="absolute"
        style={{
          transform: `translateY(${image1TranslateY}px) scale(${image1Scale})`,
          opacity: image1Opacity,
          willChange: 'transform, opacity',
          zIndex: 1,
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

      {/* Image 2 - rises from below with lock-in snap */}
      {image2Progress > 0 && (
        <div
          className="absolute"
          style={{
            transform: `translateY(${translateY2}px) scale(${scale2})`,
            opacity: opacity2,
            willChange: 'transform, opacity',
            zIndex: 2,
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
      )}
    </div>
  );
};

export default MobileFirstImage;
