import React from 'react';

interface LayerProps {
  progress: number;
  startProgress: number;
  endProgress: number;
}

const calculateLayerState = (progress: number, start: number, end: number) => {
  const layerProgress = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  const isLocked = progress >= end;
  // Add easing for smoother animation
  const easedProgress = layerProgress < 0.5 
    ? 2 * layerProgress * layerProgress 
    : 1 - Math.pow(-2 * layerProgress + 2, 2) / 2;
  return { layerProgress: easedProgress, isLocked };
};

// Layer colors
const colors = {
  decking: { 
    fill: 'hsl(35 55% 45%)', // Warm plywood tan
    fillLight: 'hsl(38 60% 55%)', // Lighter new plywood
    fillDark: 'hsl(32 50% 38%)', // Darker aged plywood
    stroke: 'hsl(30 40% 30%)', // Dark seam lines
    glow: 'hsl(35 70% 55%)' 
  },
  dripEdge: { fill: 'hsl(210 15% 65%)', stroke: 'hsl(210 20% 75%)', glow: 'hsl(210 30% 70%)' },
  iceWater: { fill: 'hsl(260 45% 35%)', stroke: 'hsl(260 50% 50%)', glow: 'hsl(260 60% 55%)' },
  underlayment: { fill: 'hsl(35 15% 28%)', stroke: 'hsl(35 20% 40%)', glow: 'hsl(35 30% 45%)' },
  starter: { fill: 'hsl(25 35% 22%)', stroke: 'hsl(25 40% 35%)', glow: 'hsl(25 50% 40%)' },
  flashing: { fill: 'hsl(200 15% 60%)', stroke: 'hsl(200 25% 75%)', glow: 'hsl(200 35% 80%)' },
  shingles: { fill: 'hsl(20 40% 25%)', stroke: 'hsl(20 50% 38%)', glow: 'hsl(32 70% 50%)' },
  ridge: { fill: 'hsl(22 45% 28%)', stroke: 'hsl(32 60% 45%)', glow: 'hsl(32 80% 55%)' },
  vents: { fill: 'hsl(0 0% 18%)', stroke: 'hsl(168 70% 50%)', glow: 'hsl(168 80% 55%)' },
};

