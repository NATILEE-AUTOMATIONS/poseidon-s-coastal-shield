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
      
      {/* Logos clipped to actual underlayment coverage - DESKTOP ONLY */}
      {!isMobile && (
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
      )}
      
      {/* Logos clipped to actual underlayment coverage - MOBILE ONLY */}
      {isMobile && (
        <g clipPath="url(#underlaymentCoverageClip)">
          {/* Top center logo */}
          <image href="/poseidon-logo.png" x="150" y="68" width="100" height="42" opacity="0.9" preserveAspectRatio="xMidYMid meet" />
          
          {/* Row 2 - two logos */}
          <image href="/poseidon-logo.png" x="90" y="100" width="90" height="38" opacity="0.85" preserveAspectRatio="xMidYMid meet" />
          <image href="/poseidon-logo.png" x="220" y="100" width="90" height="38" opacity="0.85" preserveAspectRatio="xMidYMid meet" />
          
          {/* Row 3 - three logos near bottom */}
          <image href="/poseidon-logo.png" x="60" y="130" width="80" height="34" opacity="0.8" preserveAspectRatio="xMidYMid meet" />
          <image href="/poseidon-logo.png" x="160" y="130" width="80" height="34" opacity="0.8" preserveAspectRatio="xMidYMid meet" />
          <image href="/poseidon-logo.png" x="260" y="130" width="80" height="34" opacity="0.8" preserveAspectRatio="xMidYMid meet" />
        </g>
      )}
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
        
        {/* Top edge accent - clean, no glow */}
        <line
          x1={leftTopX}
          y1={topY}
          x2={rightTopX}
          y2={topY}
          stroke="hsl(168 50% 40%)"
          strokeWidth="1.5"
          opacity="0.5"
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
// FlashingLayer moved below VentsLayer

