import React, { useMemo } from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import coastalHomeCrew from '@/assets/coastal-home-crew.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';

interface MobileFirstImageProps {
  progress: number;
}

// Cinematic easing functions
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // === GALLERY WINDOW: 0.88 to 1.00 ===
  const galleryStart = 0.88;
  const galleryEnd = 1.00;
  const galleryRange = galleryEnd - galleryStart;
  
  // Local progress within gallery (0-1)
  const localProgress = progress < galleryStart 
    ? 0 
    : progress > galleryEnd 
      ? 1 
      : (progress - galleryStart) / galleryRange;
  
  // Container visibility
  const containerOpacity = Math.min(1, localProgress / 0.10);
  const isVisible = progress >= galleryStart - 0.02;
  
  // === COMPRESSED TIMING for Image 4 + CTA ===
  // Stars/Name: 0.0 - 0.16
  const starsProgress = Math.max(0, Math.min(1, localProgress / 0.12));
  const nameProgress = Math.max(0, Math.min(1, (localProgress - 0.02) / 0.14));
  
  // Image 1: 0.0 - 0.22
  const img1Start = 0.0;
  const img1End = 0.22;
  const img1Progress = Math.max(0, Math.min(1, (localProgress - img1Start) / (img1End - img1Start)));
  
  // Quote 1: 0.14 - 0.32
  const quote1Progress = Math.max(0, Math.min(1, (localProgress - 0.14) / 0.18));
  
  // Image 2: 0.24 - 0.40 (overlaps with Quote 1)
  const flipStart = 0.24;
  const flipEnd = 0.40;
  const flipProgress = Math.max(0, Math.min(1, (localProgress - flipStart) / (flipEnd - flipStart)));

  // Quote 2: 0.36 - 0.48 (overlaps with Image 2)
  const quote2Progress = Math.max(0, Math.min(1, (localProgress - 0.36) / 0.12));

  // Image 3: 0.44 - 0.60 (overlaps with Quote 2)
  const img3Start = 0.44;
  const img3End = 0.60;
  const img3Progress = Math.max(0, Math.min(1, (localProgress - img3Start) / (img3End - img3Start)));

  // Quote 3: 0.56 - 0.72 (extended to fill more space)
  const quote3Progress = Math.max(0, Math.min(1, (localProgress - 0.56) / 0.16));

  // Image 4 (Hero Finale): 0.64 - 1.00 (fills to the end - no pause!)
  const img4Start = 0.64;
  const img4End = 1.00;
  const img4Progress = Math.max(0, Math.min(1, (localProgress - img4Start) / (img4End - img4Start)));

  // === IMAGE ANIMATIONS ===
  const img1Eased = easeOutExpo(img1Progress);
  const img1Scale = 0.4 + (img1Eased * 0.6);
  const img1Blur = (1 - img1Eased) * 15;
  const img1Brightness = 1.4 - (img1Eased * 0.4);
  const img1TranslateY = (1 - img1Eased) * 40;
  const img1Opacity = Math.min(1, img1Eased * 2.5);

  // Image 2 - Eruption from below (33vh)
  const flipEased = easeOutExpo(flipProgress);
  const img2TranslateY = (1 - flipEased) * 33; // 33vh from below
  const img2Scale = 0.3 + (flipEased * 0.7);   // 0.3 → 1.0 (massive growth)
  const img2Blur = (1 - flipEased) * 25;       // More dramatic blur
  const img2Brightness = 1.8 - (flipEased * 0.8); // Glowing entrance
  const img2Opacity = Math.min(1, flipProgress * 2.5);
  
  // Image 3 - Slide from the abyss (66vw)
  const img3Eased = easeOutExpo(img3Progress);
  const img3TranslateX = (1 - img3Eased) * 66; // 66vw from right
  const img3Scale = 0.2 + (img3Eased * 0.8);   // 0.2 → 1.0 (5x growth!)
  const img3Rotate = (1 - img3Eased) * 15;     // More dramatic tilt
  const img3Blur = (1 - img3Eased) * 30;       // Very soft to sharp
  const img3Brightness = 2.0 - (img3Eased * 1.0); // Bright flash entrance
  const img3Opacity = Math.min(1, img3Progress * 2.5);

  // Image 4 - Hero drop from heavens (95vh)
  const img4Eased = easeOutExpo(img4Progress);
  const img4TranslateY = (1 - img4Eased) * -95; // 95vh from above!
  const img4Scale = 0.15 + (img4Eased * 0.95);  // 0.15 → 1.1 (7x growth + overshoot)
  const img4Blur = (1 - img4Eased) * 35;        // Maximum blur to crystal clear
  const img4Brightness = 2.5 - (img4Eased * 1.5); // Glowing orb descending
  const img4Opacity = Math.min(1, img4Progress * 2);

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
            transform: `translateY(${img2TranslateY}vh) scale(${img2Scale})`,
            opacity: img2Opacity,
            filter: `blur(${img2Blur}px) brightness(${img2Brightness})`,
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
            transform: `translateX(${img3TranslateX}vw) scale(${img3Scale}) rotate(${img3Rotate}deg)`,
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

        {/* Image 4 - Hero Finale (Gravity Drop) */}
        <div
          className="relative w-[92vw] max-w-[550px]"
          style={{
            transform: `translateY(${img4TranslateY}vh) scale(${img4Scale})`,
            opacity: img4Opacity,
            filter: `blur(${img4Blur}px) brightness(${img4Brightness})`,
          }}
        >
          <img
            src={aerialEstatePool}
            alt="Stunning aerial view of completed estate with pool"
            className="w-full max-h-[45vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 25px 50px hsl(0 0% 0% / 0.5),
                0 0 40px hsl(35 80% 55% / ${0.5 * img4Opacity}),
                0 0 80px hsl(35 70% 50% / ${0.3 * img4Opacity}),
                0 0 120px hsl(168 70% 45% / ${0.2 * img4Opacity}),
                inset 0 0 30px hsl(35 60% 50% / ${0.1 * img4Opacity})
              `,
              border: `1px solid hsl(168 70% 45% / ${0.3 * img4Opacity})`,
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default MobileFirstImage;
