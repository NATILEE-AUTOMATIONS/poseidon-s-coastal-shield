import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileMaterialCardProps {
  progress: number;
  layers: { start: number; end: number }[];
}

const MobileMaterialCard: React.FC<MobileMaterialCardProps> = ({ progress, layers }) => {
  const visibleMaterials = materialInfo.slice(0, 4);
  
  // Overlap amount - cards stay visible past their layer.end to complete exit
  const overlapAmount = 0.2;
  
  return (
    <div className="w-full px-5 mt-8 relative h-40 overflow-hidden">
      {visibleMaterials.map((material, index) => {
        const layer = layers[index];
        const layerDuration = layer.end - layer.start;
        
        // Extended visibility: visible from layer.start until layer.end + overlap
        const visibleEnd = layer.end + (layerDuration * overlapAmount);
        
        if (progress < layer.start || progress > visibleEnd) return null;
        
        // layerProgress: 0 to 1.0 is normal, 1.0 to 1.2 is exit overlap
        const layerProgress = (progress - layer.start) / layerDuration;
        
        // Animation phases
        const enterEnd = 0.2; // First 20% is entry
        const exitStart = 0.8; // Exit starts at 80%
        const exitEnd = 1.0 + overlapAmount; // Exit completes at 120%
        
        let translateX = 0;
        let zIndex = 15;
        
        if (layerProgress < enterEnd) {
          // ENTERING: Slide in from right
          const t = layerProgress / enterEnd;
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          translateX = 100 * (1 - eased); // 100% -> 0%
          zIndex = 20; // On top while entering
        } else if (layerProgress > exitStart) {
          // EXITING: Slide out to left
          const t = (layerProgress - exitStart) / (exitEnd - exitStart);
          const eased = t * t * t; // easeInCubic
          translateX = -100 * eased; // 0% -> -100%
          zIndex = 10; // Behind entering card
        }
        
        return (
          <div
            key={material.id}
            className="absolute inset-x-5 top-0 flex justify-center"
            style={{
              transform: `translateX(${translateX}%)`,
              zIndex,
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
        );
      })}
    </div>
  );
};

export default MobileMaterialCard;
