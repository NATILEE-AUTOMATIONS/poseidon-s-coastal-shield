import React from 'react';

interface DoorwayGridProps {
  lightIntensity: number;
  lightBoost?: number;
}

const DoorwayGrid: React.FC<DoorwayGridProps> = ({ lightIntensity, lightBoost = 0 }) => {
  const totalIntensity = Math.min(1, lightIntensity + lightBoost * 0.5);
  
  const doorLeft = 177.5;
  const doorRight = 222.5;
  const doorTop = 195;
  const doorBottom = 265;
  const doorWidth = doorRight - doorLeft;
  const doorHeight = doorBottom - doorTop;

  // Grid line positions (2 vertical, 4 horizontal for 3x5 grid)
  const verticalLines = [0.33, 0.66];
  const horizontalLines = [0.2, 0.4, 0.6, 0.8];
  
  return (
    <g className="doorway-grid">
      <defs>
        {/* Dark background gradient */}
        <linearGradient id="doorwayBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(25 40% 12%)" />
          <stop offset="100%" stopColor="hsl(25 40% 5%)" />
        </linearGradient>
        
        {/* Orange glow filter */}
        <filter id="orangeGridGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="hsl(32 80% 55%)" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="hsl(32 70% 45%)" floodOpacity="0.5" />
        </filter>
      </defs>
      
      {/* Dark background */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#doorwayBg)"
        opacity={totalIntensity}
      />
      
      {/* Orange grid lines */}
      <g filter="url(#orangeGridGlow)" opacity={totalIntensity}>
        {/* Vertical lines */}
        {verticalLines.map((pos, i) => (
          <line
            key={`v-${i}`}
            x1={doorLeft + doorWidth * pos}
            y1={doorTop}
            x2={doorLeft + doorWidth * pos}
            y2={doorBottom}
            stroke="hsl(32 70% 50%)"
            strokeWidth="1.2"
          />
        ))}
        
        {/* Horizontal lines */}
        {horizontalLines.map((pos, i) => (
          <line
            key={`h-${i}`}
            x1={doorLeft}
            y1={doorTop + doorHeight * pos}
            x2={doorRight}
            y2={doorTop + doorHeight * pos}
            stroke="hsl(32 70% 50%)"
            strokeWidth="1.2"
          />
        ))}
      </g>
    </g>
  );
};

export default DoorwayGrid;
