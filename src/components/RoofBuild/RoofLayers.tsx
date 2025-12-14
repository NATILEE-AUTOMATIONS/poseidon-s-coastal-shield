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
  
  // Smooth drop animation
  const easedProgress = easeOutQuint(layerProgress);
  
  const translateY = -100 * (1 - easedProgress);
  const opacity = 0.2 + (0.8 * easedProgress);
  
  return (
    <g 
      className="decking-layer"
      style={{
        transform: `translateY(${translateY}px)`,
        transformOrigin: '200px 107px',
        opacity,
        filter: `drop-shadow(0 ${2 + easedProgress * 6}px ${8 + easedProgress * 12}px hsl(30 30% 15% / ${0.25 + easedProgress * 0.15}))`,
      }}
    >
      <defs>
        {/* Warm plywood gradient - left slope */}
        <linearGradient id="plyLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(35 35% 60%)" />
          <stop offset="50%" stopColor="hsl(33 30% 52%)" />
          <stop offset="100%" stopColor="hsl(30 28% 45%)" />
        </linearGradient>
        {/* Right slope - slightly different tone */}
        <linearGradient id="plyRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(36 32% 58%)" />
          <stop offset="50%" stopColor="hsl(34 28% 50%)" />
          <stop offset="100%" stopColor="hsl(31 25% 42%)" />
        </linearGradient>
      </defs>
      
      {/* LEFT SLOPE - solid plywood surface */}
      <polygon 
        points="42,159 200,56 200,159" 
        fill="url(#plyLeft)"
      />
      
      {/* RIGHT SLOPE - solid plywood surface */}
      <polygon 
        points="200,56 358,159 200,159" 
        fill="url(#plyRight)"
      />
      
      {/* Sheet gap lines - clean horizontal rows parallel to eaves */}
      {/* Left slope - 3 horizontal sheet rows */}
      <line x1="42" y1="125" x2="148" y2="125" stroke="hsl(25 25% 25%)" strokeWidth="1.2" opacity="0.5" />
      <line x1="42" y1="91" x2="96" y2="91" stroke="hsl(25 25% 25%)" strokeWidth="1.2" opacity="0.5" />
      
      {/* Left slope - vertical seams (staggered) */}
      <line x1="80" y1="159" x2="80" y2="125" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      <line x1="120" y1="159" x2="120" y2="125" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      <line x1="160" y1="159" x2="160" y2="125" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="125" x2="100" y2="91" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      <line x1="60" y1="125" x2="60" y2="91" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      
      {/* Right slope - 3 horizontal sheet rows */}
      <line x1="252" y1="125" x2="358" y2="125" stroke="hsl(25 25% 25%)" strokeWidth="1.2" opacity="0.5" />
      <line x1="304" y1="91" x2="358" y2="91" stroke="hsl(25 25% 25%)" strokeWidth="1.2" opacity="0.5" />
      
      {/* Right slope - vertical seams (staggered) */}
      <line x1="320" y1="159" x2="320" y2="125" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      <line x1="280" y1="159" x2="280" y2="125" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      <line x1="240" y1="159" x2="240" y2="125" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      <line x1="300" y1="125" x2="300" y2="91" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      <line x1="340" y1="125" x2="340" y2="91" stroke="hsl(25 25% 25%)" strokeWidth="1" opacity="0.4" />
      
      {/* Ridge line at peak */}
      <line x1="200" y1="56" x2="200" y2="159" stroke="hsl(25 25% 22%)" strokeWidth="2" opacity="0.7" />
      
      {/* Teal edge accent glow */}
      <path 
        d="M42 159 L200 56 L358 159" 
        fill="none"
        stroke="hsl(168 70% 48%)" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.4 + easedProgress * 0.4}
        style={{
          filter: `drop-shadow(0 0 ${8 + easedProgress * 10}px hsl(168 70% 50% / 0.7))`,
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
