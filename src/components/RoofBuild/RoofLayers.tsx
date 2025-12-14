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
      
      {/* Sheet gap lines - LEFT slope (follow roof angle) */}
      {/* Horizontal gaps dividing into rows */}
      <line x1="70" y1="140" x2="200" y2="56" stroke="hsl(25 30% 28%)" strokeWidth="1.5" opacity="0.6" />
      <line x1="106" y1="140" x2="200" y2="88" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.5" />
      <line x1="142" y1="140" x2="200" y2="120" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.5" />
      
      {/* Vertical stagger gaps - left */}
      <line x1="56" y1="159" x2="120" y2="90" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.4" />
      <line x1="90" y1="159" x2="160" y2="83" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.4" />
      <line x1="130" y1="159" x2="185" y2="99" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.4" />
      <line x1="165" y1="159" x2="195" y2="126" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.4" />
      
      {/* Sheet gap lines - RIGHT slope (mirror) */}
      <line x1="200" y1="56" x2="330" y2="140" stroke="hsl(25 30% 28%)" strokeWidth="1.5" opacity="0.6" />
      <line x1="200" y1="88" x2="294" y2="140" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.5" />
      <line x1="200" y1="120" x2="258" y2="140" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.5" />
      
      {/* Vertical stagger gaps - right */}
      <line x1="280" y1="90" x2="344" y2="159" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.4" />
      <line x1="240" y1="83" x2="310" y2="159" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.4" />
      <line x1="215" y1="99" x2="270" y2="159" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.4" />
      <line x1="205" y1="126" x2="235" y2="159" stroke="hsl(25 30% 28%)" strokeWidth="1" opacity="0.4" />
      
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
