import React from 'react';

interface LayerProps {
  progress: number;
  startProgress: number;
  endProgress: number;
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
export const DeckingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  const easedProgress = easeOutQuint(layerProgress);
  const translateY = -100 * (1 - easedProgress);
  const opacity = 0.2 + (0.8 * easedProgress);
  
  // Roof geometry: peak at (200, 56), left at (42, 159), right at (358, 159)
  // Slope equation left: y = 159 - (159-56)/(200-42) * (x-42) = 159 - 0.652 * (x-42)
  const getLeftY = (x: number) => 159 - ((159 - 56) / (200 - 42)) * (x - 42);
  const getRightY = (x: number) => 159 - ((159 - 56) / (358 - 200)) * (358 - x);
  
  return (
    <g 
      className="decking-layer"
      style={{
        transform: `translateY(${translateY}px)`,
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
        
        {/* Sheet rows - horizontal lines */}
        <line x1="42" y1="120" x2="200" y2="120" stroke="hsl(25 30% 28%)" strokeWidth="1.5" />
        <line x1="42" y1="85" x2="200" y2="85" stroke="hsl(25 30% 28%)" strokeWidth="1.5" />
        
        {/* Vertical seams - staggered per row */}
        {/* Bottom row */}
        <line x1="80" y1="159" x2="80" y2="120" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="130" y1="159" x2="130" y2="120" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="180" y1="159" x2="180" y2="120" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        {/* Middle row - offset */}
        <line x1="60" y1="120" x2="60" y2="85" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="110" y1="120" x2="110" y2="85" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="160" y1="120" x2="160" y2="85" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        {/* Top row - offset again */}
        <line x1="90" y1="85" x2="90" y2="56" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="140" y1="85" x2="140" y2="56" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="185" y1="85" x2="185" y2="56" stroke="hsl(25 28% 30%)" strokeWidth="1" />
      </g>
      
      {/* RIGHT SLOPE */}
      <g clipPath="url(#rightSlopeClip)">
        {/* Base plywood */}
        <polygon points="200,56 358,159 200,159" fill="url(#plyRight)" />
        {/* Grain overlay */}
        <polygon points="200,56 358,159 200,159" fill="url(#grainPattern)" />
        
        {/* Sheet rows - horizontal lines */}
        <line x1="200" y1="120" x2="358" y2="120" stroke="hsl(25 30% 28%)" strokeWidth="1.5" />
        <line x1="200" y1="85" x2="358" y2="85" stroke="hsl(25 30% 28%)" strokeWidth="1.5" />
        
        {/* Vertical seams - staggered per row */}
        {/* Bottom row */}
        <line x1="220" y1="159" x2="220" y2="120" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="270" y1="159" x2="270" y2="120" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="320" y1="159" x2="320" y2="120" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        {/* Middle row - offset */}
        <line x1="240" y1="120" x2="240" y2="85" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="290" y1="120" x2="290" y2="85" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="340" y1="120" x2="340" y2="85" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        {/* Top row - offset again */}
        <line x1="215" y1="85" x2="215" y2="56" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="260" y1="85" x2="260" y2="56" stroke="hsl(25 28% 30%)" strokeWidth="1" />
        <line x1="310" y1="85" x2="310" y2="56" stroke="hsl(25 28% 30%)" strokeWidth="1" />
      </g>
      
      {/* Ridge line at peak */}
      <line x1="200" y1="56" x2="200" y2="159" stroke="hsl(25 22% 22%)" strokeWidth="2.5" />
      
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
    </g>
  );
};
// Placeholder exports - to be implemented one at a time
export const DripEdgeEavesLayer: React.FC<LayerProps> = () => null;
export const DripEdgeRakesLayer: React.FC<LayerProps> = () => null;
export const IceWaterShieldLayer: React.FC<LayerProps> = () => null;
export const UnderlaymentLayer: React.FC<LayerProps> = () => null;
export const StarterStripLayer: React.FC<LayerProps> = () => null;
export const FlashingLayer: React.FC<LayerProps> = () => null;
export const ShinglesLayer: React.FC<LayerProps> = () => null;
export const FieldShinglesLayer: React.FC<LayerProps> = () => null;
export const VentsLayer: React.FC<LayerProps> = () => null;
export const RidgeCapLayer: React.FC<LayerProps> = () => null;
