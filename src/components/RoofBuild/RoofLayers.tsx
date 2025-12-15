import React from 'react';

interface LayerProps {
  progress: number;
  startProgress: number;
  endProgress: number;
  isMobile?: boolean;
}

// Material info for step cards
export const materialInfo = [
  { id: 'decking', name: 'Replace Decking', description: 'Replace any damaged plywood or decking' },
  { id: 'drip-eaves', name: 'Drip Edge (Eaves)', description: 'Install drip edge at the eaves' },
  { id: 'ice-water', name: 'Ice & Water Shield', description: 'Apply ice & water shield membrane' },
  { id: 'underlayment', name: 'Underlayment', description: 'Install underlayment over decking' },
  { id: 'drip-rakes', name: 'Drip Edge (Rakes)', description: 'Install drip edge at rakes' },
  { id: 'starter', name: 'Starter Strip', description: 'Install starter strip shingles' },
  { id: 'shingles', name: 'Shingles', description: 'Install field shingles' },
  { id: 'vents', name: 'Pipe Boots & Vents', description: 'Install pipe boots & vents' },
  { id: 'flashing', name: 'Flashing', description: 'Install all flashing' },
  { id: 'ridge', name: 'Ridge Vent & Cap', description: 'Install ridge vent and ridge cap' },
];

// Easing functions
const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);

