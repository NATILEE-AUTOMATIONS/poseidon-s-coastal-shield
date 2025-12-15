import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileMaterialCardProps {
  progress: number;
  layers: { start: number; end: number }[];
}

const MobileMaterialCard: React.FC<MobileMaterialCardProps> = ({ progress, layers }) => {
  const visibleMaterials = materialInfo.slice(0, 4);
  
  // Determine which card to show based on which layer is active
  let activeCardIndex = -1; // -1 means no card visible
  
  for (let i = 0; i < visibleMaterials.length; i++) {
    const layer = layers[i];
    if (progress >= layer.start && progress < layer.end) {
      activeCardIndex = i;
      break;
    }
  }
  
  // After all layers complete, show the last card
  const lastLayer = layers[visibleMaterials.length - 1];
  if (progress >= lastLayer?.end) {
    activeCardIndex = visibleMaterials.length - 1;
  }
  
  // Don't render anything before first layer starts
  if (activeCardIndex < 0) return null;
  
  const material = visibleMaterials[activeCardIndex];
  
  return (
    <div className="w-full px-5 mt-8">
      <div
        key={material.id}
        className="w-72 mx-auto px-6 py-5 rounded-2xl relative overflow-hidden animate-fade-in"
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
            {activeCardIndex + 1}
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
};

export default MobileMaterialCard;
