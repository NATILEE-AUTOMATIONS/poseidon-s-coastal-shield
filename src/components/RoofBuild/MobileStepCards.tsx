import React from 'react';

interface Layer {
  start: number;
  end: number;
}

interface MobileStepCardsProps {
  progress: number;
  layers: Layer[];
}

const MobileStepCards: React.FC<MobileStepCardsProps> = ({ progress, layers }) => {
  // 11 cards: intro + 10 layers
  const cardCount = 11;
  
  // Calculate timing for each card
  const getCardTiming = (cardIndex: number) => {
    if (cardIndex === 0) {
      // Intro card: visible from 0% to first layer start
      return { start: 0, end: layers[0]?.start || 0.15 };
    }
    // Layer cards: synced with their layer
    const layerIndex = cardIndex - 1;
    if (layerIndex < layers.length) {
      return { start: layers[layerIndex].start, end: layers[layerIndex].end };
    }
    return { start: 1, end: 1 };
  };

  // Calculate card animation state
  const getCardState = (cardIndex: number) => {
    const timing = getCardTiming(cardIndex);
    const nextTiming = cardIndex < cardCount - 1 ? getCardTiming(cardIndex + 1) : { start: 1, end: 1 };
    
    // Transition duration as percentage of scroll
    const transitionDuration = 0.04;
    
    // Calculate phases
    const enterStart = timing.start - transitionDuration;
    const enterEnd = timing.start;
    const exitStart = nextTiming.start - transitionDuration;
    const exitEnd = nextTiming.start;
    
    let rotateY = -90; // Default: hidden to the right
    let opacity = 0;
    let translateX = 50; // Start from right
    
    if (progress < enterStart) {
      // Before entering: hidden to the right
      rotateY = -90;
      opacity = 0;
      translateX = 50;
    } else if (progress >= enterStart && progress < enterEnd) {
      // Entering: spin in from right
      const enterProgress = (progress - enterStart) / transitionDuration;
      const eased = easeOutBack(enterProgress);
      rotateY = -90 + (90 * eased);
      opacity = enterProgress;
      translateX = 50 * (1 - eased);
    } else if (progress >= enterEnd && progress < exitStart) {
      // Holding: fully visible
      rotateY = 0;
      opacity = 1;
      translateX = 0;
    } else if (progress >= exitStart && progress < exitEnd) {
      // Exiting: spin out to left
      const exitProgress = (progress - exitStart) / transitionDuration;
      const eased = easeInBack(exitProgress);
      rotateY = 90 * eased;
      opacity = 1 - exitProgress;
      translateX = -50 * eased;
    } else {
      // After exiting: hidden to the left
      rotateY = 90;
      opacity = 0;
      translateX = -50;
    }
    
    return { rotateY, opacity, translateX };
  };

  // Easing functions
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

  return (
    <div 
      className="relative w-full mt-6"
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
        height: '140px'
      }}
    >
      {Array.from({ length: cardCount }).map((_, index) => {
        const { rotateY, opacity, translateX } = getCardState(index);
        
        // Skip rendering if completely hidden
        if (opacity < 0.01) return null;
        
        return (
          <div
            key={index}
            className="absolute inset-x-0 mx-auto"
            style={{
              width: '85vw',
              maxWidth: '340px',
              height: '120px',
              transform: `translateX(${translateX}px) rotateY(${rotateY}deg)`,
              opacity,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity'
            }}
          >
            {/* Card content - blank for now */}
            <div 
              className="w-full h-full rounded-xl"
              style={{
                background: 'linear-gradient(135deg, hsl(180 20% 10% / 0.95), hsl(180 15% 6% / 0.98))',
                border: '1px solid hsl(168 70% 45% / 0.3)',
                boxShadow: `
                  0 0 20px hsl(168 70% 45% / 0.15),
                  0 0 40px hsl(168 70% 45% / 0.08),
                  0 8px 32px hsl(0 0% 0% / 0.4),
                  inset 0 1px 0 hsl(168 70% 60% / 0.1)
                `,
                backdropFilter: 'blur(12px)'
              }}
            >
              {/* Placeholder for future content */}
              <div className="w-full h-full flex items-center justify-center">
                <span 
                  className="text-xs font-mono"
                  style={{ color: 'hsl(168 70% 45% / 0.3)' }}
                >
                  {index === 0 ? 'INTRO' : `STEP ${index}`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileStepCards;