// Realistic plywood decking - fits exactly on roof shape (40,160 -> 200,55 -> 360,160)
export const DeckingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easedProgress = easeOutQuint(layerProgress);
  const translateY = -100 * (1 - easedProgress);
  const opacity = 0.2 + (0.8 * easedProgress);
  
  // Label timing: fade in 20-40%, hold 40-55%, fade out 55-75%
  const labelOpacity = layerProgress < 0.2 
    ? 0 
    : layerProgress < 0.4 
      ? (layerProgress - 0.2) / 0.2 
      : layerProgress < 0.55 
        ? 1 
        : layerProgress < 0.75 
          ? 1 - (layerProgress - 0.55) / 0.2 
          : 0;
  
  // Roof geometry: peak at (200, 56), left at (42, 159), right at (358, 159)
  // Slope equation left: y = 159 - (159-56)/(200-42) * (x-42) = 159 - 0.652 * (x-42)
  const getLeftY = (x: number) => 159 - ((159 - 56) / (200 - 42)) * (x - 42);
  const getRightY = (x: number) => 159 - ((159 - 56) / (358 - 200)) * (358 - x);
  
  return (
    <g 
      className="decking-layer"
      style={{
        transform: `translateY(${translateY}px)` ,
        transformOrigin: '200px 107px',
        opacity,
        filter: `drop-shadow(0 ${3 + easedProgress * 5}px ${6 + easedProgress * 10}px hsl(30 25% 12% / ${0.3 + easedProgress * 0.2}))`,
      }}
    >
      <defs>
        {/* Clip paths for each slope */}
        <clipPath id="leftSlopeClip">
          <polygon points="42,159 200,56 200,159" />
        </clipPath>
        <clipPath id="rightSlopeClip">
          <polygon points="200,56 358,159 200,159" />
        </clipPath>
        
        {/* Richer plywood gradients */}
        <linearGradient id="plyLeft" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="hsl(32 40% 62%)" />
          <stop offset="40%" stopColor="hsl(30 35% 55%)" />
          <stop offset="100%" stopColor="hsl(28 30% 45%)" />
        </linearGradient>
        <linearGradient id="plyRight" x1="100%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%" stopColor="hsl(34 38% 60%)" />
          <stop offset="40%" stopColor="hsl(32 32% 52%)" />
          <stop offset="100%" stopColor="hsl(29 28% 42%)" />
        </linearGradient>
        
        {/* Subtle wood grain pattern */}
        <pattern id="grainPattern" patternUnits="userSpaceOnUse" width="60" height="8">
          <line x1="0" y1="2" x2="60" y2="2" stroke="hsl(30 20% 40%)" strokeWidth="0.5" opacity="0.15" />
          <line x1="0" y1="5" x2="60" y2="5" stroke="hsl(30 20% 35%)" strokeWidth="0.3" opacity="0.1" />
        </pattern>
      </defs>
      
      {/* LEFT SLOPE */}
      <g clipPath="url(#leftSlopeClip)">
        {/* Base plywood */}
        <polygon points="42,159 200,56 200,159" fill="url(#plyLeft)" />
        {/* Grain overlay */}
        <polygon points="42,159 200,56 200,159" fill="url(#grainPattern)" />
        
        {/* Horizontal sheet rows - dark gap then light highlight */}
        <line x1="42" y1="115" x2="200" y2="115" stroke="hsl(28 30% 20%)" strokeWidth="1.4" />
        <line x1="42" y1="116.2" x2="200" y2="116.2" stroke="hsl(35 35% 58%)" strokeWidth="0.5" opacity="0.5" />
        <line x1="42" y1="80" x2="200" y2="80" stroke="hsl(28 30% 20%)" strokeWidth="1.4" />
        <line x1="42" y1="81.2" x2="200" y2="81.2" stroke="hsl(35 35% 58%)" strokeWidth="0.5" opacity="0.5" />
        
        {/* Vertical seams - thinner with highlights */}
        <line x1="100" y1="159" x2="100" y2="115" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="101" y1="159" x2="101" y2="115" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="160" y1="159" x2="160" y2="115" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="161" y1="159" x2="161" y2="115" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="80" y1="115" x2="80" y2="80" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="81" y1="115" x2="81" y2="80" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="140" y1="115" x2="140" y2="80" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="141" y1="115" x2="141" y2="80" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="115" y1="80" x2="115" y2="56" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="116" y1="80" x2="116" y2="56" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="165" y1="80" x2="165" y2="56" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="166" y1="80" x2="166" y2="56" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
      </g>
      
      {/* RIGHT SLOPE */}
      <g clipPath="url(#rightSlopeClip)">
        <polygon points="200,56 358,159 200,159" fill="url(#plyRight)" />
        <polygon points="200,56 358,159 200,159" fill="url(#grainPattern)" />
        
        {/* Horizontal sheet rows - dark gap then light highlight */}
        <line x1="200" y1="115" x2="358" y2="115" stroke="hsl(28 30% 20%)" strokeWidth="1.4" />
        <line x1="200" y1="116.2" x2="358" y2="116.2" stroke="hsl(35 35% 58%)" strokeWidth="0.5" opacity="0.5" />
        <line x1="200" y1="80" x2="358" y2="80" stroke="hsl(28 30% 20%)" strokeWidth="1.4" />
        <line x1="200" y1="81.2" x2="358" y2="81.2" stroke="hsl(35 35% 58%)" strokeWidth="0.5" opacity="0.5" />
        
        {/* Vertical seams - thinner with highlights */}
        <line x1="240" y1="159" x2="240" y2="115" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="241" y1="159" x2="241" y2="115" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="300" y1="159" x2="300" y2="115" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="301" y1="159" x2="301" y2="115" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="260" y1="115" x2="260" y2="80" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="261" y1="115" x2="261" y2="80" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="320" y1="115" x2="320" y2="80" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="321" y1="115" x2="321" y2="80" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="235" y1="80" x2="235" y2="56" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="236" y1="80" x2="236" y2="56" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
        <line x1="285" y1="80" x2="285" y2="56" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="286" y1="80" x2="286" y2="56" stroke="hsl(35 35% 60%)" strokeWidth="0.4" opacity="0.35" />
      </g>
      
      {/* Ridge line at peak - emphasized with warm glow */}
      <line x1="200" y1="56" x2="200" y2="159" stroke="hsl(30 35% 55%)" strokeWidth="0.6" opacity="0.4" />
      <line x1="200" y1="56" x2="200" y2="159" stroke="hsl(25 30% 18%)" strokeWidth="2.2" />
      
      {/* Teal edge accent glow */}
      <path 
        d="M42 159 L200 56 L358 159" 
        fill="none"
        stroke="hsl(168 75% 50%)" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.5 + easedProgress * 0.4}
        style={{
          filter: `drop-shadow(0 0 ${10 + easedProgress * 12}px hsl(168 75% 55% / 0.8))`,
        }}
      />
      
      {/* Stacked "Replace Decking" label - centered on roof, no backdrop */}
      <g 
        style={{ 
          opacity: labelOpacity,
          transition: 'opacity 0.15s ease-out',
        }}
      >
        {/* "Replace" text with dark glow */}
        <text
          x="200"
          y="103"
          textAnchor="middle"
          fill="hsl(45 100% 95%)"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="3"
          stroke="hsl(0 0% 5%)"
          strokeWidth="2.5"
          paintOrder="stroke fill"
          style={{
            filter: 'drop-shadow(0 0 6px hsl(0 0% 0%)) drop-shadow(0 0 12px hsl(0 0% 0% / 0.8))',
          }}
        >
          REPLACE
        </text>
        {/* "Decking" text with dark glow */}
        <text
          x="200"
          y="124"
          textAnchor="middle"
          fill="hsl(35 100% 90%)"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="3.5"
          stroke="hsl(0 0% 5%)"
          strokeWidth="2.5"
          paintOrder="stroke fill"
          style={{
            filter: 'drop-shadow(0 0 6px hsl(0 0% 0%)) drop-shadow(0 0 12px hsl(0 0% 0% / 0.8))',
          }}
        >
          DECKING
        </text>
      </g>
    </g>
  );
};
// Neon orange drip edge along the eaves (bottom edge of roof)
export const DripEdgeEavesLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easedProgress = easeOutQuint(layerProgress);
  const translateY = -150 * (1 - easedProgress);
  
  // Bar Y position (starts at 10, ends at 160)
  const barY = 160 + translateY;
  
  // Text wipe synced to bar position - wipes as bar passes over text
  // Text area: y=85 (top) to y=130 (bottom)
  const textTop = 85;
  const textBottom = 130;
  const textHeight = textBottom - textTop;
  const clipHeight = Math.max(0, Math.min(textHeight, barY - textTop));
  
  // Text fade out: starts at 70% progress, fully gone by 90%
  const fadeOutStart = 0.70;
  const fadeOutEnd = 0.90;
  const textOpacity = layerProgress < fadeOutStart 
    ? 1 
    : layerProgress > fadeOutEnd 
      ? 0 
      : 1 - (layerProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
  
  return (
    <>
      {/* Animated drip edge line */}
      <g 
        className="drip-edge-eaves-layer"
        style={{
          transform: `translateY(${translateY}px)`,
          transformOrigin: '200px 159px',
        }}
      >
        <line 
          x1="35" y1="160" 
          x2="365" y2="160" 
          stroke="hsl(25 95% 55%)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 ${6 + easedProgress * 10}px hsl(25 95% 55% / 0.8)) drop-shadow(0 0 ${3 + easedProgress * 5}px hsl(30 100% 60% / 0.6))`,
          }}
        />
      </g>
      
      {/* Wipe-reveal text label - desktop only, synced to bar position */}
      {!isMobile && clipHeight > 0 && textOpacity > 0 && (
        <g style={{ 
          filter: 'drop-shadow(0 0 8px hsl(0 0% 0%)) drop-shadow(0 0 16px hsl(0 0% 0% / 0.9))',
          opacity: textOpacity,
        }}>
          <defs>
            <clipPath id="dripEdgeTextWipe">
              <rect 
                x="100"
                y={textTop}
                width="200"
                height={clipHeight}
              />
            </clipPath>
          </defs>
          
          <g clipPath="url(#dripEdgeTextWipe)">
            <text
              x="200"
              y="103"
              textAnchor="middle"
              fill="hsl(45 100% 95%)"
              fontSize="15"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="3"
              stroke="hsl(0 0% 5%)"
              strokeWidth="2.5"
              paintOrder="stroke fill"
            >
              REPLACE
            </text>
            <text
              x="200"
              y="124"
              textAnchor="middle"
              fill="hsl(25 100% 75%)"
              fontSize="15"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="2"
              stroke="hsl(0 0% 5%)"
              strokeWidth="2.5"
              paintOrder="stroke fill"
            >
              DRIP EDGE
            </text>
          </g>
        </g>
      )}
    </>
  );
};

