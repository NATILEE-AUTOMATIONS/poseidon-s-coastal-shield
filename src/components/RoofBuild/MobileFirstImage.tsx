import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';

interface MobileFirstImageProps {
  progress: number;
}

// Physics-inspired easing functions
const easeOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const easeOutQuart = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // === TIMING ===
  // Image 1 Drop: 0.90 - 0.94 (preserved as requested)
  const img1DropStart = 0.90;
  const img1DropEnd = 0.94;
  const img1DropProgress = Math.max(0, Math.min(1, (progress - img1DropStart) / (img1DropEnd - img1DropStart)));

  // Image 1 Lift + Image 2 Drop: 0.94 - 0.98
  const phase2Start = 0.94;
  const phase2End = 0.98;
  const phase2Progress = Math.max(0, Math.min(1, (progress - phase2Start) / (phase2End - phase2Start)));

  // Don't render until animation starts
  if (img1DropProgress <= 0) return null;

  // === IMAGE 1 CALCULATIONS ===
  const img1DropEased = easeOutBack(img1DropProgress);
  const img1LiftEased = easeInOutCubic(phase2Progress);

  // Drop: falls from -120px to 0, with 5° rotation settling to 0°
  const img1DropY = (1 - img1DropEased) * -120;
  const img1DropRotate = (1 - img1DropEased) * 5;
  const img1DropScale = 0.85 + (img1DropEased * 0.15); // 0.85 → 1.0
  const img1DropOpacity = img1DropEased;

  // Lift: moves up to make room for Image 2
  const img1LiftY = img1LiftEased * -22; // 0 → -22vh

  // Combined transforms
  const img1TranslateY = img1DropY + (img1LiftY * (img1DropProgress >= 1 ? 1 : 0) * window.innerHeight / 100);
  const img1FinalY = img1DropProgress < 1 ? img1DropY : img1LiftY * window.innerHeight / 100;
  const img1Rotate = img1DropProgress < 1 ? img1DropRotate : 0;
  const img1Scale = img1DropProgress < 1 ? img1DropScale : 1;

  // === IMAGE 2 CALCULATIONS ===
  const img2DropEased = easeOutQuart(phase2Progress);

  // Drop: rises from +80px to 0, with -4° rotation settling to 0°
  const img2TranslateY = (1 - img2DropEased) * 80;
  const img2Rotate = (1 - img2DropEased) * -4;
  const img2Scale = 0.9 + (img2DropEased * 0.1); // 0.9 → 1.0
  const img2Opacity = img2DropEased;

  // === SHADOWS ===
  // Dynamic shadows that react to position (light from above)
  const img1ShadowY = 25 + (img1LiftEased * 10); // Shadow grows as it lifts
  const img2ShadowY = 15 + (img2DropEased * 10); // Shadow settles as it lands

  const containerOpacity = img1DropProgress > 0 ? 1 : 0;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        pointerEvents: img1DropProgress > 0 ? 'auto' : 'none',
      }}
    >
      {/* Image Stack Container - relative for absolute children */}
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Image 1 - The First Drop */}
        <div
          className="absolute w-[85vw] max-w-[500px]"
          style={{
            top: '50%',
            left: '50%',
            transform: `
              translate(-50%, -50%)
              translateY(${img1DropProgress < 1 ? img1DropY : img1LiftEased * -22 * window.innerHeight / 100}px)
              translateY(${img1LiftEased * -8}vh)
              rotate(${img1Rotate}deg)
              scale(${img1Scale})
            `,
            opacity: img1DropOpacity,
            zIndex: 2,
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={coastalRoofImage}
            alt="Beautiful coastal roof project"
            className="w-full max-h-[45vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 ${img1ShadowY}px ${img1ShadowY * 2}px hsl(0 0% 0% / 0.4),
                0 0 40px hsl(35 60% 50% / 0.3),
                0 0 80px hsl(35 50% 40% / 0.2),
                0 0 120px hsl(168 70% 45% / 0.1)
              `,
            }}
          />
        </div>

        {/* Image 2 - The Second Drop */}
        {phase2Progress > 0 && (
          <div
            className="absolute w-[85vw] max-w-[500px]"
            style={{
              top: '50%',
              left: '50%',
              transform: `
                translate(-50%, -50%)
                translateY(${img2TranslateY + 18 * window.innerHeight / 100}px)
                rotate(${img2Rotate}deg)
                scale(${img2Scale})
              `,
              opacity: img2Opacity,
              zIndex: 1,
              willChange: 'transform, opacity',
            }}
          >
            <img
              src={coastalRoofInProgress}
              alt="Coastal roof in progress"
              className="w-full max-h-[45vh] object-cover rounded-xl"
              style={{
                boxShadow: `
                  0 ${img2ShadowY}px ${img2ShadowY * 2}px hsl(0 0% 0% / 0.35),
                  0 0 30px hsl(35 60% 50% / 0.25),
                  0 0 60px hsl(35 50% 40% / 0.15),
                  0 0 100px hsl(168 70% 45% / 0.08)
                `,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFirstImage;
