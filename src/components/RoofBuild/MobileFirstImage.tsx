import React, { useMemo } from 'react';
import coastalRoofProject from '@/assets/coastal-roof-project.png';
import coastalRoofInprogress from '@/assets/coastal-roof-inprogress.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import multilevelRoofTeam from '@/assets/multilevel-roof-team.png';

interface MobileFirstImageProps {
  progress: number;
}

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  const animationStart = 0.88;
  const isVisible = progress >= animationStart - 0.02;

  // Normalize progress for animation (0 = start, 1 = complete over 0.12 range)
  const animProgress = Math.max(0, Math.min(1, (progress - animationStart) / 0.12));

  // Content data
  const name = "Bruce Gombar";
  const nameChars = useMemo(() => name.split(''), []);
  
  const reviews = [
    "We were very pleased with the final results",
    "of our roof replacement.",
    "Poseidon Roofing exceeded our expectations."
  ];

  const photos = [
    { src: coastalRoofProject, alt: "Beautiful coastal roof project" },
    { src: coastalRoofInprogress, alt: "Roof replacement in progress" },
    { src: aerialEstatePool, alt: "Aerial view of estate with pool" },
    { src: multilevelRoofTeam, alt: "Team working on multilevel roof" }
  ];

  // Easing functions
  const easeOutBack = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const easeOutQuad = (t: number) => 1 - Math.pow(1 - t, 2);
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  // Animation timing helpers
  const getElementProgress = (startOffset: number, duration: number = 0.25) => {
    const elementStart = startOffset;
    return Math.max(0, Math.min(1, (animProgress - elementStart) / duration));
  };

  // Stars animation (0-25% of animation)
  const getStarStyle = (index: number) => {
    const starStart = index * 0.04;
    const starProgress = getElementProgress(starStart, 0.20);
    const easedProgress = easeOutBack(starProgress);
    
    const translateY = (1 - easedProgress) * -50;
    const scale = easedProgress * 1.15 - (easedProgress > 0.85 ? (easedProgress - 0.85) * 0.75 : 0);
    const opacity = starProgress;
    const glowIntensity = easedProgress * 20;

    return {
      transform: `translateY(${translateY}px) scale(${Math.max(0, scale)})`,
      opacity,
      filter: `drop-shadow(0 0 ${glowIntensity}px hsl(35 80% 55%)) drop-shadow(0 0 ${glowIntensity * 1.5}px hsl(35 70% 45%))`,
      color: 'hsl(35 80% 55%)',
    };
  };

  // Name character animation (15-40% of animation)
  const getCharStyle = (index: number) => {
    const charStart = 0.15 + index * 0.02;
    const charProgress = getElementProgress(charStart, 0.18);
    const easedProgress = easeOutQuad(charProgress);
    
    const translateY = (1 - easedProgress) * 20;
    const blur = (1 - easedProgress) * 6;
    const opacity = charProgress;
    const glowIntensity = easedProgress * 16;

    return {
      transform: `translateY(${translateY}px)`,
      opacity,
      filter: `blur(${blur}px)`,
      textShadow: `0 0 ${glowIntensity}px hsl(35 70% 55% / 0.6), 0 0 ${glowIntensity * 2}px hsl(35 60% 45% / 0.3)`,
      display: 'inline-block',
    };
  };

  // Photo animation - alternating drop and slide patterns
  const getPhotoStyle = (index: number) => {
    const photoStarts = [0.30, 0.50, 0.70, 0.88];
    const photoProgress = getElementProgress(photoStarts[index], 0.22);
    const easedProgress = easeOutBack(photoProgress);
    
    const isOdd = index % 2 === 0;
    
    // Odd photos drop from above, even photos slide from side
    const translateY = isOdd ? (1 - easedProgress) * -100 : (1 - easedProgress) * 30;
    const translateX = isOdd ? 0 : (1 - easedProgress) * (index === 1 ? 80 : -80);
    const rotate = isOdd ? (1 - easedProgress) * -6 : 0;
    const scale = 0.9 + easedProgress * 0.1;
    const opacity = photoProgress;
    const glowIntensity = easedProgress * 30;

    return {
      transform: `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
      opacity,
      boxShadow: `
        0 ${15 + glowIntensity * 0.5}px ${30 + glowIntensity}px hsl(0 0% 0% / 0.5),
        0 0 ${20 + glowIntensity}px hsl(35 60% 50% / ${0.1 + easedProgress * 0.25}),
        0 0 ${40 + glowIntensity}px hsl(168 70% 45% / ${0.05 + easedProgress * 0.1}),
        inset 0 0 0 2px hsl(168 70% 45% / ${0.15 + easedProgress * 0.1})
      `,
    };
  };

  // Review text animation
  const getReviewStyle = (index: number) => {
    const reviewStarts = [0.42, 0.62, 0.82];
    const reviewProgress = getElementProgress(reviewStarts[index], 0.20);
    const easedProgress = easeOutCubic(reviewProgress);
    
    const translateY = (1 - easedProgress) * 25;
    const opacity = reviewProgress;
    const glowIntensity = easedProgress * 12;

    return {
      transform: `translateY(${translateY}px)`,
      opacity,
      textShadow: `0 0 ${glowIntensity}px hsl(35 70% 55% / 0.5), 0 0 ${glowIntensity * 2}px hsl(35 60% 45% / 0.25)`,
    };
  };

  if (!isVisible) return null;

  return (
    <div 
      className="relative w-full flex flex-col items-center px-4 py-12 gap-8"
      style={{
        background: `radial-gradient(ellipse at center top, hsl(25 35% 12%) 0%, hsl(20 25% 6%) 100%)`,
      }}
    >
      {/* Stars */}
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="text-4xl"
            style={getStarStyle(i)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Name */}
      <div 
        className="text-3xl font-bold tracking-wider uppercase text-center"
        style={{ color: 'hsl(35 60% 70%)' }}
      >
        {nameChars.map((char, i) => (
          <span key={i} style={getCharStyle(i)}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Photo 1 */}
      <div className="w-[88vw] max-w-[500px]">
        <img
          src={photos[0].src}
          alt={photos[0].alt}
          className="w-full h-auto max-h-[35vh] object-cover rounded-xl"
          style={getPhotoStyle(0)}
        />
      </div>

      {/* Review 1 */}
      <p 
        className="text-lg text-center px-4 font-medium italic"
        style={{ 
          color: 'hsl(35 50% 75%)',
          ...getReviewStyle(0)
        }}
      >
        "{reviews[0]}"
      </p>

      {/* Photo 2 */}
      <div className="w-[88vw] max-w-[500px]">
        <img
          src={photos[1].src}
          alt={photos[1].alt}
          className="w-full h-auto max-h-[35vh] object-cover rounded-xl"
          style={getPhotoStyle(1)}
        />
      </div>

      {/* Review 2 */}
      <p 
        className="text-lg text-center px-4 font-medium italic"
        style={{ 
          color: 'hsl(35 50% 75%)',
          ...getReviewStyle(1)
        }}
      >
        "{reviews[1]}"
      </p>

      {/* Photo 3 */}
      <div className="w-[88vw] max-w-[500px]">
        <img
          src={photos[2].src}
          alt={photos[2].alt}
          className="w-full h-auto max-h-[35vh] object-cover rounded-xl"
          style={getPhotoStyle(2)}
        />
      </div>

      {/* Review 3 */}
      <p 
        className="text-lg text-center px-4 font-medium italic"
        style={{ 
          color: 'hsl(35 50% 75%)',
          ...getReviewStyle(2)
        }}
      >
        "{reviews[2]}"
      </p>

      {/* Photo 4 */}
      <div className="w-[88vw] max-w-[500px]">
        <img
          src={photos[3].src}
          alt={photos[3].alt}
          className="w-full h-auto max-h-[35vh] object-cover rounded-xl"
          style={getPhotoStyle(3)}
        />
      </div>
    </div>
  );
};

export default MobileFirstImage;
