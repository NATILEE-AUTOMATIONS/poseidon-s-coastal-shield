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

// Realistic plywood decking - accurate roof sheathing appearance
export const DeckingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const layerProgress = Math.max(0, Math.min(1, rawProgress));
  
  if (progress < startProgress) return null;
  
  // Slow, deliberate drop animation
  const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);
  const easedProgress = easeOutQuint(layerProgress);
  
  const translateY = -120 * (1 - easedProgress);
  const opacity = 0.15 + (0.85 * easedProgress);
  
  // Plywood color palette - realistic CDX plywood tones
  const plyBase = "hsl(35 28% 58%)";
  const plyDark = "hsl(32 25% 48%)";
  const plyLight = "hsl(38 30% 65%)";
  const gapColor = "hsl(25 20% 25%)";
  
  return (
    <g 
      className="decking-layer"
      style={{
        transform: `translateY(${translateY}px)`,
        transformOrigin: '200px 110px',
        opacity,
        filter: `drop-shadow(0 ${4 + easedProgress * 8}px ${10 + easedProgress * 15}px hsl(30 40% 20% / ${0.3 + easedProgress * 0.2}))`,
      }}
    >
      <defs>
        {/* Left slope gradient - subtle variation */}
        <linearGradient id="deckLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={plyLight} />
          <stop offset="50%" stopColor={plyBase} />
          <stop offset="100%" stopColor={plyDark} />
        </linearGradient>
        
        {/* Right slope gradient */}
        <linearGradient id="deckRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={plyLight} />
          <stop offset="40%" stopColor={plyBase} />
          <stop offset="100%" stopColor={plyDark} />
        </linearGradient>
      </defs>
      
      {/* LEFT ROOF SLOPE - 3 plywood sheets */}
      {/* Sheet 1 - bottom left */}
      <polygon 
        points="48,158 95,158 130,123 82,123" 
        fill="url(#deckLeft)"
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 2 - middle */}
      <polygon 
        points="82,123 130,123 165,88 117,88" 
        fill={plyBase}
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 3 - top left near ridge */}
      <polygon 
        points="117,88 165,88 200,58 152,58" 
        fill="url(#deckLeft)"
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 4 - bottom center-left */}
      <polygon 
        points="95,158 155,158 130,123 130,123" 
        fill={plyDark}
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 5 - middle fill */}
      <polygon 
        points="130,123 165,88 200,88 165,123" 
        fill={plyLight}
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 6 - center top */}
      <polygon 
        points="155,158 200,158 200,123 165,123" 
        fill={plyBase}
        stroke={gapColor}
        strokeWidth="1"
      />
      
      {/* RIGHT ROOF SLOPE - 3 plywood sheets mirrored */}
      {/* Sheet 1 - bottom right */}
      <polygon 
        points="305,158 352,158 318,123 270,123" 
        fill="url(#deckRight)"
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 2 - middle */}
      <polygon 
        points="270,123 318,123 283,88 235,88" 
        fill={plyBase}
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 3 - top right near ridge */}
      <polygon 
        points="235,88 283,88 248,58 200,58" 
        fill="url(#deckRight)"
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 4 - bottom center-right */}
      <polygon 
        points="245,158 305,158 270,123 270,123" 
        fill={plyDark}
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 5 - middle fill */}
      <polygon 
        points="200,88 235,88 270,123 200,123" 
        fill={plyLight}
        stroke={gapColor}
        strokeWidth="1"
      />
      {/* Sheet 6 - center top */}
      <polygon 
        points="200,158 245,158 235,123 200,123" 
        fill={plyBase}
        stroke={gapColor}
        strokeWidth="1"
      />
      
      {/* Ridge line - where sheets meet at peak */}
      <line 
        x1="152" y1="58" 
        x2="248" y2="58" 
        stroke={gapColor}
        strokeWidth="1.5"
      />
      
      {/* Subtle teal accent on edges - brand touch */}
      <path 
        d="M50 157 L200 59 L350 157" 
        fill="none"
        stroke="hsl(168 65% 45%)" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.35 + easedProgress * 0.35}
        style={{
          filter: `drop-shadow(0 0 ${6 + easedProgress * 8}px hsl(168 65% 50% / 0.6))`,
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
