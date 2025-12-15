import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileMaterialCardProps {
  progress: number;
  layers: { start: number; end: number }[];
}

const MobileMaterialCard: React.FC<MobileMaterialCardProps> = ({ progress, layers }) => {
  // Only show first 4 materials on mobile
  const visibleMaterials = materialInfo.slice(0, 4);
  
  // Find which material is currently active
  let activeIndex = -1;
  let localProgress = 0;
  
  for (let i = 0; i < 4; i++) {
    const layer = layers[i];
    if (progress >= layer.start && progress < layer.end) {
      activeIndex = i;
      localProgress = (progress - layer.start) / (layer.end - layer.start);
      break;
    }
  }
  
  // If before first layer or after 4th layer, don't show
  if (activeIndex === -1) return null;
  
  const material = visibleMaterials[activeIndex];
  if (!material) return null;
  
  // Deliberate, cinematic timing
  // Entry: slow fade up (first 20%)
  // Hold: full visibility (20% to 75%)  
  // Exit: gentle fade down (last 25%)
  const entryEnd = 0.20;
  const exitStart = 0.75;
  
  let cardOpacity = 1;
  let translateY = 0;
  let blur = 0;
  
  // Quintic easing for ultra-smooth feel
  const easeOutQuint = (x: number) => 1 - Math.pow(1 - x, 5);
  const easeInQuint = (x: number) => Math.pow(x, 5);
  
  if (localProgress < entryEnd) {
    const entryProgress = localProgress / entryEnd;
    const eased = easeOutQuint(entryProgress);
    cardOpacity = eased;
    translateY = 20 * (1 - eased);
    blur = 4 * (1 - eased);
  } else if (localProgress > exitStart) {
    const exitProgress = (localProgress - exitStart) / (1 - exitStart);
    const eased = easeInQuint(exitProgress);
    cardOpacity = 1 - eased;
    translateY = -15 * eased;
    blur = 3 * eased;
  }

  return (
    <div className="w-full flex justify-center px-6 mt-8">
      <div
        className="text-center"
        style={{
          opacity: cardOpacity,
          transform: `translateY(${translateY}px)`,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
          willChange: 'transform, opacity, filter',
        }}
      >
        {/* Step number - large, monospace, glowing */}
        <div
          className="font-light tracking-tight"
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '4.5rem',
            lineHeight: 0.9,
            color: 'hsl(168 70% 50%)',
            textShadow: `
              0 0 20px hsl(168 80% 45% / 0.7),
              0 0 40px hsl(168 75% 40% / 0.4)
            `,
          }}
        >
          {activeIndex + 1}
        </div>

        {/* Thin divider line */}
        <div 
          className="mx-auto my-3"
          style={{
            width: '40px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, hsl(168 60% 45%), transparent)',
            opacity: 0.6,
          }}
        />

        {/* Material name - clean, bold */}
        <div
          className="text-xl font-semibold tracking-wide uppercase"
          style={{
            color: 'hsl(0 0% 94%)',
            letterSpacing: '0.15em',
          }}
        >
          {material.name}
        </div>
        
        {/* Description - subtle, secondary */}
        <div
          className="text-sm mt-2 max-w-xs mx-auto"
          style={{ 
            color: 'hsl(168 10% 55%)',
            lineHeight: 1.5,
          }}
        >
          {material.description}
        </div>
      </div>
    </div>
  );
};

export default MobileMaterialCard;
