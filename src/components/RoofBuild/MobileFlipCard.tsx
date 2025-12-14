import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileFlipCardProps {
  scrollProgress: number;
}

const MobileFlipCard: React.FC<MobileFlipCardProps> = ({ scrollProgress }) => {
  // Calculate current step (0-9) from 8% to 90% scroll
  const animationStart = 0.08;
  const animationEnd = 0.90;
  const totalRange = animationEnd - animationStart;
  const normalizedProgress = (scrollProgress - animationStart) / totalRange;
  const currentStep = Math.max(0, Math.min(9, Math.floor(normalizedProgress * 10)));

  const material = materialInfo[currentStep];
  if (!material) return null;

  return (
    <div className="md:hidden absolute -bottom-6 left-0 right-0 flex justify-center pointer-events-none z-10">
      <div 
        className="px-5 py-3 rounded-lg"
        style={{
          background: 'hsl(160 25% 8% / 0.95)',
          border: '1px solid hsl(168 50% 35% / 0.4)',
          boxShadow: '0 4px 20px hsl(0 0% 0% / 0.4)',
        }}
      >
        <div className="flex items-center gap-3">
          <span 
            className="text-xl font-mono font-light"
            style={{ 
              color: 'hsl(168 70% 55%)',
              textShadow: '0 0 10px hsl(168 70% 50% / 0.6)' 
            }}
          >
            {String(currentStep + 1).padStart(2, '0')}
          </span>
          <div className="w-px h-5" style={{ background: 'hsl(168 40% 30%)' }} />
          <span className="text-white font-medium text-sm">{material.name}</span>
        </div>
      </div>
    </div>
  );
};

export default MobileFlipCard;