// Layer 1: Decking - World-Class Plywood with Parallelogram Paths
export const DeckingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -200;
  const opacity = 0.5 + layerProgress * 0.5;
  const scale = isLocked ? 1.02 : 0.95 + layerProgress * 0.07;
  const bounceOffset = isLocked ? Math.sin(Date.now() / 200) * 0.5 : 0;

  // Plywood colors - warm natural tones with variation
  const plyColors = [
    'hsl(35 55% 52%)',   // Light warm
    'hsl(32 50% 46%)',   // Medium
    'hsl(38 58% 55%)',   // Lighter new
    'hsl(30 48% 42%)',   // Darker aged
    'hsl(36 52% 50%)',   // Neutral
    'hsl(33 45% 44%)',   // Weathered
  ];

  // Roof geometry: Left side goes from (40, 160) to (200, 55), right from (200, 55) to (360, 160)
  // Slope ratio: rise 105 / run 160 = 0.656
  const slope = 105 / 160; // 0.656
  const sheetWidth = 48; // Width of each plywood sheet
  const sheetHeight = 16; // Vertical height on screen per row

  // Generate parallelogram paths for left side (sheets go from right to left)
  const generateLeftSheets = () => {
    const sheets: { d: string; color: string }[] = [];
    const rows = 7;
    
    for (let row = 0; row < rows; row++) {
      // Starting Y position for this row (from ridge going down)
      const rowTopY = 55 + row * sheetHeight;
      const rowBottomY = rowTopY + sheetHeight;
      
      // X positions at ridge line (x=200) going left
      // At any Y, the left edge of roof is at: x = 40 + (160 - y) / slope... wait
      // Left roof edge: from (40, 160) to (200, 55)
      // At y, x_left = 40 + (160 - y) * (160/105) = 40 + (160 - y) * 1.524
      const getLeftEdgeX = (y: number) => 40 + (160 - y) * (160 / 105);
      
      const leftEdgeTop = getLeftEdgeX(rowTopY);
      const leftEdgeBottom = getLeftEdgeX(rowBottomY);
      
      // Stagger pattern: odd rows offset by half sheet width
      const staggerOffset = row % 2 === 1 ? sheetWidth / 2 : 0;
      
      // Start from ridge (x=200) and place sheets going left
      let currentX = 200 - staggerOffset;
      let sheetIndex = 0;
      
      while (currentX > leftEdgeBottom - sheetWidth) {
        const topLeft = Math.max(leftEdgeTop, currentX - sheetWidth);
        const topRight = Math.min(200, currentX);
        const bottomLeft = Math.max(leftEdgeBottom, currentX - sheetWidth);
        const bottomRight = Math.min(200, currentX);
        
        // Create parallelogram: the sheet follows the roof slope
        // Top edge is at rowTopY, shifted based on slope
        // Bottom edge is at rowBottomY
        const shiftX = sheetHeight / slope; // How much X shifts per row height
        
        const tl = { x: topRight - sheetWidth + shiftX, y: rowTopY };
        const tr = { x: topRight, y: rowTopY };
        const br = { x: topRight - shiftX, y: rowBottomY };
        const bl = { x: topRight - sheetWidth, y: rowBottomY };
        
        const path = `M${tl.x} ${tl.y} L${tr.x} ${tr.y} L${br.x} ${br.y} L${bl.x} ${bl.y} Z`;
        sheets.push({ d: path, color: plyColors[(row + sheetIndex) % plyColors.length] });
        
        currentX -= sheetWidth;
        sheetIndex++;
      }
    }
    return sheets;
  };

  // Generate parallelogram paths for right side (sheets go from left to right)
  const generateRightSheets = () => {
    const sheets: { d: string; color: string }[] = [];
    const rows = 7;
    
    for (let row = 0; row < rows; row++) {
      const rowTopY = 55 + row * sheetHeight;
      const rowBottomY = rowTopY + sheetHeight;
      
      // Right roof edge: from (200, 55) to (360, 160)
      // At y, x_right = 200 + (y - 55) * (160/105)
      const getRightEdgeX = (y: number) => 200 + (y - 55) * (160 / 105);
      
      const rightEdgeTop = getRightEdgeX(rowTopY);
      const rightEdgeBottom = getRightEdgeX(rowBottomY);
      
      // Stagger pattern
      const staggerOffset = row % 2 === 1 ? sheetWidth / 2 : 0;
      
      let currentX = 200 + staggerOffset;
      let sheetIndex = 0;
      const shiftX = sheetHeight / slope;
      
      while (currentX < rightEdgeBottom + sheetWidth) {
        const tl = { x: currentX, y: rowTopY };
        const tr = { x: currentX + sheetWidth - shiftX, y: rowTopY };
        const br = { x: currentX + sheetWidth, y: rowBottomY };
        const bl = { x: currentX + shiftX, y: rowBottomY };
        
        const path = `M${tl.x} ${tl.y} L${tr.x} ${tr.y} L${br.x} ${br.y} L${bl.x} ${bl.y} Z`;
        sheets.push({ d: path, color: plyColors[(row + sheetIndex + 3) % plyColors.length] });
        
        currentX += sheetWidth;
        sheetIndex++;
      }
    }
    return sheets;
  };

  const leftSheets = generateLeftSheets();
  const rightSheets = generateRightSheets();

  return (
    <g
      style={{
        transform: `translateY(${yOffset + bounceOffset}px) scale(${scale})`,
        transformOrigin: '200px 110px',
        opacity,
        transition: isLocked ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
      }}
    >
      {/* Clip paths matching exact roof geometry */}
      <defs>
        <clipPath id="leftRoofClip">
          <path d="M40 160 L200 55 L200 160 Z" />
        </clipPath>
        <clipPath id="rightRoofClip">
          <path d="M200 55 L360 160 L200 160 Z" />
        </clipPath>
      </defs>

      {/* ===== LEFT ROOF SIDE - Parallelogram Plywood Sheets ===== */}
      <g clipPath="url(#leftRoofClip)">
        {leftSheets.map((sheet, i) => (
          <path
            key={`left-${i}`}
            d={sheet.d}
            fill={sheet.color}
            stroke="hsl(28 40% 32%)"
            strokeWidth="0.8"
          />
        ))}
      </g>

      {/* ===== RIGHT ROOF SIDE - Parallelogram Plywood Sheets ===== */}
      <g clipPath="url(#rightRoofClip)">
        {rightSheets.map((sheet, i) => (
          <path
            key={`right-${i}`}
            d={sheet.d}
            fill={sheet.color}
            stroke="hsl(28 40% 32%)"
            strokeWidth="0.8"
          />
        ))}
      </g>

      {/* ===== Subtle Wood Grain Overlay ===== */}
      <g opacity="0.12" clipPath="url(#leftRoofClip)">
        <line x1="60" y1="160" x2="180" y2="80" stroke="hsl(25 40% 35%)" strokeWidth="0.5" />
        <line x1="80" y1="160" x2="192" y2="90" stroke="hsl(25 40% 35%)" strokeWidth="0.4" />
        <line x1="100" y1="160" x2="198" y2="108" stroke="hsl(25 40% 35%)" strokeWidth="0.5" />
        <line x1="140" y1="160" x2="200" y2="130" stroke="hsl(25 40% 35%)" strokeWidth="0.4" />
      </g>
      <g opacity="0.12" clipPath="url(#rightRoofClip)">
        <line x1="220" y1="80" x2="340" y2="160" stroke="hsl(25 40% 35%)" strokeWidth="0.5" />
        <line x1="208" y1="90" x2="320" y2="160" stroke="hsl(25 40% 35%)" strokeWidth="0.4" />
        <line x1="202" y1="108" x2="300" y2="160" stroke="hsl(25 40% 35%)" strokeWidth="0.5" />
        <line x1="200" y1="130" x2="260" y2="160" stroke="hsl(25 40% 35%)" strokeWidth="0.4" />
      </g>

      {/* ===== Small Knots ===== */}
      <g opacity="0.35">
        <circle cx="120" cy="100" r="1.5" fill="hsl(25 50% 30%)" />
        <circle cx="155" cy="130" r="2" fill="hsl(25 50% 30%)" />
        <circle cx="85" cy="145" r="1.5" fill="hsl(25 50% 30%)" />
        <circle cx="175" cy="115" r="1.2" fill="hsl(25 50% 30%)" />
        <circle cx="250" cy="100" r="1.5" fill="hsl(25 50% 30%)" />
        <circle cx="285" cy="130" r="2" fill="hsl(25 50% 30%)" />
        <circle cx="320" cy="145" r="1.5" fill="hsl(25 50% 30%)" />
        <circle cx="230" cy="120" r="1.2" fill="hsl(25 50% 30%)" />
      </g>

      {/* ===== Ridge Line - Center seam ===== */}
      <line 
        x1="200" y1="55" x2="200" y2="160" 
        stroke="hsl(25 35% 25%)" 
        strokeWidth="2.5"
      />

      {/* Glow effect when locked */}
      {isLocked && (
        <g style={{ filter: 'drop-shadow(0 0 12px hsl(35 70% 55%)) drop-shadow(0 0 25px hsl(35 60% 50%))' }}>
          <path
            d="M40 160 L200 55 L360 160"
            fill="none"
            stroke="hsl(38 65% 55%)"
            strokeWidth="2"
          />
        </g>
      )}
    </g>
  );
};

