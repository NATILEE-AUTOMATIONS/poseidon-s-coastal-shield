import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileStepCardProps {
  progress: number;
  layerStart: number;
  layerStep: number;
}

// Easing functions for smooth physics-like animations
const easeOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const easeInBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * x * x * x - c1 * x * x;
};

const MobileStepCard: React.FC<MobileStepCardProps> = ({ 
  progress, 
  layerStart, 
  layerStep 
}) => {
  // Calculate which card should be visible and its animation state
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
  const cardStart = layerStart + (activeCardIndex * layerStep);
  const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / layerStep));
  
  // Animation phases within each card's scroll window
  const entryEnd = 0.2;      // 0-20% = entry spin
  const centerEnd = 0.8;     // 20-80% = centered/stable
  // 80-100% = exit spin
  
  let rotateY = 0;
  let translateX = 0;
  let scale = 1;
  let opacity = 1;
  let glowIntensity = 1;
  
  if (cardProgress < entryEnd) {
    // Entry: spin in from right
    const t = cardProgress / entryEnd;
    const eased = easeOutBack(Math.min(1, t));
    rotateY = 75 * (1 - eased);
    translateX = 100 * (1 - eased);
    scale = 0.85 + (0.15 * eased);
    opacity = 0.3 + (0.7 * eased);
    glowIntensity = 0.4 + (0.6 * eased);
  } else if (cardProgress < centerEnd) {
    // Center: perfectly still
    rotateY = 0;
    translateX = 0;
    scale = 1;
    opacity = 1;
    glowIntensity = 1;
  } else {
    // Exit: spin out to left
    const t = (cardProgress - centerEnd) / (1 - centerEnd);
    const eased = easeInBack(Math.min(1, t));
    rotateY = -75 * eased;
    translateX = -100 * eased;
    scale = 1 - (0.15 * eased);
    opacity = 1 - (0.7 * eased);
    glowIntensity = 1 - (0.6 * eased);
  }
  
  const material = materialInfo[activeCardIndex];
  
  return (
    <div 
      className="mt-10 w-full flex justify-center px-3"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative px-8 py-6 rounded-2xl w-full max-w-md overflow-hidden"
        style={{
          transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          opacity,
          background: 'radial-gradient(circle at 0% 0%, hsl(168 80% 22% / 0.35), transparent 55%), radial-gradient(circle at 100% 100%, hsl(30 80% 35% / 0.4), transparent 60%), hsl(160 25% 6%)',
          borderRadius: '1.25rem',
          boxShadow: [
            `0 0 ${40 * glowIntensity}px hsl(168 70% 40% / ${0.3 * glowIntensity})`,
            `0 18px 60px hsl(0 0% 0% / 0.8)`
          ].join(', '),
          border: '1px solid hsl(168 50% 30% / 0.6)',
          willChange: 'transform, opacity',
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
            {activeCardIndex + 1}.
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

export default MobileStepCard;
