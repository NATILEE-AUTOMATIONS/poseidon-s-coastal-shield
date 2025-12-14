import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileStepCardProps {
  progress: number;
  layerStart: number;
  layerStep: number;
}

// Smooth quadratic easing
const easeOutQuad = (x: number): number => 1 - (1 - x) * (1 - x);
const easeInQuad = (x: number): number => x * x;

// Renders a single card with lift/drop animation
const renderCard = (
  cardIndex: number,
  cardProgress: number,
  zIndex: number
) => {
  const material = materialInfo[cardIndex];
  if (!material) return null;

  // Animation phases
  const exitEnd = 0.5;      // Exit: 0% → 50%
  const entryStart = 0.4;   // Entry: 40% → 100%

  let translateY = 0;
  let opacity = 1;
  let scale = 1;

  if (cardProgress <= exitEnd) {
    // Exit: lift up and fade out
    const t = easeInQuad(cardProgress / exitEnd);
    translateY = -40 * t;
    opacity = 1 - t;
    scale = 1 - 0.05 * t;
  } else if (cardProgress >= entryStart) {
    // Entry: drop down and fade in
    const t = easeOutQuad((cardProgress - entryStart) / (1 - entryStart));
    translateY = -60 * (1 - t);
    opacity = t;
    scale = 0.9 + 0.1 * t;
  }

  return (
    <div
      key={cardIndex}
      className="absolute inset-0 flex justify-center px-3"
      style={{ 
        zIndex,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        willChange: 'transform, opacity',
      }}
    >
      <div
        className="relative px-8 py-6 rounded-2xl w-full max-w-md overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 0% 0%, hsl(168 80% 22% / 0.35), transparent 55%), radial-gradient(circle at 100% 100%, hsl(30 80% 35% / 0.4), transparent 60%), hsl(160 25% 6%)',
          borderRadius: '1.25rem',
          boxShadow: `0 0 ${40 * opacity}px hsl(168 70% 40% / ${0.3 * opacity}), 0 18px 60px hsl(0 0% 0% / 0.8)`,
          border: '1px solid hsl(168 50% 30% / 0.6)',
        }}
      >
        {/* Neon frame glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            borderRadius: '1.25rem',
            boxShadow: `0 0 0 1px hsl(168 70% 35% / ${0.7 * opacity}), 0 0 ${25 * opacity}px hsl(168 80% 45% / ${0.6 * opacity}), 0 0 ${55 * opacity}px hsl(30 90% 55% / ${0.55 * opacity})`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-start gap-5">
          {/* Step Number */}
          <span
            className="text-5xl font-light font-mono"
            style={{
              color: 'hsl(168 80% 60%)',
              textShadow: `0 0 ${18 * opacity}px hsl(168 90% 55% / ${0.9 * opacity}), 0 0 ${36 * opacity}px hsl(168 85% 50% / ${0.7 * opacity}), 0 0 ${70 * opacity}px hsl(168 80% 45% / ${0.5 * opacity})`,
            }}
          >
            {cardIndex + 1}.
          </span>

          <div className="flex-1 pt-1">
            <div
              className="text-2xl font-semibold tracking-wide"
              style={{
                color: 'hsl(0 0% 98%)',
                textShadow: `0 0 ${18 * opacity}px hsl(0 0% 100% / ${0.45 * opacity})`,
              }}
            >
              {material.name}
            </div>
            <div
              className="text-base mt-3 leading-relaxed"
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
};

const MobileStepCard: React.FC<MobileStepCardProps> = ({ 
  progress, 
  layerStart, 
  layerStep 
}) => {
  const totalCards = 10;
  const animationEnd = layerStart + (layerStep * totalCards);
  
  // Don't show anything outside the animation range
  if (progress < layerStart - 0.02 || progress > animationEnd + 0.02) {
    return null;
  }

  // Find which card is currently active
  const rawCardIndex = (progress - layerStart) / layerStep;
  const activeCardIndex = Math.floor(Math.max(0, Math.min(totalCards - 1, rawCardIndex)));
  
  // Calculate progress within the current card's window (0 to 1)
  const cardStart = layerStart + activeCardIndex * layerStep;
  const rawCardProgress = (progress - cardStart) / layerStep;
  const cardProgress = Math.max(0, Math.min(1, rawCardProgress));

  // Overlap: next card starts entering at 40%
  const overlapStart = 0.40;
  
  const cardsToRender: Array<{ index: number; progress: number; zIndex: number }> = [];

  // Current card (exiting) - behind
  cardsToRender.push({
    index: activeCardIndex,
    progress: cardProgress,
    zIndex: 1
  });

  // Next card (entering) - in front, starts at 40%
  if (cardProgress >= overlapStart && activeCardIndex < totalCards - 1) {
    // Map 40-100% to 40-100% for next card
    const nextCardProgress = 0.4 + ((cardProgress - overlapStart) / (1 - overlapStart)) * 0.6;
    
    cardsToRender.push({
      index: activeCardIndex + 1,
      progress: nextCardProgress,
      zIndex: 2
    });
  }

  return (
    <div 
      className="mt-10 w-full flex justify-center px-3 relative"
      style={{ minHeight: '180px' }}
    >
      {cardsToRender.map(card => 
        renderCard(card.index, card.progress, card.zIndex)
      )}
    </div>
  );
};

export default MobileStepCard;
