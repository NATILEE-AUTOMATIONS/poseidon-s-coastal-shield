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

const easeOutElastic = (x: number): number => {
  const c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // Image 1 timing
  const image1Start = 0.90;
  const image1Duration = 0.08;
  const image1Progress = progress >= image1Start 
    ? Math.min(1, (progress - image1Start) / image1Duration) 
    : 0;

  // Image 2 timing - starts as image 1 settles
  const image2Start = 0.96;
  const image2Duration = 0.04;
  const image2Progress = progress >= image2Start 
    ? Math.min(1, (progress - image2Start) / image2Duration) 
    : 0;

  if (image1Progress <= 0) return null;

  // Image 1 animations
  const eased1 = easeOutBack(image1Progress);
  const scale1Base = eased1;
  
  // Image 1 reacts to image 2 appearing
  const image1Shrink = image2Progress > 0 ? 1 - (easeOutExpo(image2Progress) * 0.6) : 1;
  const image1Fade = image2Progress > 0 ? 1 - (easeOutExpo(image2Progress) * 0.85) : 1;
  const image1TranslateX = image2Progress > 0 ? easeOutExpo(image2Progress) * -120 : 0;
  const image1TranslateY = image2Progress > 0 ? easeOutExpo(image2Progress) * -80 : 0;
  const image1RotateZ = image2Progress > 0 ? easeOutExpo(image2Progress) * -8 : 0;
  
  const scale1 = scale1Base * image1Shrink;
  const opacity1 = Math.min(1, image1Progress * 2) * image1Fade;

  // Image 2 - Cinematic Perspective Dive
  const eased2 = easeOutElastic(image2Progress);
  const eased2Smooth = easeOutExpo(image2Progress);
  
  // 3D transform values - dramatic swooping entrance
  const scale2 = 0.1 + (eased2 * 0.9);
  const rotateY2 = -35 + (eased2Smooth * 35);
  const rotateX2 = 20 - (eased2Smooth * 20);
  const rotateZ2 = -12 + (eased2Smooth * 12);
  const translateZ2 = -800 + (eased2Smooth * 800);
  const translateX2 = 150 - (eased2Smooth * 150);
  const translateY2 = -100 + (eased2Smooth * 100);
  const opacity2 = Math.min(1, image2Progress * 3);
  
  // Motion blur effect - peaks in middle of animation
  const motionBlur = image2Progress > 0 && image2Progress < 0.7 
    ? Math.sin(image2Progress * Math.PI) * 3 
    : 0;
  
  // Glow intensity - pulses on landing
  const glowIntensity = eased2 * (1 + Math.sin(image2Progress * Math.PI * 4) * 0.3);

  const containerOpacity = Math.max(opacity1, opacity2);

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        pointerEvents: image1Progress > 0 ? 'auto' : 'none',
      }}
    >
      {/* Image 1 - pushes aside when image 2 arrives */}
      <div
        className="absolute"
        style={{
          transform: `scale(${scale1}) translateX(${image1TranslateX}px) translateY(${image1TranslateY}px) rotateZ(${image1RotateZ}deg)`,
          opacity: opacity1,
          transition: 'none',
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

      {/* Image 2 - Cinematic Perspective Dive */}
      {image2Progress > 0 && (
        <div
          className="absolute"
          style={{
            transform: `
              translateX(${translateX2}px) 
              translateY(${translateY2}px) 
              translateZ(${translateZ2}px) 
              rotateY(${rotateY2}deg) 
              rotateX(${rotateX2}deg) 
              rotateZ(${rotateZ2}deg) 
              scale(${scale2})
            `,
            opacity: opacity2,
            filter: `blur(${motionBlur}px)`,
            transition: 'none',
            willChange: 'transform, opacity, filter',
            zIndex: 2,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Light trail effect */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: `linear-gradient(${135 - rotateZ2 * 2}deg, 
                hsl(35 80% 60% / ${(1 - eased2Smooth) * 0.6}) 0%, 
                transparent 50%)`,
              transform: `translateX(${(1 - eased2Smooth) * -50}px) scaleX(${1 + (1 - eased2Smooth) * 0.5})`,
              filter: `blur(${(1 - eased2Smooth) * 20}px)`,
              zIndex: -1,
            }}
          />
          
          <img
            src={coastalRoofInProgress}
            alt="Coastal roof in progress"
            className="w-[85vw] max-h-[50vh] object-cover rounded-lg"
            style={{
              boxShadow: `
                0 0 ${30 + glowIntensity * 40}px hsl(35 70% 55% / ${0.4 + glowIntensity * 0.3}),
                0 0 ${60 + glowIntensity * 60}px hsl(35 60% 45% / ${0.3 + glowIntensity * 0.2}),
                0 0 ${100 + glowIntensity * 80}px hsl(168 70% 45% / ${0.15 + glowIntensity * 0.15}),
                0 ${25 + glowIntensity * 15}px ${50 + glowIntensity * 30}px hsl(0 0% 0% / 0.6),
                inset 0 0 ${glowIntensity * 20}px hsl(35 80% 70% / ${glowIntensity * 0.1})
              `,
            }}
          />
          
          {/* Landing glow burst */}
          {image2Progress > 0.8 && (
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, 
                  hsl(35 80% 70% / ${(image2Progress - 0.8) * 2 * 0.4}) 0%, 
                  transparent 70%)`,
                transform: `scale(${1 + (image2Progress - 0.8) * 2})`,
                filter: 'blur(10px)',
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MobileFirstImage;
