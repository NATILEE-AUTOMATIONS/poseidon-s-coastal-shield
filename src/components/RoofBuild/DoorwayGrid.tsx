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
  const centerX = doorLeft + doorWidth / 2;
  const centerY = doorTop + doorHeight * 0.4;

  // Light ray angles (radians) - spreading from center
  const rays = [
    { angle: -0.5, length: 0.9 },
    { angle: -0.25, length: 1 },
    { angle: 0, length: 1 },
    { angle: 0.25, length: 1 },
    { angle: 0.5, length: 0.9 },
  ];

  // Floating ember positions
  const embers = [
    { x: 0.2, y: 0.3, size: 1.2, delay: 0 },
    { x: 0.7, y: 0.5, size: 0.8, delay: 0.5 },
    { x: 0.4, y: 0.7, size: 1, delay: 1 },
    { x: 0.8, y: 0.2, size: 0.6, delay: 1.5 },
    { x: 0.3, y: 0.6, size: 0.9, delay: 0.3 },
    { x: 0.6, y: 0.4, size: 1.1, delay: 0.8 },
    { x: 0.5, y: 0.8, size: 0.7, delay: 1.2 },
  ];
  
  return (
    <g className="doorway-epic">
      <defs>
        {/* Deep warm radial gradient - the core light */}
        <radialGradient id="epicWarmthCore" cx="50%" cy="30%" r="90%">
          <stop offset="0%" stopColor="hsl(40 100% 75%)" />
          <stop offset="20%" stopColor="hsl(35 95% 60%)" />
          <stop offset="50%" stopColor="hsl(30 80% 35%)" />
          <stop offset="80%" stopColor="hsl(25 60% 15%)" />
          <stop offset="100%" stopColor="hsl(20 40% 5%)" />
        </radialGradient>

        {/* Bright center burst */}
        <radialGradient id="centerBurst" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stopColor="hsl(45 100% 90%)" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(40 100% 70%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(35 90% 50%)" stopOpacity="0" />
        </radialGradient>

        {/* Divine ray gradient */}
        <linearGradient id="divineRay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 100% 85%)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="hsl(40 95% 65%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(35 80% 50%)" stopOpacity="0" />
        </linearGradient>

        {/* Intense glow filter */}
        <filter id="divineGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur1" />
          <feGaussianBlur stdDeviation="4" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Ember glow filter */}
        <filter id="emberGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Horizon line glow */}
        <filter id="horizonGlow" x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip path for doorway */}
        <clipPath id="doorwayClip">
          <rect x={doorLeft} y={doorTop} width={doorWidth} height={doorHeight} />
        </clipPath>
      </defs>
      
      {/* Layer 1: Deep warm background */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#epicWarmthCore)"
        opacity={totalIntensity}
      />

      {/* Layer 2: Divine light rays */}
      <g clipPath="url(#doorwayClip)" opacity={totalIntensity * 0.8}>
        {rays.map((ray, i) => {
          const rayLength = doorHeight * ray.length * (0.6 + totalIntensity * 0.4);
          const endX = centerX + Math.sin(ray.angle) * doorWidth * 0.8;
          const endY = centerY + rayLength;
          const rayWidth = 3 + totalIntensity * 4;
          
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="url(#divineRay)"
              strokeWidth={rayWidth}
              strokeLinecap="round"
              filter="url(#divineGlow)"
              opacity={0.6 + totalIntensity * 0.4}
            />
          );
        })}
      </g>

      {/* Layer 3: Bright center burst */}
      <ellipse
        cx={centerX}
        cy={centerY}
        rx={doorWidth * 0.4 * (0.5 + totalIntensity * 0.5)}
        ry={doorHeight * 0.2 * (0.5 + totalIntensity * 0.5)}
        fill="url(#centerBurst)"
        filter="url(#divineGlow)"
        opacity={totalIntensity * 0.9}
        clipPath="url(#doorwayClip)"
      />

      {/* Layer 4: Horizon glow line */}
      <line
        x1={doorLeft + 5}
        y1={centerY + 5}
        x2={doorRight - 5}
        y2={centerY + 5}
        stroke="hsl(45 100% 80%)"
        strokeWidth={1.5 + totalIntensity * 2}
        strokeLinecap="round"
        filter="url(#horizonGlow)"
        opacity={totalIntensity * 0.7}
        clipPath="url(#doorwayClip)"
      />

      {/* Layer 5: Floating embers */}
      <g clipPath="url(#doorwayClip)" opacity={totalIntensity}>
        {embers.map((ember, i) => (
          <circle
            key={i}
            cx={doorLeft + doorWidth * ember.x}
            cy={doorTop + doorHeight * ember.y}
            r={ember.size}
            fill="hsl(40 100% 75%)"
            filter="url(#emberGlow)"
            opacity={0.5 + Math.sin(Date.now() / 500 + ember.delay * Math.PI) * 0.3}
          >
            <animate
              attributeName="cy"
              values={`${doorTop + doorHeight * ember.y};${doorTop + doorHeight * (ember.y - 0.15)};${doorTop + doorHeight * ember.y}`}
              dur={`${2 + ember.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur={`${1.5 + ember.delay * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* Layer 6: Edge vignette (darker frame) */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="none"
        stroke="hsl(20 30% 8%)"
        strokeWidth="4"
        opacity={0.4 * totalIntensity}
      />
    </g>
  );
};

export default DoorwayGrid;
