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
  
  // Calculate timing windows for each card
  const getCardWindow = (cardIndex: number) => {
    if (cardIndex === 0) {
      // Intro card
      const end = layers[0]?.start || 0.15;
      return { start: 0, center: end / 2, end };
    }
    const layerIndex = cardIndex - 1;
    if (layerIndex < layers.length) {
      const layer = layers[layerIndex];
      return { 
        start: layer.start, 
        center: (layer.start + layer.end) / 2,
        end: layer.end 
      };
    }
    return { start: 1, center: 1, end: 1 };
  };

  // Premium easing function for smooth deceleration
  const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
  const easeInQuart = (x: number): number => x * x * x * x;

  // Calculate 3D transform state for each card
  const getCardState = (cardIndex: number) => {
    const window = getCardWindow(cardIndex);
    const prevWindow = cardIndex > 0 ? getCardWindow(cardIndex - 1) : null;
    const nextWindow = cardIndex < cardCount - 1 ? getCardWindow(cardIndex + 1) : null;
    
    // Transition zones
    const enterStart = prevWindow ? prevWindow.center : window.start - 0.08;
    const enterEnd = window.start + (window.end - window.start) * 0.15;
    const exitStart = window.end - (window.end - window.start) * 0.15;
    const exitEnd = nextWindow ? nextWindow.center : window.end + 0.08;
    
    let rotateY = -120; // Hidden: rotated away to the right
    let translateX = 80; // Off to the right
    let translateZ = -200; // Pushed back
    let opacity = 0;
    let scale = 0.85;
    
    if (progress < enterStart) {
      // Before entering: hidden to the right
      rotateY = -120;
      translateX = 100;
      translateZ = -250;
      opacity = 0;
      scale = 0.8;
    } else if (progress >= enterStart && progress < enterEnd) {
      // Entering: spin in from right with depth
      const t = (progress - enterStart) / (enterEnd - enterStart);
      const eased = easeOutQuart(t);
      
      rotateY = -120 + (120 * eased);
      translateX = 100 * (1 - eased);
      translateZ = -250 + (250 * eased);
      opacity = eased;
      scale = 0.8 + (0.2 * eased);
    } else if (progress >= enterEnd && progress < exitStart) {
      // Holding: fully visible, centered
      rotateY = 0;
      translateX = 0;
      translateZ = 0;
      opacity = 1;
      scale = 1;
    } else if (progress >= exitStart && progress < exitEnd) {
      // Exiting: spin out to left with depth
      const t = (progress - exitStart) / (exitEnd - exitStart);
      const eased = easeInQuart(t);
      
      rotateY = 120 * eased;
      translateX = -100 * eased;
      translateZ = -250 * eased;
      opacity = 1 - eased;
      scale = 1 - (0.2 * eased);
    } else {
      // After exiting: hidden to the left
      rotateY = 120;
      translateX = -100;
      translateZ = -250;
      opacity = 0;
      scale = 0.8;
    }
    
    return { rotateY, translateX, translateZ, opacity, scale };
  };

  return (
    <div 
      className="relative w-full mt-8"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        height: '160px',
      }}
    >
      {/* Ambient glow behind active card */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, hsl(168 70% 35% / 0.12), transparent 70%)',
        }}
      />
      
      {Array.from({ length: cardCount }).map((_, index) => {
        const { rotateY, translateX, translateZ, opacity, scale } = getCardState(index);
        
        // Skip rendering if completely hidden
        if (opacity < 0.01) return null;
        
        // Dynamic shadow based on rotation
        const shadowIntensity = 1 - Math.abs(rotateY) / 120;
        const shadowOffsetX = rotateY * 0.3;
        
        // Edge glow intensity based on facing direction
        const leftGlow = rotateY < 0 ? Math.abs(rotateY) / 120 : 0;
        const rightGlow = rotateY > 0 ? rotateY / 120 : 0;
        
        return (
          <div
            key={index}
            className="absolute left-1/2 -ml-[44vw]"
            style={{
              width: '88vw',
              maxWidth: '360px',
              height: '140px',
              transform: `
                translateX(${translateX}px) 
                translateZ(${translateZ}px) 
                rotateY(${rotateY}deg)
                scale(${scale})
              `,
              opacity,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity',
              filter: `drop-shadow(${shadowOffsetX}px 8px ${20 + shadowIntensity * 20}px hsl(0 0% 0% / ${0.3 + shadowIntensity * 0.3}))`,
            }}
          >
            {/* Card body */}
            <div 
              className="relative w-full h-full rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(
                  135deg, 
                  hsl(180 25% 12% / 0.98) 0%, 
                  hsl(180 20% 8% / 0.99) 50%,
                  hsl(180 15% 6% / 1) 100%
                )`,
                border: '1px solid hsl(168 60% 40% / 0.25)',
                boxShadow: `
                  inset 0 1px 0 hsl(168 70% 60% / 0.15),
                  inset 0 -1px 0 hsl(0 0% 0% / 0.3),
                  0 0 30px hsl(168 70% 45% / ${0.1 * shadowIntensity}),
                  0 0 60px hsl(168 70% 45% / ${0.05 * shadowIntensity})
                `,
              }}
            >
              {/* Left edge highlight (visible when rotating in) */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{
                  background: `linear-gradient(
                    180deg,
                    hsl(168 80% 55% / ${0.6 * leftGlow}) 0%,
                    hsl(168 70% 45% / ${0.3 * leftGlow}) 50%,
                    hsl(168 80% 55% / ${0.6 * leftGlow}) 100%
                  )`,
                  boxShadow: leftGlow > 0.1 ? `0 0 20px hsl(168 80% 50% / ${0.4 * leftGlow})` : 'none',
                }}
              />
              
              {/* Right edge highlight (visible when rotating out) */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl"
                style={{
                  background: `linear-gradient(
                    180deg,
                    hsl(30 80% 55% / ${0.6 * rightGlow}) 0%,
                    hsl(25 70% 45% / ${0.3 * rightGlow}) 50%,
                    hsl(30 80% 55% / ${0.6 * rightGlow}) 100%
                  )`,
                  boxShadow: rightGlow > 0.1 ? `0 0 20px hsl(30 80% 50% / ${0.4 * rightGlow})` : 'none',
                }}
              />
              
              {/* Subtle top shine */}
              <div 
                className="absolute inset-x-4 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    hsl(168 70% 60% / ${0.3 * shadowIntensity}) 30%, 
                    hsl(168 70% 70% / ${0.5 * shadowIntensity}) 50%, 
                    hsl(168 70% 60% / ${0.3 * shadowIntensity}) 70%, 
                    transparent 100%
                  )`,
                }}
              />
              
              {/* Content area - blank for now */}
              <div className="w-full h-full flex items-center justify-center p-6">
                <span 
                  className="text-sm font-mono tracking-widest"
                  style={{ 
                    color: `hsl(168 50% ${45 + shadowIntensity * 15}% / ${0.4 + shadowIntensity * 0.3})`,
                    textShadow: shadowIntensity > 0.5 ? '0 0 20px hsl(168 70% 50% / 0.3)' : 'none',
                  }}
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
