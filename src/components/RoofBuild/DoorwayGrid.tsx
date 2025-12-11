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
  
  // 3D Room dimensions
  const backWallY = doorTop + doorHeight * 0.25; // Back wall at 25% from top
  const backWallWidth = doorWidth * 0.4; // Back wall is narrower (perspective)
  const backWallLeft = doorCenterX - backWallWidth / 2;
  const backWallRight = doorCenterX + backWallWidth / 2;
  
  // Generate floor grid lines
  const floorLines = [];
  const numFloorHLines = 8;
  const numFloorVLines = 7;
  
  // Horizontal floor lines (receding into distance)
  for (let i = 0; i <= numFloorHLines; i++) {
    const t = i / numFloorHLines;
    // Exponential spacing - lines get closer together as they recede
    const perspectiveT = Math.pow(t, 0.6);
    const y = backWallY + (doorBottom - backWallY) * (1 - perspectiveT);
    
    // Width narrows toward back wall
    const widthFactor = 0.4 + (1 - perspectiveT) * 0.6;
    const lineLeft = doorCenterX - (doorWidth / 2) * widthFactor;
    const lineRight = doorCenterX + (doorWidth / 2) * widthFactor;
    
    // Opacity fades toward back
    const opacity = 0.3 + (1 - perspectiveT) * 0.5;
    const strokeWidth = 0.3 + (1 - perspectiveT) * 0.5;
    
    floorLines.push(
      <line
        key={`fh-${i}`}
        x1={lineLeft}
        y1={y}
        x2={lineRight}
        y2={y}
        stroke="hsl(32 75% 45%)"
        strokeWidth={strokeWidth}
        opacity={opacity * totalIntensity}
      />
    );
  }
  
  // Vertical floor lines (converging to back wall)
  for (let i = 0; i <= numFloorVLines; i++) {
    const t = i / numFloorVLines;
    
    // Start at door bottom, spread across width
    const startX = doorLeft + doorWidth * t;
    
    // End at back wall, converged
    const endX = backWallLeft + backWallWidth * t;
    
    // Center lines brighter
    const centerDistance = Math.abs(t - 0.5) * 2;
    const opacity = 0.25 + (1 - centerDistance) * 0.35;
    
    floorLines.push(
      <line
        key={`fv-${i}`}
        x1={startX}
        y1={doorBottom}
        x2={endX}
        y2={backWallY}
        stroke="hsl(32 70% 42%)"
        strokeWidth={0.4}
        opacity={opacity * totalIntensity}
      />
    );
  }
  
  // Left wall grid
  const leftWallLines = [];
  const numWallHLines = 5;
  
  for (let i = 0; i <= numWallHLines; i++) {
    const t = i / numWallHLines;
    const perspectiveT = Math.pow(t, 0.7);
    
    // Y position from back wall top to door bottom
    const y = backWallY + (doorBottom - backWallY) * perspectiveT;
    
    // X positions - from door edge to back wall edge
    const startX = doorLeft + (backWallLeft - doorLeft) * (1 - perspectiveT);
    const endX = backWallLeft;
    
    const opacity = 0.2 + perspectiveT * 0.3;
    
    leftWallLines.push(
      <line
        key={`lw-${i}`}
        x1={startX}
        y1={y}
        x2={endX}
        y2={y}
        stroke="hsl(32 65% 38%)"
        strokeWidth={0.3 + perspectiveT * 0.3}
        opacity={opacity * totalIntensity}
      />
    );
  }
  
  // Left wall vertical lines
  const numWallVLines = 3;
  for (let i = 0; i <= numWallVLines; i++) {
    const t = i / numWallVLines;
    
    // Bottom edge of left wall
    const bottomX = doorLeft + (backWallLeft - doorLeft) * t;
    
    // Top edge converges to back wall corner
    const topX = backWallLeft;
    const topY = backWallY;
    const bottomY = doorBottom - (doorBottom - backWallY) * t;
    
    leftWallLines.push(
      <line
        key={`lwv-${i}`}
        x1={bottomX}
        y1={doorBottom}
        x2={topX}
        y2={topY + (bottomY - topY) * (1 - t)}
        stroke="hsl(32 60% 35%)"
        strokeWidth={0.3}
        opacity={0.2 * totalIntensity}
      />
    );
  }
  
  // Right wall grid (mirror of left)
  const rightWallLines = [];
  
  for (let i = 0; i <= numWallHLines; i++) {
    const t = i / numWallHLines;
    const perspectiveT = Math.pow(t, 0.7);
    
    const y = backWallY + (doorBottom - backWallY) * perspectiveT;
    
    const startX = backWallRight;
    const endX = doorRight - (doorRight - backWallRight) * (1 - perspectiveT);
    
    const opacity = 0.2 + perspectiveT * 0.3;
    
    rightWallLines.push(
      <line
        key={`rw-${i}`}
        x1={startX}
        y1={y}
        x2={endX}
        y2={y}
        stroke="hsl(32 65% 38%)"
        strokeWidth={0.3 + perspectiveT * 0.3}
        opacity={opacity * totalIntensity}
      />
    );
  }
  
  // Right wall vertical lines
  for (let i = 0; i <= numWallVLines; i++) {
    const t = i / numWallVLines;
    
    const bottomX = doorRight - (doorRight - backWallRight) * t;
    const topX = backWallRight;
    const topY = backWallY;
    const bottomY = doorBottom - (doorBottom - backWallY) * t;
    
    rightWallLines.push(
      <line
        key={`rwv-${i}`}
        x1={bottomX}
        y1={doorBottom}
        x2={topX}
        y2={topY + (bottomY - topY) * (1 - t)}
        stroke="hsl(32 60% 35%)"
        strokeWidth={0.3}
        opacity={0.2 * totalIntensity}
      />
    );
  }
  
  return (
    <g className="doorway-grid">
      <defs>
        <clipPath id="doorwayClip">
          <rect x={doorLeft} y={doorTop} width={doorWidth} height={doorHeight} />
        </clipPath>
        
        {/* Warm ambient gradient for back wall */}
        <linearGradient id="backWallGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="hsl(32 85% 50%)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="hsl(32 75% 40%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(28 70% 30%)" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Ambient room glow */}
        <radialGradient id="roomAmbient" cx="50%" cy="30%" r="90%">
          <stop offset="0%" stopColor="hsl(32 80% 55%)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="hsl(30 70% 35%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(25 60% 20%)" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      
      {/* Ambient room warmth */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#roomAmbient)"
        opacity={totalIntensity * 0.8}
      />
      
      {/* Back wall (simple warm glow, no grid) */}
      <polygon
        points={`
          ${backWallLeft},${backWallY}
          ${backWallRight},${backWallY}
          ${backWallRight},${backWallY + 15}
          ${backWallLeft},${backWallY + 15}
        `}
        fill="url(#backWallGradient)"
        opacity={totalIntensity * 0.9}
      />
      
      {/* All grid lines clipped to doorway */}
      <g clipPath="url(#doorwayClip)">
        {/* Side walls first (behind floor) */}
        {leftWallLines}
        {rightWallLines}
        
        {/* Floor grid on top */}
        {floorLines}
      </g>
      
      {/* Subtle floor edge glow */}
      <line
        x1={doorLeft + 2}
        y1={doorBottom - 1}
        x2={doorRight - 2}
        y2={doorBottom - 1}
        stroke="hsl(32 80% 50%)"
        strokeWidth={1}
        opacity={0.3 * totalIntensity}
        strokeLinecap="round"
      />
    </g>
  );
};

export default DoorwayGrid;
