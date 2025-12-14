import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileSpinCardsProps {
  progress: number;
  layers: { start: number; end: number }[];
}

const MobileSpinCards: React.FC<MobileSpinCardsProps> = ({ progress, layers }) => {
  return (
    <div className="mt-8 w-full px-3 relative h-48 overflow-hidden">
      {materialInfo.map((material, index) => {
        const layer = layers[index];
        
        // Card animation timing: start appearing 2% before layer starts, fully in at layer end
        const cardStart = Math.max(0, layer.start - 0.02);
        const cardEnd = layer.end;
        
        // Calculate individual card progress (0 = off screen right, 1 = in position)
        const cardProgress = progress < cardStart 
          ? 0 
          : progress > cardEnd 
            ? 1 
            : (progress - cardStart) / (cardEnd - cardStart);
        
        // Easing for smooth spin
        const easeOutBack = (x: number) => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        };
        
        const easedProgress = easeOutBack(Math.min(1, cardProgress));
        
        // Position: starts from right (150%), ends at center (50% - card width offset)
        const translateX = 150 - (easedProgress * 150); // 150% -> 0%
        
        // Rotation: spins from 180deg to 0deg
        const rotation = 180 - (easedProgress * 180);
        
        // Only show cards that are animating or complete
        const isVisible = cardProgress > 0;
        
        // Fade out previous cards slightly when new one arrives
        const isCurrent = progress >= layer.start && progress <= layer.end + 0.02;
        const isPast = progress > layer.end + 0.02;
        const opacity = !isVisible ? 0 : isCurrent ? 1 : isPast ? 0.3 : 1;
        
        // Scale down past cards
        const scale = isPast ? 0.85 : 1;
        
        // Stack cards with z-index (later cards on top)
        const zIndex = index + 1;
        
        if (!isVisible) return null;
        
        return (
          <div
            key={material.id}
            className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[calc(100%-1.5rem)] max-w-md"
            style={{
              transform: `translateX(calc(-50% + ${translateX}%)) translateY(-50%) rotateY(${rotation}deg) scale(${scale})`,
              opacity,
              zIndex,
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              transition: isPast ? 'opacity 0.3s ease-out, transform 0.3s ease-out' : 'none',
            }}
          >
            <div
              className="relative px-6 py-5 rounded-2xl overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 0% 0%, hsl(168 80% 22% / 0.35), transparent 55%), radial-gradient(circle at 100% 100%, hsl(30 80% 35% / 0.4), transparent 60%), hsl(160 25% 6%)',
                boxShadow: [
                  '0 0 40px hsl(168 70% 40% / 0.3)',
                  '0 18px 60px hsl(0 0% 0% / 0.8)',
                  '0 0 0 1px hsl(168 70% 35% / 0.7)',
                  '0 0 25px hsl(168 80% 45% / 0.6)',
                  '0 0 55px hsl(30 90% 55% / 0.55)'
                ].join(', '),
                border: '1px solid hsl(168 50% 30% / 0.6)',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Content */}
              <div className="flex items-start gap-4">
                {/* Step Number */}
                <span
                  className="text-4xl font-light font-mono flex-shrink-0"
                  style={{
                    color: 'hsl(168 80% 60%)',
                    textShadow: [
                      '0 0 18px hsl(168 90% 55% / 0.9)',
                      '0 0 36px hsl(168 85% 50% / 0.7)',
                      '0 0 70px hsl(168 80% 45% / 0.5)'
                    ].join(', '),
                  }}
                >
                  {index + 1}.
                </span>

                <div className="flex-1 min-w-0">
                  <div
                    className="text-xl font-semibold tracking-wide truncate"
                    style={{
                      color: 'hsl(0 0% 98%)',
                      textShadow: '0 0 18px hsl(0 0% 100% / 0.45)',
                    }}
                  >
                    {material.name}
                  </div>
                  <div
                    className="text-sm mt-2 leading-relaxed line-clamp-2"
                    style={{
                      color: 'hsl(168 20% 70%)',
                    }}
                  >
                    {material.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileSpinCards;
