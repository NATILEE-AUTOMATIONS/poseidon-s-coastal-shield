import React from 'react';

interface SunsetSkyProps {
  progress: number; // 0-1 where 0 is orange handoff, 1 is full sunset
}

const SunsetSky: React.FC<SunsetSkyProps> = ({ progress }) => {
  // Easing for smooth transitions
  const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x);
  const easedProgress = easeOutQuad(progress);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base sunset gradient - morphs from warm orange to full sunset */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(180deg,
            hsl(${35 - easedProgress * 20} ${90 + easedProgress * 10}% ${70 - easedProgress * 25}%) 0%,
            hsl(${25 - easedProgress * 15} ${85 + easedProgress * 15}% ${55 - easedProgress * 15}%) 25%,
            hsl(${15 - easedProgress * 10} ${80 + easedProgress * 20}% ${45 - easedProgress * 10}%) 45%,
            hsl(${350 + easedProgress * 10} ${70 + easedProgress * 15}% ${40 - easedProgress * 5}%) 65%,
            hsl(${280 + easedProgress * 20} ${50 + easedProgress * 20}% ${30 + easedProgress * 5}%) 85%,
            hsl(${240 + easedProgress * 20} ${40 + easedProgress * 20}% ${15 + easedProgress * 10}%) 100%
          )`,
          opacity: Math.min(1, progress * 2),
        }}
      />
      
      {/* Sun glow at horizon */}
      <div 
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '35%',
          width: '200%',
          height: '60%',
          background: `radial-gradient(ellipse at 50% 100%,
            hsl(40 100% 70% / ${0.6 * easedProgress}) 0%,
            hsl(35 95% 60% / ${0.4 * easedProgress}) 20%,
            hsl(25 90% 50% / ${0.2 * easedProgress}) 40%,
            transparent 70%
          )`,
          opacity: easedProgress,
        }}
      />
      
      {/* Sun rays */}
      {progress > 0.3 && (
        <div 
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: '30%',
            width: '100%',
            height: '50%',
            opacity: Math.min(1, (progress - 0.3) * 2) * 0.4,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-1/2 origin-bottom"
              style={{
                width: '4px',
                height: '150px',
                background: `linear-gradient(to top, 
                  hsl(40 100% 75% / 0.5),
                  transparent
                )`,
                transform: `translateX(-50%) rotate(${(i - 3.5) * 12}deg)`,
                filter: 'blur(3px)',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Subtle clouds */}
      {progress > 0.4 && (
        <>
          <div 
            className="absolute"
            style={{
              top: '15%',
              left: '10%',
              width: '25%',
              height: '8%',
              background: `radial-gradient(ellipse at center, 
                hsl(350 60% 60% / ${0.3 * (progress - 0.4)}) 0%,
                transparent 70%
              )`,
              filter: 'blur(20px)',
            }}
          />
          <div 
            className="absolute"
            style={{
              top: '20%',
              right: '15%',
              width: '20%',
              height: '6%',
              background: `radial-gradient(ellipse at center, 
                hsl(25 80% 65% / ${0.25 * (progress - 0.4)}) 0%,
                transparent 70%
              )`,
              filter: 'blur(15px)',
            }}
          />
        </>
      )}
    </div>
  );
};

export default SunsetSky;
