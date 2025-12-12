import React, { useMemo } from 'react';
import { Star } from 'lucide-react';

interface TestimonialRevealProps {
  progress: number;
}

const TestimonialReveal: React.FC<TestimonialRevealProps> = ({ progress }) => {
  const name = "Bruce Gombar";
  const quote = "We were very pleased with the final results of our roof replacement";
  
  // Animation timing
  const starsStart = 0.90;
  const nameStart = 0.92;
  const quoteStart = 0.94;
  const fadeOutStart = 0.98;
  
  // Calculate individual progress values
  const starsProgress = progress >= starsStart 
    ? Math.min(1, (progress - starsStart) / 0.03) 
    : 0;
  
  const nameProgress = progress >= nameStart 
    ? Math.min(1, (progress - nameStart) / 0.025) 
    : 0;
  
  const quoteProgress = progress >= quoteStart 
    ? Math.min(1, (progress - quoteStart) / 0.035) 
    : 0;
  
  // Fade out calculation
  const fadeOut = progress >= fadeOutStart 
    ? 1 - ((progress - fadeOutStart) / (1 - fadeOutStart))
    : 1;
  
  // Don't render until stars start
  if (progress < starsStart) return null;
  
  // Split name into characters for animation
  const nameChars = useMemo(() => name.split(''), []);
  
  // Calculate how many quote characters to show (typewriter effect)
  const visibleQuoteChars = Math.floor(quoteProgress * quote.length);
  const visibleQuote = quote.substring(0, visibleQuoteChars);
  const showCursor = quoteProgress > 0 && quoteProgress < 1;

  return (
    <div 
      className="fixed inset-x-0 bottom-0 pointer-events-none flex flex-col items-center justify-end pb-[8%] gap-4"
      style={{
        zIndex: 106,
        opacity: fadeOut,
      }}
    >
      {/* Stars Row */}
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3, 4].map((index) => {
          const starDelay = index * 0.2; // 20% of starsProgress per star
          const starProgress = Math.max(0, Math.min(1, (starsProgress - starDelay) / 0.25));
          
          // Overshoot bounce: 0->1.2->1
          const scale = starProgress < 0.6 
            ? 0.3 + (starProgress / 0.6) * 0.9 
            : 1.2 - ((starProgress - 0.6) / 0.4) * 0.2;
          
          const translateY = 50 - (starProgress * 50);
          const rotate = -15 + (starProgress * 15);
          const opacity = Math.min(1, starProgress * 2);
          
          // Glow intensity peaks at 60% progress
          const glowIntensity = starProgress < 0.6 
            ? starProgress / 0.6 
            : 1 - ((starProgress - 0.6) / 0.4) * 0.5;
          
          return (
            <Star
              key={index}
              size={32}
              fill="#FFD700"
              color="#FFD700"
              style={{
                transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                opacity,
                filter: `drop-shadow(0 0 ${10 + glowIntensity * 15}px #FFD700) drop-shadow(0 0 ${20 + glowIntensity * 20}px hsl(30 80% 50% / 0.6))`,
                transition: 'none',
              }}
            />
          );
        })}
      </div>
      
      {/* Name with character reveal */}
      <div className="flex items-center justify-center overflow-hidden">
        {nameChars.map((char, index) => {
          const charDelay = index * 0.08; // Stagger each character
          const charProgress = Math.max(0, Math.min(1, (nameProgress - charDelay) / 0.15));
          
          const opacity = charProgress;
          const blur = 8 - (charProgress * 8);
          const translateY = 20 - (charProgress * 20);
          
          return (
            <span
              key={index}
              className="text-2xl md:text-3xl font-semibold tracking-wide"
              style={{
                opacity,
                filter: `blur(${blur}px)`,
                transform: `translateY(${translateY}px)`,
                color: 'hsl(35 90% 95%)',
                textShadow: `0 0 20px hsl(30 80% 60% / ${0.5 * charProgress}), 0 0 40px hsl(30 70% 50% / ${0.3 * charProgress})`,
                display: 'inline-block',
                minWidth: char === ' ' ? '0.3em' : 'auto',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
      
      {/* Quote with typewriter effect */}
      <div 
        className="max-w-lg md:max-w-xl text-center px-6"
        style={{
          minHeight: '3rem',
        }}
      >
        <p 
          className="text-base md:text-lg font-light italic"
          style={{
            color: 'hsl(35 70% 85%)',
            textShadow: '0 0 20px hsl(30 80% 60% / 0.4)',
          }}
        >
          "{visibleQuote}
          {showCursor && (
            <span 
              className="inline-block w-0.5 h-5 ml-0.5 align-middle"
              style={{
                backgroundColor: 'hsl(30 80% 60%)',
                boxShadow: '0 0 10px hsl(30 80% 60%), 0 0 20px hsl(30 80% 60% / 0.5)',
                animation: 'pulse 0.8s ease-in-out infinite',
              }}
            />
          )}
          {quoteProgress >= 1 && '"'}
        </p>
      </div>
    </div>
  );
};

export default TestimonialReveal;