// Shingles layer with stair-step installation animation (DESKTOP ONLY)
export const ShinglesLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  // Roof geometry
  const peakX = 200;
  const peakY = 56;
  const leftEaveX = 42;
  const rightEaveX = 358;
  const eaveY = 159;
  
  // Shingle color palette - dark tones with slight variation
  const shingleColors = [
    'hsl(210 5% 12%)',
    'hsl(210 4% 14%)',
    'hsl(210 4% 16%)',
    'hsl(210 3% 18%)',
  ];
  
  // Get color using prime multiplier hash for randomization
  const getShingleColor = (courseIdx: number, tabIdx: number) => {
    const hash = (courseIdx * 7 + tabIdx * 13) % shingleColors.length;
    return shingleColors[hash];
  };
  
  // Shingle dimensions
  const targetTabWidth = 22;
  const shingleHeight = 12;
  const exposure = 10; // Vertical exposure per course
  const courseCount = 12; // Enough courses to reach the peak
  
  // Get X bounds at a Y position following roof slope
  const getLeftX = (y: number) => {
    const slope = (leftEaveX - peakX) / (eaveY - peakY);
    return peakX + slope * (y - peakY);
  };
  const getRightX = (y: number) => {
    const slope = (rightEaveX - peakX) / (eaveY - peakY);
    return peakX + slope * (y - peakY);
  };
  
  // easeOutBack for satisfying overshoot
  const easeOutBack = (x: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };
  
  // Generate courses from bottom (eave) to top (peak)
  const courses: Array<{
    courseIdx: number;
    bottomY: number;
    topY: number;
    tabs: Array<{ x: number; width: number; tabIdx: number }>;
  }> = [];
  
  for (let i = 0; i < courseCount; i++) {
    const bottomY = eaveY - (i * exposure);
    const topY = bottomY - shingleHeight;
    
    if (topY < peakY) continue;
    
    const leftX = getLeftX(bottomY);
    const rightX = getRightX(bottomY);
    const courseWidth = rightX - leftX;
    
    // Calculate tabs for this course
    const tabCount = Math.max(2, Math.round(courseWidth / targetTabWidth));
    const actualTabWidth = courseWidth / tabCount;
    
    const tabs: Array<{ x: number; width: number; tabIdx: number }> = [];
    for (let t = 0; t < tabCount; t++) {
      tabs.push({
        x: leftX + (t * actualTabWidth),
        width: actualTabWidth,
        tabIdx: t,
      });
    }
    
    courses.push({ courseIdx: i, bottomY, topY, tabs });
  }
  
  // Calculate max diagonal index for normalization
  const maxDiagonalIdx = courses.reduce((max, course) => {
    const courseMax = course.courseIdx + course.tabs.length - 1;
    return Math.max(max, courseMax);
  }, 0);
  
  // Text opacity: fade in 10-40%, hold 40-70%, fade out 70-95%
  const textOpacity = layerProgress < 0.1 ? 0 
    : layerProgress < 0.4 ? (layerProgress - 0.1) / 0.3
    : layerProgress < 0.7 ? 1
    : layerProgress < 0.95 ? 1 - (layerProgress - 0.7) / 0.25
    : 0;

  return (
    <g className="shingles-layer">
      <defs>
        <clipPath id="roofClipShingles">
          <polygon points={`${peakX},${peakY} ${leftEaveX},${eaveY} ${rightEaveX},${eaveY}`} />
        </clipPath>
      </defs>
      
      <g clipPath="url(#roofClipShingles)">
        {courses.map((course) => (
          <g key={`course-${course.courseIdx}`}>
            {course.tabs.map((tab) => {
              // Diagonal index for stair-step animation
              const diagonalIdx = course.courseIdx + tab.tabIdx;
              const normalizedDiagonal = diagonalIdx / maxDiagonalIdx;
              
              // Stagger animation based on diagonal position
              const spreadFactor = 0.7;
              const tabProgress = Math.max(0, Math.min(1, 
                (layerProgress - normalizedDiagonal * spreadFactor) / (1 - spreadFactor)
              ));
              
              if (tabProgress <= 0) return null;
              
              const easedProgress = easeOutBack(tabProgress);
              const translateY = (1 - easedProgress) * -30;
              const opacity = Math.min(1, tabProgress * 2);
              
              // Calculate trapezoid points (wider at bottom due to roof slope)
              const topLeftX = getLeftX(course.topY);
              const topRightX = getRightX(course.topY);
              const topCourseWidth = topRightX - topLeftX;
              const bottomCourseWidth = getRightX(course.bottomY) - getLeftX(course.bottomY);
              
              const topTabWidth = topCourseWidth / course.tabs.length;
              const bottomTabWidth = bottomCourseWidth / course.tabs.length;
              
              const tl = topLeftX + (tab.tabIdx * topTabWidth);
              const tr = tl + topTabWidth;
              const bl = getLeftX(course.bottomY) + (tab.tabIdx * bottomTabWidth);
              const br = bl + bottomTabWidth;
              
              return (
                <polygon
                  key={`tab-${course.courseIdx}-${tab.tabIdx}`}
                  points={`${tl},${course.topY} ${tr},${course.topY} ${br},${course.bottomY} ${bl},${course.bottomY}`}
                  fill={getShingleColor(course.courseIdx, tab.tabIdx)}
                  stroke="hsl(210 5% 8%)"
                  strokeWidth="0.5"
                  style={{
                    transform: `translateY(${translateY}px)`,
                    opacity,
                    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                  }}
                />
              );
            })}
          </g>
        ))}
      </g>
      
      {/* SHINGLES text label */}
      {textOpacity > 0 && (
        <g style={{ opacity: textOpacity }}>
          <defs>
            <filter id="shinglesTextGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="hsl(0 0% 0%)" floodOpacity="0.9" />
            </filter>
          </defs>
          <text
            x={peakX}
            y={115}
            textAnchor="middle"
            fontSize={isMobile ? 20 : 15}
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
            letterSpacing="3"
            fill="hsl(0 0% 100%)"
            stroke="hsl(0 0% 0%)"
            strokeWidth="3"
            paintOrder="stroke fill"
            filter="url(#shinglesTextGlow)"
          >
            SHINGLES
          </text>
        </g>
      )}
    </g>
  );
};

