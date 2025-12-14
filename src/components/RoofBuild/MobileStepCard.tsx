import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileStepCardProps {
  currentStep: number;
  isVisible: boolean;
  scrollProgress?: number;
}

// Easing functions
const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const easeInQuad = (t: number): number => t * t;

const MobileStepCard: React.FC<MobileStepCardProps> = ({ currentStep, isVisible, scrollProgress = 0 }) => {
  const material = materialInfo[currentStep];
  if (!material || !isVisible) return null;

  // Calculate local progress within current step's animation window
  // Each step has 8.2% of scroll, starting at 8%
  const stepStart = 0.08 + currentStep * 0.082;
  const stepEnd = stepStart + 0.082;
  const localProgress = Math.max(0, Math.min(1, (scrollProgress - stepStart) / (stepEnd - stepStart)));

  // Determine animation phase
  const isEntering = localProgress < 0.33;
  const isHolding = localProgress >= 0.33 && localProgress < 0.66;
  const isExiting = localProgress >= 0.66;

  // Calculate phase-specific progress (0-1 within each phase)
  let phaseProgress = 0;
  if (isEntering) {
    phaseProgress = localProgress / 0.33;
  } else if (isHolding) {
    phaseProgress = (localProgress - 0.33) / 0.33;
  } else {
    phaseProgress = (localProgress - 0.66) / 0.34;
  }

  // Odd cards (0, 2, 4...) come from left, even cards (1, 3, 5...) come from right
  const isOddCard = currentStep % 2 === 0;

  // Calculate transforms based on phase
  let translateX = 0;
  let translateY = 0;
  let rotation = 0;
  let scale = 1;
  let opacity = 1;

  if (isEntering) {
    const easedProgress = easeOutBack(phaseProgress);
    const startX = isOddCard ? -60 : 60; // vw units
    const startY = -40; // vh units
    const startRotation = isOddCard ? -8 : 8;

    translateX = startX * (1 - easedProgress);
    translateY = startY * (1 - easedProgress);
    rotation = startRotation * (1 - easedProgress);
    scale = 0.8 + 0.2 * easedProgress;
    opacity = phaseProgress;
  } else if (isHolding) {
    // Subtle floating motion during hold
    const floatOffset = Math.sin(phaseProgress * Math.PI) * 3;
    translateY = floatOffset;
    scale = 1;
    opacity = 1;
  } else if (isExiting) {
    const easedProgress = easeInQuad(phaseProgress);
    const endX = isOddCard ? -60 : 60; // Same side as entry for consistent flow
    const endY = 40; // vh units - exits to bottom
    const endRotation = isOddCard ? -5 : 5;

    translateX = endX * easedProgress;
    translateY = endY * easedProgress;
    rotation = endRotation * easedProgress;
    scale = 1 - 0.15 * easedProgress;
    opacity = 1 - easedProgress;
  }

  const cardStyle: React.CSSProperties = {
    transform: `translateX(${translateX}vw) translateY(${translateY}vh) rotate(${rotation}deg) scale(${scale})`,
    opacity,
    willChange: 'transform, opacity',
  };

  return (
    <div className="xl:hidden fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div 
        className="swing-card"
        style={cardStyle}
      >
        {/* Step number - large teal accent */}
        <div className="swing-card-number">
          {String(currentStep + 1).padStart(2, '0')}
        </div>

        {/* Content */}
        <div className="swing-card-content">
          <h3 className="swing-card-title">{material.name}</h3>
          <p className="swing-card-desc">{material.description}</p>
        </div>

        {/* Progress dots */}
        <div className="swing-card-dots">
          {materialInfo.map((_, index) => (
            <div 
              key={index}
              className={`swing-card-dot ${index === currentStep ? 'swing-card-dot-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileStepCard;
