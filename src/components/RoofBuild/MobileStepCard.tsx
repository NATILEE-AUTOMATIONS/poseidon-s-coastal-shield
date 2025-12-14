import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileStepCardProps {
  scrollProgress: number;
}

// Easing functions
const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const easeInQuad = (t: number): number => t * t;

const MobileStepCard: React.FC<MobileStepCardProps> = ({ scrollProgress }) => {
  // Animation runs from 8% to 90% scroll (82% total range, ~8.2% per step)
  const animationStart = 0.08;
  const animationEnd = 0.90;
  const totalRange = animationEnd - animationStart;
  const stepRange = totalRange / 10;

  // Calculate current step (0-9)
  const normalizedProgress = (scrollProgress - animationStart) / totalRange;
  const currentStep = Math.max(0, Math.min(9, Math.floor(normalizedProgress * 10)));

  // Calculate local progress within current step (0-1)
  const stepStart = animationStart + currentStep * stepRange;
  const localProgress = Math.max(0, Math.min(1, (scrollProgress - stepStart) / stepRange));

  const material = materialInfo[currentStep];
  if (!material) return null;

  // Animation phases
  const isMaterializing = localProgress < 0.25;
  const isPresenting = localProgress >= 0.25 && localProgress < 0.75;
  const isDematerializing = localProgress >= 0.75;

  // Calculate phase-specific progress (0-1 within each phase)
  let phaseProgress = 0;
  if (isMaterializing) {
    phaseProgress = localProgress / 0.25;
  } else if (isPresenting) {
    phaseProgress = (localProgress - 0.25) / 0.5;
  } else {
    phaseProgress = (localProgress - 0.75) / 0.25;
  }

  // Calculate transforms
  let scale = 1;
  let blur = 0;
  let rotateX = 0;
  let opacity = 1;
  let floatY = 0;

  if (isMaterializing) {
    const eased = easeOutBack(phaseProgress);
    scale = 0.6 + 0.4 * eased;
    blur = 12 * (1 - phaseProgress);
    rotateX = -5 * (1 - eased);
    opacity = phaseProgress;
  } else if (isPresenting) {
    // Subtle floating motion
    floatY = Math.sin(phaseProgress * Math.PI * 2) * 5;
    scale = 1;
    blur = 0;
    rotateX = 0;
    opacity = 1;
  } else if (isDematerializing) {
    const eased = easeInQuad(phaseProgress);
    scale = 1 - 0.15 * eased;
    blur = 8 * eased;
    rotateX = 5 * eased;
    opacity = 1 - eased;
  }

  // Circular progress arc calculation
  const circumference = 2 * Math.PI * 42; // radius 42
  const progressOffset = circumference - (localProgress * circumference);

  const cardStyle: React.CSSProperties = {
    transform: `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg) translateY(${floatY}px)`,
    filter: `blur(${blur}px)`,
    opacity,
    willChange: 'transform, filter, opacity',
  };

  return (
    <div className="xl:hidden fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="holo-card" style={cardStyle}>
        {/* Progress ring around step number */}
        <div className="holo-card-ring-container">
          <svg className="holo-card-ring" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="hsl(168 50% 20% / 0.3)"
              strokeWidth="3"
            />
            {/* Progress ring */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="hsl(168 70% 45%)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                filter: 'drop-shadow(0 0 6px hsl(168 70% 50% / 0.8))',
                transition: 'stroke-dashoffset 0.1s ease-out',
              }}
            />
          </svg>
          <div className="holo-card-number">
            {String(currentStep + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div className="holo-card-content">
          <h3 className="holo-card-title">{material.name}</h3>
          <p className="holo-card-desc">{material.description}</p>
        </div>

        {/* Progress dots */}
        <div className="holo-card-dots">
          {materialInfo.map((_, index) => (
            <div
              key={index}
              className={`holo-card-dot ${index === currentStep ? 'holo-card-dot-active' : ''} ${index < currentStep ? 'holo-card-dot-complete' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileStepCard;
