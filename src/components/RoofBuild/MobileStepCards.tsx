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
  
  // Calculate the center point for each card (when it should be facing forward)
  const getCardCenter = (cardIndex: number): number => {
    if (cardIndex === 0) {
      // Intro card centered between 0 and first layer start
      return (layers[0]?.start || 0.15) / 2;
    }
    const layerIndex = cardIndex - 1;
    if (layerIndex < layers.length) {
      // Center of the layer's duration
      return (layers[layerIndex].start + layers[layerIndex].end) / 2;
    }
    return 1;
  };

  // Calculate continuous rotation based on scroll position
  const getCardRotation = (cardIndex: number): { rotateY: number; opacity: number; zIndex: number } => {
    const center = getCardCenter(cardIndex);
    
    // How much scroll distance for a full 180° rotation (90° in, 90° out)
    const rotationWindow = 0.12; // Wider window = slower rotation
    
    // Distance from center (-1 to 1 range within window)
    const distanceFromCenter = (progress - center) / rotationWindow;
    
    // Clamp to -1...1 range
    const clampedDistance = Math.max(-1, Math.min(1, distanceFromCenter));
    
    // Convert to rotation: -1 = -90° (coming in), 0 = 0° (facing), 1 = 90° (going out)
    const rotateY = clampedDistance * 90;
    
    // Opacity based on how close to center (facing forward = full opacity)
    // Use cosine for smooth falloff
    const normalizedAngle = Math.abs(rotateY) / 90; // 0 to 1
    const opacity = Math.cos(normalizedAngle * Math.PI / 2); // 1 at center, 0 at edges
    
    // Z-index: cards closer to center should be on top
    const zIndex = Math.round((1 - Math.abs(clampedDistance)) * 10);
    
    return { rotateY, opacity, zIndex };
  };

  return (
    <div 
      className="relative w-full mt-6"
      style={{
        perspective: '800px',
        perspectiveOrigin: '50% 50%',
        height: '140px'
      }}
    >
      {Array.from({ length: cardCount }).map((_, index) => {
        const { rotateY, opacity, zIndex } = getCardRotation(index);
        
        // Skip rendering if too far rotated (optimization)
        if (Math.abs(rotateY) > 88) return null;
        
        return (
          <div
            key={index}
            className="absolute inset-x-0 mx-auto"
            style={{
              width: '85vw',
              maxWidth: '340px',
              height: '120px',
              transform: `rotateY(${rotateY}deg)`,
              opacity,
              zIndex,
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
