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
  
  return (
    <g className="doorway-grid">
      <defs>
        <clipPath id="doorwayClip">
          <rect x={doorLeft} y={doorTop} width={doorWidth} height={doorHeight} />
        </clipPath>
        
        {/* Deep warm radial gradient for ambient glow */}
        <radialGradient id="portalAmbient" cx="50%" cy="100%" r="120%">
          <stop offset="0%" stopColor="hsl(32 70% 25%)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="hsl(28 60% 15%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(25 50% 6%)" stopOpacity="1" />
        </radialGradient>
        
        {/* Horizon glow gradient */}
        <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(32 90% 60%)" stopOpacity="0.9" />
          <stop offset="30%" stopColor="hsl(32 80% 50%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(32 70% 40%)" stopOpacity="0" />
        </linearGradient>
        
        {/* Edge vignette */}
        <radialGradient id="portalVignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" stopOpacity="0" />
          <stop offset="70%" stopColor="hsl(25 40% 3%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(25 40% 3%)" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      
      {/* Deep warm background base */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="hsl(25 50% 6%)"
        opacity={totalIntensity}
      />
      
      {/* Ambient radial glow */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#portalAmbient)"
        opacity={totalIntensity * 0.9}
      />
      
      {/* CSS Perspective Grid via foreignObject */}
      <foreignObject
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        clipPath="url(#doorwayClip)"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            perspective: '80px',
            perspectiveOrigin: '50% 0%',
            overflow: 'hidden',
          }}
        >
          {/* The infinite grid plane */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '-50%',
              width: '200%',
              height: '300%',
              transform: 'rotateX(-75deg)',
              transformOrigin: 'center top',
              background: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 8px,
                  hsl(32 80% 50% / ${0.25 * totalIntensity}) 8px,
                  hsl(32 80% 50% / ${0.25 * totalIntensity}) 9px
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 8px,
                  hsl(32 70% 45% / ${0.2 * totalIntensity}) 8px,
                  hsl(32 70% 45% / ${0.2 * totalIntensity}) 9px
                )
              `,
              opacity: totalIntensity,
            }}
          />
        </div>
      </foreignObject>
      
      {/* Horizon glow line at the "back" */}
      <rect
        x={doorLeft + doorWidth * 0.1}
        y={doorTop + 8}
        width={doorWidth * 0.8}
        height={3}
        rx={1.5}
        fill="hsl(32 90% 60%)"
        opacity={totalIntensity * (0.6 + lightBoost * 0.4)}
        style={{
          filter: `
            drop-shadow(0 0 4px hsl(32 90% 60%))
            drop-shadow(0 0 8px hsl(32 85% 55%))
            drop-shadow(0 0 16px hsl(32 80% 50% / 0.6))
          `,
        }}
      />
      
      {/* Secondary glow bloom */}
      <ellipse
        cx={doorLeft + doorWidth / 2}
        cy={doorTop + 12}
        rx={doorWidth * 0.35}
        ry={8}
        fill="hsl(32 80% 55%)"
        opacity={totalIntensity * 0.3 * (1 + lightBoost * 0.5)}
        style={{
          filter: 'blur(4px)',
        }}
      />
      
      {/* Edge vignette overlay */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#portalVignette)"
        opacity={totalIntensity * 0.8}
      />
      
      {/* Subtle floor edge glow */}
      <line
        x1={doorLeft + 2}
        y1={doorBottom - 1}
        x2={doorRight - 2}
        y2={doorBottom - 1}
        stroke="hsl(32 80% 50%)"
        strokeWidth={1.5}
        opacity={0.4 * totalIntensity}
        strokeLinecap="round"
        style={{
          filter: 'drop-shadow(0 0 3px hsl(32 80% 50%))',
        }}
      />
    </g>
  );
};

export default DoorwayGrid;
