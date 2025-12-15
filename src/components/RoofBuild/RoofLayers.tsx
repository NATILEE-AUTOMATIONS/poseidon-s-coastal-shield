import React from 'react';

interface LayerProps {
  progress: number;
  startProgress: number;
  endProgress: number;
  isMobile?: boolean;
}

// Material info for step cards - 10 steps total
export const materialInfo = [
  { id: 'decking', name: 'Replace Decking', description: 'Replace any damaged plywood or decking' },
  { id: 'drip-edge', name: 'Drip Edge', description: 'Install drip edge along eaves' },
  { id: 'ice-water', name: 'Ice & Water Shield', description: 'Apply ice & water shield membrane' },
  { id: 'underlayment', name: 'Underlayment', description: 'Install underlayment over decking' },
  { id: 'starter', name: 'Starter Strip', description: 'Install starter strip shingles' },
  { id: 'shingles', name: 'Shingles', description: 'Install field shingles' },
  { id: 'vents', name: 'Pipe Boots & Vents', description: 'Install pipe boots & vents' },
  { id: 'flashing', name: 'Flashing', description: 'Install all flashing' },
  { id: 'ridge', name: 'Ridge Vent & Cap', description: 'Install ridge vent and ridge cap' },
  { id: 'cleanup', name: 'Complete Clean Up', description: 'Final cleanup and inspection' },
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
      
      {/* Wipe-reveal text label - synced to bar position */}
      {clipHeight > 0 && textOpacity > 0 && (
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

// Ice & Water Shield - 2 strips roll DOWN from top toward eaves (one per slope)
export const IceWaterShieldLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);
  const easedProgress = easeOutQuint(layerProgress);
  
  // Roof geometry
  const peakX = 200;
  const peakY = 56;
  const leftEaveX = 42;
  const rightEaveX = 358;
  const eaveY = 159;
  
  // Shield starts at peak and rolls to eave
  const startY = peakY; // Start at the peak
  const totalDrop = eaveY - startY;
  const currentY = startY + totalDrop * easedProgress;
  
  // Strip width (as fraction of slope width at that Y)
  const stripWidthRatio = 0.4;
  
  // Get X at Y following roof slope
  const getLeftSlopeX = (y: number) => peakX + ((leftEaveX - peakX) / (eaveY - peakY)) * (y - peakY);
  const getRightSlopeX = (y: number) => peakX + ((rightEaveX - peakX) / (eaveY - peakY)) * (y - peakY);
  
  // Left strip - positioned on left slope
  const leftStripStartOuterX = getLeftSlopeX(startY);
  const leftStripStartInnerX = leftStripStartOuterX + (peakX - leftStripStartOuterX) * stripWidthRatio;
  const leftStripCurrentOuterX = getLeftSlopeX(currentY);
  const leftStripCurrentInnerX = leftStripCurrentOuterX + (peakX - leftStripCurrentOuterX) * stripWidthRatio;
  
  // Right strip - positioned on right slope
  const rightStripStartOuterX = getRightSlopeX(startY);
  const rightStripStartInnerX = rightStripStartOuterX - (rightStripStartOuterX - peakX) * stripWidthRatio;
  const rightStripCurrentOuterX = getRightSlopeX(currentY);
  const rightStripCurrentInnerX = rightStripCurrentOuterX - (rightStripCurrentOuterX - peakX) * stripWidthRatio;
  
  // Text timing
  const textOpacity = layerProgress < 0.25 
    ? 0 
    : layerProgress < 0.45 
      ? (layerProgress - 0.25) / 0.20 
      : layerProgress < 0.65 
        ? 1 
        : layerProgress < 0.85 
          ? 1 - (layerProgress - 0.65) / 0.20 
          : 0;
  
  return (
    <g className="ice-water-shield-layer">
      <defs>
        {/* Dark membrane gradient */}
        <linearGradient id="iceStripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(200 40% 10%)" />
          <stop offset="50%" stopColor="hsl(200 45% 16%)" />
          <stop offset="100%" stopColor="hsl(200 40% 10%)" />
        </linearGradient>
        {/* Sheen */}
        <linearGradient id="iceStripSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(200 70% 55%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(200 80% 60%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(200 70% 55%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* LEFT SLOPE STRIP - rolls down */}
      <polygon
        points={`
          ${leftStripStartOuterX},${startY}
          ${leftStripStartInnerX},${startY}
          ${leftStripCurrentInnerX},${currentY}
          ${leftStripCurrentOuterX},${currentY}
        `}
        fill="url(#iceStripGrad)"
        style={{ filter: 'drop-shadow(0 2px 4px hsl(200 40% 5% / 0.5))' }}
      />
      <polygon
        points={`
          ${leftStripStartOuterX},${startY}
          ${leftStripStartInnerX},${startY}
          ${leftStripCurrentInnerX},${currentY}
          ${leftStripCurrentOuterX},${currentY}
        `}
        fill="url(#iceStripSheen)"
      />
      {/* Leading edge glow */}
      <line
        x1={leftStripCurrentOuterX}
        y1={currentY}
        x2={leftStripCurrentInnerX}
        y2={currentY}
        stroke="hsl(200 80% 60%)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 ${6 + easedProgress * 10}px hsl(200 80% 60% / 0.9))`,
        }}
      />
      
      {/* RIGHT SLOPE STRIP - rolls down */}
      <polygon
        points={`
          ${rightStripStartInnerX},${startY}
          ${rightStripStartOuterX},${startY}
          ${rightStripCurrentOuterX},${currentY}
          ${rightStripCurrentInnerX},${currentY}
        `}
        fill="url(#iceStripGrad)"
        style={{ filter: 'drop-shadow(0 2px 4px hsl(200 40% 5% / 0.5))' }}
      />
      <polygon
        points={`
          ${rightStripStartInnerX},${startY}
          ${rightStripStartOuterX},${startY}
          ${rightStripCurrentOuterX},${currentY}
          ${rightStripCurrentInnerX},${currentY}
        `}
        fill="url(#iceStripSheen)"
      />
      {/* Leading edge glow */}
      <line
        x1={rightStripCurrentInnerX}
        y1={currentY}
        x2={rightStripCurrentOuterX}
        y2={currentY}
        stroke="hsl(200 80% 60%)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 ${6 + easedProgress * 10}px hsl(200 80% 60% / 0.9))`,
        }}
      />
      
      {/* Text label */}
      {textOpacity > 0 && (
        <g style={{ 
          opacity: textOpacity,
          filter: 'drop-shadow(0 0 8px hsl(0 0% 0%)) drop-shadow(0 0 16px hsl(0 0% 0% / 0.9))',
        }}>
          <text
            x="200"
            y="113"
            textAnchor="middle"
            fill="hsl(45 100% 95%)"
            fontSize="15"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            stroke="hsl(0 0% 5%)"
            strokeWidth="2.5"
            paintOrder="stroke fill"
          >
            ICE & WATER
          </text>
          <text
            x="200"
            y="134"
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
// Underlayment - horizontal courses alternate left-right, right-left, building up the roof
export const UnderlaymentLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
  
  // Roof geometry
  const peakX = 200;
  const peakY = 56;
  const leftEaveX = 42;
  const rightEaveX = 358;
  const eaveY = 159;
  
  // Course setup - 5 horizontal courses covering the roof from eave to peak
  const courseCount = 5;
  const totalRoofHeight = eaveY - peakY;
  const courseHeight = totalRoofHeight / courseCount;
  
  // Get X bounds at a Y position following roof slope
  const getLeftX = (y: number) => {
    const slope = (leftEaveX - peakX) / (eaveY - peakY);
    return peakX + slope * (y - peakY);
  };
  const getRightX = (y: number) => {
    const slope = (rightEaveX - peakX) / (eaveY - peakY);
    return peakX + slope * (y - peakY);
  };
  
  // Each course gets a portion of the animation, staggered
  // Mobile: tighter stagger (0.06) so all courses complete well within scroll window
  const getCourseProgress = (courseIndex: number) => {
    const courseDelay = courseIndex * (isMobile ? 0.06 : 0.15);
    const courseDuration = isMobile ? 0.28 : 0.25;
    const courseStart = courseDelay;
    const courseEnd = courseDelay + courseDuration;
    return Math.max(0, Math.min(1, (layerProgress - courseStart) / (courseEnd - courseStart)));
  };
  
  // Text timing - starts immediately with underlayment, scale-in animation
  // Text disappears when course 2 (3rd layer, index 2) rolls over it
  const course2Progress = easeOutQuart(getCourseProgress(2));
  const textProgress = layerProgress < 0.12 
    ? layerProgress / 0.12 
    : 1;
  const textScale = 0.5 + (Math.min(1, textProgress) * 0.5);
  const textOpacity = textProgress;
  
  // Course 2 goes right-to-left, so clip text from left side as it passes
  // Text is centered at x=200, roughly 80px wide (160 to 240)
  const textLeftX = 120;
  const textRightX = 280;
  const textWidth = textRightX - textLeftX;
  // As course2Progress goes 0->1, clip moves from left to right (revealing less text)
  const textClipLeftX = textLeftX + (textWidth * course2Progress);
  
  return (
    <g className="underlayment-layer">
      <defs>
        {/* Solid teal underlayment - no gradient */}
        <linearGradient id="underlaymentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 35% 32%)" />
          <stop offset="100%" stopColor="hsl(168 35% 32%)" />
        </linearGradient>
        {/* Clip to roof shape */}
        <clipPath id="roofClipUnderlayment">
          <polygon points={`${peakX},${peakY} ${leftEaveX},${eaveY} ${rightEaveX},${eaveY}`} />
        </clipPath>
        {/* Clip for logos to stay within roof */}
        <clipPath id="logoClip">
          <polygon points={`${peakX},${peakY} ${leftEaveX},${eaveY} ${rightEaveX},${eaveY}`} />
        </clipPath>
      </defs>
      
      {/* Text label - rendered first so underlayment covers it */}
      {textOpacity > 0 && (
        <g style={{ 
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          transformOrigin: '200px 113px',
        }}>
          <text
            x="200"
            y="113"
            textAnchor="middle"
            fill="hsl(45 100% 95%)"
            fontSize="13"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            stroke="hsl(0 0% 5%)"
            strokeWidth="2.5"
            paintOrder="stroke fill"
            style={{ filter: 'drop-shadow(0 0 8px hsl(0 0% 0%)) drop-shadow(0 0 16px hsl(0 0% 0% / 0.9))' }}
          >
            UNDERLAYMENT
          </text>
        </g>
      )}
      
      <g clipPath="url(#roofClipUnderlayment)">
        {Array.from({ length: courseCount }).map((_, i) => {
          const courseProgress = easeOutQuart(getCourseProgress(i));
          if (courseProgress <= 0) return null;
          
          // Course position (bottom course is index 0, top is index 4)
          const bottomY = eaveY - (i * courseHeight);
          const topY = bottomY - courseHeight;
          
          // Get full width at this course level
          const topLeftX = getLeftX(topY);
          const topRightX = getRightX(topY);
          const bottomLeftX = getLeftX(bottomY);
          const bottomRightX = getRightX(bottomY);
          
          const topWidth = topRightX - topLeftX;
          const bottomWidth = bottomRightX - bottomLeftX;
          
          // Alternate direction: even courses go left-to-right, odd go right-to-left
          const goingRight = i % 2 === 0;
          
          let points: string;
          if (goingRight) {
            // Left to right - reveal from left edge
            const currentTopRightX = topLeftX + topWidth * courseProgress;
            const currentBottomRightX = bottomLeftX + bottomWidth * courseProgress;
            points = `${topLeftX},${topY} ${currentTopRightX},${topY} ${currentBottomRightX},${bottomY} ${bottomLeftX},${bottomY}`;
          } else {
            // Right to left - reveal from right edge
            const currentTopLeftX = topRightX - topWidth * courseProgress;
            const currentBottomLeftX = bottomRightX - bottomWidth * courseProgress;
            points = `${currentTopLeftX},${topY} ${topRightX},${topY} ${bottomRightX},${bottomY} ${currentBottomLeftX},${bottomY}`;
          }
          
          // Leading edge position for glow
          const leadingEdgeTopX = goingRight 
            ? topLeftX + topWidth * courseProgress 
            : topRightX - topWidth * courseProgress;
          const leadingEdgeBottomX = goingRight 
            ? bottomLeftX + bottomWidth * courseProgress 
            : bottomRightX - bottomWidth * courseProgress;
          
          return (
            <g key={`course-${i}`}>
              {/* Main underlayment strip - solid color */}
              <polygon
                points={points}
                fill="url(#underlaymentGrad)"
              />
              {/* Course divider line at top edge */}
              {i > 0 && courseProgress >= 1 && (
                <line
                  x1={topLeftX}
                  y1={topY}
                  x2={topRightX}
                  y2={topY}
                  stroke="hsl(168 30% 22%)"
                  strokeWidth="1"
                  opacity="0.6"
                />
              )}
              {/* Simple leading edge line - only visible during animation */}
              {courseProgress < 1 && (
                <line
                  x1={leadingEdgeTopX}
                  y1={topY}
                  x2={leadingEdgeBottomX}
                  y2={bottomY}
                  stroke="hsl(168 40% 45%)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        })}
      </g>
      
      {/* Dynamic clip path that matches actual underlayment coverage */}
      <defs>
        <clipPath id="underlaymentCoverageClip">
          {Array.from({ length: courseCount }).map((_, i) => {
            const courseProgress = easeOutQuart(getCourseProgress(i));
            if (courseProgress <= 0) return null;
            
            const bottomY = eaveY - (i * courseHeight);
            const topY = bottomY - courseHeight;
            const topLeftX = getLeftX(topY);
            const topRightX = getRightX(topY);
            const bottomLeftX = getLeftX(bottomY);
            const bottomRightX = getRightX(bottomY);
            const topWidth = topRightX - topLeftX;
            const bottomWidth = bottomRightX - bottomLeftX;
            const goingRight = i % 2 === 0;
            
            let points: string;
            if (goingRight) {
              const currentTopRightX = topLeftX + topWidth * courseProgress;
              const currentBottomRightX = bottomLeftX + bottomWidth * courseProgress;
              points = `${topLeftX},${topY} ${currentTopRightX},${topY} ${currentBottomRightX},${bottomY} ${bottomLeftX},${bottomY}`;
            } else {
              const currentTopLeftX = topRightX - topWidth * courseProgress;
              const currentBottomLeftX = bottomRightX - bottomWidth * courseProgress;
              points = `${currentTopLeftX},${topY} ${topRightX},${topY} ${bottomRightX},${bottomY} ${currentBottomLeftX},${bottomY}`;
            }
            
            return <polygon key={`clip-course-${i}`} points={points} />;
          })}
        </clipPath>
      </defs>
      
      {/* Logos clipped to actual underlayment coverage - appear/disappear as courses roll */}
      <g clipPath="url(#underlaymentCoverageClip)">
        {/* Top center - main prominent logo */}
        <image href="/poseidon-logo.png" x="140" y="62" width="120" height="50" opacity="0.95" preserveAspectRatio="xMidYMid meet" />
        
        {/* Row 2 - two logos */}
        <image href="/poseidon-logo.png" x="80" y="90" width="100" height="42" opacity="0.9" preserveAspectRatio="xMidYMid meet" />
        <image href="/poseidon-logo.png" x="220" y="90" width="100" height="42" opacity="0.9" preserveAspectRatio="xMidYMid meet" />
        
        {/* Row 3 - three logos */}
        <image href="/poseidon-logo.png" x="50" y="118" width="90" height="38" opacity="0.85" preserveAspectRatio="xMidYMid meet" />
        <image href="/poseidon-logo.png" x="155" y="118" width="90" height="38" opacity="0.85" preserveAspectRatio="xMidYMid meet" />
        <image href="/poseidon-logo.png" x="260" y="118" width="90" height="38" opacity="0.85" preserveAspectRatio="xMidYMid meet" />
        
        {/* Row 4 - four logos near bottom */}
        <image href="/poseidon-logo.png" x="45" y="142" width="80" height="34" opacity="0.8" preserveAspectRatio="xMidYMid meet" />
        <image href="/poseidon-logo.png" x="130" y="142" width="80" height="34" opacity="0.8" preserveAspectRatio="xMidYMid meet" />
        <image href="/poseidon-logo.png" x="215" y="142" width="80" height="34" opacity="0.8" preserveAspectRatio="xMidYMid meet" />
        <image href="/poseidon-logo.png" x="300" y="142" width="80" height="34" opacity="0.8" preserveAspectRatio="xMidYMid meet" />
      </g>
    </g>
  );
};
// Starter Strip - left-to-right wipe along the eave, positioned just inside the roof edge
export const StarterStripLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easedProgress = easeOutQuint(layerProgress);
  
  // Roof geometry - angled ends to match roof slope
  // Roof: left (40,160) -> peak (200,55) -> right (360,160)
  // Slope: rise/run = 105/160 = 0.656, so for 10px up, x moves ~15px inward
  const eaveY = 160;
  const stripHeight = 10;
  const topY = eaveY - stripHeight;
  
  // Calculate angled points (top edge follows roof slope)
  const leftBottomX = 40;
  const rightBottomX = 360;
  const leftTopX = 40 + (stripHeight / 0.656); // ~55
  const rightTopX = 360 - (stripHeight / 0.656); // ~345
  const totalWidth = rightBottomX - leftBottomX;
  
  // Current width based on progress (left to right wipe)
  const currentWidth = totalWidth * easedProgress;
  
  // Leading edge glow intensity
  const glowIntensity = easedProgress < 0.95 ? 1 : (1 - easedProgress) / 0.05;
  
  // Text timing: fade in 10-25%, hold 25-55%, fade out 55-75%
  const textOpacity = isMobile ? 0 : (
    layerProgress < 0.10 
      ? 0 
      : layerProgress < 0.25 
        ? (layerProgress - 0.10) / 0.15 
        : layerProgress < 0.55 
          ? 1 
          : layerProgress < 0.75 
            ? 1 - (layerProgress - 0.55) / 0.2 
            : 0
  );
  
  return (
    <g className="starter-strip-layer">
      <defs>
        {/* Dark shingle gradient - charcoal color */}
        <linearGradient id="starterStripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 15% 32%)" />
          <stop offset="50%" stopColor="hsl(220 12% 25%)" />
          <stop offset="100%" stopColor="hsl(220 10% 20%)" />
        </linearGradient>
        
        {/* Clip for left-to-right wipe effect */}
        <clipPath id="starterStripClip">
          <rect 
            x={leftBottomX} 
            y={topY - 2} 
            width={currentWidth} 
            height={stripHeight + 6}
          />
        </clipPath>
      </defs>
      
      {/* Main strip body - clipped for wipe effect */}
      <g clipPath="url(#starterStripClip)">
        {/* The actual starter strip - trapezoid shape with angled ends */}
        <polygon
          points={`${leftBottomX},${eaveY} ${rightBottomX},${eaveY} ${rightTopX},${topY} ${leftTopX},${topY}`}
          fill="url(#starterStripGrad)"
          style={{
            filter: 'drop-shadow(0 2px 4px hsl(220 20% 10% / 0.5))',
          }}
        />
        
        {/* Shingle tab divider lines */}
        {[0.15, 0.30, 0.45, 0.55, 0.70, 0.85].map((pos, i) => {
          const bottomX = leftBottomX + totalWidth * pos;
          const topX = leftTopX + (rightTopX - leftTopX) * pos;
          return (
            <line
              key={i}
              x1={bottomX}
              y1={eaveY - 1}
              x2={topX}
              y2={topY + 1}
              stroke="hsl(220 10% 14%)"
              strokeWidth="1.2"
              opacity="0.6"
            />
          );
        })}
        
        {/* Top edge teal accent glow - angled to match roof */}
        <line
          x1={leftTopX}
          y1={topY}
          x2={rightTopX}
          y2={topY}
          stroke="hsl(168 70% 50%)"
          strokeWidth="2"
          opacity="0.8"
          style={{
            filter: 'drop-shadow(0 0 6px hsl(168 70% 50% / 0.7)) drop-shadow(0 0 12px hsl(168 70% 50% / 0.4))',
          }}
        />
      </g>
      
      {/* Leading edge glow - orange/gold accent that moves with wipe */}
      {easedProgress > 0.01 && easedProgress < 0.99 && (
        <line
          x1={leftBottomX + currentWidth}
          y1={topY - 3}
          x2={leftBottomX + currentWidth}
          y2={eaveY + 3}
          stroke="hsl(30 95% 55%)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={glowIntensity}
          style={{
            filter: `drop-shadow(0 0 10px hsl(30 95% 55%)) drop-shadow(0 0 20px hsl(25 100% 50% / 0.8))`,
          }}
        />
      )}
      
      {/* Text label - wipe-reveal synced with strip animation */}
      {easedProgress > 0 && (
        <g style={{ 
          filter: 'drop-shadow(0 0 8px hsl(0 0% 0%)) drop-shadow(0 0 14px hsl(0 0% 0% / 0.9))',
        }}>
          <defs>
            {/* Clip path that follows the strip wipe position */}
            <clipPath id="starterTextWipeClip">
              <rect 
                x={leftBottomX} 
                y="90" 
                width={currentWidth} 
                height="50"
              />
            </clipPath>
          </defs>
          
          {/* Text revealed by wipe - appears as strip passes */}
          <g 
            clipPath="url(#starterTextWipeClip)"
            style={{
              opacity: layerProgress < 0.8 ? 1 : Math.max(0, 1 - (layerProgress - 0.8) / 0.15),
            }}
          >
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
              STARTER
            </text>
            <text
              x="200"
              y="124"
              textAnchor="middle"
              fill="hsl(30 95% 65%)"
              fontSize="15"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="3"
              stroke="hsl(0 0% 5%)"
              strokeWidth="2.5"
              paintOrder="stroke fill"
            >
              STRIP
            </text>
          </g>
        </g>
      )}
    </g>
  );
};
export const FlashingLayer: React.FC<LayerProps> = () => null;
export const ShinglesLayer: React.FC<LayerProps> = () => null;
// Field Shingles - individual tabs cascade from bottom to top with flip-drop entrance
export const FieldShinglesLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  // Roof geometry
  const peakX = 200;
  const peakY = 55;
  const leftEaveX = 40;
  const rightEaveX = 360;
  const eaveY = 160;
  
  // Start at eave level to cover the starter strip
  const shingleBottom = eaveY;
  const roofHeight = shingleBottom - peakY;
  
  // 7 courses of shingles (bottom to top)
  const courseCount = 7;
  const courseHeight = roofHeight / courseCount;
  
  // Helper to get X at a given Y on the roof slope
  const getLeftX = (y: number) => {
    const t = (y - peakY) / (eaveY - peakY);
    return peakX - t * (peakX - leftEaveX);
  };
  const getRightX = (y: number) => {
    const t = (y - peakY) / (eaveY - peakY);
    return peakX + t * (rightEaveX - peakX);
  };
  
  // Bounce easing for satisfying drop
  const easeOutBack = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };
  
  // Elastic settle for premium feel
  const easeOutElastic = (t: number) => {
    if (t === 0 || t === 1) return t;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
  };
  
  // Course animation - BOTTOM courses first (index 0 = bottom)
  const getCourseProgress = (courseIndex: number) => {
    const staggerDelay = courseIndex * 0.10; // 10% delay between courses, bottom first
    const courseAnimDuration = 0.25;
    const courseStart = staggerDelay;
    const courseEnd = courseStart + courseAnimDuration;
    
    if (layerProgress < courseStart) return 0;
    if (layerProgress > courseEnd) return 1;
    return (layerProgress - courseStart) / courseAnimDuration;
  };
  
  // Text timing
  const textOpacity = (
    layerProgress < 0.12 
      ? 0 
      : layerProgress < 0.25 
        ? (layerProgress - 0.12) / 0.13 
        : layerProgress < 0.60 
          ? 1 
          : layerProgress < 0.80 
            ? 1 - (layerProgress - 0.60) / 0.2 
            : 0
  );
  
  // Generate shingle colors with subtle variation
  const getShingleColor = (courseIndex: number, tabIndex: number) => {
    const seed = (courseIndex * 7 + tabIndex * 13) % 100;
    const baseL = 20 + (seed % 8); // 20-27% lightness variation
    const baseS = 12 + (seed % 6); // 12-17% saturation variation
    return `hsl(220 ${baseS}% ${baseL}%)`;
  };
  
  return (
    <g className="field-shingles-layer">
      <defs>
        {/* Architectural shingle gradient with dimensional look */}
        <linearGradient id="shingleDimensional" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 14% 26%)" />
          <stop offset="25%" stopColor="hsl(220 12% 22%)" />
          <stop offset="75%" stopColor="hsl(220 10% 18%)" />
          <stop offset="100%" stopColor="hsl(220 8% 14%)" />
        </linearGradient>
        
        {/* Highlight gradient for 3D effect */}
        <linearGradient id="shingleHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 15% 35%)" stopOpacity="0.4" />
          <stop offset="30%" stopColor="hsl(220 10% 25%)" stopOpacity="0" />
        </linearGradient>
        
        {/* Shadow gradient for depth */}
        <linearGradient id="shingleShadow" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(220 20% 8%)" stopOpacity="0.6" />
          <stop offset="40%" stopColor="hsl(220 15% 12%)" stopOpacity="0" />
        </linearGradient>
        
        {/* Clip to roof shape */}
        <clipPath id="shinglesRoofClip">
          <polygon points={`${peakX},${peakY} ${leftEaveX},${eaveY} ${rightEaveX},${eaveY}`} />
        </clipPath>
      </defs>
      
      <g clipPath="url(#shinglesRoofClip)">
        {Array.from({ length: courseCount }).map((_, courseIdx) => {
          const courseProgress = getCourseProgress(courseIdx);
          if (courseProgress <= 0) return null;
          
          const easedProgress = easeOutBack(Math.min(1, courseProgress * 1.1));
          const settleProgress = easeOutElastic(courseProgress);
          
          // Course Y positions (bottom = higher Y value, index 0 = bottom course)
          const bottomY = shingleBottom - (courseIdx * courseHeight);
          const topY = bottomY - courseHeight;
          
          // Full width at this course level
          const topLeftX = getLeftX(topY);
          const topRightX = getRightX(topY);
          const bottomLeftX = getLeftX(bottomY);
          const bottomRightX = getRightX(bottomY);
          const courseWidth = bottomRightX - bottomLeftX;
          
          // 8 tabs per course with stagger offset for odd courses
          const tabCount = 8;
          const tabOffset = courseIdx % 2 === 1 ? 0.5 : 0; // Half-tab offset on alternate courses
          
          // Drop distance for entrance animation
          const dropDistance = 25;
          const currentDrop = dropDistance * (1 - easedProgress);
          const rotation = (1 - settleProgress) * -15; // Slight rotation during drop
          
          return (
            <g 
              key={`course-${courseIdx}`}
              style={{
                transform: `translateY(${currentDrop}px)`,
                opacity: Math.min(1, courseProgress * 3),
              }}
            >
              {/* Individual shingle tabs */}
              {Array.from({ length: tabCount }).map((_, tabIdx) => {
                // Tab entrance stagger within course
                const tabDelay = tabIdx * 0.08;
                const tabProgress = Math.max(0, Math.min(1, (courseProgress - tabDelay) / 0.5));
                if (tabProgress <= 0) return null;
                
                const tabEased = easeOutBack(tabProgress);
                
                // Tab positions with half-tab offset
                const tabStartRatio = (tabIdx - tabOffset) / tabCount;
                const tabEndRatio = (tabIdx + 1 - tabOffset) / tabCount;
                
                // Clamp to 0-1 range
                const clampedStart = Math.max(0, Math.min(1, tabStartRatio));
                const clampedEnd = Math.max(0, Math.min(1, tabEndRatio));
                
                if (clampedStart >= clampedEnd) return null;
                
                // Calculate tab corners
                const tabTopLeftX = topLeftX + (topRightX - topLeftX) * clampedStart;
                const tabTopRightX = topLeftX + (topRightX - topLeftX) * clampedEnd;
                const tabBottomLeftX = bottomLeftX + courseWidth * clampedStart;
                const tabBottomRightX = bottomLeftX + courseWidth * clampedEnd;
                
                const tabCenterX = (tabBottomLeftX + tabBottomRightX) / 2;
                const tabCenterY = (topY + bottomY) / 2;
                
                // Individual tab drop and rotation
                const tabDrop = 15 * (1 - tabEased);
                const tabRotation = (1 - tabEased) * (tabIdx % 2 === 0 ? -8 : 8);
                
                const shingleColor = getShingleColor(courseIdx, tabIdx);
                
                return (
                  <g 
                    key={`tab-${courseIdx}-${tabIdx}`}
                    style={{
                      transform: `translate(${tabCenterX}px, ${tabCenterY + tabDrop}px) rotate(${tabRotation}deg) translate(${-tabCenterX}px, ${-tabCenterY}px)`,
                      opacity: tabProgress,
                    }}
                  >
                    {/* Base shingle */}
                    <polygon
                      points={`${tabTopLeftX},${topY} ${tabTopRightX},${topY} ${tabBottomRightX},${bottomY} ${tabBottomLeftX},${bottomY}`}
                      fill={shingleColor}
                    />
                    
                    {/* Dimensional highlight (top edge) */}
                    <polygon
                      points={`${tabTopLeftX},${topY} ${tabTopRightX},${topY} ${tabBottomRightX},${bottomY} ${tabBottomLeftX},${bottomY}`}
                      fill="url(#shingleHighlight)"
                    />
                    
                    {/* Shadow (bottom edge) */}
                    <polygon
                      points={`${tabTopLeftX},${topY} ${tabTopRightX},${topY} ${tabBottomRightX},${bottomY} ${tabBottomLeftX},${bottomY}`}
                      fill="url(#shingleShadow)"
                    />
                    
                    {/* Tab divider line (right edge) */}
                    {tabIdx < tabCount - 1 && clampedEnd < 1 && (
                      <line
                        x1={tabTopRightX}
                        y1={topY + 1}
                        x2={tabBottomRightX}
                        y2={bottomY - 1}
                        stroke="hsl(220 15% 10%)"
                        strokeWidth="1"
                        opacity={0.7 * tabProgress}
                      />
                    )}
                    
                    {/* Granule texture dots */}
                    {tabProgress >= 0.8 && (
                      <>
                        <circle 
                          cx={tabCenterX - 3} 
                          cy={tabCenterY - 2} 
                          r="1" 
                          fill="hsl(220 8% 28%)" 
                          opacity="0.3"
                        />
                        <circle 
                          cx={tabCenterX + 4} 
                          cy={tabCenterY + 1} 
                          r="0.8" 
                          fill="hsl(220 10% 15%)" 
                          opacity="0.4"
                        />
                        <circle 
                          cx={tabCenterX - 1} 
                          cy={tabCenterY + 3} 
                          r="0.6" 
                          fill="hsl(220 6% 30%)" 
                          opacity="0.25"
                        />
                      </>
                    )}
                  </g>
                );
              })}
              
              {/* Course shadow line (appears when course is mostly complete) */}
              {courseProgress > 0.7 && courseIdx > 0 && (
                <line
                  x1={bottomLeftX + 2}
                  y1={bottomY}
                  x2={bottomRightX - 2}
                  y2={bottomY}
                  stroke="hsl(220 20% 8%)"
                  strokeWidth="2"
                  opacity={0.4 * Math.min(1, (courseProgress - 0.7) / 0.3)}
                  style={{
                    filter: 'blur(1px)',
                  }}
                />
              )}
            </g>
          );
        })}
      </g>
      
      {/* Text label */}
      {textOpacity > 0 && (
        <g style={{ 
          opacity: textOpacity,
          filter: 'drop-shadow(0 0 10px hsl(0 0% 0%)) drop-shadow(0 0 20px hsl(0 0% 0% / 0.8))',
        }}>
          <text
            x="200"
            y="100"
            textAnchor="middle"
            fill="hsl(45 100% 95%)"
            fontSize="16"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="4"
            stroke="hsl(0 0% 5%)"
            strokeWidth="3"
            paintOrder="stroke fill"
          >
            SHINGLES
          </text>
        </g>
      )}
    </g>
  );
};
export const VentsLayer: React.FC<LayerProps> = () => null;
export const RidgeCapLayer: React.FC<LayerProps> = () => null;
export const CleanUpLayer: React.FC<LayerProps> = () => null;
