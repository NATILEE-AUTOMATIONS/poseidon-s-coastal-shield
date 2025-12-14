import React, { useMemo } from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import coastalHomeCrew from '@/assets/coastal-home-crew.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';

interface MobileFirstImageProps {
  progress: number;
}

// Smooth easing functions
const easeOutExpo = (x: number): number => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
const easeInQuad = (x: number): number => x * x;

// Phase calculator: returns 0-1 for enter, 1 for hold, 1-0 for exit
const getPhaseProgress = (
  localProgress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number
): { phase: 'hidden' | 'entering' | 'visible' | 'exiting'; value: number } => {
  if (localProgress < enterStart) {
    return { phase: 'hidden', value: 0 };
  }
  if (localProgress < enterEnd) {
    const raw = (localProgress - enterStart) / (enterEnd - enterStart);
    return { phase: 'entering', value: easeOutExpo(raw) };
  }
  if (localProgress < exitStart) {
    return { phase: 'visible', value: 1 };
  }
  if (localProgress < exitEnd) {
    const raw = (localProgress - exitStart) / (exitEnd - exitStart);
    return { phase: 'exiting', value: 1 - easeInQuad(raw) };
  }
  return { phase: 'hidden', value: 0 };
};

// For hero image (no exit)
const getEnterOnlyProgress = (
  localProgress: number,
  enterStart: number,
  enterEnd: number
): { phase: 'hidden' | 'entering' | 'visible'; value: number } => {
  if (localProgress < enterStart) {
    return { phase: 'hidden', value: 0 };
  }
  if (localProgress < enterEnd) {
    const raw = (localProgress - enterStart) / (enterEnd - enterStart);
    return { phase: 'entering', value: easeOutExpo(raw) };
  }
  return { phase: 'visible', value: 1 };
};

