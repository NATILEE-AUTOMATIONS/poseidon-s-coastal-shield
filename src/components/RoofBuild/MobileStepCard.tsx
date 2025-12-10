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
      setPhase('exiting');
      
      const exitTimer = setTimeout(() => {
        setDisplayedStep(currentStep);
        setPhase('entering');
        
        const enterTimer = setTimeout(() => {
          setPhase('idle');
        }, 700);
        
        return () => clearTimeout(enterTimer);
      }, 250);

      prevStepRef.current = currentStep;
      return () => clearTimeout(exitTimer);
    }
  }, [currentStep]);

  const material = materialInfo[displayedStep];
  if (!material) return null;

  const progressPercent = ((displayedStep + 1) / materialInfo.length) * 100;

  return (
    <div 
      className={`w-full mt-8 xl:hidden transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* Minimal Theatre Card */}
      <div className="step-v3-card">
        {/* Left accent bar */}
        <div className="step-v3-accent" />
        
        {/* Content */}
        <div className="relative z-10 pl-6 pr-5 py-6">
          {/* Step Number - Giant, thin, clip-path reveal */}
          <div 
            className={`step-v3-number ${
              phase === 'exiting' ? 'step-v3-number-exit' : 
              phase === 'entering' ? 'step-v3-number-enter' : ''
            }`}
          >
            {String(displayedStep + 1).padStart(2, '0')}
          </div>
          
          {/* Title - Typewriter effect */}
          <h3 
            className={`step-v3-title ${
              phase === 'exiting' ? 'step-v3-title-exit' : 
              phase === 'entering' ? 'step-v3-title-enter' : ''
            }`}
            key={phase === 'entering' ? displayedStep : undefined}
          >
            <span className="step-v3-title-text">{material.name}</span>
            {phase === 'entering' && <span className="step-v3-cursor" />}
          </h3>
          
          {/* Divider - Line wipe */}
          <div 
            className={`step-v3-divider ${
              phase === 'entering' ? 'step-v3-divider-animate' : ''
            }`}
          />
          
          {/* Description - Blur in */}
          <p 
            className={`step-v3-desc ${
              phase === 'exiting' ? 'step-v3-desc-exit' : 
              phase === 'entering' ? 'step-v3-desc-enter' : ''
            }`}
          >
            {material.description}
          </p>
          
          {/* Linear Progress Bar */}
          <div className="step-v3-progress">
            <div className="step-v3-progress-track">
              <div 
                className="step-v3-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
              <div 
                className="step-v3-progress-glow"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
            <div className="step-v3-progress-label">
              <span className="step-v3-progress-current">{displayedStep + 1}</span>
              <span className="step-v3-progress-sep">/</span>
              <span className="step-v3-progress-total">{materialInfo.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileStepCard;
