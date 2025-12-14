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

// Layer 1: Decking - Premium Realistic Plywood/OSB Sheets
export const DeckingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -200;
  const opacity = 0.5 + layerProgress * 0.5;
  const scale = isLocked ? 1.02 : 0.95 + layerProgress * 0.07;
  const bounceOffset = isLocked ? Math.sin(Date.now() / 200) * 0.5 : 0;

  return (
    <g
      style={{
        transform: `translateY(${yOffset + bounceOffset}px) scale(${scale})`,
        transformOrigin: '200px 110px',
        opacity,
        transition: isLocked ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
      }}
    >
      {/* Premium plywood definitions */}
      <defs>
        {/* Base plywood gradients for each sheet */}
        <linearGradient id="plySheet1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(35 58% 52%)" />
          <stop offset="35%" stopColor="hsl(38 62% 56%)" />
          <stop offset="65%" stopColor="hsl(33 55% 48%)" />
          <stop offset="100%" stopColor="hsl(30 50% 44%)" />
        </linearGradient>
        <linearGradient id="plySheet2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(38 60% 54%)" />
          <stop offset="40%" stopColor="hsl(35 55% 50%)" />
          <stop offset="100%" stopColor="hsl(32 52% 46%)" />
        </linearGradient>
        <linearGradient id="plySheet3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="hsl(40 58% 58%)" />
          <stop offset="50%" stopColor="hsl(36 55% 52%)" />
          <stop offset="100%" stopColor="hsl(32 50% 45%)" />
        </linearGradient>
        <linearGradient id="plySheet4" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(33 55% 50%)" />
          <stop offset="50%" stopColor="hsl(37 60% 54%)" />
          <stop offset="100%" stopColor="hsl(35 52% 48%)" />
        </linearGradient>
        <linearGradient id="plySheet5" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="hsl(42 55% 58%)" />
          <stop offset="50%" stopColor="hsl(38 58% 54%)" />
          <stop offset="100%" stopColor="hsl(34 52% 48%)" />
        </linearGradient>
        <linearGradient id="plySheet6" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(30 55% 48%)" />
          <stop offset="60%" stopColor="hsl(35 58% 52%)" />
          <stop offset="100%" stopColor="hsl(38 55% 50%)" />
        </linearGradient>
        
        {/* Inner shadow filter for depth */}
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2" />
          <feOffset dx="1" dy="1" result="offsetblur" />
          <feFlood floodColor="hsl(25 40% 20%)" floodOpacity="0.5" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Wood strand texture pattern */}
        <pattern id="woodStrand" patternUnits="userSpaceOnUse" width="12" height="6" patternTransform="rotate(-25)">
          <rect width="12" height="6" fill="transparent" />
          <rect x="0" y="0" width="10" height="1.5" rx="0.5" fill="hsl(30 45% 38%)" opacity="0.25" />
          <rect x="2" y="2.5" width="8" height="1" rx="0.3" fill="hsl(35 50% 42%)" opacity="0.2" />
          <rect x="1" y="4.5" width="6" height="0.8" rx="0.3" fill="hsl(28 40% 35%)" opacity="0.18" />
        </pattern>
        
        {/* Highlight glow for locked state */}
        <filter id="plywoodGlow">
          <feGaussianBlur stdDeviation="4" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== LEFT ROOF - Base Shadow Layer ===== */}
      <path
        d="M52 158 L200 58 L200 158 Z"
        fill="hsl(25 40% 28%)"
      />

      {/* ===== LEFT ROOF - Plywood Sheets ===== */}
      {/* Sheet L1 - Ridge corner */}
      <path
        d="M145 100 L200 58 L200 85 L165 100 Z"
        fill="url(#plySheet1)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />
      
      {/* Sheet L2 - Upper middle */}
      <path
        d="M90 138 L145 100 L165 100 L200 85 L200 110 L155 128 L100 155 Z"
        fill="url(#plySheet2)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />
      
      {/* Sheet L3 - Left corner */}
      <path
        d="M52 158 L90 138 L100 155 L65 158 Z"
        fill="url(#plySheet3)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />
      
      {/* Sheet L4 - Lower middle */}
      <path
        d="M65 158 L100 155 L155 128 L200 110 L200 138 L170 148 L115 158 Z"
        fill="url(#plySheet4)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />
      
      {/* Sheet L5 - Bottom strip */}
      <path
        d="M115 158 L170 148 L200 138 L200 158 Z"
        fill="url(#plySheet5)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />

      {/* ===== RIGHT ROOF - Base Shadow Layer ===== */}
      <path
        d="M200 58 L348 158 L200 158 Z"
        fill="hsl(25 40% 28%)"
      />

      {/* ===== RIGHT ROOF - Plywood Sheets ===== */}
      {/* Sheet R1 - Ridge corner */}
      <path
        d="M200 58 L255 100 L235 100 L200 85 Z"
        fill="url(#plySheet2)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />
      
      {/* Sheet R2 - Upper middle */}
      <path
        d="M200 85 L235 100 L255 100 L310 138 L300 155 L245 128 L200 110 Z"
        fill="url(#plySheet1)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />
      
      {/* Sheet R3 - Right corner */}
      <path
        d="M310 138 L348 158 L335 158 L300 155 Z"
        fill="url(#plySheet6)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />
      
      {/* Sheet R4 - Lower middle */}
      <path
        d="M200 110 L245 128 L300 155 L335 158 L285 158 L230 148 L200 138 Z"
        fill="url(#plySheet3)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />
      
      {/* Sheet R5 - Bottom strip */}
      <path
        d="M200 138 L230 148 L285 158 L200 158 Z"
        fill="url(#plySheet4)"
        stroke="hsl(25 35% 25%)"
        strokeWidth="1.5"
        style={{ filter: 'url(#innerShadow)' }}
      />

      {/* ===== OSB Wood Strand Texture Overlay ===== */}
      <path
        d="M52 158 L200 58 L348 158 Z"
        fill="url(#woodStrand)"
        opacity="0.6"
      />

      {/* ===== Wood Grain Lines ===== */}
      <g opacity="0.3" strokeLinecap="round">
        {/* Left grain */}
        <path d="M155 95 Q170 85 190 72" stroke="hsl(28 40% 35%)" strokeWidth="0.6" fill="none" />
        <path d="M105 145 Q140 125 175 105" stroke="hsl(28 40% 35%)" strokeWidth="0.5" fill="none" />
        <path d="M75 155 Q95 148 120 135" stroke="hsl(28 40% 35%)" strokeWidth="0.5" fill="none" />
        <path d="M135 155 Q160 142 185 125" stroke="hsl(28 40% 35%)" strokeWidth="0.6" fill="none" />
        {/* Right grain */}
        <path d="M210 72 Q230 85 245 95" stroke="hsl(28 40% 35%)" strokeWidth="0.6" fill="none" />
        <path d="M225 105 Q260 125 295 145" stroke="hsl(28 40% 35%)" strokeWidth="0.5" fill="none" />
        <path d="M280 135 Q305 148 325 155" stroke="hsl(28 40% 35%)" strokeWidth="0.5" fill="none" />
        <path d="M215 125 Q240 142 265 155" stroke="hsl(28 40% 35%)" strokeWidth="0.6" fill="none" />
      </g>

      {/* ===== Knots with Rings ===== */}
      <g>
        {/* Left side knots */}
        <g opacity="0.55">
          <ellipse cx="165" cy="95" rx="3" ry="2.5" fill="hsl(22 50% 30%)" />
          <ellipse cx="165" cy="95" rx="1.8" ry="1.5" fill="hsl(20 45% 25%)" />
        </g>
        <g opacity="0.5">
          <ellipse cx="125" cy="138" rx="2.5" ry="2" fill="hsl(22 48% 32%)" />
          <ellipse cx="125" cy="138" rx="1.5" ry="1" fill="hsl(20 45% 26%)" />
        </g>
        <g opacity="0.6">
          <ellipse cx="180" cy="125" rx="3.5" ry="2.5" fill="hsl(22 52% 30%)" />
          <ellipse cx="180" cy="125" rx="2" ry="1.5" fill="hsl(20 48% 24%)" />
        </g>
        <g opacity="0.45">
          <circle cx="85" cy="152" r="2" fill="hsl(22 45% 32%)" />
          <circle cx="85" cy="152" r="1" fill="hsl(20 42% 26%)" />
        </g>
        <g opacity="0.5">
          <ellipse cx="150" cy="148" rx="2" ry="1.5" fill="hsl(22 48% 30%)" />
        </g>
        
        {/* Right side knots */}
        <g opacity="0.55">
          <ellipse cx="235" cy="95" rx="3" ry="2.5" fill="hsl(22 50% 30%)" />
          <ellipse cx="235" cy="95" rx="1.8" ry="1.5" fill="hsl(20 45% 25%)" />
        </g>
        <g opacity="0.5">
          <ellipse cx="275" cy="138" rx="2.5" ry="2" fill="hsl(22 48% 32%)" />
          <ellipse cx="275" cy="138" rx="1.5" ry="1" fill="hsl(20 45% 26%)" />
        </g>
        <g opacity="0.6">
          <ellipse cx="220" cy="125" rx="3.5" ry="2.5" fill="hsl(22 52% 30%)" />
          <ellipse cx="220" cy="125" rx="2" ry="1.5" fill="hsl(20 48% 24%)" />
        </g>
        <g opacity="0.45">
          <circle cx="315" cy="152" r="2" fill="hsl(22 45% 32%)" />
          <circle cx="315" cy="152" r="1" fill="hsl(20 42% 26%)" />
        </g>
        <g opacity="0.5">
          <ellipse cx="250" cy="148" rx="2" ry="1.5" fill="hsl(22 48% 30%)" />
        </g>
      </g>

      {/* ===== APA Stamps (like real plywood) ===== */}
      <g opacity="0.2" fontFamily="monospace" fontSize="4" fill="hsl(200 15% 25%)">
        <text x="100" y="145" transform="rotate(-35 100 145)">APA</text>
        <text x="160" y="118" transform="rotate(-35 160 118)">PS-2</text>
        <text x="240" y="118" transform="rotate(35 240 118)">CDX</text>
        <text x="300" y="145" transform="rotate(35 300 145)">4x8</text>
      </g>

      {/* ===== Ridge Seam ===== */}
      <line 
        x1="200" y1="58" x2="200" y2="158" 
        stroke="hsl(22 30% 20%)" 
        strokeWidth="2.5"
      />
      <line 
        x1="200" y1="58" x2="200" y2="158" 
        stroke="hsl(35 40% 35%)" 
        strokeWidth="0.5"
        strokeDasharray="4 3"
        opacity="0.4"
      />

      {/* ===== Highlight Edge for Depth ===== */}
      <path
        d="M52 158 L200 58 L348 158"
        fill="none"
        stroke="hsl(42 55% 65%)"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Glow overlay when locked */}
      {isLocked && (
        <g style={{ filter: `drop-shadow(0 0 12px hsl(35 70% 55%)) drop-shadow(0 0 25px hsl(35 65% 50%))` }}>
          <path
            d="M52 158 L200 58 L348 158 Z"
            fill="transparent"
            stroke="hsl(38 70% 58%)"
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
