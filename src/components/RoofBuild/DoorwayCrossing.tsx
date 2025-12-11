import React from 'react';

interface DoorwayCrossingProps {
  progress: number; // 0-1 (mapped from scroll progress)
}

const DoorwayCrossing: React.FC<DoorwayCrossingProps> = ({ progress }) => {
  if (progress <= 0) return null;

  // Exponential expansion for dramatic effect
  const easeOutExpo = 1 - Math.pow(1 - progress, 3);
  
  // Circle expands from door position (center-bottom) to fill screen
  // At 0: small circle matching doorway (~5% of screen)
  // At 1: massive circle covering everything (200%+)
  const circleSize = 5 + (easeOutExpo * 250); // 5% → 255%
  
  // Opacity builds up as we enter
  const opacity = Math.min(1, progress * 1.5);
  
  // The warm glow intensifies
  const glowIntensity = easeOutExpo;

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 100,
        opacity,
      }}
    >
      {/* Layer 1: Primary warm radial gradient expanding from door */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at 50% 82%,
            hsl(35 90% 65% / ${0.95 * glowIntensity}) 0%,
            hsl(32 85% 55% / ${0.85 * glowIntensity}) ${circleSize * 0.15}%,
            hsl(28 80% 45% / ${0.7 * glowIntensity}) ${circleSize * 0.35}%,
            hsl(25 70% 35% / ${0.4 * glowIntensity}) ${circleSize * 0.6}%,
            transparent ${circleSize}%
          )`,
        }}
      />
      
      {/* Layer 2: Bright inner core */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at 50% 82%,
            hsl(40 95% 85% / ${0.9 * glowIntensity}) 0%,
            hsl(38 90% 70% / ${0.6 * glowIntensity}) ${circleSize * 0.08}%,
            transparent ${circleSize * 0.25}%
          )`,
        }}
      />
      
      {/* Layer 3: Soft bloom effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 120% 100% at 50% 82%,
            hsl(30 85% 60% / ${0.3 * glowIntensity}) 0%,
            hsl(28 75% 50% / ${0.15 * glowIntensity}) ${circleSize * 0.5}%,
            transparent ${circleSize * 0.9}%
          )`,
          filter: `blur(${20 * glowIntensity}px)`,
        }}
      />

      {/* Layer 4: Final white-out as we fully enter */}
      {progress > 0.7 && (
        <div 
          className="absolute inset-0"
          style={{
            background: `hsl(40 60% 97%)`,
            opacity: (progress - 0.7) / 0.3,
          }}
        />
      )}
    </div>
  );
};

export default DoorwayCrossing;
