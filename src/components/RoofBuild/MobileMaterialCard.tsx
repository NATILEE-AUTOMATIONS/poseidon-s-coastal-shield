import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileMaterialCardProps {
  progress: number;
  layers: { start: number; end: number }[];
}

const MobileMaterialCard: React.FC<MobileMaterialCardProps> = ({ progress, layers }) => {
  const visibleMaterials = materialInfo.slice(0, 4);
  
  return (
    <div className="w-full px-5 mt-8 relative h-40">
      {visibleMaterials.map((material, index) => {
        const layer = layers[index];
        const layerDuration = layer.end - layer.start;
        
        let localProgress = 0;
        let isVisible = false;
        
        if (progress >= layer.start && progress < layer.end) {
          localProgress = (progress - layer.start) / layerDuration;
          isVisible = true;
        }
        
        if (!isVisible) return null;
        
        // Easing functions
        const easeOutBack = (x: number) => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        };
        const easeInBack = (x: number) => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return c3 * x * x * x - c1 * x * x;
        };
        
        // Animation phases
        const enterEnd = 0.22;
        const exitStart = 0.78;
        
        // Default state (holding)
        let translateX = 0;
        let translateY = 0;
        let rotate = 0;
        let scale = 1;
        let opacity = 1;
        let glowIntensity = 0.3;
        
        if (localProgress < enterEnd) {
          // ENTER: Swing in from bottom-right with overshoot
          const t = localProgress / enterEnd;
          const eased = easeOutBack(t);
          
          translateX = 150 * (1 - eased);
          translateY = 80 * (1 - eased);
          rotate = 25 * (1 - eased);
          scale = 0.3 + (0.7 * Math.min(1, eased));
          opacity = Math.min(1, t * 4);
          glowIntensity = 0.8 * eased;
        } else if (localProgress > exitStart) {
          // EXIT: Swing out to top-left
          const t = (localProgress - exitStart) / (1 - exitStart);
          const eased = easeInBack(t);
          
          translateX = -150 * eased;
          translateY = -60 * eased;
          rotate = -20 * eased;
          scale = 1 - (0.5 * eased);
          opacity = 1 - Math.min(1, t * 2);
          glowIntensity = 0.3 * (1 - eased);
        }
        
        return (
          <div
            key={material.id}
            className="absolute inset-x-5 top-0 flex justify-center"
            style={{
              opacity,
              transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="w-full max-w-xs px-6 py-5 rounded-2xl relative overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 0%, hsl(168 50% 20% / 0.5), transparent 50%),
                  radial-gradient(ellipse at 80% 100%, hsl(30 60% 22% / 0.4), transparent 50%),
                  linear-gradient(135deg, hsl(160 30% 8%), hsl(160 25% 5%))
                `,
                boxShadow: `
                  0 0 0 1px hsl(168 50% 30% / 0.5),
                  0 0 ${30 + glowIntensity * 40}px hsl(168 60% 40% / ${glowIntensity}),
                  0 ${10 + glowIntensity * 15}px ${30 + glowIntensity * 30}px hsl(0 0% 0% / 0.6)
                `,
              }}
            >
              {/* Animated shine sweep on entry */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(
                    105deg,
                    transparent 40%,
                    hsl(168 70% 60% / ${glowIntensity * 0.4}) 45%,
                    hsl(168 70% 60% / ${glowIntensity * 0.6}) 50%,
                    hsl(168 70% 60% / ${glowIntensity * 0.4}) 55%,
                    transparent 60%
                  )`,
                  transform: `translateX(${(1 - glowIntensity) * 200 - 100}%)`,
                }}
              />
              
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span
                  className="text-3xl font-light"
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    color: 'hsl(168 70% 50%)',
                    textShadow: `0 0 ${15 + glowIntensity * 20}px hsl(168 80% 45% / ${0.4 + glowIntensity * 0.4})`,
                  }}
                >
                  {index + 1}
                </span>
                <div 
                  className="flex-1 h-px"
                  style={{
                    background: 'linear-gradient(90deg, hsl(168 50% 40% / 0.6), transparent)',
                  }}
                />
              </div>
              
              {/* Material name */}
              <div
                className="text-xl font-semibold tracking-wide relative z-10"
                style={{
                  color: 'hsl(0 0% 95%)',
                  textShadow: '0 0 20px hsl(0 0% 100% / 0.15)',
                }}
              >
                {material.name}
              </div>
              
              {/* Description */}
              <div
                className="text-sm mt-2 leading-relaxed relative z-10"
                style={{ color: 'hsl(168 10% 55%)' }}
              >
                {material.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileMaterialCard;
