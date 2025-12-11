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
        
        {/* Deep warm background gradient */}
        <linearGradient id="portalBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(32 50% 18%)" />
          <stop offset="50%" stopColor="hsl(28 45% 10%)" />
          <stop offset="100%" stopColor="hsl(25 40% 5%)" />
        </linearGradient>
        
        {/* Radial glow from horizon */}
        <radialGradient id="portalGlow" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="hsl(35 75% 50%)" stopOpacity="0.6" />
          <stop offset="30%" stopColor="hsl(32 65% 35%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Deep warm background */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#portalBg)"
        opacity={totalIntensity}
        clipPath="url(#doorwayClip)"
      />
      
      {/* Radial glow from back */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#portalGlow)"
        opacity={totalIntensity * 0.8}
        clipPath="url(#doorwayClip)"
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
            overflow: 'hidden',
            perspective: '120px',
            perspectiveOrigin: '50% 0%',
          }}
        >
          {/* Grid plane receding DOWN into the home */}
          <div
            style={{
              position: 'absolute',
              left: '-100%',
              top: '0',
              width: '300%',
              height: '400%',
              transformOrigin: '50% 0%',
              transform: 'rotateX(85deg)',
              background: `
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 6px,
                  hsl(32 75% 50% / ${0.35 * totalIntensity}) 6px,
                  hsl(32 75% 50% / ${0.35 * totalIntensity}) 7px
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 6px,
                  hsl(32 70% 45% / ${0.25 * totalIntensity}) 6px,
                  hsl(32 70% 45% / ${0.25 * totalIntensity}) 7px
                )
              `,
            }}
          />
          
          {/* Horizon glow line at the back */}
          <div
            style={{
              position: 'absolute',
              left: '10%',
              right: '10%',
              top: '8%',
              height: '2px',
              background: `linear-gradient(90deg, transparent, hsl(35 90% 60%), transparent)`,
              boxShadow: `
                0 0 8px 2px hsl(35 90% 55% / 0.8),
                0 0 16px 4px hsl(32 80% 50% / 0.5),
                0 0 32px 8px hsl(32 70% 45% / 0.3)
              `,
              opacity: totalIntensity * (0.7 + lightBoost * 0.3),
            }}
          />
          
          {/* Secondary bloom */}
          <div
            style={{
              position: 'absolute',
              left: '20%',
              right: '20%',
              top: '6%',
              height: '12px',
              background: `radial-gradient(ellipse at center, hsl(35 80% 55% / 0.4), transparent)`,
              filter: 'blur(4px)',
              opacity: totalIntensity * 0.6,
            }}
          />
        </div>
      </foreignObject>
      
      {/* Edge vignette for depth */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="transparent"
        clipPath="url(#doorwayClip)"
        style={{
          boxShadow: 'inset 0 0 15px 8px hsl(25 40% 3%)',
        }}
      />
      
      {/* Corner vignettes using rects */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth * 0.3}
        height={doorHeight}
        fill="url(#leftVignette)"
        opacity={totalIntensity * 0.7}
        clipPath="url(#doorwayClip)"
      />
      <defs>
        <linearGradient id="leftVignette" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(25 30% 3%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rightVignette" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(25 30% 3%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bottomVignette" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(25 30% 3%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        x={doorRight - doorWidth * 0.3}
        y={doorTop}
        width={doorWidth * 0.3}
        height={doorHeight}
        fill="url(#rightVignette)"
        opacity={totalIntensity * 0.7}
        clipPath="url(#doorwayClip)"
      />
      <rect
        x={doorLeft}
        y={doorBottom - doorHeight * 0.25}
        width={doorWidth}
        height={doorHeight * 0.25}
        fill="url(#bottomVignette)"
        opacity={totalIntensity * 0.5}
        clipPath="url(#doorwayClip)"
      />
    </g>
  );
};

export default DoorwayGrid;
