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
  
  return (
    <g className="doorway-glow">
      <defs>
        <radialGradient id="warmGlow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="hsl(40 90% 70%)" />
          <stop offset="40%" stopColor="hsl(32 80% 45%)" />
          <stop offset="100%" stopColor="hsl(25 50% 10%)" />
        </radialGradient>
      </defs>
      
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#warmGlow)"
        opacity={totalIntensity}
      />
    </g>
  );
};

export default DoorwayGrid;
