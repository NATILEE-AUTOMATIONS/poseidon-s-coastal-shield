import React from 'react';

interface LayerProps {
  progress: number;
  startProgress: number;
  endProgress: number;
}

const calculateLayerState = (progress: number, start: number, end: number) => {
  const layerProgress = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  const isLocked = progress >= end;
  return { layerProgress, isLocked };
};

// Layer 1: Drip Edge
export const DripEdgeLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -180;
  const opacity = 0.3 + layerProgress * 0.7;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Left drip edge */}
      <path
        d="M42 158 L42 165 L50 165 L50 160"
        fill="none"
        stroke="hsl(200 20% 70%)"
        strokeWidth="2"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 8px hsl(168 80% 50% / 0.8))' 
            : 'drop-shadow(0 0 4px hsl(168 80% 50% / 0.3))',
        }}
      />
      {/* Right drip edge */}
      <path
        d="M350 160 L350 165 L358 165 L358 158"
        fill="none"
        stroke="hsl(200 20% 70%)"
        strokeWidth="2"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 8px hsl(168 80% 50% / 0.8))' 
            : 'drop-shadow(0 0 4px hsl(168 80% 50% / 0.3))',
        }}
      />
      {/* Eave drip edges */}
      <line x1="50" y1="160" x2="180" y2="160" stroke="hsl(200 20% 70%)" strokeWidth="2.5" />
      <line x1="220" y1="160" x2="350" y2="160" stroke="hsl(200 20% 70%)" strokeWidth="2.5" />
    </g>
  );
};

// Layer 2: Ice & Water Shield
export const IceWaterShieldLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -200;
  const opacity = 0.3 + layerProgress * 0.7;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Ice shield strips along eaves */}
      <path
        d="M52 158 L200 72 L348 158 L348 148 L200 62 L52 148 Z"
        fill="hsl(260 60% 35% / 0.5)"
        stroke="hsl(260 70% 60%)"
        strokeWidth="1"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 10px hsl(260 70% 50% / 0.6))' 
            : 'drop-shadow(0 0 4px hsl(260 70% 50% / 0.2))',
        }}
      />
    </g>
  );
};

// Layer 3: Underlayment
export const UnderlaymentLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -220;
  const opacity = 0.3 + layerProgress * 0.7;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Underlayment/felt paper - covers most of roof */}
      <path
        d="M54 156 L200 72 L346 156 Z"
        fill="hsl(30 10% 25% / 0.6)"
        stroke="hsl(30 10% 45%)"
        strokeWidth="1"
        strokeDasharray="8 4"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 8px hsl(32 80% 50% / 0.4))' 
            : 'drop-shadow(0 0 3px hsl(32 80% 50% / 0.15))',
        }}
      />
      {/* Overlap lines */}
      <line x1="80" y1="140" x2="200" y2="85" stroke="hsl(30 10% 40%)" strokeWidth="0.5" opacity="0.5" />
      <line x1="200" y1="85" x2="320" y2="140" stroke="hsl(30 10% 40%)" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
};

// Layer 4: Starter Strip
export const StarterStripLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -240;
  const opacity = 0.3 + layerProgress * 0.7;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Starter strip along eaves */}
      <path
        d="M56 155 L120 120 L120 125 L56 158 Z"
        fill="hsl(25 30% 20%)"
        stroke="hsl(168 80% 45% / 0.5)"
        strokeWidth="1"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 6px hsl(168 80% 50% / 0.6))' 
            : 'drop-shadow(0 0 2px hsl(168 80% 50% / 0.2))',
        }}
      />
      <path
        d="M280 125 L280 120 L344 155 L344 158 Z"
        fill="hsl(25 30% 20%)"
        stroke="hsl(168 80% 45% / 0.5)"
        strokeWidth="1"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 6px hsl(168 80% 50% / 0.6))' 
            : 'drop-shadow(0 0 2px hsl(168 80% 50% / 0.2))',
        }}
      />
    </g>
  );
};

// Layer 5: Flashing
export const FlashingLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -260;
  const opacity = 0.3 + layerProgress * 0.7;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Step flashing pieces (metallic) */}
      <rect x="130" y="105" width="12" height="8" fill="hsl(200 10% 65%)" rx="1" />
      <rect x="145" y="100" width="12" height="8" fill="hsl(200 10% 65%)" rx="1" />
      <rect x="160" y="94" width="12" height="8" fill="hsl(200 10% 65%)" rx="1" />
      <rect x="228" y="94" width="12" height="8" fill="hsl(200 10% 65%)" rx="1" />
      <rect x="243" y="100" width="12" height="8" fill="hsl(200 10% 65%)" rx="1" />
      <rect x="258" y="105" width="12" height="8" fill="hsl(200 10% 65%)" rx="1" />
      
      {/* Valley flashing */}
      <path
        d="M175 90 L200 72 L225 90 L220 92 L200 76 L180 92 Z"
        fill="hsl(200 10% 60%)"
        stroke="hsl(200 20% 75%)"
        strokeWidth="0.5"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 8px hsl(200 30% 70% / 0.6))' 
            : 'drop-shadow(0 0 3px hsl(200 30% 70% / 0.2))',
        }}
      />
    </g>
  );
};

