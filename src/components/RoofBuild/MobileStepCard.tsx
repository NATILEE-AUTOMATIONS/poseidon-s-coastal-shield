import React, { useEffect, useState } from 'react';
import { materialInfo } from './RoofLayers';

interface MobileStepCardProps {
  currentStep: number;
  isVisible: boolean;
}

const MobileStepCard: React.FC<MobileStepCardProps> = ({ currentStep, isVisible }) => {
  const [displayedStep, setDisplayedStep] = useState(currentStep);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentStep !== displayedStep) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayedStep(currentStep);
        setIsAnimating(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, displayedStep]);

  const material = materialInfo[displayedStep];
  if (!material) return null;

  return (
    <div 
      className={`w-full mt-6 xl:hidden transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* Main Card */}
      <div
        className={`step-card ${isAnimating ? 'step-card-exit' : 'step-card-enter'}`}
      >
        {/* Glow border effect */}
        <div className="absolute inset-0 rounded-2xl step-card-glow" />
        
        {/* Card content */}
        <div className="relative z-10 p-5">
          {/* Step number + name row */}
          <div className="flex items-start gap-4">
            {/* Large step number */}
            <div 
              className="step-number"
              style={{
                color: 'hsl(168 80% 55%)',
                textShadow: '0 0 30px hsl(168 80% 50% / 0.8), 0 0 60px hsl(168 80% 50% / 0.4)',
              }}
            >
              {String(displayedStep + 1).padStart(2, '0')}
            </div>
            
            {/* Name and description */}
            <div className="flex-1 pt-1">
              <h3 
                className="text-lg font-bold tracking-wide"
                style={{
                  color: 'hsl(0 0% 95%)',
                }}
              >
                {material.name}
              </h3>
              <p 
                className="text-sm mt-1.5 leading-relaxed"
                style={{
                  color: 'hsl(168 20% 65%)',
                }}
              >
                {material.description}
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {materialInfo.map((_, index) => (
              <div
                key={index}
                className={`step-dot ${
                  index === displayedStep 
                    ? 'step-dot-active' 
                    : index < displayedStep 
                      ? 'step-dot-complete' 
                      : 'step-dot-upcoming'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileStepCard;
