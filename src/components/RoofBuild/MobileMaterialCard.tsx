import React from 'react';
import { materialInfo } from './RoofLayers';

interface MobileMaterialCardProps {
  progress: number;
  layers: { start: number; end: number }[];
}

const MobileMaterialCard: React.FC<MobileMaterialCardProps> = ({ progress, layers }) => {
  const visibleMaterials = materialInfo.slice(0, 4);
  
  let activeIndex = -1;
  let localProgress = 0;
  
  for (let i = 0; i < 4; i++) {
    const layer = layers[i];
    if (progress >= layer.start && progress < layer.end) {
      activeIndex = i;
      localProgress = (progress - layer.start) / (layer.end - layer.start);
      break;
    }
  }
  
  if (activeIndex === -1) return null;
  
  const material = visibleMaterials[activeIndex];
  if (!material) return null;
  
  // Staggered timing for each element
  // Number: 0-15%
  // Line: 10-25%
  // Title: 15-35% (typewriter)
  // Description: 25-45%
  // Exit all: 80-100%
  
  const getElementProgress = (start: number, end: number) => {
    if (localProgress < start) return 0;
    if (localProgress > end) return 1;
    return (localProgress - start) / (end - start);
  };
  
  // Easing with slight overshoot for tactile feel
  const easeOutBack = (x: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };
  
  const easeOutQuint = (x: number) => 1 - Math.pow(1 - x, 5);
  const easeInQuint = (x: number) => Math.pow(x, 5);
  
  // Element animations
  const numberProgress = getElementProgress(0, 0.15);
  const lineProgress = getElementProgress(0.10, 0.25);
  const titleProgress = getElementProgress(0.15, 0.40);
  const descProgress = getElementProgress(0.30, 0.50);
  
  // Exit phase
  const isExiting = localProgress > 0.78;
  const exitProgress = isExiting ? easeInQuint((localProgress - 0.78) / 0.22) : 0;
  
  // Number animation - drops in with weight
  const numberEased = easeOutBack(numberProgress);
  const numberY = 25 * (1 - Math.min(1, numberEased));
  const numberOpacity = Math.min(1, numberProgress * 5) * (1 - exitProgress);
  const numberScale = 0.8 + (0.2 * easeOutQuint(numberProgress));
  
  // Line animation - wipes in from center
  const lineWidth = 50 * easeOutQuint(lineProgress);
  const lineOpacity = lineProgress * (1 - exitProgress);
  
  // Title - typewriter effect
  const titleChars = material.name.split('');
  const charsToShow = Math.floor(titleChars.length * easeOutQuint(titleProgress));
  const titleOpacity = 1 - exitProgress;
  
  // Description - fades up from blur
  const descEased = easeOutQuint(descProgress);
  const descOpacity = descEased * (1 - exitProgress);
  const descY = 12 * (1 - descEased);
  const descBlur = 6 * (1 - descEased);

  return (
    <div className="w-full flex justify-center px-6 mt-10">
      <div className="text-center">
        
        {/* Step number - drops in with weight */}
        <div
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '5rem',
            fontWeight: 200,
            lineHeight: 0.85,
            color: 'hsl(168 65% 48%)',
            textShadow: `
              0 0 25px hsl(168 80% 45% / ${0.5 + numberProgress * 0.3}),
              0 0 50px hsl(168 75% 40% / ${0.2 + numberProgress * 0.2})
            `,
            opacity: numberOpacity,
            transform: `translateY(${numberY}px) scale(${numberScale})`,
            willChange: 'transform, opacity',
          }}
        >
          {activeIndex + 1}
        </div>

        {/* Thin line - wipes from center */}
        <div 
          className="mx-auto mt-4 mb-5"
          style={{
            width: `${lineWidth}px`,
            height: '2px',
            background: 'hsl(168 55% 42%)',
            opacity: lineOpacity,
            boxShadow: '0 0 8px hsl(168 60% 45% / 0.5)',
          }}
        />

        {/* Material name - typewriter */}
        <div
          className="text-lg font-medium tracking-widest uppercase h-7"
          style={{
            color: 'hsl(0 0% 92%)',
            opacity: titleOpacity,
            letterSpacing: '0.2em',
          }}
        >
          {titleChars.map((char, i) => (
            <span
              key={i}
              style={{
                opacity: i < charsToShow ? 1 : 0,
                transition: 'opacity 0.05s',
              }}
            >
              {char}
            </span>
          ))}
          {/* Cursor */}
          {titleProgress > 0 && titleProgress < 1 && (
            <span
              style={{
                opacity: Math.sin(Date.now() / 150) > 0 ? 0.8 : 0,
                color: 'hsl(168 70% 55%)',
                marginLeft: '2px',
              }}
            >
              |
            </span>
          )}
        </div>
        
        {/* Description - fades up from blur */}
        <div
          className="text-sm mt-3 max-w-[280px] mx-auto"
          style={{ 
            color: 'hsl(168 8% 50%)',
            lineHeight: 1.6,
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
            filter: descBlur > 0.5 ? `blur(${descBlur}px)` : 'none',
            willChange: 'transform, opacity, filter',
          }}
        >
          {material.description}
        </div>
      </div>
    </div>
  );
};

export default MobileMaterialCard;
