import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileMaterialCardProps {
  progress: number;
  layers: { start: number; end: number }[];
}

const MobileMaterialCard: React.FC<MobileMaterialCardProps> = ({ progress, layers }) => {
  const visibleMaterials = materialInfo.slice(0, 4);
  
  return (
    <div 
      className="w-full flex justify-center px-5 mt-8"
      style={{ perspective: '1200px' }}
    >
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
        
        // Smoother easing
        const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
        const easeInQuart = (x: number) => Math.pow(x, 4);
        
        // More deliberate timing - longer spin phases
        const spinInEnd = 0.25;
        const spinOutStart = 0.75;
        
        let rotateY = 0;
        let scale = 1;
        let opacity = 1;
        
        if (localProgress < spinInEnd) {
          // Spin in from left
          const t = localProgress / spinInEnd;
          const eased = easeOutQuart(t);
          rotateY = -90 * (1 - eased);
          scale = 0.8 + (0.2 * eased);
          opacity = 0.3 + (0.7 * eased);
        } else if (localProgress > spinOutStart) {
          // Spin out to right
          const t = (localProgress - spinOutStart) / (1 - spinOutStart);
          const eased = easeInQuart(t);
          rotateY = 90 * eased;
          scale = 1 - (0.2 * eased);
          opacity = 1 - (0.7 * eased);
        }
        
        return (
          <div
            key={material.id}
            className="w-full max-w-xs"
            style={{
              opacity,
              transform: `perspective(1200px) rotateY(${rotateY}deg) scale(${scale})`,
              transformStyle: 'preserve-3d',
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
