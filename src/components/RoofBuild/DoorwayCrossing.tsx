import React from 'react';

interface DoorwayCrossingProps {
  progress: number; // 0-1 crossing progress
  zoomProgress: number; // 0-1 zoom progress (to track door position)
}

const DoorwayCrossing: React.FC<DoorwayCrossingProps> = ({ progress, zoomProgress }) => {
  if (progress <= 0) return null;

  // Calculate door's actual screen position as zoom changes
  // At zoomProgress=0: door is at ~65% down the screen
  // At zoomProgress=1: door has moved toward center due to translateY and zoom
  const doorYPosition = 65 - (zoomProgress * 25); // 65% → 40% (follows door up)
  
  // Smoother easing for walking-through feel
  const easeOutQuart = 1 - Math.pow(1 - progress, 4);
  
  // Circle expands from door position to fill screen
  const circleSize = 3 + (easeOutQuart * 200); // Start smaller, expand smoother
  
  // Opacity builds gradually
  const opacity = Math.min(1, progress * 1.2);
  
  // The warm glow intensifies
  const glowIntensity = easeOutQuart;

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
            circle at 50% ${doorYPosition}%,
            hsl(35 90% 65% / ${0.95 * glowIntensity}) 0%,
            hsl(32 85% 55% / ${0.85 * glowIntensity}) ${circleSize * 0.12}%,
            hsl(28 80% 45% / ${0.7 * glowIntensity}) ${circleSize * 0.3}%,
            hsl(25 70% 35% / ${0.4 * glowIntensity}) ${circleSize * 0.55}%,
            transparent ${circleSize}%
          )`,
        }}
      />
      
      {/* Layer 2: Bright inner core - the door opening */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at 50% ${doorYPosition}%,
            hsl(40 95% 90% / ${0.95 * glowIntensity}) 0%,
            hsl(38 90% 75% / ${0.7 * glowIntensity}) ${circleSize * 0.06}%,
            transparent ${circleSize * 0.2}%
          )`,
        }}
      />
      
      {/* Layer 3: Soft bloom effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 100% 80% at 50% ${doorYPosition}%,
            hsl(30 85% 60% / ${0.25 * glowIntensity}) 0%,
            hsl(28 75% 50% / ${0.12 * glowIntensity}) ${circleSize * 0.4}%,
            transparent ${circleSize * 0.8}%
          )`,
          filter: `blur(${15 * glowIntensity}px)`,
        }}
      />

      {/* Layer 4: Final warm white-out as we fully enter */}
      {progress > 0.6 && (
        <div 
          className="absolute inset-0"
          style={{
            background: `hsl(40 50% 96%)`,
            opacity: (progress - 0.6) / 0.4,
          }}
        />
      )}
    </div>
  );
};

export default DoorwayCrossing;
