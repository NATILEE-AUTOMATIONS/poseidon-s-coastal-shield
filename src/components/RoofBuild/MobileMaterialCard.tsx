import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileMaterialCardProps {
  progress: number;
  layers: { start: number; end: number }[];
}

// Easing function for smooth rotation
const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

const MobileMaterialCard: React.FC<MobileMaterialCardProps> = ({ progress, layers }) => {
  const visibleMaterials = materialInfo.slice(0, 4);
  const totalCards = visibleMaterials.length;
  const degreesPerStep = 90;
  const carouselRadius = 160; // Distance from center in px
  
  // Calculate overall progress through all layers (0 to 1)
  const firstLayerStart = layers[0].start;
  const lastLayerEnd = layers[totalCards - 1].end;
  const overallProgress = Math.max(0, Math.min(1, (progress - firstLayerStart) / (lastLayerEnd - firstLayerStart)));
  
  // Apply easing and calculate carousel rotation (0° to -270° for 4 cards)
  const easedProgress = easeInOutQuad(overallProgress);
  const carouselRotation = -easedProgress * (totalCards - 1) * degreesPerStep;
  
  return (
    <div 
      className="w-full px-5 mt-8 relative h-44"
      style={{ 
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {visibleMaterials.map((material, index) => {
          // Each card is positioned 90° apart
          const cardBaseRotation = index * degreesPerStep;
          const finalRotation = carouselRotation + cardBaseRotation;
          
          // Normalize rotation to -180 to 180 range
          let normalizedRotation = finalRotation % 360;
          if (normalizedRotation > 180) normalizedRotation -= 360;
          if (normalizedRotation < -180) normalizedRotation += 360;
          
          // Only render cards that are somewhat facing forward (-100° to 100°)
          const isVisible = Math.abs(normalizedRotation) < 100;
          if (!isVisible) return null;
          
          // Calculate opacity based on rotation (full opacity at 0°, fade at edges)
          const opacity = Math.cos((normalizedRotation * Math.PI) / 180);
          
          // Scale effect: slightly smaller when rotated away
          const scale = 0.85 + 0.15 * Math.cos((normalizedRotation * Math.PI) / 180);
          
          return (
            <div
              key={material.id}
              className="absolute flex justify-center"
              style={{
                transform: `rotateY(${finalRotation}deg) translateZ(${carouselRadius}px) scale(${scale})`,
                opacity: Math.max(0, opacity),
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                className="w-72 px-6 py-5 rounded-2xl relative overflow-hidden"
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
    </div>
  );
};

export default MobileMaterialCard;
