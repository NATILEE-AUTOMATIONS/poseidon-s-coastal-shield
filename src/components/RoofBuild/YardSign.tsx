import React from 'react';
import poseidonLogo from '@/assets/poseidon-logo.png';

interface YardSignProps {
  truckProgress: number;
  truckStartProgress: number;
  truckEndProgress: number;
  isMobile?: boolean;
}

// easeInOutQuad for smooth drop animation (same as roofing materials)
const easeInOutQuad = (x: number): number => {
  return x < 0.5 
    ? 2 * x * x 
    : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

const YardSign: React.FC<YardSignProps> = ({ truckProgress, truckStartProgress, truckEndProgress, isMobile }) => {
  if (isMobile) return null;
  
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

  const easedDrop = easeInOutQuad(dropProgress);
  const translateY = -150 * (1 - easedDrop); // Drops from -150 to 0

  // Calculate entry opacity (fades in from 0.4 to 1 like materials)
  let entryOpacity = 1;
  if (dropProgress < 1) {
    entryOpacity = 0.4 + 0.6 * easedDrop;
  }

  // No fade out - just hide before drop starts
  let opacity = entryOpacity;
  if (truckProgress < dropStart) {
    opacity = 0;
  }

  if (opacity <= 0) return null;

  return (
    <g
      className="yard-sign-layer"
      style={{
        opacity,
        transform: `translate(245px, ${290 + translateY}px)`,
      }}
    >
      {/* Sign post */}
      <rect
        x="32"
        y="0"
        width="6"
        height="40"
        fill="hsl(160 25% 20%)"
        stroke="hsl(160 30% 30%)"
        strokeWidth="0.5"
      />
      
      {/* Sign board background */}
      <rect
        x="0"
        y="-42"
        width="72"
        height="46"
        rx="3"
        fill="hsl(160 30% 8%)"
        stroke="hsl(174 62% 38%)"
        strokeWidth="1.5"
        style={{
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
        }}
      />
      
      {/* Logo container */}
      <foreignObject x="2" y="-40" width="68" height="42">
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
              maxWidth: '100px', 
              maxHeight: '60px', 
              objectFit: 'contain' 
            }}
          />
        </div>
      </foreignObject>
    </g>
  );
};

export default YardSign;
