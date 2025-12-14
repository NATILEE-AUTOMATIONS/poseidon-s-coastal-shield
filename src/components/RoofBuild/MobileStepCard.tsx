import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileStepCardProps {
  progress: number;
  layerStart: number;
  layerStep: number;
}

const MobileStepCard: React.FC<MobileStepCardProps> = ({ 
  progress, 
  layerStart, 
  layerStep 
}) => {
  const totalCards = 10;
  const animationEnd = layerStart + (layerStep * totalCards);
  
  if (progress < layerStart || progress > animationEnd) {
    return null;
  }

  // Find current card index
  const rawCardIndex = (progress - layerStart) / layerStep;
  const cardIndex = Math.floor(Math.max(0, Math.min(totalCards - 1, rawCardIndex)));
  const material = materialInfo[cardIndex];
  
  if (!material) return null;

  return (
    <div className="mt-10 w-full flex justify-center px-3">
      <div
        className="relative px-8 py-6 rounded-2xl w-full max-w-md overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 0% 0%, hsl(168 80% 22% / 0.35), transparent 55%), radial-gradient(circle at 100% 100%, hsl(30 80% 35% / 0.4), transparent 60%), hsl(160 25% 6%)',
          boxShadow: '0 0 40px hsl(168 70% 40% / 0.3), 0 18px 60px hsl(0 0% 0% / 0.8)',
          border: '1px solid hsl(168 50% 30% / 0.6)',
        }}
      >
        {/* Neon frame glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: '0 0 0 1px hsl(168 70% 35% / 0.7), 0 0 25px hsl(168 80% 45% / 0.6), 0 0 55px hsl(30 90% 55% / 0.55)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-start gap-5">
          <span
            className="text-5xl font-light font-mono"
            style={{
              color: 'hsl(168 80% 60%)',
              textShadow: '0 0 18px hsl(168 90% 55% / 0.9), 0 0 36px hsl(168 85% 50% / 0.7), 0 0 70px hsl(168 80% 45% / 0.5)',
            }}
          >
            {cardIndex + 1}.
          </span>

          <div className="flex-1 pt-1">
            <div
              className="text-2xl font-semibold tracking-wide"
              style={{
                color: 'hsl(0 0% 98%)',
                textShadow: '0 0 18px hsl(0 0% 100% / 0.45)',
              }}
            >
              {material.name}
            </div>
            <div
              className="text-base mt-3 leading-relaxed"
              style={{ color: 'hsl(168 20% 70%)' }}
            >
              {material.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileStepCard;
