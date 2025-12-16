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
  
  // Find active card based on progress
  const getActiveCard = (): number => {
    // Intro card before first layer
    if (progress < (layers[0]?.start || 0.15)) {
      return 0;
    }
    
    // Check each layer
    for (let i = 0; i < layers.length; i++) {
      if (progress >= layers[i].start && progress < layers[i].end) {
        return i + 1;
      }
    }
    
    // After all layers, show last card
    return cardCount - 1;
  };

  const activeCard = getActiveCard();

  return (
    <div className="relative w-full mt-8" style={{ height: '140px' }}>
      {Array.from({ length: cardCount }).map((_, index) => {
        const isActive = index === activeCard;
        
        if (!isActive) return null;
        
        return (
          <div
            key={index}
            className="absolute inset-x-0 mx-auto"
            style={{
              width: '88vw',
              maxWidth: '360px',
              height: '140px',
            }}
          >
            <div 
              className="w-full h-full rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, hsl(180 25% 12% / 0.98), hsl(180 15% 6% / 1))',
                border: '1px solid hsl(168 60% 40% / 0.25)',
                boxShadow: `
                  inset 0 1px 0 hsl(168 70% 60% / 0.15),
                  0 0 30px hsl(168 70% 45% / 0.1),
                  0 8px 32px hsl(0 0% 0% / 0.4)
                `,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span 
                  className="text-sm font-mono tracking-widest"
                  style={{ color: 'hsl(168 50% 55% / 0.5)' }}
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
