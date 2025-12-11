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
  
  // Vanishing point - 18% from top of door
  const vanishingY = doorTop + doorHeight * 0.18;
  
  // Generate horizontal floor lines with exponential spacing
  const horizontalLines = Array.from({ length: 12 }, (_, i) => {
    const t = (i + 1) / 12;
    const y = vanishingY + Math.pow(t, 1.6) * (doorBottom - vanishingY);
    const progress = i / 11;
    const opacity = 0.15 + progress * 0.45;
    const strokeWidth = 0.3 + progress * 1.2;
    // Lines get wider as they come forward
    const halfWidth = (doorWidth * 0.1) + (doorWidth * 0.4 * Math.pow(progress, 0.8));
    return { y, opacity, strokeWidth, halfWidth };
  });
  
  // Generate converging vertical lines from vanishing point
  const verticalLines = Array.from({ length: 9 }, (_, i) => {
    const spread = (i - 4) / 4; // -1 to 1
    const endX = doorCenterX + spread * doorWidth * 0.45;
    const opacity = 0.12 + (1 - Math.abs(spread)) * 0.25;
    return { endX, opacity };
  });
  
  // Side wall diagonal lines
  const wallLines = [
    // Left wall
    { x1: doorLeft + 2, y1: doorBottom - 5, x2: doorLeft + 8, y2: vanishingY + 15, opacity: 0.2 },
    { x1: doorLeft + 5, y1: doorBottom - 2, x2: doorLeft + 12, y2: vanishingY + 25, opacity: 0.15 },
    // Right wall
    { x1: doorRight - 2, y1: doorBottom - 5, x2: doorRight - 8, y2: vanishingY + 15, opacity: 0.2 },
    { x1: doorRight - 5, y1: doorBottom - 2, x2: doorRight - 12, y2: vanishingY + 25, opacity: 0.15 },
  ];
  
  return (
    <g className="doorway-grid">
      <defs>
        <clipPath id="doorwayClip">
          <rect x={doorLeft} y={doorTop} width={doorWidth} height={doorHeight} />
        </clipPath>
        
        {/* Deep warm radial gradient - glowing center */}
        <radialGradient id="portalAmbient" cx="50%" cy="25%" r="80%">
          <stop offset="0%" stopColor="hsl(32 60% 22%)" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(28 50% 12%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(25 40% 5%)" stopOpacity="1" />
        </radialGradient>
        
        {/* Inner glow bloom */}
        <radialGradient id="portalGlow" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="hsl(35 70% 45%)" stopOpacity="0.5" />
          <stop offset="40%" stopColor="hsl(32 60% 30%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        
        {/* Edge vignette */}
        <radialGradient id="portalVignette" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="transparent" stopOpacity="0" />
          <stop offset="60%" stopColor="hsl(25 30% 3%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(25 30% 2%)" stopOpacity="0.85" />
        </radialGradient>
        
        {/* Line glow filter */}
        <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <g clipPath="url(#doorwayClip)">
        {/* Deep warm background */}
        <rect
          x={doorLeft}
          y={doorTop}
          width={doorWidth}
          height={doorHeight}
          fill="url(#portalAmbient)"
          opacity={totalIntensity}
        />
        
        {/* Inner glow bloom near vanishing point */}
        <rect
          x={doorLeft}
          y={doorTop}
          width={doorWidth}
          height={doorHeight}
          fill="url(#portalGlow)"
          opacity={totalIntensity * 0.8}
        />
        
        {/* Converging vertical lines */}
        {verticalLines.map((line, i) => (
          <line
            key={`v-${i}`}
            x1={doorCenterX}
            y1={vanishingY}
            x2={line.endX}
            y2={doorBottom}
            stroke="hsl(32 75% 50%)"
            strokeWidth={0.6}
            opacity={line.opacity * totalIntensity}
            filter="url(#lineGlow)"
          />
        ))}
        
        {/* Horizontal floor lines */}
        {horizontalLines.map((line, i) => (
          <line
            key={`h-${i}`}
            x1={doorCenterX - line.halfWidth}
            y1={line.y}
            x2={doorCenterX + line.halfWidth}
            y2={line.y}
            stroke="hsl(32 70% 48%)"
            strokeWidth={line.strokeWidth}
            opacity={line.opacity * totalIntensity}
            strokeLinecap="round"
            filter="url(#lineGlow)"
          />
        ))}
        
        {/* Side wall hints */}
        {wallLines.map((line, i) => (
          <line
            key={`w-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(32 65% 40%)"
            strokeWidth={0.5}
            opacity={line.opacity * totalIntensity}
            filter="url(#lineGlow)"
          />
        ))}
        
        {/* Central vanishing point glow */}
        <ellipse
          cx={doorCenterX}
          cy={vanishingY + 5}
          rx={doorWidth * 0.25}
          ry={8}
          fill="hsl(35 80% 55%)"
          opacity={totalIntensity * (0.35 + lightBoost * 0.3)}
          style={{ filter: 'blur(3px)' }}
        />
        
        {/* Secondary glow ring */}
        <ellipse
          cx={doorCenterX}
          cy={vanishingY + 8}
          rx={doorWidth * 0.35}
          ry={12}
          fill="hsl(32 70% 45%)"
          opacity={totalIntensity * 0.2}
          style={{ filter: 'blur(5px)' }}
        />
        
        {/* Edge vignette overlay */}
        <rect
          x={doorLeft}
          y={doorTop}
          width={doorWidth}
          height={doorHeight}
          fill="url(#portalVignette)"
          opacity={totalIntensity * 0.9}
        />
      </g>
    </g>
  );
};

export default DoorwayGrid;
