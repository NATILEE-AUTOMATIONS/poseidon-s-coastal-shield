import React, { useMemo } from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';

interface MobileFirstImageProps {
  progress: number;
}

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // Animation starts when door zoom completes at 88%
  const animationStart = 0.88;
  const isVisible = progress >= animationStart - 0.02;

  // Normalize progress for animation (0 = start, 1 = complete)
  const animProgress = Math.max(0, Math.min(1, (progress - animationStart) / 0.12));

  // Testimonial data
  const name = "Bruce Gombar";
  const nameChars = useMemo(() => name.split(''), []);

  // Easing functions
  const easeOutBack = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const easeOutQuad = (t: number) => 1 - Math.pow(1 - t, 2);

  // Stars animation (0-33% of animation)
  const getStarStyle = (index: number) => {
    const starStart = index * 0.05;
    const starProgress = Math.max(0, Math.min(1, (animProgress - starStart) / 0.25));
    const easedProgress = easeOutBack(starProgress);
    
    const translateY = (1 - easedProgress) * -60;
    const scale = easedProgress * 1.2 - (easedProgress > 0.8 ? (easedProgress - 0.8) * 1 : 0);
    const opacity = starProgress;
    const glowIntensity = easedProgress * 24;

    return {
      transform: `translateY(${translateY}px) scale(${Math.max(0, scale)})`,
      opacity,
      filter: `drop-shadow(0 0 ${glowIntensity}px hsl(35 80% 55%)) drop-shadow(0 0 ${glowIntensity * 1.5}px hsl(35 70% 45%))`,
      color: 'hsl(35 80% 55%)',
    };
  };

  // Name character animation (33-66% of animation)
  const getCharStyle = (index: number) => {
    const charStart = 0.25 + index * 0.03;
    const charProgress = Math.max(0, Math.min(1, (animProgress - charStart) / 0.2));
    const easedProgress = easeOutQuad(charProgress);
    
    const translateY = (1 - easedProgress) * 25;
    const blur = (1 - easedProgress) * 8;
    const opacity = charProgress;
    const glowIntensity = easedProgress * 20;

    return {
      transform: `translateY(${translateY}px)`,
      opacity,
      filter: `blur(${blur}px)`,
      textShadow: `0 0 ${glowIntensity}px hsl(35 70% 55% / 0.6), 0 0 ${glowIntensity * 2}px hsl(35 60% 45% / 0.3)`,
      display: 'inline-block',
    };
  };

  // Photo animation (66-100% of animation)
  const getPhotoStyle = () => {
    const photoStart = 0.55;
    const photoProgress = Math.max(0, Math.min(1, (animProgress - photoStart) / 0.45));
    const easedProgress = easeOutBack(photoProgress);
    
    const translateY = (1 - easedProgress) * -120;
    const rotate = (1 - easedProgress) * -8;
    const scale = 0.85 + easedProgress * 0.15;
    const opacity = photoProgress;
    const glowIntensity = easedProgress * 40;

    return {
      transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
      opacity,
      boxShadow: `
        0 ${20 + glowIntensity}px ${40 + glowIntensity}px hsl(0 0% 0% / 0.4),
        0 0 ${30 + glowIntensity}px hsl(35 60% 50% / ${0.1 + easedProgress * 0.3}),
        0 0 ${60 + glowIntensity}px hsl(168 70% 45% / ${0.05 + easedProgress * 0.15})
      `,
    };
  };

  if (!isVisible) return null;

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-start pt-16 px-4 pb-8"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / 0.95) 0%, hsl(25 30% 8% / 0.98) 100%)`,
      }}
    >
      <div className="flex flex-col items-center gap-5 w-full max-w-[500px]">
        
        {/* Stars - Cascade Drop */}
        <div className="flex gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="text-5xl"
              style={getStarStyle(i)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Name - Character Reveal */}
        <div 
          className="text-4xl md:text-5xl font-bold tracking-widest uppercase"
          style={{ color: 'hsl(35 60% 70%)' }}
        >
          {nameChars.map((char, i) => (
            <span key={i} style={getCharStyle(i)}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* First Photo - Polaroid Drop */}
        <div className="relative w-[88vw] max-w-[500px]">
          <img
            src={coastalRoofImage}
            alt="Beautiful coastal roof project"
            className="w-full max-h-[40vh] object-cover rounded-xl"
            style={getPhotoStyle()}
          />
        </div>

      </div>
    </div>
  );
};

export default MobileFirstImage;