// NUCLEAR DELETE - FieldShinglesLayer removed entirely
export const FieldShinglesLayer: React.FC<LayerProps> = () => null;

// Pipe Boots & Vents - with cinematic neon glow animation
export const VentsLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  // Exact same easing as drip edge
  const easedProgress = easeOutQuint(layerProgress);
  
  // Same drop-in pattern as drip edge: starts at -150, ends at 0
  const translateY = -150 * (1 - easedProgress);
  
  // Desktop: smooth fade-in and scale during first 30% of animation
  const entranceProgress = Math.min(1, layerProgress * 3.33); // 0 to 1 over first 30%
  const desktopOpacity = isMobile ? 1 : Math.min(1, entranceProgress * 1.5);
  const desktopScale = isMobile ? 1 : 0.85 + (easedProgress * 0.15); // Scale from 0.85 to 1
  
  // Responsive positioning
  const pipeBootX = isMobile ? 120 : 130;
  const pipeBootBaseY = isMobile ? 120 : 125;
  const ventX = isMobile ? 280 : 270;
  const ventBaseY = isMobile ? 125 : 130;
  
  // Subtle glow intensity - only animate on desktop for performance
  const glowIntensity = isMobile ? 1 : (easedProgress > 0.8 ? 1 + Math.sin((easedProgress - 0.8) * 15) * 0.15 : 1);
  
  // Text fades out in second half of animation
  const textOpacity = layerProgress < 0.5 
    ? 1 
    : layerProgress < 0.85 
      ? 1 - ((layerProgress - 0.5) / 0.35)
      : 0;
  
  // Round translateY to avoid subpixel rendering on mobile
  const smoothTranslateY = isMobile ? Math.round(translateY) : translateY;
  
  return (
    <g 
      className="vents-layer"
      style={{
        transform: isMobile 
          ? `translateY(${smoothTranslateY}px)` 
          : `translate3d(0, ${translateY}px, 0) scale(${desktopScale})`,
        opacity: desktopOpacity,
        willChange: isMobile ? 'transform' : 'transform, opacity',
        transformOrigin: '200px 120px',
      }}
    >
      <defs>
        {/* Simplified filters - no heavy blur on mobile for performance */}
        {!isMobile && (
          <>
            <filter id="pipeBootGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ventGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ventsTextGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="hsl(168 80% 50%)" floodOpacity="0.8" />
            </filter>
          </>
        )}
        
        <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 50% 35%)" />
          <stop offset="50%" stopColor="hsl(168 60% 45%)" />
          <stop offset="100%" stopColor="hsl(168 40% 25%)" />
        </linearGradient>
        <linearGradient id="bootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(20 10% 25%)" />
          <stop offset="100%" stopColor="hsl(20 8% 15%)" />
        </linearGradient>
        <linearGradient id="ventBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 45% 40%)" />
          <stop offset="50%" stopColor="hsl(168 55% 50%)" />
          <stop offset="100%" stopColor="hsl(168 35% 30%)" />
        </linearGradient>
        <linearGradient id="ventHoodGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(168 50% 35%)" />
          <stop offset="100%" stopColor="hsl(168 60% 55%)" />
        </linearGradient>
      </defs>
      
      {/* Text label - inside animated group so it follows the drop */}
      {textOpacity > 0 && (
        <g style={{ opacity: textOpacity }}>
          <text x="200" y="100" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="2" fill="hsl(168 90% 75%)" stroke="hsl(0 0% 0%)" strokeWidth="3" paintOrder="stroke fill" filter={isMobile ? undefined : "url(#ventsTextGlowFilter)"}>
            PIPE BOOTS
          </text>
          <text x="200" y="116" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="2" fill="hsl(30 90% 65%)" stroke="hsl(0 0% 0%)" strokeWidth="3" paintOrder="stroke fill" filter={isMobile ? undefined : "url(#ventsTextGlowFilter)"}>
            & VENTS
          </text>
        </g>
      )}
      
      {/* Pipe Boot - simplified on mobile */}
      <g style={{ transform: `translate(${pipeBootX}px, ${pipeBootBaseY}px)` }} filter={isMobile ? undefined : "url(#pipeBootGlow)"}>
        <ellipse cx="0" cy="12" rx="12" ry="4" fill="url(#bootGradient)" stroke="hsl(168 70% 45%)" strokeWidth="1" />
        <path d="M-12,12 Q-10,0 0,-8 Q10,0 12,12" fill="url(#bootGradient)" stroke="hsl(168 70% 50%)" strokeWidth="1.5" />
        <rect x="-4" y="-20" width="8" height="14" rx="1" fill="url(#pipeGradient)" stroke="hsl(168 80% 55%)" strokeWidth="1.5" />
        <ellipse cx="0" cy="-20" rx="5" ry="2" fill="hsl(168 60% 50%)" stroke="hsl(168 80% 60%)" strokeWidth="1" />
        {!isMobile && (
          <ellipse cx="0" cy="-20" rx="3" ry="1.2" fill="none" stroke={`hsl(168 100% ${70 * glowIntensity}%)`} strokeWidth="0.5" opacity={0.8} />
        )}
      </g>
      
      {/* Box Vent - simplified on mobile */}
      <g style={{ transform: `translate(${ventX}px, ${ventBaseY}px)` }} filter={isMobile ? undefined : "url(#ventGlow)"}>
        <rect x="-16" y="5" width="32" height="8" rx="1" fill="hsl(168 30% 25%)" stroke="hsl(168 70% 45%)" strokeWidth="1" />
        <rect x="-12" y="-12" width="24" height="18" rx="2" fill="url(#ventBodyGradient)" stroke="hsl(168 80% 55%)" strokeWidth="1.5" />
        <path d="M-14,-12 L-14,-18 Q-14,-22 -10,-22 L10,-22 Q14,-22 14,-18 L14,-12 Z" fill="url(#ventHoodGradient)" stroke="hsl(168 85% 60%)" strokeWidth="1.5" />
        <rect x="-10" y="-8" width="20" height="10" rx="1" fill="hsl(0 0% 5%)" stroke="hsl(168 60% 40%)" strokeWidth="0.5" />
        {/* Mesh lines - desktop only for performance */}
        {!isMobile && (
          <>
            {[-6, -2, 2, 6].map((x, i) => (
              <line key={i} x1={x} y1="-7" x2={x} y2="1" stroke={`hsl(168 50% ${35 * glowIntensity}%)`} strokeWidth="0.5" />
            ))}
            {[-5, -1, 3].map((y, i) => (
              <line key={i} x1="-9" y1={y - 3} x2="9" y2={y - 3} stroke={`hsl(168 50% ${35 * glowIntensity}%)`} strokeWidth="0.5" />
            ))}
            <line x1="-13" y1="-22" x2="13" y2="-22" stroke={`hsl(168 100% ${70 * glowIntensity}%)`} strokeWidth="1" opacity={0.9} />
          </>
        )}
      </g>
    </g>
  );
};

