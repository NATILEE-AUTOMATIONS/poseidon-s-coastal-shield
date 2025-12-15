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

// Ice & Water Shield - horizontal strips roll out along eaves only
export const IceWaterShieldLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
  
  // Roof geometry
  const peakX = 200;
  const leftEaveX = 42;
  const rightEaveX = 358;
  const eaveY = 159;
  
  // Ice & water shield covers bottom ~35% of roof (along eaves)
  // 2 strips per side that roll out from center toward edges
  const stripHeight = 18;
  const stripGap = 3;
  const strips = [
    { yOffset: 0 },   // Bottom strip (at eave)
    { yOffset: stripHeight + stripGap },  // Second strip above
  ];
  
  // Calculate X bounds at a given Y position (following roof slope)
  const getXBoundsAtY = (y: number) => {
    const leftSlope = (leftEaveX - peakX) / (eaveY - 56);
    const rightSlope = (rightEaveX - peakX) / (eaveY - 56);
    const leftX = peakX + leftSlope * (y - 56);
    const rightX = peakX + rightSlope * (y - 56);
    return { leftX, rightX };
  };
  
  // Stagger timing for each strip
  const getStripProgress = (stripIndex: number) => {
    const delay = stripIndex * 0.2;
    const normalizedProgress = (layerProgress - delay) / (1 - delay);
    return Math.max(0, Math.min(1, normalizedProgress));
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
        {/* Dark membrane gradient */}
        <linearGradient id="iceStripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(200 35% 10%)" />
          <stop offset="50%" stopColor="hsl(200 40% 15%)" />
          <stop offset="100%" stopColor="hsl(200 35% 10%)" />
        </linearGradient>
        {/* Horizontal sheen effect */}
        <linearGradient id="iceStripSheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(200 60% 55%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(200 70% 60%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(200 60% 55%)" stopOpacity="0" />
        </linearGradient>
        {/* Clip paths for each strip following roof slope */}
        <clipPath id="leftRoofClip">
          <polygon points="42,159 200,56 200,159" />
        </clipPath>
        <clipPath id="rightRoofClip">
          <polygon points="200,56 358,159 200,159" />
        </clipPath>
      </defs>
      
      {/* LEFT SLOPE STRIPS */}
      <g clipPath="url(#leftRoofClip)">
        {strips.map((strip, i) => {
          const stripProg = easeOutQuart(getStripProgress(i));
          if (stripProg <= 0) return null;
          
          const y = eaveY - strip.yOffset - stripHeight;
          const { leftX, rightX } = getXBoundsAtY(y);
          
          // Roll out from center (peakX) toward left edge
          const currentWidth = (peakX - leftX) * stripProg;
          const currentLeftX = peakX - currentWidth;
          
          return (
            <g key={`left-strip-${i}`}>
              {/* Main strip */}
              <rect
                x={currentLeftX}
                y={y}
                width={currentWidth}
                height={stripHeight}
                fill="url(#iceStripGrad)"
                style={{
                  filter: 'drop-shadow(0 1px 3px hsl(200 40% 5% / 0.5))',
                }}
              />
              {/* Sheen */}
              <rect
                x={currentLeftX}
                y={y + 2}
                width={currentWidth}
                height={stripHeight - 4}
                fill="url(#iceStripSheen)"
              />
              {/* Leading edge glow */}
              <line
                x1={currentLeftX}
                y1={y}
                x2={currentLeftX}
                y2={y + stripHeight}
                stroke="hsl(200 80% 60%)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 ${4 + stripProg * 6}px hsl(200 80% 60% / 0.9))`,
                }}
              />
            </g>
          );
        })}
      </g>
      
      {/* RIGHT SLOPE STRIPS */}
      <g clipPath="url(#rightRoofClip)">
        {strips.map((strip, i) => {
          const stripProg = easeOutQuart(getStripProgress(i));
          if (stripProg <= 0) return null;
          
          const y = eaveY - strip.yOffset - stripHeight;
          const { leftX, rightX } = getXBoundsAtY(y);
          
          // Roll out from center (peakX) toward right edge
          const currentWidth = (rightX - peakX) * stripProg;
          
          return (
            <g key={`right-strip-${i}`}>
              {/* Main strip */}
              <rect
                x={peakX}
                y={y}
                width={currentWidth}
                height={stripHeight}
                fill="url(#iceStripGrad)"
                style={{
                  filter: 'drop-shadow(0 1px 3px hsl(200 40% 5% / 0.5))',
                }}
              />
              {/* Sheen */}
              <rect
                x={peakX}
                y={y + 2}
                width={currentWidth}
                height={stripHeight - 4}
                fill="url(#iceStripSheen)"
              />
              {/* Leading edge glow */}
              <line
                x1={peakX + currentWidth}
                y1={y}
                x2={peakX + currentWidth}
                y2={y + stripHeight}
                stroke="hsl(200 80% 60%)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 ${4 + stripProg * 6}px hsl(200 80% 60% / 0.9))`,
                }}
              />
            </g>
          );
        })}
      </g>
      
      {/* Text label - centered, fades in/out */}
      {!isMobile && textOpacity > 0 && (
        <g style={{ 
          opacity: textOpacity,
          filter: 'drop-shadow(0 0 8px hsl(0 0% 0%)) drop-shadow(0 0 16px hsl(0 0% 0% / 0.9))',
        }}>
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
            ICE & WATER
          </text>
          <text
            x="200"
            y="124"
            textAnchor="middle"
            fill="hsl(200 80% 65%)"
            fontSize="15"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
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