// Layer 2: Drip Edge (Eaves) - Bottom horizontal edges only
export const DripEdgeEavesLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -150;
  const opacity = 0.4 + layerProgress * 0.6;
  const scale = isLocked ? 1 : 0.98 + layerProgress * 0.02;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px) scale(${scale})`,
        transformOrigin: '200px 160px',
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      {/* Left eave drip edge */}
      <path
        d="M42 160 L42 167 L175 167 L175 160"
        fill={colors.dripEdge.fill}
        stroke={colors.dripEdge.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 12px ${colors.dripEdge.glow})` 
            : `drop-shadow(0 0 4px ${colors.dripEdge.glow})`,
        }}
      />
      {/* Right eave drip edge */}
      <path
        d="M175 160 L175 167 L358 167 L358 160"
        fill={colors.dripEdge.fill}
        stroke={colors.dripEdge.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 12px ${colors.dripEdge.glow})` 
            : `drop-shadow(0 0 4px ${colors.dripEdge.glow})`,
        }}
      />
    </g>
  );
};

// Layer 5: Drip Edge (Rakes) - Angled side edges only
export const DripEdgeRakesLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -180;
  const opacity = 0.4 + layerProgress * 0.6;
  const scale = isLocked ? 1 : 0.98 + layerProgress * 0.02;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px) scale(${scale})`,
        transformOrigin: '200px 110px',
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      {/* Left rake drip edge */}
      <path
        d="M38 162 L200 52 L205 55 L45 160"
        fill={colors.dripEdge.fill}
        stroke={colors.dripEdge.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 12px ${colors.dripEdge.glow})` 
            : `drop-shadow(0 0 4px ${colors.dripEdge.glow})`,
        }}
      />
      {/* Right rake drip edge */}
      <path
        d="M195 55 L200 52 L362 162 L355 160"
        fill={colors.dripEdge.fill}
        stroke={colors.dripEdge.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 12px ${colors.dripEdge.glow})` 
            : `drop-shadow(0 0 4px ${colors.dripEdge.glow})`,
        }}
      />
    </g>
  );
};

