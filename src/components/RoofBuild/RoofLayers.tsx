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
      {/* Enhanced gradients and patterns for realistic plywood */}
      <defs>
        {/* Left panel - warm natural plywood */}
        <linearGradient id="deckingGradientLeft" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="hsl(40 55% 65%)" />
          <stop offset="25%" stopColor="hsl(38 52% 58%)" />
          <stop offset="50%" stopColor="hsl(35 50% 54%)" />
          <stop offset="75%" stopColor="hsl(33 48% 50%)" />
          <stop offset="100%" stopColor="hsl(30 45% 45%)" />
        </linearGradient>
        
        {/* Right panel - slightly different tone for realism */}
        <linearGradient id="deckingGradientRight" x1="100%" y1="0%" x2="0%" y2="80%">
          <stop offset="0%" stopColor="hsl(42 54% 63%)" />
          <stop offset="30%" stopColor="hsl(39 51% 56%)" />
          <stop offset="60%" stopColor="hsl(36 49% 52%)" />
          <stop offset="100%" stopColor="hsl(32 46% 44%)" />
        </linearGradient>
        
        {/* Wood grain pattern - horizontal lines following roof slope */}
        <pattern id="woodGrainLeft" patternUnits="userSpaceOnUse" width="200" height="6" patternTransform="rotate(-33)">
          <line x1="0" y1="1" x2="200" y2="1" stroke="hsl(28 40% 38%)" strokeWidth="0.8" opacity="0.2" />
          <line x1="0" y1="3" x2="200" y2="3" stroke="hsl(30 35% 42%)" strokeWidth="0.4" opacity="0.12" />
          <line x1="0" y1="5" x2="200" y2="5" stroke="hsl(32 38% 36%)" strokeWidth="0.6" opacity="0.15" />
        </pattern>
        
        <pattern id="woodGrainRight" patternUnits="userSpaceOnUse" width="200" height="6" patternTransform="rotate(33)">
          <line x1="0" y1="1" x2="200" y2="1" stroke="hsl(28 40% 38%)" strokeWidth="0.8" opacity="0.2" />
          <line x1="0" y1="3" x2="200" y2="3" stroke="hsl(30 35% 42%)" strokeWidth="0.4" opacity="0.12" />
          <line x1="0" y1="5" x2="200" y2="5" stroke="hsl(32 38% 36%)" strokeWidth="0.6" opacity="0.15" />
        </pattern>
        
        {/* Knot pattern for natural wood look */}
        <radialGradient id="woodKnot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(25 50% 30%)" />
          <stop offset="40%" stopColor="hsl(28 45% 35%)" />
          <stop offset="100%" stopColor="hsl(32 40% 45%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Left slope decking panel */}
      <path 
        d="M48 158 L200 58 L200 158 Z" 
        fill="url(#deckingGradientLeft)"
      />
      <path 
        d="M48 158 L200 58 L200 158 Z" 
        fill="url(#woodGrainLeft)"
      />
      
      {/* Right slope decking panel */}
      <path 
        d="M200 58 L352 158 L200 158 Z" 
        fill="url(#deckingGradientRight)"
      />
      <path 
        d="M200 58 L352 158 L200 158 Z" 
        fill="url(#woodGrainRight)"
      />
      
      {/* Wood knots - natural imperfections */}
      <ellipse cx="90" cy="140" rx="4" ry="3" fill="url(#woodKnot)" opacity="0.6" />
      <ellipse cx="150" cy="120" rx="3" ry="2.5" fill="url(#woodKnot)" opacity="0.5" />
      <ellipse cx="175" cy="145" rx="3.5" ry="2.5" fill="url(#woodKnot)" opacity="0.55" />
      <ellipse cx="250" cy="125" rx="4" ry="3" fill="url(#woodKnot)" opacity="0.6" />
      <ellipse cx="310" cy="140" rx="3" ry="2.5" fill="url(#woodKnot)" opacity="0.5" />
      <ellipse cx="280" cy="150" rx="3.5" ry="2" fill="url(#woodKnot)" opacity="0.45" />
      
      {/* Panel seam lines - darker gaps between 4x8 plywood sheets */}
      <line x1="95" y1="158" x2="148" y2="105" stroke="hsl(20 30% 20%)" strokeWidth="2" opacity="0.7" />
      <line x1="148" y1="158" x2="184" y2="122" stroke="hsl(20 30% 20%)" strokeWidth="2" opacity="0.7" />
      <line x1="252" y1="105" x2="305" y2="158" stroke="hsl(20 30% 20%)" strokeWidth="2" opacity="0.7" />
      <line x1="216" y1="122" x2="252" y2="158" stroke="hsl(20 30% 20%)" strokeWidth="2" opacity="0.7" />
      
      {/* Additional horizontal seam lines for realistic 4x8 sheet layout */}
      <line x1="60" y1="140" x2="200" y2="140" stroke="hsl(20 30% 20%)" strokeWidth="1.5" opacity="0.5" />
      <line x1="200" y1="140" x2="340" y2="140" stroke="hsl(20 30% 20%)" strokeWidth="1.5" opacity="0.5" />
      
      {/* Teal edge glow - brand accent on roof edges */}
      <path 
        d="M50 157 L200 59 L350 157" 
        fill="none"
        stroke="hsl(168 70% 50%)" 
        strokeWidth="2"
        opacity={0.4 + easedProgress * 0.4}
        style={{
          filter: `drop-shadow(0 0 ${6 + easedProgress * 8}px hsl(168 70% 50% / 0.6))`,
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
