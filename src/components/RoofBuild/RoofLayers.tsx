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
        <pattern id="grainL" patternUnits="userSpaceOnUse" width="60" height="4" patternTransform="rotate(-33)">
          <line x1="0" y1="2" x2="60" y2="2" stroke="hsl(28 35% 35%)" strokeWidth="0.6" opacity="0.15" />
        </pattern>
        <pattern id="grainR" patternUnits="userSpaceOnUse" width="60" height="4" patternTransform="rotate(33)">
          <line x1="0" y1="2" x2="60" y2="2" stroke="hsl(28 35% 35%)" strokeWidth="0.6" opacity="0.15" />
        </pattern>
      </defs>
      
      {/* Left slope */}
      <path d="M48 158 L200 58 L200 158 Z" fill="url(#plywoodLeft)" />
      <path d="M48 158 L200 58 L200 158 Z" fill="url(#grainL)" />
      
      {/* Right slope */}
      <path d="M200 58 L352 158 L200 158 Z" fill="url(#plywoodRight)" />
      <path d="M200 58 L352 158 L200 158 Z" fill="url(#grainR)" />
      
      {/* Plywood sheet gaps - staggered pattern like real installation */}
      {/* Left slope - vertical seams */}
      <line x1="90" y1="158" x2="145" y2="103" stroke="hsl(20 25% 18%)" strokeWidth="2" opacity="0.7" />
      <line x1="145" y1="158" x2="182" y2="121" stroke="hsl(20 25% 18%)" strokeWidth="2" opacity="0.7" />
      {/* Left slope - horizontal seam */}
      <line x1="55" y1="150" x2="195" y2="78" stroke="hsl(20 25% 18%)" strokeWidth="1.5" opacity="0.5" />
      
      {/* Right slope - vertical seams */}
      <line x1="255" y1="103" x2="310" y2="158" stroke="hsl(20 25% 18%)" strokeWidth="2" opacity="0.7" />
      <line x1="218" y1="121" x2="255" y2="158" stroke="hsl(20 25% 18%)" strokeWidth="2" opacity="0.7" />
      {/* Right slope - horizontal seam */}
      <line x1="205" y1="78" x2="345" y2="150" stroke="hsl(20 25% 18%)" strokeWidth="1.5" opacity="0.5" />
      
      {/* Subtle highlight lines next to gaps for depth */}
      <line x1="91" y1="158" x2="146" y2="103" stroke="hsl(45 40% 65%)" strokeWidth="0.5" opacity="0.3" />
      <line x1="146" y1="158" x2="183" y2="121" stroke="hsl(45 40% 65%)" strokeWidth="0.5" opacity="0.3" />
      <line x1="254" y1="103" x2="309" y2="158" stroke="hsl(45 40% 65%)" strokeWidth="0.5" opacity="0.3" />
      <line x1="217" y1="121" x2="254" y2="158" stroke="hsl(45 40% 65%)" strokeWidth="0.5" opacity="0.3" />
      
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