// Layer 2: Ice & Water Shield - Purple membrane
export const IceWaterShieldLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -180;
  const opacity = 0.4 + layerProgress * 0.6;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      {/* Full roof ice shield membrane */}
      <path
        d="M48 158 L200 56 L352 158 L352 145 L200 48 L48 145 Z"
        fill={colors.iceWater.fill}
        fillOpacity="0.7"
        stroke={colors.iceWater.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 15px ${colors.iceWater.glow})` 
            : `drop-shadow(0 0 5px ${colors.iceWater.glow})`,
        }}
      />
      {/* Self-seal strip indicators */}
      <line x1="60" y1="152" x2="200" y2="58" stroke={colors.iceWater.stroke} strokeWidth="0.5" opacity="0.5" />
      <line x1="200" y1="58" x2="340" y2="152" stroke={colors.iceWater.stroke} strokeWidth="0.5" opacity="0.5" />
    </g>
  );
};

// Layer 3: Underlayment - Gray felt
export const UnderlaymentLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -200;
  const opacity = 0.4 + layerProgress * 0.6;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      <path
        d="M50 156 L200 58 L350 156 Z"
        fill={colors.underlayment.fill}
        stroke={colors.underlayment.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 12px ${colors.underlayment.glow})` 
            : `drop-shadow(0 0 4px ${colors.underlayment.glow})`,
        }}
      />
      {/* Overlap lines to show felt paper rows */}
      <line x1="65" y1="148" x2="200" y2="68" stroke={colors.underlayment.stroke} strokeWidth="0.8" opacity="0.4" />
      <line x1="200" y1="68" x2="335" y2="148" stroke={colors.underlayment.stroke} strokeWidth="0.8" opacity="0.4" />
      <line x1="85" y1="138" x2="200" y2="78" stroke={colors.underlayment.stroke} strokeWidth="0.8" opacity="0.3" />
      <line x1="200" y1="78" x2="315" y2="138" stroke={colors.underlayment.stroke} strokeWidth="0.8" opacity="0.3" />
    </g>
  );
};

