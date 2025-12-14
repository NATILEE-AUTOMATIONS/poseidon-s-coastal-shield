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

// Single card renderer
const CardFace: React.FC<{
  cardIndex: number;
  rotateY: number;
  translateX: number;
  scale: number;
  glowIntensity: number;
}> = ({ cardIndex, rotateY, translateX, scale, glowIntensity }) => {
  const material = materialInfo[cardIndex];
  if (!material) return null;

  return (
    <div
      className="absolute left-0 right-0 px-8 py-6 rounded-2xl mx-3 max-w-md overflow-hidden"
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
  );
};

const MobileStepCard: React.FC<MobileStepCardProps> = ({ 
  progress, 
  layerStart, 
  layerStep 
}) => {
  const totalCards = 10;
  const animationEnd = layerStart + (layerStep * totalCards);
  
  if (progress < layerStart - 0.02 || progress > animationEnd + 0.02) {
    return null;
  }

  // Calculate current position in the animation
  const rawCardIndex = (progress - layerStart) / layerStep;
  const currentCardIndex = Math.floor(Math.max(0, Math.min(totalCards - 1, rawCardIndex)));
  
  // Progress within current card's window (0 to 1)
  const cardStart = layerStart + currentCardIndex * layerStep;
  const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / layerStep));

  // Animation phases - overlap zone starts at 60% (was 70%)
  const entryEnd = 0.30;
  const exitStart = 0.60; // Earlier exit = more overlap
  const overlapStart = 0.60; // Next card starts entering here

  // Calculate current card's animation state
  let currentRotateY = 0;
  let currentTranslateX = 0;
  let currentScale = 1;
  let currentGlow = 1;

  if (cardProgress <= entryEnd) {
    const t = cardProgress / entryEnd;
    const eased = easeOutQuint(t);
    currentRotateY = 90 * (1 - eased);
    currentTranslateX = 40 * (1 - eased);
    currentScale = 0.9 + 0.1 * eased;
    currentGlow = 0.6 + 0.4 * eased;
  } else if (cardProgress >= exitStart) {
    const t = (cardProgress - exitStart) / (1 - exitStart);
    const eased = easeInQuint(t);
    currentRotateY = -90 * eased;
    currentTranslateX = -40 * eased;
    currentScale = 1 - 0.1 * eased;
    currentGlow = 1 - 0.4 * eased;
  }

  // Calculate next card's animation state (if in overlap zone)
  const showNextCard = cardProgress >= overlapStart && currentCardIndex < totalCards - 1;
  let nextRotateY = 90;
  let nextTranslateX = 40;
  let nextScale = 0.9;
  let nextGlow = 0.6;

  if (showNextCard) {
    // Map overlap zone (0.60-1.0) to entry animation (0-0.75 of entry)
    const overlapProgress = (cardProgress - overlapStart) / (1 - overlapStart);
    const entryProgress = overlapProgress * 0.75; // Partial entry during overlap
    const eased = easeOutQuint(entryProgress);
    nextRotateY = 90 * (1 - eased);
    nextTranslateX = 40 * (1 - eased);
    nextScale = 0.9 + 0.1 * eased;
    nextGlow = 0.6 + 0.4 * eased;
  }

  return (
    <div 
      className="mt-10 w-full flex justify-center relative"
      style={{ perspective: '1000px', minHeight: '160px' }}
    >
      {/* Current card (exiting or centered) */}
      <CardFace
        cardIndex={currentCardIndex}
        rotateY={currentRotateY}
        translateX={currentTranslateX}
        scale={currentScale}
        glowIntensity={currentGlow}
      />

      {/* Next card (entering during overlap) */}
      {showNextCard && (
        <CardFace
          cardIndex={currentCardIndex + 1}
          rotateY={nextRotateY}
          translateX={nextTranslateX}
          scale={nextScale}
          glowIntensity={nextGlow}
        />
      )}
    </div>
  );
};

export default MobileStepCard;
