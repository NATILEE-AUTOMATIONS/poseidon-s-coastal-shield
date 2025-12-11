import React from 'react';

interface DoorwayGridProps {
  lightIntensity: number; // 0-1
  lightBoost?: number; // 0-1 additional glow during zoom
}

const DoorwayGrid: React.FC<DoorwayGridProps> = ({ lightIntensity, lightBoost = 0 }) => {
  const totalIntensity = Math.min(1, lightIntensity + lightBoost * 0.3);
  
  // Door frame boundaries
  const doorLeft = 177.5;
  const doorRight = 222.5;
  const doorTop = 195;
  const doorBottom = 265;
  const doorWidth = doorRight - doorLeft;
  const doorHeight = doorBottom - doorTop;
  const doorCenterX = doorLeft + doorWidth / 2;
  
  // Vanishing point (inside the house, at horizon level)
  const vanishY = doorTop + doorHeight * 0.35; // About 1/3 from top
  
  // Generate horizontal lines with perspective (denser near vanishing point)
  const horizontalLines = [];
  const numHLines = 12;
  for (let i = 0; i <= numHLines; i++) {
    // Exponential spacing - lines get further apart as we go down
    const t = i / numHLines;
    const exponentialT = Math.pow(t, 1.8);
    const y = vanishY + (doorBottom - vanishY) * exponentialT;
    
    // Width narrows toward vanishing point
    const widthFactor = 0.1 + exponentialT * 0.9;
    const lineHalfWidth = (doorWidth / 2) * widthFactor;
    
    // Opacity fades near vanishing point
    const opacity = 0.2 + exponentialT * 0.6;
    
    horizontalLines.push(
      <line
        key={`h-${i}`}
        x1={doorCenterX - lineHalfWidth}
        y1={y}
        x2={doorCenterX + lineHalfWidth}
        y2={y}
        stroke="hsl(32 85% 55%)"
        strokeWidth={0.5 + exponentialT * 0.5}
        opacity={opacity * totalIntensity}
      />
    );
  }
  
  // Generate vertical lines radiating from vanishing point
  const verticalLines = [];
  const numVLines = 9;
  for (let i = 0; i <= numVLines; i++) {
    const t = i / numVLines; // 0 to 1 across the door width
    
    // Start from vanishing point center
    const startX = doorCenterX;
    
    // End at bottom of door, spread across width
    const endX = doorLeft + doorWidth * t;
    
    // Opacity varies - center lines brighter
    const centerDistance = Math.abs(t - 0.5) * 2;
    const opacity = 0.3 + (1 - centerDistance) * 0.5;
    
    verticalLines.push(
      <line
        key={`v-${i}`}
        x1={startX}
        y1={vanishY}
        x2={endX}
        y2={doorBottom}
        stroke="hsl(32 80% 50%)"
        strokeWidth={0.4 + (1 - centerDistance) * 0.4}
        opacity={opacity * totalIntensity}
      />
    );
  }
  
  return (
    <g className="doorway-grid">
      {/* Clip path to constrain grid to doorway */}
      <defs>
        <clipPath id="doorwayClip">
          <rect x={doorLeft} y={doorTop} width={doorWidth} height={doorHeight} />
        </clipPath>
        
        {/* Radial gradient for depth/vignette */}
        <radialGradient id="portalVignette" cx="50%" cy="30%" r="80%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="hsl(32 90% 60%)" stopOpacity="0.6" />
          <stop offset="60%" stopColor="hsl(32 85% 45%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(25 70% 25%)" stopOpacity="0.8" />
        </radialGradient>
        
        {/* Horizon glow filter */}
        <filter id="horizonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background warmth inside doorway */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#portalVignette)"
        opacity={totalIntensity * 0.9}
      />
      
      {/* Grid lines clipped to doorway */}
      <g clipPath="url(#doorwayClip)">
        {/* Vertical radiating lines (behind horizontal) */}
        {verticalLines}
        
        {/* Horizontal perspective lines */}
        {horizontalLines}
        
        {/* Bright horizon line at vanishing point */}
        <line
          x1={doorLeft + 5}
          y1={vanishY}
          x2={doorRight - 5}
          y2={vanishY}
          stroke="hsl(32 95% 65%)"
          strokeWidth={1.5 + lightBoost}
          opacity={0.8 * totalIntensity}
          filter="url(#horizonGlow)"
          strokeLinecap="round"
        />
        
        {/* Central vanishing point glow */}
        <circle
          cx={doorCenterX}
          cy={vanishY}
          r={3 + lightBoost * 2}
          fill="hsl(32 100% 75%)"
          opacity={0.6 * totalIntensity}
          filter="url(#horizonGlow)"
        />
      </g>
      
      {/* Floor reflection glow */}
      <ellipse
        cx={doorCenterX}
        cy={doorBottom + 2}
        rx={doorWidth * 0.6}
        ry={4 + lightBoost * 3}
        fill="hsl(32 90% 55%)"
        opacity={0.25 * totalIntensity}
        style={{ filter: 'blur(4px)' }}
      />
    </g>
  );
};

export default DoorwayGrid;
