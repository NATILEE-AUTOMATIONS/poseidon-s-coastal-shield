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
        
        // Card timing - more deliberate pacing
        // Spin in: 0-30% (slower entry)
        // Hold: 30-70%
        // Spin out: 70-100% (slower exit)
        
        let localProgress = 0;
        let isVisible = false;
        
        if (progress >= layer.start && progress < layer.end) {
          localProgress = (progress - layer.start) / layerDuration;
          isVisible = true;
        }
        
        if (!isVisible) return null;
        
        // Smoother easing - sextic for ultra-smooth feel
        const easeOutSextic = (x: number) => 1 - Math.pow(1 - x, 6);
        const easeInSextic = (x: number) => Math.pow(x, 6);
        // Smooth in-out for natural weight
        const easeInOutCubic = (x: number) => 
          x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        
        // Extended timing phases
        const spinInEnd = 0.28;
        const spinOutStart = 0.72;
        
        let rotateY = 0;
        let rotateX = 0;
        let scale = 1;
        let opacity = 1;
        let translateZ = 0;
        
        if (localProgress < spinInEnd) {
          // Spin in - slower, more deliberate rotation
          const t = localProgress / spinInEnd;
          const eased = easeOutSextic(t);
          rotateY = -75 * (1 - eased);
          rotateX = 5 * (1 - eased);
          scale = 0.85 + (0.15 * eased);
          opacity = easeInOutCubic(t);
          translateZ = -60 * (1 - eased);
        } else if (localProgress > spinOutStart) {
          // Spin out - smooth, weighted exit
          const t = (localProgress - spinOutStart) / (1 - spinOutStart);
          const eased = easeInSextic(t);
          rotateY = 75 * eased;
          rotateX = -5 * eased;
          scale = 1 - (0.15 * eased);
          opacity = 1 - easeInOutCubic(t);
          translateZ = -60 * eased;
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
