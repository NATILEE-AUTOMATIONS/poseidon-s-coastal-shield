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
  
  // Not visible yet - delay visibility until 20% into the animation window
  if (layerProgress < 0.2) return null;
  
  // Remap progress: 0.2-1.0 becomes 0-1 for the actual animation
  const remappedProgress = (layerProgress - 0.2) / 0.8;
  
  // Ultra-smooth easing for gentle, deliberate settling
  const easeOutSine = (x: number): number => Math.sin((x * Math.PI) / 2);
  const easedProgress = easeOutSine(remappedProgress);
  
  // Animation values - slower, more dramatic drop
  const translateY = -120 * (1 - easedProgress); // Drop from further above
  const opacity = 0.2 + (0.8 * easedProgress); // Fade in from 0.2 to 1
  
  // Subtle scale pulse when settling (last 10% of animation)
  const settlePhase = remappedProgress > 0.9 ? (remappedProgress - 0.9) / 0.1 : 0;
  const scale = 1 + (0.012 * Math.sin(settlePhase * Math.PI)); // Gentle pulse
  
  // Glow intensifies as it locks in
  const glowIntensity = 0.15 + (easedProgress * 0.45);
  
  return (
    <g 
      className="decking-layer"
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: '200px 110px', // Center of roof
        opacity,
        filter: `drop-shadow(0 ${4 + easedProgress * 8}px ${12 + easedProgress * 16}px hsl(35 55% 40% / ${glowIntensity}))`,
        transition: 'filter 0.1s ease-out',
      }}
    >
      {/* Gradients and patterns */}
      <defs>
        {/* Main plywood gradient - warm golden-tan tones */}
        <linearGradient id="deckingGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(38 50% 58%)" />
          <stop offset="35%" stopColor="hsl(35 48% 52%)" />
          <stop offset="70%" stopColor="hsl(32 45% 46%)" />
          <stop offset="100%" stopColor="hsl(30 42% 40%)" />
        </linearGradient>
        <linearGradient id="deckingGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(38 50% 56%)" />
          <stop offset="35%" stopColor="hsl(35 48% 50%)" />
          <stop offset="70%" stopColor="hsl(32 45% 44%)" />
          <stop offset="100%" stopColor="hsl(30 42% 38%)" />
        </linearGradient>
        
        {/* Subtle wood grain pattern */}
        <pattern id="woodGrain" patternUnits="userSpaceOnUse" width="40" height="8" patternTransform="rotate(-25)">
          <line x1="0" y1="0" x2="40" y2="0" stroke="hsl(30 40% 35%)" strokeWidth="0.5" opacity="0.15" />
          <line x1="0" y1="4" x2="40" y2="4" stroke="hsl(30 35% 32%)" strokeWidth="0.3" opacity="0.1" />
        </pattern>
        
        {/* Teal edge glow for brand consistency */}
        <linearGradient id="deckingEdgeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 70% 50%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(168 70% 40%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Left slope decking panel */}
      <path 
        d="M48 158 L200 58 L200 158 Z" 
        fill="url(#deckingGradientLeft)"
      />
      {/* Wood grain overlay - left */}
      <path 
        d="M48 158 L200 58 L200 158 Z" 
        fill="url(#woodGrain)"
        opacity="0.6"
      />
      
      {/* Right slope decking panel */}
      <path 
        d="M200 58 L352 158 L200 158 Z" 
        fill="url(#deckingGradientRight)"
      />
      {/* Wood grain overlay - right */}
      <path 
        d="M200 58 L352 158 L200 158 Z" 
        fill="url(#woodGrain)"
        opacity="0.6"
      />
      
      {/* Panel seam lines - 4x8 plywood sheets */}
      {/* Left slope seams */}
      <line x1="100" y1="158" x2="150" y2="108" stroke="hsl(25 35% 28%)" strokeWidth="1" opacity="0.5" />
      <line x1="152" y1="158" x2="185" y2="125" stroke="hsl(25 35% 28%)" strokeWidth="1" opacity="0.5" />
      
      {/* Right slope seams */}
      <line x1="250" y1="108" x2="300" y2="158" stroke="hsl(25 35% 28%)" strokeWidth="1" opacity="0.5" />
      <line x1="215" y1="125" x2="248" y2="158" stroke="hsl(25 35% 28%)" strokeWidth="1" opacity="0.5" />
      
      {/* Blue chalk lines - authentic construction detail */}
      <line 
        x1="65" y1="145" x2="180" y2="70" 
        stroke="hsl(220 70% 55%)" 
        strokeWidth="1.5" 
        strokeDasharray="8 4"
        opacity="0.6"
      />
      <line 
        x1="220" y1="70" x2="335" y2="145" 
        stroke="hsl(220 70% 55%)" 
        strokeWidth="1.5" 
        strokeDasharray="8 4"
        opacity="0.6"
      />
      
      {/* Ridge line highlight */}
      <line 
        x1="52" y1="156" x2="200" y2="60" 
        stroke="hsl(168 60% 50%)" 
        strokeWidth="1"
        opacity={0.3 + easedProgress * 0.4}
      />
      <line 
        x1="200" y1="60" x2="348" y2="156" 
        stroke="hsl(168 60% 50%)" 
        strokeWidth="1"
        opacity={0.3 + easedProgress * 0.4}
      />
      
      {/* Bottom edge accent */}
      <line 
        x1="48" y1="158" x2="352" y2="158" 
        stroke="hsl(168 50% 45%)" 
        strokeWidth="1.5"
        opacity={0.2 + easedProgress * 0.3}
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
