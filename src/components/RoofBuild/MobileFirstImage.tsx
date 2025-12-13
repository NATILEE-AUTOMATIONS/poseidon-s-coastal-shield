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
  // === GALLERY WINDOW: 0.88 to 1.00 (starts right as user enters doorway) ===
  const galleryStart = 0.88;
  const galleryEnd = 1.00;
  const galleryRange = galleryEnd - galleryStart;
  
  // Local progress within gallery (0-1)
  const localProgress = progress < galleryStart 
    ? 0 
    : progress > galleryEnd 
      ? 1 
      : (progress - galleryStart) / galleryRange;
  
  // Container visibility - slower fade in
  const containerOpacity = Math.min(1, localProgress / 0.12);
  const isVisible = progress >= galleryStart - 0.02;
  
  // === TIMING: LUXURIOUS SPREAD across 0-1 local progress ===
  // Image 1 entrance: 0.0 - 0.35 (slower, more dramatic)
  const img1Start = 0.0;
  const img1End = 0.35;
  const img1Progress = Math.max(0, Math.min(1, (localProgress - img1Start) / (img1End - img1Start)));
  
  // Stars/Name: 0.0 - 0.25 (more time to cascade)
  const starsProgress = Math.max(0, Math.min(1, localProgress / 0.20));
  const nameProgress = Math.max(0, Math.min(1, (localProgress - 0.03) / 0.22));
  
  // Quote 1: 0.25 - 0.50 (longer typewriter duration)
  const quote1Progress = Math.max(0, Math.min(1, (localProgress - 0.25) / 0.25));
  
  // Image 2: 0.55 - 0.72 (PUSHED BACK - more scroll before appearing)
  const flipStart = 0.55;
  const flipEnd = 0.72;
  const flipProgress = Math.max(0, Math.min(1, (localProgress - flipStart) / (flipEnd - flipStart)));

  // Quote 2: 0.68 - 0.82 (starts after Image 2 settles)
  const quote2Progress = Math.max(0, Math.min(1, (localProgress - 0.68) / 0.14));

  // Image 3: 0.82 - 0.94 (PUSHED BACK - dramatic delayed entrance)
  const img3Start = 0.82;
  const img3End = 0.94;
  const img3Progress = Math.max(0, Math.min(1, (localProgress - img3Start) / (img3End - img3Start)));

  // Quote 3: 0.92 - 1.00 (final reveal after Image 3)
  const quote3Progress = Math.max(0, Math.min(1, (localProgress - 0.92) / 0.08));

  // === IMAGE ANIMATIONS ===
  const img1Eased = easeOutExpo(img1Progress);
  const img1Scale = 0.4 + (img1Eased * 0.6);
  const img1Blur = (1 - img1Eased) * 15;
  const img1Brightness = 1.4 - (img1Eased * 0.4);
  const img1TranslateY = (1 - img1Eased) * 40;
  const img1Opacity = Math.min(1, img1Eased * 2.5);

  const flipEased = easeOutQuart(flipProgress);
  const img2RotateX = -90 + (flipEased * 90);
  const img2Opacity = Math.min(1, flipProgress * 2.5);
  const img2Scale = 0.85 + (flipEased * 0.15);
  
  const img3Eased = easeOutExpo(img3Progress);
  const img3TranslateX = (1 - img3Eased) * 80;
  const img3Scale = 0.6 + (img3Eased * 0.4);
  const img3Rotate = (1 - img3Eased) * 6;
  const img3Blur = (1 - img3Eased) * 12;
  const img3Brightness = 1.3 - (img3Eased * 0.3);
  const img3Opacity = Math.min(1, img3Progress * 2.5);

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

  const starsEased = easeOutExpo(starsProgress);

  if (!isVisible) return null;

  return (
    <div 
      className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-start pt-16 px-4 pb-8"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / ${containerOpacity * 0.95}) 0%, hsl(25 30% 8% / ${containerOpacity * 0.98}) 100%)`,
        opacity: containerOpacity,
      }}
    >
      {/* Main Content Stack - flows naturally */}
      <div className="flex flex-col items-center gap-5 w-full max-w-[500px]">
        
        {/* Stars */}
        <div 
          className="flex gap-3"
          style={{
            opacity: starsProgress > 0 ? starsEased : 0,
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

        {/* Name */}
        <div 
          className="text-4xl md:text-5xl font-bold tracking-widest uppercase"
          style={{ 
            color: 'hsl(35 60% 70%)',
            textShadow: '0 0 20px hsl(35 70% 55% / 0.6), 0 0 40px hsl(35 60% 45% / 0.3)',
            opacity: nameProgress > 0 ? 1 : 0,
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

        {/* Image 1 */}
        <div
          className="relative w-[88vw] max-w-[500px]"
          style={{
            transform: `translateY(${img1TranslateY}px) scale(${img1Scale})`,
            opacity: img1Opacity,
            filter: `blur(${img1Blur}px) brightness(${img1Brightness})`,
          }}
        >
          <img
            src={coastalRoofImage}
            alt="Beautiful coastal roof project"
            className="w-full max-h-[40vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 20px 40px hsl(0 0% 0% / 0.4),
                0 0 30px hsl(35 60% 50% / ${0.3 * img1Opacity}),
                0 0 60px hsl(168 70% 45% / ${0.15 * img1Opacity})
              `,
            }}
          />
        </div>

        {/* Quote 1 */}
        <div 
          className="text-xl md:text-2xl max-w-[360px] leading-relaxed text-center"
          style={{ 
            color: 'hsl(35 30% 65%)',
            opacity: quote1Progress > 0 ? 1 : 0,
            textShadow: '0 0 15px hsl(35 50% 50% / 0.3)',
            minHeight: '80px',
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

        {/* Image 2 */}
        <div
          className="relative w-[88vw] max-w-[500px]"
          style={{
            perspective: '1000px',
            opacity: img2Opacity,
          }}
        >
          <div
            style={{
              transform: `rotateX(${img2RotateX}deg) scale(${img2Scale})`,
              transformOrigin: 'center top',
            }}
          >
            <img
              src={coastalRoofInProgress}
              alt="Coastal roof in progress"
              className="w-full max-h-[40vh] object-cover rounded-xl"
              style={{
                boxShadow: `
                  0 20px 40px hsl(0 0% 0% / 0.4),
                  0 0 30px hsl(35 60% 50% / ${0.3 * img2Opacity}),
                  0 0 60px hsl(168 70% 45% / ${0.15 * img2Opacity})
                `,
              }}
            />
          </div>
        </div>

        {/* Quote 2 */}
        <div 
          className="text-lg max-w-[320px] leading-relaxed text-center"
          style={{ 
            color: 'hsl(25 50% 65%)',
            opacity: quote2Progress > 0 ? 1 : 0,
            textShadow: '0 0 15px hsl(25 60% 50% / 0.4)',
            minHeight: '40px',
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

        {/* Image 3 */}
        <div
          className="relative w-[88vw] max-w-[500px]"
          style={{
            transform: `translateX(${img3TranslateX}%) scale(${img3Scale}) rotate(${img3Rotate}deg)`,
            opacity: img3Opacity,
            filter: `blur(${img3Blur}px) brightness(${img3Brightness})`,
          }}
        >
          <img
            src={coastalHomeCrew}
            alt="Poseidon roofing team"
            className="w-full max-h-[40vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 20px 40px hsl(0 0% 0% / 0.5),
                0 0 40px hsl(35 70% 55% / ${0.4 * img3Opacity}),
                0 0 80px hsl(168 70% 45% / ${0.2 * img3Opacity})
              `,
            }}
          />
        </div>

        {/* Quote 3 */}
        <div 
          className="text-lg max-w-[340px] leading-relaxed text-center"
          style={{ 
            color: 'hsl(35 45% 70%)',
            opacity: quote3Progress > 0 ? 1 : 0,
            textShadow: `0 0 15px hsl(35 60% 55% / 0.4), 0 0 ${visibleQuote3Chars >= quote3.length ? 25 : 0}px hsl(35 70% 60% / 0.5)`,
            minHeight: '50px',
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
