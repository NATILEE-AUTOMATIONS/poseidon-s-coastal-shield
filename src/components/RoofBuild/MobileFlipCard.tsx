import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileFlipCardProps {
  scrollProgress: number;
}

const MobileFlipCard: React.FC<MobileFlipCardProps> = ({ scrollProgress }) => {
  // Animation runs from 8% to 90% scroll
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

  // Animation phases: flip in (0-20%), hold (20-80%), flip out (80-100%)
  const isFlippingIn = localProgress < 0.20;
  const isHolding = localProgress >= 0.20 && localProgress < 0.80;
  const isFlippingOut = localProgress >= 0.80;

  // Calculate rotation and opacity
  let rotateY = 0;
  let opacity = 1;
  let scale = 1;

  if (isFlippingIn) {
    // Flip in from left: -90deg to 0deg
    const t = localProgress / 0.20;
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    rotateY = -90 * (1 - eased);
    opacity = t;
    scale = 0.9 + 0.1 * eased;
  } else if (isHolding) {
    // Subtle float animation
    const holdProgress = (localProgress - 0.20) / 0.60;
    rotateY = Math.sin(holdProgress * Math.PI * 2) * 2; // Gentle wobble
    opacity = 1;
    scale = 1;
  } else if (isFlippingOut) {
    // Flip out to right: 0deg to 90deg
    const t = (localProgress - 0.80) / 0.20;
    const eased = t * t; // easeInQuad
    rotateY = 90 * eased;
    opacity = 1 - eased;
    scale = 1 - 0.1 * eased;
  }

  return (
    <div 
      className="md:hidden absolute -bottom-6 left-0 right-0 flex justify-center pointer-events-none"
      style={{ 
        perspective: '1000px',
        zIndex: 5, // Behind the house
      }}
    >
      <div
        className="relative"
        style={{
          transform: `rotateY(${rotateY}deg) scale(${scale})`,
          opacity,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        {/* The Card */}
        <div 
          className="relative px-6 py-4 rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(160 30% 8% / 0.95) 0%, hsl(160 25% 5% / 0.98) 100%)',
            border: '1px solid hsl(168 50% 35% / 0.5)',
            boxShadow: `
              0 0 30px hsl(168 70% 45% / 0.25),
              0 10px 40px hsl(0 0% 0% / 0.5),
              inset 0 1px 0 hsl(168 50% 50% / 0.15)
            `,
            minWidth: '240px',
          }}
        >
          {/* Glowing edge accent */}
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(168 80% 55%), transparent)',
            }}
          />
          
          {/* Content Row */}
          <div className="flex items-center gap-4">
            {/* Step Number */}
            <div 
              className="text-3xl font-light font-mono"
              style={{
                color: 'hsl(168 80% 55%)',
                textShadow: '0 0 20px hsl(168 80% 50% / 0.8), 0 0 40px hsl(168 70% 45% / 0.4)',
                minWidth: '48px',
              }}
            >
              {String(currentStep + 1).padStart(2, '0')}
            </div>
            
            {/* Vertical Divider */}
            <div 
              className="w-px h-10 rounded-full"
              style={{
                background: 'linear-gradient(180deg, transparent, hsl(168 60% 45% / 0.6), transparent)',
              }}
            />
            
            {/* Material Info */}
            <div className="flex flex-col">
              <span 
                className="text-base font-semibold tracking-wide"
                style={{ color: 'hsl(0 0% 95%)' }}
              >
                {material.name}
              </span>
              <span 
                className="text-xs mt-0.5 opacity-70"
                style={{ color: 'hsl(168 30% 65%)' }}
              >
                Step {currentStep + 1} of 10
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'hsl(168 20% 15%)' }}>
            <div 
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${((currentStep + localProgress) / 10) * 100}%`,
                background: 'linear-gradient(90deg, hsl(168 80% 45%), hsl(168 70% 55%))',
                boxShadow: '0 0 10px hsl(168 80% 50% / 0.6)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFlipCard;