// Layer 6: Field Shingles
export const FieldShinglesLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -280;
  const opacity = 0.3 + layerProgress * 0.7;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Main shingle field - left side */}
      <path
        d="M60 154 L200 74 L200 84 L70 154 Z"
        fill="hsl(25 35% 22%)"
        stroke="hsl(32 60% 40% / 0.6)"
        strokeWidth="1"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 12px hsl(32 80% 45% / 0.5))' 
            : 'drop-shadow(0 0 4px hsl(32 80% 45% / 0.15))',
        }}
      />
      {/* Main shingle field - right side */}
      <path
        d="M200 74 L340 154 L330 154 L200 84 Z"
        fill="hsl(25 35% 22%)"
        stroke="hsl(32 60% 40% / 0.6)"
        strokeWidth="1"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 12px hsl(32 80% 45% / 0.5))' 
            : 'drop-shadow(0 0 4px hsl(32 80% 45% / 0.15))',
        }}
      />
      
      {/* Shingle rows */}
      {[0, 1, 2, 3].map((row) => (
        <React.Fragment key={row}>
          <line
            x1={70 + row * 20}
            y1={150 - row * 18}
            x2={200}
            y2={84 + row * 3}
            stroke="hsl(25 20% 30%)"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <line
            x1={200}
            y1={84 + row * 3}
            x2={330 - row * 20}
            y2={150 - row * 18}
            stroke="hsl(25 20% 30%)"
            strokeWidth="0.5"
            opacity="0.6"
          />
        </React.Fragment>
      ))}
    </g>
  );
};

// Layer 7: Ridge Cap
export const RidgeCapLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -300;
  const opacity = 0.3 + layerProgress * 0.7;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Ridge cap shingles along peak */}
      <path
        d="M180 78 L200 65 L220 78 L215 80 L200 70 L185 80 Z"
        fill="hsl(25 40% 25%)"
        stroke="hsl(32 70% 50%)"
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 12px hsl(32 90% 50% / 0.7))' 
            : 'drop-shadow(0 0 4px hsl(32 90% 50% / 0.2))',
        }}
      />
      {/* Ridge vent detail */}
      <line x1="190" y1="72" x2="210" y2="72" stroke="hsl(168 80% 50%)" strokeWidth="1" opacity="0.6" />
    </g>
  );
};

// Layer 8: Pipe Boots & Vents
export const VentsLayer: React.FC<LayerProps> = ({ progress, startProgress, endProgress }) => {
  const { layerProgress, isLocked } = calculateLayerState(progress, startProgress, endProgress);
  const yOffset = (1 - layerProgress) * -320;
  const opacity = 0.3 + layerProgress * 0.7;

  return (
    <g
      style={{
        transform: `translateY(${yOffset}px)`,
        opacity,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Pipe boot 1 */}
      <circle
        cx="120"
        cy="130"
        r="8"
        fill="hsl(0 0% 15%)"
        stroke="hsl(168 80% 50%)"
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 10px hsl(168 80% 50% / 0.8))' 
            : 'drop-shadow(0 0 3px hsl(168 80% 50% / 0.3))',
        }}
      />
      <circle cx="120" cy="130" r="4" fill="hsl(0 0% 8%)" />
      
      {/* Pipe boot 2 */}
      <circle
        cx="280"
        cy="130"
        r="8"
        fill="hsl(0 0% 15%)"
        stroke="hsl(168 80% 50%)"
        strokeWidth="1.5"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 10px hsl(168 80% 50% / 0.8))' 
            : 'drop-shadow(0 0 3px hsl(168 80% 50% / 0.3))',
        }}
      />
      <circle cx="280" cy="130" r="4" fill="hsl(0 0% 8%)" />
      
      {/* Roof vent */}
      <rect
        x="240"
        y="105"
        width="16"
        height="10"
        rx="2"
        fill="hsl(0 0% 20%)"
        stroke="hsl(168 80% 50%)"
        strokeWidth="1"
        style={{
          filter: isLocked 
            ? 'drop-shadow(0 0 8px hsl(168 80% 50% / 0.7))' 
            : 'drop-shadow(0 0 2px hsl(168 80% 50% / 0.2))',
        }}
      />
      <line x1="243" y1="110" x2="253" y2="110" stroke="hsl(0 0% 35%)" strokeWidth="1" />
    </g>
  );
};

// Material info data
export const materialInfo = [
  { id: 1, name: "Drip Edge", description: "Directs water away from fascia into gutters" },
  { id: 2, name: "Ice & Water Shield", description: "Self-sealing membrane for leak protection" },
  { id: 3, name: "Underlayment", description: "Secondary waterproof barrier over decking" },
  { id: 4, name: "Starter Strip", description: "Seals shingle edges at eaves and rakes" },
  { id: 5, name: "Flashing", description: "Metal barriers at joints and penetrations" },
  { id: 6, name: "Field Shingles", description: "Primary weatherproofing layer" },
  { id: 7, name: "Ridge Cap", description: "Ventilated shingles along roof peak" },
  { id: 8, name: "Pipe Boots & Vents", description: "Sealed penetrations for plumbing and exhaust" },
];
