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
        {/* Clean plywood gradients */}
        <linearGradient id="plywoodLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(40 50% 60%)" />
          <stop offset="50%" stopColor="hsl(36 48% 52%)" />
          <stop offset="100%" stopColor="hsl(32 45% 44%)" />
        </linearGradient>
        <linearGradient id="plywoodRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(42 52% 58%)" />
          <stop offset="50%" stopColor="hsl(38 50% 50%)" />
          <stop offset="100%" stopColor="hsl(34 47% 42%)" />
        </linearGradient>
        
        {/* Subtle wood grain */}
        <pattern id="grain" patternUnits="userSpaceOnUse" width="80" height="3">
          <line x1="0" y1="1.5" x2="80" y2="1.5" stroke="hsl(30 40% 38%)" strokeWidth="0.5" opacity="0.1" />
        </pattern>
      </defs>
      
      {/* Left slope - clean triangle */}
      <path d="M48 158 L200 58 L200 158 Z" fill="url(#plywoodLeft)" />
      <path d="M48 158 L200 58 L200 158 Z" fill="url(#grain)" style={{ transform: 'rotate(-33deg)', transformOrigin: '124px 108px' }} />
      
      {/* Right slope - clean triangle */}
      <path d="M200 58 L352 158 L200 158 Z" fill="url(#plywoodRight)" />
      <path d="M200 58 L352 158 L200 158 Z" fill="url(#grain)" style={{ transform: 'rotate(33deg)', transformOrigin: '276px 108px' }} />
      
      {/* Plywood sheet gaps - subtle dark lines */}
      {/* Left slope gaps */}
      <line x1="100" y1="158" x2="150" y2="108" stroke="hsl(25 30% 22%)" strokeWidth="1.5" opacity="0.6" />
      <line x1="155" y1="158" x2="188" y2="125" stroke="hsl(25 30% 22%)" strokeWidth="1.5" opacity="0.6" />
      
      {/* Right slope gaps */}
      <line x1="250" y1="108" x2="300" y2="158" stroke="hsl(25 30% 22%)" strokeWidth="1.5" opacity="0.6" />
      <line x1="212" y1="125" x2="245" y2="158" stroke="hsl(25 30% 22%)" strokeWidth="1.5" opacity="0.6" />
      
      {/* Teal edge glow */}
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