// Layer 4: Starter Strip
export const StarterStripLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -220;
  const opacity = 0.4 + layerProgress * 0.6;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      {/* Left eave starter */}
      <path
        d="M52 155 L135 110 L135 118 L52 158 Z"
        fill={colors.starter.fill}
        stroke={colors.starter.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 10px ${colors.starter.glow})` 
            : `drop-shadow(0 0 3px ${colors.starter.glow})`,
        }}
      />
      {/* Right eave starter */}
      <path
        d="M265 110 L348 155 L348 158 L265 118 Z"
        fill={colors.starter.fill}
        stroke={colors.starter.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 10px ${colors.starter.glow})` 
            : `drop-shadow(0 0 3px ${colors.starter.glow})`,
        }}
      />
      {/* Left rake starter */}
      <path
        d="M55 152 L200 60 L200 68 L62 152 Z"
        fill={colors.starter.fill}
        stroke={colors.starter.stroke}
        strokeWidth="1"
        opacity="0.8"
      />
      {/* Right rake starter */}
      <path
        d="M200 60 L345 152 L338 152 L200 68 Z"
        fill={colors.starter.fill}
        stroke={colors.starter.stroke}
        strokeWidth="1"
        opacity="0.8"
      />
    </g>
  );
};

// Layer 5: Flashing - Metallic silver
export const FlashingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -240;
  const opacity = 0.4 + layerProgress * 0.6;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      {/* Valley/ridge flashing */}
      <path
        d="M185 75 L200 58 L215 75 L210 78 L200 65 L190 78 Z"
        fill={colors.flashing.fill}
        stroke={colors.flashing.stroke}
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 12px ${colors.flashing.glow})` 
            : `drop-shadow(0 0 4px ${colors.flashing.glow})`,
        }}
      />
      {/* Step flashing pieces - left side */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`left-${i}`}
          x={90 + i * 25}
          y={130 - i * 15}
          width="14"
          height="10"
          rx="1"
          fill={colors.flashing.fill}
          stroke={colors.flashing.stroke}
          strokeWidth="0.8"
          style={{
            filter: isLocked ? `drop-shadow(0 0 6px ${colors.flashing.glow})` : 'none',
          }}
        />
      ))}
      {/* Step flashing pieces - right side */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`right-${i}`}
          x={296 - i * 25}
          y={130 - i * 15}
          width="14"
          height="10"
          rx="1"
          fill={colors.flashing.fill}
          stroke={colors.flashing.stroke}
          strokeWidth="0.8"
          style={{
            filter: isLocked ? `drop-shadow(0 0 6px ${colors.flashing.glow})` : 'none',
          }}
        />
      ))}
    </g>
  );
};

// Layer 6: Field Shingles - Main coverage
export const FieldShinglesLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -260;
  const opacity = 0.4 + layerProgress * 0.6;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      {/* Main shingle field */}
      <path
        d="M55 154 L200 60 L345 154 Z"
        fill={colors.shingles.fill}
        stroke={colors.shingles.stroke}
        strokeWidth="2"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 18px ${colors.shingles.glow})` 
            : `drop-shadow(0 0 6px ${colors.shingles.glow})`,
        }}
      />
      {/* Shingle course lines */}
      {[0, 1, 2, 3, 4].map((row) => (
        <React.Fragment key={row}>
          <line
            x1={65 + row * 22}
            y1={148 - row * 18}
            x2={200}
            y2={72 + row * 5}
            stroke={colors.shingles.stroke}
            strokeWidth="0.6"
            opacity="0.5"
          />
          <line
            x1={200}
            y1={72 + row * 5}
            x2={335 - row * 22}
            y2={148 - row * 18}
            stroke={colors.shingles.stroke}
            strokeWidth="0.6"
            opacity="0.5"
          />
        </React.Fragment>
      ))}
      {/* Shingle tab lines */}
      {[1, 2, 3].map((row) => (
        <React.Fragment key={`tabs-${row}`}>
          <line
            x1={100 + row * 15}
            y1={140 - row * 15}
            x2={105 + row * 15}
            y2={137 - row * 15}
            stroke={colors.shingles.stroke}
            strokeWidth="0.5"
            opacity="0.4"
          />
          <line
            x1={300 - row * 15}
            y1={140 - row * 15}
            x2={295 - row * 15}
            y2={137 - row * 15}
            stroke={colors.shingles.stroke}
            strokeWidth="0.5"
            opacity="0.4"
          />
        </React.Fragment>
      ))}
    </g>
  );
};

