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
  
  // Entry animation (first 15% of layer)
  // Hold (15% to 85%)
  // Exit animation (last 15% of layer)
  const entryEnd = 0.15;
  const exitStart = 0.85;
  
  let cardOpacity = 1;
  let cardScale = 1;
  let cardTranslateY = 0;
  
  if (localProgress < entryEnd) {
    // Entry: fade in + scale up + slide up
    const entryProgress = localProgress / entryEnd;
    const eased = 1 - Math.pow(1 - entryProgress, 4); // easeOutQuart
    cardOpacity = eased;
    cardScale = 0.85 + (0.15 * eased);
    cardTranslateY = 30 * (1 - eased);
  } else if (localProgress > exitStart) {
    // Exit: fade out + scale down + slide up
    const exitProgress = (localProgress - exitStart) / (1 - exitStart);
    const eased = Math.pow(exitProgress, 3); // easeInCubic
    cardOpacity = 1 - eased;
    cardScale = 1 - (0.1 * eased);
    cardTranslateY = -20 * eased;
  }

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div
        className="relative px-6 py-5 rounded-xl w-full max-w-sm overflow-hidden"
        style={{
          opacity: cardOpacity,
          transform: `scale(${cardScale}) translateY(${cardTranslateY}px)`,
          background: 'radial-gradient(ellipse at 30% 0%, hsl(168 60% 18% / 0.4), transparent 60%), radial-gradient(ellipse at 70% 100%, hsl(30 70% 25% / 0.35), transparent 55%), hsl(160 30% 6%)',
          boxShadow: `
            0 0 0 1px hsl(168 60% 35% / 0.5),
            0 0 30px hsl(168 70% 40% / 0.25),
            0 15px 40px hsl(0 0% 0% / 0.6)
          `,
          willChange: 'transform, opacity',
        }}
      >
        {/* Subtle inner glow frame */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 1px 0 hsl(168 60% 50% / 0.15), inset 0 -1px 0 hsl(30 70% 50% / 0.1)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-start gap-4">
          {/* Step number */}
          <div
            className="text-4xl font-light tabular-nums"
            style={{
              fontFamily: 'ui-monospace, monospace',
              color: 'hsl(168 75% 55%)',
              textShadow: `
                0 0 12px hsl(168 80% 50% / 0.8),
                0 0 25px hsl(168 75% 45% / 0.5)
              `,
              lineHeight: 1,
            }}
          >
            {activeIndex + 1}
          </div>

          <div className="flex-1 pt-0.5">
            {/* Material name */}
            <div
              className="text-lg font-semibold tracking-wide"
              style={{
                color: 'hsl(0 0% 96%)',
                textShadow: '0 0 15px hsl(0 0% 100% / 0.3)',
              }}
            >
              {material.name}
            </div>
            
            {/* Description */}
            <div
              className="text-sm mt-2 leading-relaxed"
              style={{ 
                color: 'hsl(168 15% 65%)',
              }}
            >
              {material.description}
            </div>
          </div>
        </div>

        {/* Progress indicator bar */}
        <div className="mt-4 h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${localProgress * 100}%`,
              background: 'linear-gradient(90deg, hsl(168 70% 45%), hsl(30 80% 55%))',
              boxShadow: '0 0 10px hsl(168 70% 50% / 0.6)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMaterialCard;
