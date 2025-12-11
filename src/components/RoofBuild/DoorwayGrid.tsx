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
    <g className="doorway-grid">
      <defs>
        <radialGradient id="doorwayWarmth" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="hsl(35 80% 55%)" />
          <stop offset="50%" stopColor="hsl(30 60% 30%)" />
          <stop offset="100%" stopColor="hsl(25 40% 8%)" />
        </radialGradient>
      </defs>
      
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#doorwayWarmth)"
        opacity={totalIntensity}
      />
    </g>
  );
};

export default DoorwayGrid;