export const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // Gallery starts at 88% of section scroll
  const galleryStart = 0.88;
  const galleryEnd = 1.0;
  
  // Don't render until gallery zone
  if (progress < galleryStart - 0.02) return null;
  
  // Local progress 0-1 within gallery zone
  const localProgress = Math.max(0, Math.min(1, (progress - galleryStart) / (galleryEnd - galleryStart)));

  // === TIMING WINDOWS (all overlap for continuous motion) ===
  // Each element: [enterStart, enterEnd, exitStart, exitEnd]
  
  // Stars: 0.00 - 0.08 enter, 0.08 - 0.16 hold, 0.16 - 0.24 exit
  const stars = getPhaseProgress(localProgress, 0.00, 0.08, 0.16, 0.24);
  
  // Name: 0.04 - 0.12 enter, 0.12 - 0.20 hold, 0.20 - 0.28 exit
  const name = getPhaseProgress(localProgress, 0.04, 0.12, 0.20, 0.28);
  
  // Image 1: 0.08 - 0.18 enter, 0.18 - 0.26 hold, 0.26 - 0.36 exit
  const img1 = getPhaseProgress(localProgress, 0.08, 0.18, 0.26, 0.36);
  
  // Quote 1: 0.14 - 0.24 enter, 0.24 - 0.32 hold, 0.32 - 0.42 exit
  const quote1 = getPhaseProgress(localProgress, 0.14, 0.24, 0.32, 0.42);
  
  // Image 2: 0.28 - 0.38 enter, 0.38 - 0.46 hold, 0.46 - 0.56 exit
  const img2 = getPhaseProgress(localProgress, 0.28, 0.38, 0.46, 0.56);
  
  // Quote 2: 0.34 - 0.44 enter, 0.44 - 0.52 hold, 0.52 - 0.62 exit
  const quote2 = getPhaseProgress(localProgress, 0.34, 0.44, 0.52, 0.62);
  
  // Image 3: 0.48 - 0.58 enter, 0.58 - 0.66 hold, 0.66 - 0.76 exit
  const img3 = getPhaseProgress(localProgress, 0.48, 0.58, 0.66, 0.76);
  
  // Quote 3: 0.54 - 0.64 enter, 0.64 - 0.72 hold, 0.72 - 0.82 exit
  const quote3 = getPhaseProgress(localProgress, 0.54, 0.64, 0.72, 0.82);
  
  // Image 4 (Hero): 0.70 - 1.00 enter, stays visible (no exit)
  const img4 = getEnterOnlyProgress(localProgress, 0.70, 1.00);

  // Name character splitting for letter animation
  const customerName = "Bruce Gombar";
  const nameChars = useMemo(() => customerName.split(''), []);

  // Quote texts
  const quote1Text = "We were very pleased with the final results of our roof replacement.";
  const quote2Text = "We had some minor issues along the way...";
  const quote3Text = "But they were quickly corrected once we contacted the team.";

  // Typewriter effect helper
  const getTypewriterText = (text: string, progressValue: number): string => {
    const charCount = Math.floor(progressValue * text.length);
    return text.slice(0, charCount);
  };

  // Container opacity based on any element being visible
  const containerOpacity = Math.max(
    stars.value, name.value, img1.value, quote1.value,
    img2.value, quote2.value, img3.value, quote3.value, img4.value
  );

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none"
      style={{ opacity: containerOpacity }}
    >
      {/* Warm ambient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, hsl(25 40% 12% / ${containerOpacity * 0.95}) 0%, hsl(20 30% 6% / ${containerOpacity * 0.98}) 70%)`,
        }}
      />

      {/* === STARS === */}
      {stars.value > 0 && (
        <div 
          className="absolute top-[15%] left-1/2 -translate-x-1/2 flex gap-2"
          style={{
            opacity: stars.value,
            transform: `translateX(-50%) translateY(${(1 - stars.value) * 40}px)`,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => {
            const starDelay = i * 0.15;
            const starProgress = Math.max(0, Math.min(1, (stars.value - starDelay) / (1 - starDelay)));
            return (
              <span 
                key={i}
                className="text-4xl"
                style={{
                  opacity: starProgress,
                  transform: `scale(${0.5 + starProgress * 0.5})`,
                  textShadow: `0 0 ${20 * starProgress}px hsl(var(--accent))`,
                  color: 'hsl(var(--accent))',
                }}
              >
                ★
              </span>
            );
          })}
        </div>
      )}

      {/* === NAME === */}
      {name.value > 0 && (
        <div 
          className="absolute top-[22%] left-1/2 -translate-x-1/2 font-serif text-3xl tracking-wider"
          style={{ opacity: name.value }}
        >
          {nameChars.map((char, i) => {
            const charDelay = i * 0.06;
            const charProgress = Math.max(0, Math.min(1, (name.value - charDelay) / (1 - charDelay * nameChars.length)));
            return (
              <span
                key={i}
                style={{
                  opacity: charProgress,
                  filter: `blur(${(1 - charProgress) * 4}px)`,
                  color: 'hsl(var(--accent))',
                  textShadow: `0 0 ${15 * charProgress}px hsl(var(--accent) / 0.6)`,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      )}

      {/* === IMAGE 1 === */}
      {img1.value > 0 && (
        <div 
          className="absolute top-[30%] left-1/2 w-[85vw] max-w-[400px]"
          style={{
            opacity: img1.value,
            transform: `translateX(-50%) translateY(${(1 - img1.value) * 60}px) scale(${0.85 + img1.value * 0.15})`,
            filter: `blur(${(1 - img1.value) * 12}px)`,
          }}
        >
          <img 
            src={coastalRoofImage} 
            alt="Coastal roof project"
            className="w-full rounded-lg"
            style={{
              boxShadow: `
                0 0 30px hsl(var(--accent) / ${0.3 * img1.value}),
                0 0 60px hsl(var(--primary) / ${0.2 * img1.value}),
                0 20px 40px hsl(0 0% 0% / 0.5)
              `,
            }}
          />
        </div>
      )}

      {/* === QUOTE 1 === */}
      {quote1.value > 0 && (
        <div 
          className="absolute top-[58%] left-1/2 w-[85vw] max-w-[400px] text-center"
          style={{
            opacity: quote1.value,
            transform: `translateX(-50%) translateY(${(1 - quote1.value) * 30}px)`,
          }}
        >
          <p 
            className="text-lg font-light italic"
            style={{
              color: 'hsl(var(--foreground) / 0.9)',
              textShadow: '0 0 20px hsl(var(--accent) / 0.3)',
            }}
          >
            "{getTypewriterText(quote1Text, quote1.value)}"
            {quote1.value < 1 && <span className="animate-pulse">|</span>}
          </p>
        </div>
      )}

      {/* === IMAGE 2 === */}
      {img2.value > 0 && (
        <div 
          className="absolute top-[28%] left-1/2 w-[85vw] max-w-[400px]"
          style={{
            opacity: img2.value,
            transform: `translateX(-50%) translateY(${(1 - img2.value) * 80}px) scale(${0.8 + img2.value * 0.2})`,
            filter: `blur(${(1 - img2.value) * 15}px)`,
          }}
        >
          <img 
            src={coastalRoofInProgress} 
            alt="Roof in progress"
            className="w-full rounded-lg"
            style={{
              boxShadow: `
                0 0 30px hsl(var(--accent) / ${0.3 * img2.value}),
                0 0 60px hsl(var(--primary) / ${0.2 * img2.value}),
                0 20px 40px hsl(0 0% 0% / 0.5)
              `,
            }}
          />
        </div>
      )}

      {/* === QUOTE 2 === */}
      {quote2.value > 0 && (
        <div 
          className="absolute top-[56%] left-1/2 w-[85vw] max-w-[400px] text-center"
          style={{
            opacity: quote2.value,
            transform: `translateX(-50%) translateY(${(1 - quote2.value) * 30}px)`,
          }}
        >
          <p 
            className="text-lg font-light italic"
            style={{
              color: 'hsl(var(--foreground) / 0.85)',
              textShadow: '0 0 20px hsl(var(--accent) / 0.3)',
            }}
          >
            "{getTypewriterText(quote2Text, quote2.value)}"
            {quote2.value < 1 && <span className="animate-pulse">|</span>}
          </p>
        </div>
      )}

      {/* === IMAGE 3 === */}
      {img3.value > 0 && (
        <div 
          className="absolute top-[26%] left-1/2 w-[85vw] max-w-[400px]"
          style={{
            opacity: img3.value,
            transform: `translateX(${-50 + (1 - img3.value) * 60}%) translateY(${(1 - img3.value) * 40}px) scale(${0.75 + img3.value * 0.25}) rotate(${(1 - img3.value) * 8}deg)`,
            filter: `blur(${(1 - img3.value) * 18}px)`,
          }}
        >
          <img 
            src={coastalHomeCrew} 
            alt="Roofing crew"
            className="w-full rounded-lg"
            style={{
              boxShadow: `
                0 0 30px hsl(var(--accent) / ${0.3 * img3.value}),
                0 0 60px hsl(var(--primary) / ${0.2 * img3.value}),
                0 20px 40px hsl(0 0% 0% / 0.5)
              `,
            }}
          />
        </div>
      )}

      {/* === QUOTE 3 === */}
      {quote3.value > 0 && (
        <div 
          className="absolute top-[54%] left-1/2 w-[85vw] max-w-[400px] text-center"
          style={{
            opacity: quote3.value,
            transform: `translateX(-50%) translateY(${(1 - quote3.value) * 30}px)`,
          }}
        >
          <p 
            className="text-lg font-light italic"
            style={{
              color: 'hsl(var(--foreground) / 0.9)',
              textShadow: '0 0 25px hsl(var(--accent) / 0.4)',
            }}
          >
            "{getTypewriterText(quote3Text, quote3.value)}"
            {quote3.value < 1 && <span className="animate-pulse">|</span>}
          </p>
        </div>
      )}

      {/* === IMAGE 4 (HERO FINALE) === */}
      {img4.value > 0 && (
        <div 
          className="absolute top-[20%] left-1/2 w-[90vw] max-w-[450px]"
          style={{
            opacity: img4.value,
            transform: `translateX(-50%) translateY(${(1 - img4.value) * -120}px) scale(${0.6 + img4.value * 0.5})`,
            filter: `blur(${(1 - img4.value) * 25}px)`,
          }}
        >
          {/* Radial glow behind hero image */}
          <div 
            className="absolute inset-0 -z-10"
            style={{
              background: `radial-gradient(ellipse at center, hsl(var(--accent) / ${0.4 * img4.value}) 0%, transparent 70%)`,
              transform: 'scale(1.5)',
              filter: 'blur(40px)',
            }}
          />
          <img 
            src={aerialEstatePool} 
            alt="Completed estate project"
            className="w-full rounded-xl"
            style={{
              boxShadow: `
                0 0 50px hsl(var(--accent) / ${0.5 * img4.value}),
                0 0 100px hsl(var(--primary) / ${0.3 * img4.value}),
                0 0 150px hsl(var(--accent) / ${0.2 * img4.value}),
                0 30px 60px hsl(0 0% 0% / 0.6)
              `,
            }}
          />
        </div>
      )}

      {/* === PERSISTENT TESTIMONIAL WITH HERO === */}
      {img4.value > 0.5 && (
        <div 
          className="absolute bottom-[12%] left-1/2 w-[85vw] max-w-[400px] text-center"
          style={{
            opacity: Math.min(1, (img4.value - 0.5) * 2),
            transform: `translateX(-50%) translateY(${(1 - Math.min(1, (img4.value - 0.5) * 2)) * 20}px)`,
          }}
        >
          <div className="flex justify-center gap-1 mb-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <span 
                key={i}
                className="text-2xl"
                style={{
                  color: 'hsl(var(--accent))',
                  textShadow: '0 0 10px hsl(var(--accent) / 0.6)',
                }}
              >
                ★
              </span>
            ))}
          </div>
          <p 
            className="text-xl font-serif tracking-wide"
            style={{
              color: 'hsl(var(--accent))',
              textShadow: '0 0 15px hsl(var(--accent) / 0.5)',
            }}
          >
            Bruce Gombar
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileFirstImage;
