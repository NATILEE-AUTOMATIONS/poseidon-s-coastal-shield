import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';

interface MobileFirstImageProps {
  progress: number;
}

// Cinematic easing functions
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

const easeInOutQuad = (x: number): number => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // === TIMING ===
  // Image 1 Emergence: 0.90 - 0.94 (preserved as requested)
  const img1Start = 0.90;
  const img1End = 0.94;
  const img1Progress = Math.max(0, Math.min(1, (progress - img1Start) / (img1End - img1Start)));
  
  // Breath moment: 0.94 - 0.96 (Image 1 holds)
  
  // Morph transition: 0.96 - 1.00
  const morphStart = 0.96;
  const morphEnd = 1.00;
  const morphProgress = Math.max(0, Math.min(1, (progress - morphStart) / (morphEnd - morphStart)));

  // Don't render until animation starts
  if (img1Progress <= 0) return null;

  // === IMAGE 1 "EMERGENCE" ===
  const img1Eased = easeOutExpo(img1Progress);
  
  // Emergence: zoom from small, blur to sharp, bright flash
  const img1Scale = 0.3 + (img1Eased * 0.7); // 0.3 → 1.0
  const img1Blur = (1 - img1Eased) * 20; // 20px → 0
  const img1Brightness = 1.5 - (img1Eased * 0.5); // 1.5 → 1.0
  const img1TranslateY = (1 - img1Eased) * 30; // 30px → 0 (float up)
  const img1Opacity = Math.min(1, img1Eased * 4); // Quick fade-in in first 25%

  // === MORPH TRANSITION ===
  const morphEased = easeInOutQuad(morphProgress);
  
  // Image 1 zooms away during morph
  const img1MorphScale = 1 + (morphEased * 0.15); // 1.0 → 1.15
  const img1MorphOpacity = 1 - morphEased; // 1 → 0
  
  // Image 2 emerges during morph
  const img2Scale = 0.7 + (morphEased * 0.3); // 0.7 → 1.0
  const img2Opacity = morphEased; // 0 → 1
  const img2Rotate = (1 - morphEased) * 3; // 3° → 0°

  // Combined values
  const finalImg1Scale = morphProgress > 0 ? img1MorphScale : img1Scale;
  const finalImg1Opacity = morphProgress > 0 ? img1MorphOpacity : img1Opacity;
  const finalImg1Blur = morphProgress > 0 ? 0 : img1Blur;
  const finalImg1Brightness = morphProgress > 0 ? 1 : img1Brightness;
  const finalImg1TranslateY = morphProgress > 0 ? 0 : img1TranslateY;

  // === SACRED FRAME GLOW ===
  // Breathing pulse effect
  const breathPhase = Math.sin(progress * Math.PI * 8) * 0.15 + 1;
  const glowIntensity = img1Progress * breathPhase;

  const containerOpacity = img1Progress > 0 ? 1 : 0;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        pointerEvents: img1Progress > 0 ? 'auto' : 'none',
      }}
    >
      {/* Sacred Frame Glow - provides visual continuity */}
      <div
        className="absolute rounded-2xl"
        style={{
          width: '88vw',
          maxWidth: '520px',
          height: '50vh',
          opacity: glowIntensity * 0.6,
          background: 'transparent',
          boxShadow: `
            0 0 60px hsl(168 70% 45% / 0.3),
            0 0 120px hsl(35 60% 50% / 0.2),
            inset 0 0 60px hsl(168 70% 45% / 0.1)
          `,
          transform: `scale(${breathPhase})`,
          transition: 'opacity 0.3s ease-out',
        }}
      />

      {/* Image Container - single focused display */}
      <div 
        className="relative w-[85vw] max-w-[500px]"
        style={{ perspective: '1000px' }}
      >
        {/* Image 1 - The Emergence */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `
              translateY(${finalImg1TranslateY}px)
              scale(${finalImg1Scale})
            `,
            opacity: finalImg1Opacity,
            filter: `blur(${finalImg1Blur}px) brightness(${finalImg1Brightness})`,
            willChange: 'transform, opacity, filter',
          }}
        >
          <img
            src={coastalRoofImage}
            alt="Beautiful coastal roof project"
            className="w-full max-h-[45vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 25px 50px hsl(0 0% 0% / 0.4),
                0 0 40px hsl(35 60% 50% / ${0.3 * finalImg1Opacity}),
                0 0 80px hsl(168 70% 45% / ${0.15 * finalImg1Opacity})
              `,
            }}
          />
        </div>

        {/* Image 2 - The Morph */}
        {morphProgress > 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `
                scale(${img2Scale})
                rotate(${img2Rotate}deg)
              `,
              opacity: img2Opacity,
              willChange: 'transform, opacity',
            }}
          >
            <img
              src={coastalRoofInProgress}
              alt="Coastal roof in progress"
              className="w-full max-h-[45vh] object-cover rounded-xl"
              style={{
                boxShadow: `
                  0 25px 50px hsl(0 0% 0% / 0.4),
                  0 0 40px hsl(35 60% 50% / ${0.3 * img2Opacity}),
                  0 0 80px hsl(168 70% 45% / ${0.15 * img2Opacity})
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