// Layer 7: Ridge Cap
export const RidgeCapLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -280;
  const opacity = 0.4 + layerProgress * 0.6;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      {/* Ridge cap shingles */}
      <path
        d="M175 80 L200 58 L225 80 L218 84 L200 66 L182 84 Z"
        fill={colors.ridge.fill}
        stroke={colors.ridge.stroke}
        strokeWidth="2"
        style={{
          filter: isLocked 
            ? `drop-shadow(0 0 18px ${colors.ridge.glow})` 
            : `drop-shadow(0 0 5px ${colors.ridge.glow})`,
        }}
      />
      {/* Ridge vent line */}
      <line 
        x1="188" 
        y1="72" 
        x2="212" 
        y2="72" 
        stroke="hsl(168 70% 45%)" 
        strokeWidth="1.5" 
        opacity={isLocked ? "0.8" : "0.4"}
        style={{
          filter: isLocked ? 'drop-shadow(0 0 6px hsl(168 80% 50%))' : 'none',
        }}
      />
    </g>
  );
};

// Layer 8: Pipe Boots & Vents
export const VentsLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -300;
  const opacity = 0.4 + layerProgress * 0.6;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: isLocked ? 'all 0.3s ease-out' : 'none',
      }}
    >
      {/* Pipe boot 1 */}
      <g style={{ filter: isLocked ? `drop-shadow(0 0 12px ${colors.vents.glow})` : `drop-shadow(0 0 4px ${colors.vents.glow})` }}>
        <ellipse cx="110" cy="125" rx="10" ry="8" fill={colors.vents.fill} stroke={colors.vents.stroke} strokeWidth="2" />
        <ellipse cx="110" cy="125" rx="5" ry="4" fill="hsl(0 0% 8%)" />
        <line x1="110" y1="117" x2="110" y2="110" stroke={colors.vents.stroke} strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Pipe boot 2 */}
      <g style={{ filter: isLocked ? `drop-shadow(0 0 12px ${colors.vents.glow})` : `drop-shadow(0 0 4px ${colors.vents.glow})` }}>
        <ellipse cx="290" cy="125" rx="10" ry="8" fill={colors.vents.fill} stroke={colors.vents.stroke} strokeWidth="2" />
        <ellipse cx="290" cy="125" rx="5" ry="4" fill="hsl(0 0% 8%)" />
        <line x1="290" y1="117" x2="290" y2="110" stroke={colors.vents.stroke} strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Box vent */}
      <g style={{ filter: isLocked ? `drop-shadow(0 0 10px ${colors.vents.glow})` : `drop-shadow(0 0 3px ${colors.vents.glow})` }}>
        <rect x="230" y="98" width="20" height="14" rx="2" fill={colors.vents.fill} stroke={colors.vents.stroke} strokeWidth="1.5" />
        <line x1="233" y1="105" x2="247" y2="105" stroke="hsl(0 0% 30%)" strokeWidth="1" />
        <line x1="233" y1="108" x2="247" y2="108" stroke="hsl(0 0% 30%)" strokeWidth="1" />
      </g>
    </g>
  );
};

// Material info data - 10 steps in proper installation order
export const materialInfo = [
  { id: 1, name: "Replace Decking", description: "Replace any damaged plywood or decking" },
  { id: 2, name: "Drip Edge (Eaves)", description: "Install drip edge at the eaves" },
  { id: 3, name: "Ice & Water Shield", description: "Apply ice & water shield membrane" },
  { id: 4, name: "Underlayment", description: "Install underlayment over decking" },
  { id: 5, name: "Drip Edge (Rakes)", description: "Install drip edge at the rakes" },
  { id: 6, name: "Starter Strip", description: "Install starter strip at edges" },
  { id: 7, name: "Shingles", description: "Install field shingles" },
  { id: 8, name: "Pipe Boots & Vents", description: "Install pipe boots & vents" },
  { id: 9, name: "Flashing", description: "Install all flashing" },
  { id: 10, name: "Ridge Vent & Cap", description: "Install ridge vent and ridge cap" },
];
