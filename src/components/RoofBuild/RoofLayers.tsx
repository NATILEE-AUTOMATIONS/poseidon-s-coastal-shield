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

// World-class decking layer with plywood panels drop-in animation
export const DeckingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  // Calculate layer-specific progress (0-1 within this layer's window)
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  // Not visible before animation starts
  if (progress < startProgress) return null;
  
  // VERY slow, deliberate animation using full scroll window
  // Use a slow-starting ease that takes its time
  const easeOutSext = (x: number): number => 1 - Math.pow(1 - x, 6); // Sextic - very gentle
  const easedProgress = easeOutSext(layerProgress);
  
  // Animation values - slow descent over the entire scroll window
  const translateY = -180 * (1 - easedProgress); // Start far above
  const opacity = 0.1 + (0.9 * easedProgress); // Very gradual fade
  
  // Subtle scale pulse only at the very end (last 5%)
  const settlePhase = layerProgress > 0.95 ? (layerProgress - 0.95) / 0.05 : 0;
  const scale = 1 + (0.008 * Math.sin(settlePhase * Math.PI));
  
  // Glow intensifies slowly
  const glowIntensity = 0.08 + (easedProgress * 0.42);
  
  return (
    <g 
      className="decking-layer"
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: '200px 110px',
        opacity,
        filter: `drop-shadow(0 ${4 + easedProgress * 8}px ${12 + easedProgress * 16}px hsl(35 55% 40% / ${glowIntensity}))`,
        transition: 'filter 0.1s ease-out',
      }}
    >
      <defs>
        {/* Individual panel gradients with slight color variations */}
        <linearGradient id="panel1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(42 52% 62%)" />
          <stop offset="100%" stopColor="hsl(35 48% 48%)" />
        </linearGradient>
        <linearGradient id="panel2" x1="0%" y1="20%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="hsl(38 50% 58%)" />
          <stop offset="100%" stopColor="hsl(32 46% 45%)" />
        </linearGradient>
        <linearGradient id="panel3" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="hsl(40 54% 60%)" />
          <stop offset="100%" stopColor="hsl(34 50% 46%)" />
        </linearGradient>
        <linearGradient id="panel4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(44 51% 61%)" />
          <stop offset="100%" stopColor="hsl(36 47% 47%)" />
        </linearGradient>
        <linearGradient id="panel5" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(39 53% 59%)" />
          <stop offset="100%" stopColor="hsl(33 49% 44%)" />
        </linearGradient>
        <linearGradient id="panel6" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="hsl(41 52% 60%)" />
          <stop offset="100%" stopColor="hsl(35 48% 46%)" />
        </linearGradient>
        
        {/* Wood grain texture */}
        <pattern id="grainLeft" patternUnits="userSpaceOnUse" width="100" height="4" patternTransform="rotate(-33)">
          <line x1="0" y1="2" x2="100" y2="2" stroke="hsl(30 35% 40%)" strokeWidth="0.6" opacity="0.12" />
        </pattern>
        <pattern id="grainRight" patternUnits="userSpaceOnUse" width="100" height="4" patternTransform="rotate(33)">
          <line x1="0" y1="2" x2="100" y2="2" stroke="hsl(30 35% 40%)" strokeWidth="0.6" opacity="0.12" />
        </pattern>
        
        {/* Knot gradient */}
        <radialGradient id="knot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(25 45% 32%)" />
          <stop offset="60%" stopColor="hsl(30 40% 40%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(35 35% 50%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* LEFT SLOPE - Staggered plywood panels */}
      {/* Bottom left panel */}
      <path d="M48 158 L95 158 L130 125 L70 145 Z" fill="url(#panel1)" />
      {/* Middle left panel */}
      <path d="M95 158 L148 158 L175 105 L130 125 Z" fill="url(#panel2)" />
      {/* Top left panel */}
      <path d="M148 158 L200 158 L200 58 L175 105 Z" fill="url(#panel3)" />
      {/* Upper triangle fill */}
      <path d="M70 145 L130 125 L175 105 L200 58 L48 158 Z" fill="url(#panel4)" opacity="0.3" />
      
      {/* RIGHT SLOPE - Staggered plywood panels */}
      {/* Top right panel */}
      <path d="M200 58 L200 158 L252 158 L225 105 Z" fill="url(#panel4)" />
      {/* Middle right panel */}
      <path d="M252 158 L305 158 L270 125 L225 105 Z" fill="url(#panel5)" />
      {/* Bottom right panel */}
      <path d="M305 158 L352 158 L330 145 L270 125 Z" fill="url(#panel6)" />
      {/* Upper triangle fill */}
      <path d="M200 58 L225 105 L270 125 L330 145 L352 158 Z" fill="url(#panel2)" opacity="0.3" />
      
      {/* Full roof overlay for unified wood grain */}
      <path d="M48 158 L200 58 L200 158 Z" fill="url(#grainLeft)" />
      <path d="M200 58 L352 158 L200 158 Z" fill="url(#grainRight)" />
      
      {/* Natural wood knots scattered across */}
      <ellipse cx="85" cy="148" rx="3.5" ry="2.5" fill="url(#knot)" />
      <ellipse cx="140" cy="135" rx="3" ry="2" fill="url(#knot)" />
      <ellipse cx="180" cy="120" rx="2.5" ry="2" fill="url(#knot)" />
      <ellipse cx="220" cy="118" rx="3" ry="2.5" fill="url(#knot)" />
      <ellipse cx="275" cy="138" rx="3.5" ry="2" fill="url(#knot)" />
      <ellipse cx="320" cy="150" rx="3" ry="2" fill="url(#knot)" />
      
      {/* Subtle inner shadow for depth at peak */}
      <path 
        d="M52 156 L200 60 L348 156" 
        fill="none"
        stroke="hsl(25 40% 30%)"
        strokeWidth="3"
        opacity="0.15"
      />
      
      {/* Teal edge glow - brand accent */}
      <path 
        d="M50 157 L200 59 L350 157" 
        fill="none"
        stroke="hsl(168 70% 50%)" 
        strokeWidth="2"
        opacity={0.3 + easedProgress * 0.5}
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
