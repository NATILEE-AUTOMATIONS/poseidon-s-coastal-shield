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
        
        // Easing
        const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
        const easeInCubic = (x: number) => x * x * x;
        
        // Animation phases
        const enterEnd = 0.2;
        const exitStart = 0.8;
        
        // Default state
        let rotateY = 0;
        let scale = 1;
        let translateZ = 0;
        
        if (localProgress < enterEnd) {
          // ENTER: 3D flip from behind
          const t = localProgress / enterEnd;
          const eased = easeOutCubic(t);
          
          rotateY = -180 * (1 - eased);
          scale = 0.6 + (0.4 * eased);
          translateZ = -200 * (1 - eased);
        } else if (localProgress > exitStart) {
          // EXIT: 3D flip forward and away
          const t = (localProgress - exitStart) / (1 - exitStart);
          const eased = easeInCubic(t);
          
          rotateY = 180 * eased;
          scale = 1 - (0.4 * eased);
          translateZ = -200 * eased;
        }
        
        return (
          <div
            key={material.id}
            className="absolute inset-x-5 top-0 flex justify-center"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              style={{
                transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
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
                  0 0 50px hsl(168 60% 40% / 0.5),
                  0 20px 50px hsl(0 0% 0% / 0.6)
                `,
              }}
            >
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span
                  className="text-3xl font-light"
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    color: 'hsl(168 70% 50%)',
                    textShadow: '0 0 25px hsl(168 80% 45% / 0.6)',
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
          </div>
        );
      })}
    </div>
  );
};

export default MobileMaterialCard;
