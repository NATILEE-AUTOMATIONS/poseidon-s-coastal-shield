import React from 'react';
import poseidonLogo from '@/assets/poseidon-logo.png';

interface YardSignProps {
  truckProgress: number;
  truckStartProgress: number;
  truckEndProgress: number;
  isMobile?: boolean;
}

// easeOutBack for smooth drop with subtle bounce
const easeOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

// easeOutQuint for smooth position animation
const easeOutQuint = (x: number): number => {
  return 1 - Math.pow(1 - x, 5);
};

const YardSign: React.FC<YardSignProps> = ({ truckProgress, truckStartProgress, truckEndProgress, isMobile }) => {
  const truckDuration = truckEndProgress - truckStartProgress;
  // Drop in after palm trees (they start at 0.70)
  const dropStart = truckStartProgress + (truckDuration * 0.75);
  const dropEnd = truckStartProgress + (truckDuration * 0.92);

  // Calculate drop animation (enters from above)
  let dropProgress = 0;
  if (truckProgress >= dropStart && truckProgress < dropEnd) {
    dropProgress = (truckProgress - dropStart) / (dropEnd - dropStart);
  } else if (truckProgress >= dropEnd) {
    dropProgress = 1;
  }

  // Use easeOutQuint for position, easeOutBack for subtle bounce on scale
  const easedPosition = easeOutQuint(dropProgress);
  const easedScale = easeOutBack(dropProgress);
  const translateY = -100 * (1 - easedPosition); // Shorter, smoother drop

  // Smooth fade in with easing
  const fadeIn = easeOutQuint(Math.min(1, dropProgress * 1.5));
  
  // No fade out - just hide before drop starts
  let opacity = fadeIn;
  if (truckProgress < dropStart) {
    opacity = 0;
  }
  
  // Add subtle scale bounce effect
  const bounceScale = 0.95 + (easedScale * 0.05);

  if (opacity <= 0) return null;

  // Mobile-specific positioning and scale - DRAMATICALLY bigger sign on mobile
  const signX = isMobile ? 120 : 245;
  const signY = isMobile ? 160 : 290;
  const signScale = isMobile ? 3.5 : 1;
  
  // Sign dimensions - MUCH bigger on mobile
  const boardWidth = isMobile ? 150 : 72;
  const boardHeight = isMobile ? 100 : 46;
  const postX = isMobile ? 68 : 32;
  const postWidth = isMobile ? 14 : 6;
  const postHeight = isMobile ? 70 : 40;

  return (
    <g
      className="yard-sign-layer"
      style={{ opacity }}
      transform={`translate(${signX}, ${signY + translateY}) scale(${signScale * bounceScale})`}
    >
      {/* Sign post */}
      <rect
        x={postX}
        y="0"
        width={postWidth}
        height={postHeight}
        fill="hsl(160 25% 20%)"
        stroke="hsl(160 30% 30%)"
        strokeWidth="0.5"
      />
      
      {/* Sign board background */}
      <rect
        x="0"
        y={-boardHeight + 4}
        width={boardWidth}
        height={boardHeight}
        rx="4"
        fill="hsl(160 30% 8%)"
        stroke="hsl(174 62% 38%)"
        strokeWidth={isMobile ? 2 : 1.5}
        style={{
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
        }}
      />
      
      {/* Logo container */}
      <foreignObject x="2" y={-boardHeight + 6} width={boardWidth - 4} height={boardHeight - 4}>
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <img 
            src={poseidonLogo} 
            alt="Poseidon Roofing" 
            style={{ 
              maxWidth: isMobile ? '200px' : '100px', 
              maxHeight: isMobile ? '120px' : '60px', 
              objectFit: 'contain' 
            }}
          />
        </div>
      </foreignObject>
    </g>
  );
};

export default YardSign;