// Flashing layer - simple collars around chimney, pipe boot, and vent
export const FlashingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress, isMobile }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easedProgress = easeOutQuint(layerProgress);
  
  // Drop-in animation
  const translateY = -100 * (1 - easedProgress);
  const opacity = 0.3 + (0.7 * easedProgress);
  
  // Text timing: fade in 10-30%, hold 30-60%, fade out 60-85%
  const textOpacity = layerProgress < 0.1 
    ? 0 
    : layerProgress < 0.3 
      ? (layerProgress - 0.1) / 0.2 
      : layerProgress < 0.60 
        ? 1 
        : layerProgress < 0.85 
          ? 1 - (layerProgress - 0.60) / 0.25 
          : 0;
  
  // Positions matching VentsLayer
  const pipeBootX = isMobile ? 120 : 130;
  const pipeBootBaseY = isMobile ? 120 : 125;
  const ventX = isMobile ? 280 : 270;
  const ventBaseY = isMobile ? 125 : 130;
  
  // Chimney flashing position (chimney bottom edge follows roof slope)
  const chimneyLeftX = 88;
  const chimneyRightX = 122;
  const chimneyBottomLeftY = 130;
  const chimneyBottomRightY = 117;
  
  return (
    <g 
      className="flashing-layer"
      style={{
        transform: `translateY(${isMobile ? Math.round(translateY) : translateY}px)`,
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      <defs>
        {/* Realistic metal flashing gradient */}
        <linearGradient id="flashingMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(210 20% 75%)" />
          <stop offset="30%" stopColor="hsl(210 15% 60%)" />
          <stop offset="70%" stopColor="hsl(210 18% 50%)" />
          <stop offset="100%" stopColor="hsl(210 12% 40%)" />
        </linearGradient>
        <linearGradient id="flashingHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(210 30% 85%)" />
          <stop offset="100%" stopColor="hsl(210 20% 55%)" />
        </linearGradient>
        <linearGradient id="flashingShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(210 15% 35%)" />
          <stop offset="100%" stopColor="hsl(210 20% 55%)" />
        </linearGradient>
        {!isMobile && (
          <filter id="flashingGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="hsl(210 50% 70%)" floodOpacity="0.4" />
          </filter>
        )}
      </defs>
      
      {/* ========= CHIMNEY FLASHING - Realistic Step Flashing ========= */}
      {/* Chimney: M88 50 L122 50 L122 117 L88 130 Z */}
      <g filter={isMobile ? undefined : "url(#flashingGlow)"}>
        
        {/* LEFT SIDE - Step flashing pieces going up the roof slope */}
        {/* Each step is an L-shaped piece that tucks under shingles */}
        {[0, 1, 2, 3, 4].map((i) => {
          const stepHeight = 10;
          const baseY = 128 - (i * stepHeight);
          const roofSlope = 0.38; // Approximate slope
          const xOffset = i * stepHeight * roofSlope;
          return (
            <g key={`left-step-${i}`}>
              {/* Vertical leg (against chimney) */}
              <path
                d={`M${86 - xOffset} ${baseY} 
                    L${86 - xOffset} ${baseY - stepHeight - 2}
                    L${89 - xOffset} ${baseY - stepHeight - 2}
                    L${89 - xOffset} ${baseY} Z`}
                fill="url(#flashingHighlight)"
                stroke="hsl(210 25% 45%)"
                strokeWidth="0.5"
              />
              {/* Horizontal leg (on roof) */}
              <path
                d={`M${86 - xOffset} ${baseY}
                    L${76 - xOffset} ${baseY + 3}
                    L${76 - xOffset} ${baseY + 1}
                    L${86 - xOffset} ${baseY - 2} Z`}
                fill="url(#flashingMetalGrad)"
                stroke="hsl(210 25% 45%)"
                strokeWidth="0.5"
              />
            </g>
          );
        })}
        
        {/* LEFT SIDE - Counter flashing (tucks into mortar joints) */}
        {[0, 1, 2, 3].map((i) => {
          const stepHeight = 12;
          const baseY = 125 - (i * stepHeight);
          return (
            <rect
              key={`left-counter-${i}`}
              x="88"
              y={baseY - 4}
              width="4"
              height="6"
              fill="url(#flashingShadow)"
              stroke="hsl(210 30% 50%)"
              strokeWidth="0.3"
            />
          );
        })}
        
        {/* RIGHT SIDE - Step flashing pieces */}
        {[0, 1, 2, 3].map((i) => {
          const stepHeight = 8;
          const baseY = 115 - (i * stepHeight);
          const roofSlope = 0.38;
          const xOffset = i * stepHeight * roofSlope;
          return (
            <g key={`right-step-${i}`}>
              {/* Vertical leg */}
              <path
                d={`M${123 + xOffset} ${baseY}
                    L${123 + xOffset} ${baseY - stepHeight - 2}
                    L${120 + xOffset} ${baseY - stepHeight - 2}
                    L${120 + xOffset} ${baseY} Z`}
                fill="url(#flashingHighlight)"
                stroke="hsl(210 25% 45%)"
                strokeWidth="0.5"
              />
              {/* Horizontal leg */}
              <path
                d={`M${123 + xOffset} ${baseY}
                    L${133 + xOffset} ${baseY + 3}
                    L${133 + xOffset} ${baseY + 1}
                    L${123 + xOffset} ${baseY - 2} Z`}
                fill="url(#flashingMetalGrad)"
                stroke="hsl(210 25% 45%)"
                strokeWidth="0.5"
              />
            </g>
          );
        })}
        
        {/* RIGHT SIDE - Counter flashing */}
        {[0, 1, 2].map((i) => {
          const stepHeight = 10;
          const baseY = 112 - (i * stepHeight);
          return (
            <rect
              key={`right-counter-${i}`}
              x="118"
              y={baseY - 3}
              width="4"
              height="5"
              fill="url(#flashingShadow)"
              stroke="hsl(210 30% 50%)"
              strokeWidth="0.3"
            />
          );
        })}
        
        {/* BOTTOM APRON - Main waterproofing at chimney base */}
        <path
          d="M82 133 L82 127 L88 127 L88 130 L122 117 L122 113 L128 113 L128 120 L88 133 Z"
          fill="url(#flashingMetalGrad)"
          stroke="hsl(210 30% 55%)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        
        {/* Apron top edge highlight */}
        <path
          d="M82 127 L88 127 L88 130 L122 117 L122 113 L128 113"
          fill="none"
          stroke="hsl(210 40% 80%)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Apron drip edge (bottom lip) */}
        <path
          d="M80 135 L80 133 L128 120 L130 122 Z"
          fill="hsl(210 15% 50%)"
          stroke="hsl(210 20% 40%)"
          strokeWidth="0.5"
        />
        
        {/* Corner caps for clean finish */}
        <rect x="82" y="125" width="8" height="4" rx="0.5" fill="hsl(210 20% 60%)" stroke="hsl(210 25% 45%)" strokeWidth="0.5" />
        <rect x="120" y="111" width="8" height="4" rx="0.5" fill="hsl(210 20% 60%)" stroke="hsl(210 25% 45%)" strokeWidth="0.5" />
      </g>
      
      {/* Pipe boot flashing collar */}
      <g 
        style={{ transform: `translate(${pipeBootX}px, ${pipeBootBaseY}px)` }}
        filter={isMobile ? undefined : "url(#flashingGlow)"}
      >
        {/* Base collar around pipe boot */}
        <ellipse 
          cx="0" 
          cy="14" 
          rx="15" 
          ry="5" 
          fill="url(#flashingMetalGrad)"
          stroke="hsl(210 30% 80%)"
          strokeWidth="1"
        />
        {/* Inner lip */}
        <ellipse 
          cx="0" 
          cy="13" 
          rx="13" 
          ry="4" 
          fill="none"
          stroke="hsl(210 20% 65%)"
          strokeWidth="1.5"
        />
      </g>
      
      {/* Vent flashing collar */}
      <g 
        style={{ transform: `translate(${ventX}px, ${ventBaseY}px)` }}
        filter={isMobile ? undefined : "url(#flashingGlow)"}
      >
        {/* Base collar around vent */}
        <rect 
          x="-20" 
          y="10" 
          width="40" 
          height="5" 
          rx="1"
          fill="url(#flashingMetalGrad)"
          stroke="hsl(210 30% 80%)"
          strokeWidth="1"
        />
        {/* Side flanges */}
        <rect 
          x="-22" 
          y="8" 
          width="44" 
          height="3" 
          rx="0.5"
          fill="hsl(210 12% 60%)"
          stroke="hsl(210 25% 75%)"
          strokeWidth="0.75"
        />
      </g>
      
      {/* Text label */}
      {textOpacity > 0 && (
        <g style={{ opacity: textOpacity }}>
          <text
            x="200"
            y="108"
            textAnchor="middle"
            fontSize={isMobile ? 14 : 13}
            fontWeight="800"
            fontFamily="system-ui, sans-serif"
            letterSpacing="2"
            fill="hsl(210 30% 85%)"
            stroke="hsl(0 0% 0%)"
            strokeWidth="3"
            paintOrder="stroke fill"
            style={{
              filter: 'drop-shadow(0 0 4px hsl(0 0% 0%))',
            }}
          >
            FLASHING
          </text>
        </g>
      )}
    </g>
  );
};

export const RidgeCapLayer: React.FC<LayerProps> = () => null;
export const CleanUpLayer: React.FC<LayerProps> = () => null;
export const MobileShingleOverlay: React.FC<LayerProps> = () => null;

// Simple mobile-only vents layer - GPU-accelerated for maximum smoothness
export const MobileVentsLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easedProgress = easeOutQuint(layerProgress);
  // Round to whole pixels for crisp rendering
  const translateY = Math.round(-120 * (1 - easedProgress));
  
  // Text fades out in second half of animation (matches desktop)
  const textOpacity = layerProgress < 0.05 
    ? 0 
    : layerProgress < 0.5 
      ? 1 
      : layerProgress < 0.85 
        ? 1 - ((layerProgress - 0.5) / 0.35)
        : 0;
  
  return (
    <g 
      className="mobile-vents-layer"
      style={{
        // Use translate3d for GPU acceleration
        transform: `translate3d(0, ${translateY}px, 0)`,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
      } as React.CSSProperties}
    >
      {/* Simple pipe boot - close to center */}
      <g>
        <ellipse cx="180" cy="138" rx="8" ry="3" fill="hsl(168 40% 30%)" stroke="hsl(168 70% 50%)" strokeWidth="1.5" />
        <rect x="177" y="123" width="6" height="15" rx="1" fill="hsl(168 50% 40%)" stroke="hsl(168 80% 55%)" strokeWidth="1.5" />
        <ellipse cx="180" cy="123" rx="4" ry="1.5" fill="hsl(168 60% 50%)" stroke="hsl(168 80% 60%)" strokeWidth="1" />
      </g>
      
      {/* Simple box vent - close to center, symmetrical with pipe */}
      <g>
        <rect x="208" y="131" width="24" height="6" rx="1" fill="hsl(168 30% 25%)" stroke="hsl(168 70% 45%)" strokeWidth="1" />
        <rect x="210" y="118" width="20" height="14" rx="2" fill="hsl(168 45% 40%)" stroke="hsl(168 80% 55%)" strokeWidth="1.5" />
        <path d="M209,118 L209,112 Q209,109 212,109 L228,109 Q231,109 231,112 L231,118 Z" fill="hsl(168 50% 45%)" stroke="hsl(168 85% 60%)" strokeWidth="1.5" />
      </g>
      
      {/* Text label - no fade, just visible/hidden */}
      {textOpacity > 0 && (
        <g>
          <text x="200" y="100" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="2" fill="hsl(168 90% 75%)" stroke="hsl(0 0% 0%)" strokeWidth="3" paintOrder="stroke fill">
            PIPE BOOTS
          </text>
          <text x="200" y="114" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="2" fill="hsl(30 90% 65%)" stroke="hsl(0 0% 0%)" strokeWidth="3" paintOrder="stroke fill">
            & VENTS
          </text>
        </g>
      )}
    </g>
  );
};
