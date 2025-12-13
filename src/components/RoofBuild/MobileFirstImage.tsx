import React, { useMemo } from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import coastalHomeCrew from '@/assets/coastal-home-crew.png';

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
  // === EXPANDED TIMING - More breathing room ===
  
  // Image 1 + Stars + Name: 0.82 - 0.88
  const img1Start = 0.82;
  const img1End = 0.88;
  const img1Progress = Math.max(0, Math.min(1, (progress - img1Start) / (img1End - img1Start)));
  
  // Stars/Name staggered within Image 1 window
  const starsStart = 0.82;
  const starsEnd = 0.85;
  const starsProgress = Math.max(0, Math.min(1, (progress - starsStart) / (starsEnd - starsStart)));
  
  const nameStart = 0.83;
  const nameEnd = 0.87;
  const nameProgress = Math.max(0, Math.min(1, (progress - nameStart) / (nameEnd - nameStart)));
  
  // Quote 1: 0.84 - 0.90
  const quote1Start = 0.84;
  const quote1End = 0.90;
  const quote1Progress = Math.max(0, Math.min(1, (progress - quote1Start) / (quote1End - quote1Start)));
  
  // Image 2 Flip Down: 0.91 - 0.95
  const flipStart = 0.91;
  const flipEnd = 0.95;
  const flipProgress = Math.max(0, Math.min(1, (progress - flipStart) / (flipEnd - flipStart)));

  // Quote 2 ("We had some minor issues"): 0.94 - 0.97
  const quote2Start = 0.94;
  const quote2End = 0.97;
  const quote2Progress = Math.max(0, Math.min(1, (progress - quote2Start) / (quote2End - quote2Start)));

  // Image 3 "Slide-In Zoom": 0.96 - 0.99
  const img3Start = 0.96;
  const img3End = 0.99;
  const img3Progress = Math.max(0, Math.min(1, (progress - img3Start) / (img3End - img3Start)));

  // Quote 3 ("But they were quickly corrected..."): 0.98 - 1.00
  const quote3Start = 0.98;
  const quote3End = 1.00;
  const quote3Progress = Math.max(0, Math.min(1, (progress - quote3Start) / (quote3End - quote3Start)));

  // Container visibility
  const isVisible = progress >= img1Start;
  
  // === IMAGE 1 "EMERGENCE" ===
  const img1Eased = easeOutExpo(img1Progress);
  const img1Scale = 0.3 + (img1Eased * 0.7);
  const img1Blur = (1 - img1Eased) * 20;
  const img1Brightness = 1.5 - (img1Eased * 0.5);
  const img1TranslateY = (1 - img1Eased) * 30;
  const img1Opacity = Math.min(1, img1Eased * 3);

  // === IMAGE 2 "FLIP DOWN" ===
  const flipEased = easeOutQuart(flipProgress);
  const img2RotateX = -90 + (flipEased * 90);
  const img2Opacity = Math.min(1, flipProgress * 3);
  const img2Scale = 0.85 + (flipEased * 0.15);
  
  // === IMAGE 3 "SLIDE-IN ZOOM" ===
  const img3Eased = easeOutExpo(img3Progress);
  const img3TranslateX = (1 - img3Eased) * 100;
  const img3Scale = 0.6 + (img3Eased * 0.4);
  const img3Rotate = (1 - img3Eased) * 8;
  const img3Blur = (1 - img3Eased) * 15;
  const img3Brightness = 1.4 - (img3Eased * 0.4);
  const img3Opacity = Math.min(1, img3Progress * 3);

  // Individual shifts - applied per element, not container
  const img1ShiftY = flipProgress > 0 ? easeOutQuart(flipProgress) * -4 : 0;
  const img2ShiftY = img3Progress > 0 ? easeOutExpo(img3Progress) * -3 : 0;

  // === TESTIMONIAL DATA ===
  const name = "Bruce Gombar";
  const quote1 = "We were very pleased with the final results of our roof replacement";
  const quote2 = "We had some minor issues";
  const quote3 = "But they were quickly corrected once we contacted the team";
  
  const nameChars = useMemo(() => name.split(''), []);
  const visibleNameChars = Math.floor(nameProgress * nameChars.length);
  
  const visibleQuote1Chars = Math.floor(quote1Progress * quote1.length);
  const showCursor1 = quote1Progress > 0 && quote1Progress < 1;

  const visibleQuote2Chars = Math.floor(quote2Progress * quote2.length);
  const showCursor2 = quote2Progress > 0 && quote2Progress < 1;

  const visibleQuote3Chars = Math.floor(quote3Progress * quote3.length);
  const showCursor3 = quote3Progress > 0 && quote3Progress < 1;

  // === STARS ANIMATION ===
  const starsEased = easeOutExpo(starsProgress);

  return (
    <div 
      className="fixed inset-0 z-[110] flex flex-col items-center justify-start pt-8 px-4 overflow-y-auto"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${isVisible ? 0.95 : 0}) 0%, hsl(25 30% 8% / ${isVisible ? 0.98 : 0}) 100%)`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {/* Main Content Stack */}
      <div className="flex flex-col items-center gap-4 w-full max-w-[500px] pb-12">
        
        {/* Stars - ABOVE IMAGE 1 */}
        <div 
          className="flex gap-3"
          style={{
            opacity: starsProgress > 0 ? starsEased : 0,
            transform: `translateY(${(1 - starsEased) * 20}px)`,
            transition: 'opacity 0.15s ease-out',
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

        {/* Name - ABOVE IMAGE 1 */}
        <div 
          className="text-4xl font-bold tracking-widest uppercase"
          style={{ 
            color: 'hsl(35 60% 70%)',
            textShadow: '0 0 20px hsl(35 70% 55% / 0.6), 0 0 40px hsl(35 60% 45% / 0.3)',
            opacity: nameProgress > 0 ? 1 : 0,
            transition: 'opacity 0.15s ease-out',
          }}
        >
          {nameChars.map((char, i) => {
            const isCharVisible = i < visibleNameChars;
            const charProgress = isCharVisible ? 1 : 0;
            
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
            transform: `translateY(${img1TranslateY + img1ShiftY}px) scale(${img1Scale})`,
            opacity: img1Opacity,
            filter: `blur(${img1Blur}px) brightness(${img1Brightness})`,
            willChange: 'transform, opacity, filter',
          }}
        >
          <img
            src={coastalRoofImage}
            alt="Beautiful coastal roof project"
            className="w-full max-h-[30vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 25px 50px hsl(0 0% 0% / 0.4),
                0 0 40px hsl(35 60% 50% / ${0.3 * img1Opacity}),
                0 0 80px hsl(168 70% 45% / ${0.15 * img1Opacity})
              `,
            }}
          />
        </div>

        {/* Quote 1 - BELOW IMAGE 1 */}
        <div 
          className="text-xl max-w-[320px] leading-relaxed text-center"
          style={{ 
            color: 'hsl(35 30% 65%)',
            opacity: quote1Progress > 0 ? 1 : 0,
            textShadow: '0 0 15px hsl(35 50% 50% / 0.3)',
            transition: 'opacity 0.15s ease-out',
          }}
        >
          <span className="italic">"</span>
          <span>{quote1.slice(0, visibleQuote1Chars)}</span>
          {showCursor1 && (
            <span 
              className="inline-block w-[2px] h-[18px] ml-[2px] align-middle"
              style={{
                backgroundColor: 'hsl(35 70% 60%)',
                boxShadow: '0 0 8px hsl(35 70% 60%)',
                animation: 'pulse 0.8s ease-in-out infinite',
              }}
            />
          )}
          {visibleQuote1Chars >= quote1.length && <span className="italic">"</span>}
        </div>

        {/* Image 2 - Flip Down (always rendered, opacity controlled) */}
        <div
          className="relative w-[85vw] max-w-[500px] mt-2"
          style={{
            perspective: '1000px',
            opacity: img2Opacity,
            transform: `translateY(${img2ShiftY}px)`,
            pointerEvents: flipProgress > 0 ? 'auto' : 'none',
          }}
        >
          <div
            style={{
              transform: `rotateX(${img2RotateX}deg) scale(${img2Scale})`,
              transformOrigin: 'center top',
              willChange: 'transform',
            }}
          >
            <img
              src={coastalRoofInProgress}
              alt="Coastal roof in progress"
              className="w-full max-h-[30vh] object-cover rounded-xl"
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

        {/* Quote 2 - "We had some minor issues" */}
        <div 
          className="text-lg max-w-[320px] leading-relaxed text-center mt-2"
          style={{ 
            color: 'hsl(25 50% 65%)',
            opacity: quote2Progress > 0 ? 1 : 0,
            textShadow: '0 0 15px hsl(25 60% 50% / 0.4)',
            transition: 'opacity 0.15s ease-out',
            pointerEvents: quote2Progress > 0 ? 'auto' : 'none',
          }}
        >
          <span className="italic">"</span>
          <span>{quote2.slice(0, visibleQuote2Chars)}</span>
          {showCursor2 && (
            <span 
              className="inline-block w-[2px] h-[16px] ml-[2px] align-middle"
              style={{
                backgroundColor: 'hsl(25 70% 60%)',
                boxShadow: '0 0 8px hsl(25 70% 60%)',
                animation: 'pulse 0.8s ease-in-out infinite',
              }}
            />
          )}
          {visibleQuote2Chars >= quote2.length && <span className="italic">"</span>}
        </div>

        {/* Image 3 - Slide-In Zoom (always rendered, opacity controlled) */}
        <div
          className="relative w-[85vw] max-w-[500px] mt-2"
          style={{
            transform: `translateX(${img3TranslateX}%) scale(${img3Scale}) rotate(${img3Rotate}deg)`,
            opacity: img3Opacity,
            filter: `blur(${img3Blur}px) brightness(${img3Brightness})`,
            willChange: 'transform, opacity, filter',
            pointerEvents: img3Progress > 0 ? 'auto' : 'none',
          }}
        >
          <img
            src={coastalHomeCrew}
            alt="Poseidon roofing team"
            className="w-full max-h-[30vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 25px 50px hsl(0 0% 0% / 0.5),
                0 0 50px hsl(35 70% 55% / ${0.4 * img3Opacity}),
                0 0 100px hsl(168 70% 45% / ${0.2 * img3Opacity}),
                inset 0 0 30px hsl(35 50% 40% / 0.1)
              `,
            }}
          />
        </div>

        {/* Quote 3 - "But they were quickly corrected..." */}
        <div 
          className="text-lg max-w-[340px] leading-relaxed text-center mt-2"
          style={{ 
            color: 'hsl(35 45% 70%)',
            opacity: quote3Progress > 0 ? 1 : 0,
            textShadow: `0 0 15px hsl(35 60% 55% / 0.4), 0 0 ${visibleQuote3Chars >= quote3.length ? 30 : 0}px hsl(35 70% 60% / 0.5)`,
            transition: 'opacity 0.15s ease-out, text-shadow 0.3s ease-out',
            pointerEvents: quote3Progress > 0 ? 'auto' : 'none',
          }}
        >
          <span className="italic">"</span>
          <span>{quote3.slice(0, visibleQuote3Chars)}</span>
          {showCursor3 && (
            <span 
              className="inline-block w-[2px] h-[16px] ml-[2px] align-middle"
              style={{
                backgroundColor: 'hsl(35 70% 60%)',
                boxShadow: '0 0 10px hsl(35 70% 60%)',
                animation: 'pulse 0.8s ease-in-out infinite',
              }}
            />
          )}
          {visibleQuote3Chars >= quote3.length && <span className="italic">"</span>}
        </div>
      </div>
    </div>
  );
};

export default MobileFirstImage;
