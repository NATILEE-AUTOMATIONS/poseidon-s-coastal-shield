import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileStepCardProps {
  progress: number;
  layerStart: number;
  layerStep: number;
}

// Ultra-smooth quintic easing (no overshoot, gentle settle)
const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);
const easeInQuint = (x: number): number => x * x * x * x * x;

// Renders a single card with 3D cube rotation
const renderCard = (
  cardIndex: number,
  cardProgress: number,
  isEntering: boolean,
  zIndex: number
) => {
  const material = materialInfo[cardIndex];
  if (!material) return null;

  // 3D cube rotation phases - NO dead zone, always in motion
  const entryEnd = 0.35;    // Entry: 0% → 35%
  const exitStart = 0.35;   // Exit: 35% → 100% (starts immediately after entry)

  let rotateY = 0;
  let translateX = 0;
  let scale = 1;
  let glowIntensity = 1;

  if (cardProgress <= entryEnd) {
    // Rotate in from right face of cube (90° = right side facing user)
    const t = cardProgress / entryEnd;
    const eased = easeOutQuint(Math.min(1, t));
    rotateY = 90 * (1 - eased);
    translateX = 100 * (1 - eased);
    scale = 0.85 + 0.15 * eased;
    glowIntensity = 0.5 + 0.5 * eased;
  } else {
    // Rotate out to left face of cube (starts immediately at 35%)
    const t = (cardProgress - exitStart) / (1 - exitStart);
    const eased = easeInQuint(Math.min(1, t));
    rotateY = -90 * eased;
    translateX = -100 * eased;
    scale = 1 - 0.15 * eased;
    glowIntensity = 1 - 0.5 * eased;
  }

  return (
    <div
      key={cardIndex}
      className="absolute inset-0 flex justify-center px-3"
      style={{ zIndex }}
    >
      <div
        className="relative px-8 py-6 rounded-2xl w-full max-w-md overflow-hidden"
        style={{
          transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          background: 'radial-gradient(circle at 0% 0%, hsl(168 80% 22% / 0.35), transparent 55%), radial-gradient(circle at 100% 100%, hsl(30 80% 35% / 0.4), transparent 60%), hsl(160 25% 6%)',
          borderRadius: '1.25rem',
          boxShadow: [
            `0 0 ${40 * glowIntensity}px hsl(168 70% 40% / ${0.3 * glowIntensity})`,
            `${-rotateY * 0.3}px 18px ${60 + Math.abs(rotateY) * 0.5}px hsl(0 0% 0% / 0.8)`
          ].join(', '),
          border: '1px solid hsl(168 50% 30% / 0.6)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Neon frame glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            borderRadius: '1.25rem',
            boxShadow: [
              `0 0 0 1px hsl(168 70% 35% / ${0.7 * glowIntensity})`,
              `0 0 ${25 * glowIntensity}px hsl(168 80% 45% / ${0.6 * glowIntensity})`,
              `0 0 ${55 * glowIntensity}px hsl(30 90% 55% / ${0.55 * glowIntensity})`
            ].join(', '),
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-start gap-5">
          {/* Step Number */}
          <span
            className="text-5xl font-light font-mono"
            style={{
              color: 'hsl(168 80% 60%)',
              textShadow: [
                `0 0 ${18 * glowIntensity}px hsl(168 90% 55% / ${0.9 * glowIntensity})`,
                `0 0 ${36 * glowIntensity}px hsl(168 85% 50% / ${0.7 * glowIntensity})`,
                `0 0 ${70 * glowIntensity}px hsl(168 80% 45% / ${0.5 * glowIntensity})`
              ].join(', '),
            }}
          >
            {cardIndex + 1}.
          </span>

          <div className="flex-1 pt-1">
            <div
              className="text-2xl font-semibold tracking-wide"
              style={{
                color: 'hsl(0 0% 98%)',
                textShadow: `0 0 ${18 * glowIntensity}px hsl(0 0% 100% / ${0.45 * glowIntensity})`,
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

  // Overlap configuration - next card appears when current is 60% through
  const overlapStart = 0.60;
  
  // Determine which cards to render
  const cardsToRender: Array<{ index: number; progress: number; isEntering: boolean; zIndex: number }> = [];

  // Current card (exiting) - behind
  cardsToRender.push({
    index: activeCardIndex,
    progress: cardProgress,
    isEntering: false,
    zIndex: 1
  });

  // If we're in the overlap zone and there's a next card, render it on top
  if (cardProgress >= overlapStart && activeCardIndex < totalCards - 1) {
    // Map current card's 60-100% to next card's 0-35% (full entry phase)
    const nextCardProgress = ((cardProgress - overlapStart) / (1 - overlapStart)) * 0.35;
    
    cardsToRender.push({
      index: activeCardIndex + 1,
      progress: nextCardProgress,
      isEntering: true,
      zIndex: 2
    });
  }

  return (
    <div 
      className="mt-10 w-full flex justify-center px-3 relative"
      style={{ perspective: '1000px', minHeight: '180px' }}
    >
      {cardsToRender.map(card => 
        renderCard(card.index, card.progress, card.isEntering, card.zIndex)
      )}
    </div>
  );
};

export default MobileStepCard;
