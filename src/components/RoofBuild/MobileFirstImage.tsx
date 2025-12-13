import React, { useMemo } from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';

interface MobileFirstImageProps {
  progress: number;
}

// Cinematic easing functions
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

const easeOutQuart = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // === TIMING ===
  // Image 1 + Text Emergence: 0.90 - 0.94
  const img1Start = 0.90;
  const img1End = 0.94;
  const img1Progress = Math.max(0, Math.min(1, (progress - img1Start) / (img1End - img1Start)));
  
  // Text animation (slightly staggered within emergence)
  const starsStart = 0.90;
  const starsEnd = 0.92;
  const starsProgress = Math.max(0, Math.min(1, (progress - starsStart) / (starsEnd - starsStart)));
  
  const nameStart = 0.905;
  const nameEnd = 0.935;
  const nameProgress = Math.max(0, Math.min(1, (progress - nameStart) / (nameEnd - nameStart)));
  
  const quoteStart = 0.91;
  const quoteEnd = 0.945;
  const quoteProgress = Math.max(0, Math.min(1, (progress - quoteStart) / (quoteEnd - quoteStart)));
  
  // Breath moment: 0.94 - 0.96 (Image 1 + text hold)
  
  // Image 2 Flip Down: 0.96 - 1.00
  const flipStart = 0.96;
  const flipEnd = 1.00;
  const flipProgress = Math.max(0, Math.min(1, (progress - flipStart) / (flipEnd - flipStart)));

  // Don't render until animation starts
  if (img1Progress <= 0) return null;

  // === IMAGE 1 "EMERGENCE" ===
  const img1Eased = easeOutExpo(img1Progress);
  const img1Scale = 0.3 + (img1Eased * 0.7);
  const img1Blur = (1 - img1Eased) * 20;
  const img1Brightness = 1.5 - (img1Eased * 0.5);
  const img1TranslateY = (1 - img1Eased) * 30;
  const img1Opacity = Math.min(1, img1Eased * 4);

  // === IMAGE 2 "FLIP DOWN" ===
  const flipEased = easeOutQuart(flipProgress);
  const img2RotateX = -90 + (flipEased * 90); // -90° → 0°
  const img2Opacity = flipProgress > 0 ? Math.min(1, flipProgress * 3) : 0;
  const img2Scale = 0.85 + (flipEased * 0.15); // Slight scale up as it settles
  
  // Image 1 shifts up when Image 2 flips in
  const img1ShiftY = flipProgress > 0 ? flipEased * -8 : 0; // vh units
  const img1ScaleAdjust = flipProgress > 0 ? 1 - (flipEased * 0.05) : 1; // Slight shrink

  // === TESTIMONIAL DATA ===
  const name = "Bruce Gombar";
  const quote = "We were very pleased with the final results of our roof replacement";
  
  const nameChars = useMemo(() => name.split(''), []);
  const visibleNameChars = Math.floor(nameProgress * nameChars.length);
  
  const visibleQuoteChars = Math.floor(quoteProgress * quote.length);
  const showCursor = quoteProgress > 0 && quoteProgress < 1;

  // === STARS ANIMATION ===
  const starsEased = easeOutExpo(starsProgress);

  const containerOpacity = img1Progress > 0 ? 1 : 0;

  return (
    <div 
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center px-4"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        pointerEvents: img1Progress > 0 ? 'auto' : 'none',
      }}
    >
      {/* Main Content Stack */}
      <div 
        className="flex flex-col items-center gap-6 w-full max-w-[500px]"
        style={{
          transform: `translateY(${img1ShiftY}vh)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Stars - ABOVE IMAGE 1, SUPERSIZED */}
        <div 
          className="flex gap-3"
          style={{
            opacity: starsProgress > 0 ? 1 : 0,
            transform: `translateY(${(1 - starsEased) * 20}px)`,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => {
            const starDelay = i * 0.15;
            const starProgress = Math.max(0, Math.min(1, (starsProgress - starDelay) / (1 - starDelay)));
            const starEased = easeOutExpo(starProgress);
            
            return (
              <span
                key={i}
                className="text-5xl"
                style={{
                  opacity: starEased,
                  transform: `scale(${0.5 + starEased * 0.5}) translateY(${(1 - starEased) * 15}px)`,
                  filter: `drop-shadow(0 0 ${12 * starEased}px hsl(35 80% 55%)) drop-shadow(0 0 ${24 * starEased}px hsl(35 70% 45%))`,
                  color: 'hsl(35 80% 55%)',
                }}
              >
                ★
              </span>
            );
          })}
        </div>

        {/* Name - ABOVE IMAGE 1, SUPERSIZED */}
        <div 
          className="text-4xl font-bold tracking-widest uppercase"
          style={{ 
            color: 'hsl(35 60% 70%)',
            textShadow: '0 0 20px hsl(35 70% 55% / 0.6), 0 0 40px hsl(35 60% 45% / 0.3)',
            opacity: nameProgress > 0 ? 1 : 0,
          }}
        >
          {nameChars.map((char, i) => {
            const isVisible = i < visibleNameChars;
            const charProgress = isVisible ? 1 : 0;
            
            return (
              <span
                key={i}
                style={{
                  opacity: charProgress,
                  filter: `blur(${(1 - charProgress) * 4}px)`,
                  display: 'inline-block',
                  transform: `translateY(${(1 - charProgress) * 8}px)`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>

        {/* Image 1 - The Emergence */}
        <div
          className="relative w-[85vw] max-w-[500px]"
          style={{
            transform: `
              translateY(${img1TranslateY}px)
              scale(${img1Scale * img1ScaleAdjust})
            `,
            opacity: img1Opacity,
            filter: `blur(${img1Blur}px) brightness(${img1Brightness})`,
            willChange: 'transform, opacity, filter',
          }}
        >
          <img
            src={coastalRoofImage}
            alt="Beautiful coastal roof project"
            className="w-full max-h-[35vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 25px 50px hsl(0 0% 0% / 0.4),
                0 0 40px hsl(35 60% 50% / ${0.3 * img1Opacity}),
                0 0 80px hsl(168 70% 45% / ${0.15 * img1Opacity})
              `,
            }}
          />
        </div>

        {/* Quote - BELOW IMAGE 1, LARGER */}
        <div 
          className="text-xl max-w-[320px] leading-relaxed text-center"
          style={{ 
            color: 'hsl(35 30% 65%)',
            opacity: quoteProgress > 0 ? 1 : 0,
            textShadow: '0 0 15px hsl(35 50% 50% / 0.3)',
          }}
        >
          <span className="italic">"</span>
          <span>{quote.slice(0, visibleQuoteChars)}</span>
          {showCursor && (
            <span 
              className="inline-block w-[2px] h-[18px] ml-[2px] align-middle"
              style={{
                backgroundColor: 'hsl(35 70% 60%)',
                boxShadow: '0 0 8px hsl(35 70% 60%)',
                animation: 'pulse 0.8s ease-in-out infinite',
              }}
            />
          )}
          {visibleQuoteChars >= quote.length && <span className="italic">"</span>}
        </div>

        {/* Image 2 - Flip Down */}
        {flipProgress > 0 && (
          <div
            className="relative w-[85vw] max-w-[500px] mt-2"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              style={{
                transform: `rotateX(${img2RotateX}deg) scale(${img2Scale})`,
                transformOrigin: 'center top',
                opacity: img2Opacity,
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={coastalRoofInProgress}
                alt="Coastal roof in progress"
                className="w-full max-h-[35vh] object-cover rounded-xl"
                style={{
                  boxShadow: `
                    0 25px 50px hsl(0 0% 0% / 0.4),
                    0 0 40px hsl(35 60% 50% / ${0.3 * img2Opacity}),
                    0 0 80px hsl(168 70% 45% / ${0.15 * img2Opacity})
                  `,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFirstImage;