// Ice & Water Shield - 3 rolls unrolling from peak to eaves
export const IceWaterShieldLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  // Roof geometry constants
  const peakX = 200;
  const peakY = 56;
  const leftEaveX = 42;
  const rightEaveX = 358;
  const eaveY = 159;
  
  // 3 rolls with staggered timing (each roll starts after the previous begins)
  const rollCount = 3;
  const rollDelay = 0.15; // Each roll starts 15% after the previous
  const rollWidth = 20; // Width of each roll strip
  const rollGap = 8; // Gap between rolls
  
  // Roll positions (centered on each slope)
  const rollOffsets = [
    -rollWidth - rollGap,    // Left roll
    0,                       // Center roll  
    rollWidth + rollGap,     // Right roll
  ];
  
  // Calculate individual roll progress with stagger
  const getRollProgress = (rollIndex: number) => {
    const rollStart = rollIndex * rollDelay;
    const rollEnd = rollStart + (1 - rollDelay * (rollCount - 1));
    const normalizedProgress = (layerProgress - rollStart) / (rollEnd - rollStart);
    return Math.max(0, Math.min(1, normalizedProgress));
  };
  
  // Easing function for smooth roll-out
  const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
  
  // Calculate roll endpoint based on progress (0 = at peak, 1 = at eave)
  const getRollPath = (rollIndex: number, isLeft: boolean) => {
    const rollProgress = easeOutQuart(getRollProgress(rollIndex));
    const offset = rollOffsets[rollIndex];
    
    // Direction vector from peak to eave
    const dx = isLeft ? (leftEaveX - peakX) : (rightEaveX - peakX);
    const dy = eaveY - peakY;
    
    // Perpendicular offset for roll position
    const perpX = -dy / Math.sqrt(dx * dx + dy * dy);
    const perpY = dx / Math.sqrt(dx * dx + dy * dy);
    
    // Start and end points with offset
    const startX = peakX + perpX * offset;
    const startY = peakY + perpY * offset * (isLeft ? 1 : -1);
    
    // End point travels along the slope
    const endX = startX + dx * rollProgress;
    const endY = startY + dy * rollProgress;
    
    return { startX, startY, endX, endY, progress: rollProgress };
  };
  
  // Text timing: fade in 30-50%, hold 50-70%, fade out 70-90%
  const textOpacity = layerProgress < 0.30 
    ? 0 
    : layerProgress < 0.50 
      ? (layerProgress - 0.30) / 0.20 
      : layerProgress < 0.70 
        ? 1 
        : layerProgress < 0.90 
          ? 1 - (layerProgress - 0.70) / 0.20 
          : 0;
  
  return (
    <g className="ice-water-shield-layer">
      <defs>
        {/* Dark blue/black ice & water shield gradient */}
        <linearGradient id="iceWaterRollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(210 50% 8%)" />
          <stop offset="30%" stopColor="hsl(210 45% 15%)" />
          <stop offset="70%" stopColor="hsl(210 45% 15%)" />
          <stop offset="100%" stopColor="hsl(210 50% 8%)" />
        </linearGradient>
        {/* Shiny membrane surface sheen */}
        <linearGradient id="iceWaterSheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(200 60% 60%)" stopOpacity="0" />
          <stop offset="40%" stopColor="hsl(200 70% 70%)" stopOpacity="0.3" />
          <stop offset="60%" stopColor="hsl(200 70% 70%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(200 60% 60%)" stopOpacity="0" />
        </linearGradient>
        {/* Roll end cap gradient (the "roll" cylinder) */}
        <linearGradient id="rollCapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(210 40% 25%)" />
          <stop offset="30%" stopColor="hsl(210 35% 18%)" />
          <stop offset="70%" stopColor="hsl(210 30% 10%)" />
          <stop offset="100%" stopColor="hsl(210 35% 15%)" />
        </linearGradient>
      </defs>
      
      {/* LEFT SLOPE ROLLS */}
      {[0, 1, 2].map((rollIndex) => {
        const { startX, startY, endX, endY, progress: rollProg } = getRollPath(rollIndex, true);
        if (rollProg <= 0) return null;
        
        const rollOpacity = Math.min(1, rollProg * 3);
        
        return (
          <g key={`left-roll-${rollIndex}`} style={{ opacity: rollOpacity }}>
            {/* Main roll strip */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="url(#iceWaterRollGradient)"
              strokeWidth={rollWidth}
              strokeLinecap="butt"
              style={{
                filter: `drop-shadow(0 2px 4px hsl(210 50% 5% / 0.6))`,
              }}
            />
            {/* Sheen overlay */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="url(#iceWaterSheen)"
              strokeWidth={rollWidth - 2}
              strokeLinecap="butt"
            />
            {/* Roll end cap (cylinder at leading edge) */}
            <circle
              cx={endX}
              cy={endY}
              r={rollWidth / 2 + 2}
              fill="url(#rollCapGradient)"
              stroke="hsl(200 70% 55%)"
              strokeWidth="1.5"
              style={{
                filter: `drop-shadow(0 0 ${6 + rollProg * 8}px hsl(200 70% 55% / 0.7))`,
              }}
            />
            {/* Inner roll spiral detail */}
            <circle
              cx={endX}
              cy={endY}
              r={rollWidth / 4}
              fill="hsl(210 40% 12%)"
              stroke="hsl(200 50% 40%)"
              strokeWidth="0.5"
            />
          </g>
        );
      })}
      
      {/* RIGHT SLOPE ROLLS */}
      {[0, 1, 2].map((rollIndex) => {
        const { startX, startY, endX, endY, progress: rollProg } = getRollPath(rollIndex, false);
        if (rollProg <= 0) return null;
        
        const rollOpacity = Math.min(1, rollProg * 3);
        
        return (
          <g key={`right-roll-${rollIndex}`} style={{ opacity: rollOpacity }}>
            {/* Main roll strip */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="url(#iceWaterRollGradient)"
              strokeWidth={rollWidth}
              strokeLinecap="butt"
              style={{
                filter: `drop-shadow(0 2px 4px hsl(210 50% 5% / 0.6))`,
              }}
            />
            {/* Sheen overlay */}
            <line
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="url(#iceWaterSheen)"
              strokeWidth={rollWidth - 2}
              strokeLinecap="butt"
            />
            {/* Roll end cap (cylinder at leading edge) */}
            <circle
              cx={endX}
              cy={endY}
              r={rollWidth / 2 + 2}
              fill="url(#rollCapGradient)"
              stroke="hsl(200 70% 55%)"
              strokeWidth="1.5"
              style={{
                filter: `drop-shadow(0 0 ${6 + rollProg * 8}px hsl(200 70% 55% / 0.7))`,
              }}
            />
            {/* Inner roll spiral detail */}
            <circle
              cx={endX}
              cy={endY}
              r={rollWidth / 4}
              fill="hsl(210 40% 12%)"
              stroke="hsl(200 50% 40%)"
              strokeWidth="0.5"
            />
          </g>
        );
      })}
      
      {/* Text label - positioned below roof, centered - desktop only */}
      {!isMobile && textOpacity > 0 && (
        <g style={{ 
          opacity: textOpacity,
          filter: 'drop-shadow(0 0 10px hsl(0 0% 0%)) drop-shadow(0 0 20px hsl(0 0% 0% / 0.9))',
        }}>
          <text
            x="200"
            y="175"
            textAnchor="middle"
            fill="hsl(45 100% 95%)"
            fontSize="14"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="4"
            stroke="hsl(0 0% 5%)"
            strokeWidth="2.5"
            paintOrder="stroke fill"
          >
            ICE & WATER
          </text>
          <text
            x="200"
            y="194"
            textAnchor="middle"
            fill="hsl(200 80% 70%)"
            fontSize="14"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="3"
            stroke="hsl(0 0% 5%)"
            strokeWidth="2.5"
            paintOrder="stroke fill"
          >
            SHIELD
          </text>
        </g>
      )}
    </g>
  );
};

// Placeholder exports - to be implemented one at a time
export const DripEdgeRakesLayer: React.FC<LayerProps> = () => null;
export const UnderlaymentLayer: React.FC<LayerProps> = () => null;
export const StarterStripLayer: React.FC<LayerProps> = () => null;
export const FlashingLayer: React.FC<LayerProps> = () => null;
export const ShinglesLayer: React.FC<LayerProps> = () => null;
export const FieldShinglesLayer: React.FC<LayerProps> = () => null;
export const VentsLayer: React.FC<LayerProps> = () => null;
export const RidgeCapLayer: React.FC<LayerProps> = () => null;
