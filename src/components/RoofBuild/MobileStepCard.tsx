import React, { useEffect, useState, useRef } from 'react';
import { materialInfo } from './RoofLayers';

interface MobileStepCardProps {
  currentStep: number;
  isVisible: boolean;
}

type AnimationPhase = 'idle' | 'exiting' | 'entering';

const MobileStepCard: React.FC<MobileStepCardProps> = ({ currentStep, isVisible }) => {
  const [displayedStep, setDisplayedStep] = useState(currentStep);
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    if (currentStep !== prevStepRef.current) {
      // Start exit animation
      setPhase('exiting');
      
      const exitTimer = setTimeout(() => {
        setDisplayedStep(currentStep);
        setPhase('entering');
        
        const enterTimer = setTimeout(() => {
          setPhase('idle');
        }, 600);
        
        return () => clearTimeout(enterTimer);
      }, 250);

      prevStepRef.current = currentStep;
      return () => clearTimeout(exitTimer);
    }
  }, [currentStep]);

  const material = materialInfo[displayedStep];
  if (!material) return null;

  return (
    <div 
      className={`w-full mt-6 xl:hidden transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* Cinematic Card Container */}
      <div className="step-card-v2">
        {/* Animated border glow */}
        <div className="step-card-border-glow" />
        
        {/* Scanline overlay for cyberpunk effect */}
        <div className="step-card-scanlines" />
        
        {/* Corner accents */}
        <div className="step-corner step-corner-tl" />
        <div className="step-corner step-corner-tr" />
        <div className="step-corner step-corner-bl" />
        <div className="step-corner step-corner-br" />
        
        {/* Main content */}
        <div className="relative z-10 p-6">
          {/* Step Number - Massive with breathing glow */}
          <div 
            className={`step-num-massive ${
              phase === 'exiting' ? 'step-num-exit' : 
              phase === 'entering' ? 'step-num-enter' : ''
            }`}
          >
            <span className="step-num-text">
              {String(displayedStep + 1).padStart(2, '0')}
            </span>
            <span className="step-num-ghost">
              {String(displayedStep + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Title - Bold slide animation */}
          <h3 
            className={`step-title-cinematic ${
              phase === 'exiting' ? 'step-title-exit' : 
              phase === 'entering' ? 'step-title-enter' : ''
            }`}
          >
            {material.name}
          </h3>
          
          {/* Animated gradient divider */}
          <div 
            className={`step-divider-line ${
              phase === 'entering' ? 'step-divider-draw' : ''
            }`}
          />
          
          {/* Description - Float up animation */}
          <p 
            className={`step-desc-cinematic ${
              phase === 'exiting' ? 'step-desc-exit' : 
              phase === 'entering' ? 'step-desc-enter' : ''
            }`}
          >
            {material.description}
          </p>
          
          {/* Segment Progress Bar */}
          <div className="step-progress-bar">
            {materialInfo.map((_, index) => (
              <div
                key={index}
                className={`step-progress-segment ${
                  index === displayedStep 
                    ? 'step-segment-active' 
                    : index < displayedStep 
                      ? 'step-segment-complete' 
                      : 'step-segment-upcoming'
                }`}
              >
                {/* Active segment glow ring */}
                {index === displayedStep && (
                  <div className="step-segment-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileStepCard;
