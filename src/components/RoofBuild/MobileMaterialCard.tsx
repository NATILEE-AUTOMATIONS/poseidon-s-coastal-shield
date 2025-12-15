import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileMaterialCardProps {
  progress: number;
  layers: { start: number; end: number }[];
}

const MobileMaterialCard: React.FC<MobileMaterialCardProps> = ({ progress, layers }) => {
  const visibleMaterials = materialInfo.slice(0, 4);
  
  // Render cards for first 4 materials
  return (
    <div 
      className="w-full flex justify-center px-5 mt-8"
      style={{ perspective: '1000px' }}
    >
      {visibleMaterials.map((material, index) => {
        const layer = layers[index];
        const layerDuration = layer.end - layer.start;
        
        // Card timing within its layer
        // Spin in: 0-20%
        // Hold: 20-75%
        // Spin out: 75-100%
        
        let localProgress = 0;
        let isVisible = false;
        
        if (progress >= layer.start && progress < layer.end) {
          localProgress = (progress - layer.start) / layerDuration;
          isVisible = true;
        }
        
        if (!isVisible) return null;
        
        // Easing
        const easeOutQuint = (x: number) => 1 - Math.pow(1 - x, 5);
        const easeInQuint = (x: number) => Math.pow(x, 5);
        
        // Spin in phase (0-20%)
        const spinInEnd = 0.18;
        // Hold phase (18-78%)
        const spinOutStart = 0.78;
        
        let rotateY = 0;
        let rotateX = 0;
        let scale = 1;
        let opacity = 1;
        let translateZ = 0;
        
        if (localProgress < spinInEnd) {
          // Spin in - rotate from -90deg
          const t = localProgress / spinInEnd;
          const eased = easeOutQuint(t);
          rotateY = -85 * (1 - eased);
          rotateX = 8 * (1 - eased);
          scale = 0.7 + (0.3 * eased);
          opacity = eased;
          translateZ = -100 * (1 - eased);
        } else if (localProgress > spinOutStart) {
          // Spin out - rotate to 90deg
          const t = (localProgress - spinOutStart) / (1 - spinOutStart);
          const eased = easeInQuint(t);
          rotateY = 85 * eased;
          rotateX = -8 * eased;
          scale = 1 - (0.3 * eased);
          opacity = 1 - eased;
          translateZ = -100 * eased;
        }
        
        return (
          <div
            key={material.id}
            className="absolute w-full max-w-xs"
            style={{
              opacity,
              transform: `
                perspective(1000px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                scale(${scale})
                translateZ(${translateZ}px)
              `,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="px-6 py-5 rounded-2xl"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 0%, hsl(168 50% 20% / 0.5), transparent 50%),
                  radial-gradient(ellipse at 80% 100%, hsl(30 60% 22% / 0.4), transparent 50%),
                  linear-gradient(135deg, hsl(160 30% 8%), hsl(160 25% 5%))
                `,
                boxShadow: `
                  0 0 0 1px hsl(168 50% 30% / 0.4),
                  0 0 30px hsl(168 60% 35% / 0.15),
                  0 20px 50px hsl(0 0% 0% / 0.5)
                `,
              }}
            >
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-3xl font-light"
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    color: 'hsl(168 70% 50%)',
                    textShadow: '0 0 20px hsl(168 80% 45% / 0.6)',
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
                className="text-xl font-semibold tracking-wide"
                style={{
                  color: 'hsl(0 0% 95%)',
                  textShadow: '0 0 20px hsl(0 0% 100% / 0.15)',
                }}
              >
                {material.name}
              </div>
              
              {/* Description */}
              <div
                className="text-sm mt-2 leading-relaxed"
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
