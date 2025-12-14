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
        filter: `drop-shadow(0 ${6 + easedProgress * 12}px ${16 + easedProgress * 20}px hsl(30 60% 35% / ${glowIntensity}))`,
      }}
    >
      <defs>
        {/* Premium plywood with warm glow */}
        <linearGradient id="plyLeft" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(35 45% 38%)" />
          <stop offset="40%" stopColor="hsl(38 50% 48%)" />
          <stop offset="70%" stopColor="hsl(40 52% 55%)" />
          <stop offset="100%" stopColor="hsl(42 48% 50%)" />
        </linearGradient>
        <linearGradient id="plyRight" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(33 44% 36%)" />
          <stop offset="40%" stopColor="hsl(36 48% 46%)" />
          <stop offset="70%" stopColor="hsl(39 50% 52%)" />
          <stop offset="100%" stopColor="hsl(41 46% 48%)" />
        </linearGradient>
        
        {/* Inner warm glow */}
        <radialGradient id="warmGlow" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="hsl(35 60% 55%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(30 50% 40%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Main plywood surfaces */}
      <path d="M48 158 L200 58 L200 158 Z" fill="url(#plyLeft)" />
      <path d="M200 58 L352 158 L200 158 Z" fill="url(#plyRight)" />
      
      {/* Warm inner glow overlay */}
      <path d="M48 158 L200 58 L352 158 Z" fill="url(#warmGlow)" />
      
      {/* Sheet gaps - clean thin lines */}
      <g stroke="hsl(25 40% 20%)" strokeLinecap="round">
        {/* Left slope */}
        <line x1="95" y1="158" x2="147" y2="106" strokeWidth="1.5" />
        <line x1="150" y1="158" x2="183" y2="125" strokeWidth="1.5" />
        {/* Right slope */}
        <line x1="253" y1="106" x2="305" y2="158" strokeWidth="1.5" />
        <line x1="217" y1="125" x2="250" y2="158" strokeWidth="1.5" />
        {/* Ridge area small gap */}
        <line x1="180" y1="70" x2="220" y2="70" strokeWidth="1" opacity="0.6" />
      </g>
      
      {/* Teal edge accent - matches house style */}
      <path 
        d="M50 157 L200 59 L350 157" 
        fill="none"
        stroke="hsl(168 70% 50%)" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.4 + easedProgress * 0.5}
        style={{
          filter: `drop-shadow(0 0 ${10 + easedProgress * 12}px hsl(168 70% 50% / 0.8))`,
        }}
      />
      
      {/* Subtle warm edge highlight */}
      <path 
        d="M52 156 L200 60 L348 156" 
        fill="none"
        stroke="hsl(40 60% 65%)" 
        strokeWidth="1"
        opacity={0.2 + easedProgress * 0.2}
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
