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
  const cardStart = layerStart + activeCardIndex * layerStep;
  const rawCardProgress = (progress - cardStart) / layerStep;
  const cardProgress = Math.max(0, Math.min(1, rawCardProgress));

  // 3D flip animation: card flips in from horizontal, stays, flips out
  // 0-30%: flip in from 90° to 0°, 30-70%: fully visible, 70-100%: flip out 0° to -90°
  const entryEnd = 0.30;
  const exitStart = 0.70;

  let rotateX = 0;
  let scale = 1;
  let opacity = 1;
  let glowIntensity = 1;

  if (cardProgress <= entryEnd) {
    // Flip in from horizontal (90° = laying flat facing up)
    const t = cardProgress / entryEnd;
    const eased = easeOutQuint(Math.min(1, t));
    rotateX = 90 * (1 - eased); // 90° → 0°
    scale = 0.85 + 0.15 * eased;
    opacity = 0.3 + 0.7 * eased; // slight fade to help the 3D illusion
    glowIntensity = 0.5 + 0.5 * eased;
  } else if (cardProgress >= exitStart) {
    // Flip out to horizontal (0° → -90° = laying flat facing down)
    const t = (cardProgress - exitStart) / (1 - exitStart);
    const eased = easeInQuint(Math.min(1, t));
    rotateX = -90 * eased; // 0° → -90°
    scale = 1 - 0.15 * eased;
    opacity = 1 - 0.7 * eased;
    glowIntensity = 1 - 0.5 * eased;
  } else {
    // Comfortable center window - card faces user
    rotateX = 0;
    scale = 1;
    opacity = 1;
    glowIntensity = 1;
  }

  const material = materialInfo[activeCardIndex];
  
  return (
    <div 
      className="mt-10 w-full flex justify-center px-3"
      style={{ perspective: '800px' }}
    >
      <div
        className="relative px-8 py-6 rounded-2xl w-full max-w-md overflow-hidden"
        style={{
          transform: `rotateX(${rotateX}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          opacity,
          background: 'radial-gradient(circle at 0% 0%, hsl(168 80% 22% / 0.35), transparent 55%), radial-gradient(circle at 100% 100%, hsl(30 80% 35% / 0.4), transparent 60%), hsl(160 25% 6%)',
          borderRadius: '1.25rem',
          boxShadow: [
            `0 0 ${40 * glowIntensity}px hsl(168 70% 40% / ${0.3 * glowIntensity})`,
            `0 ${18 + rotateX * 0.3}px ${60 + Math.abs(rotateX) * 0.5}px hsl(0 0% 0% / 0.8)`
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
