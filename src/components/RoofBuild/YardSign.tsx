import React from 'react';
import poseidonLogo from '@/assets/poseidon-logo.png';

interface YardSignProps {
  progress: number;
}

// easeOutBounce for satisfying drop animation
const easeOutBounce = (x: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
};

const YardSign: React.FC<YardSignProps> = ({ progress }) => {
  // Animation timing
  const dropStart = 0.78;
  const dropEnd = 0.82;
  const fadeStart = 0.86;
  const fadeEnd = 0.88;

  // Calculate drop animation (enters from above)
  let dropProgress = 0;
  if (progress >= dropStart && progress < dropEnd) {
    dropProgress = (progress - dropStart) / (dropEnd - dropStart);
  } else if (progress >= dropEnd) {
    dropProgress = 1;
  }

  const easedDrop = easeOutBounce(dropProgress);
  const translateY = -80 * (1 - easedDrop); // Drops from -80 to 0

  // Calculate fade out
  let opacity = 1;
  if (progress < dropStart) {
    opacity = 0;
  } else if (progress >= fadeStart && progress < fadeEnd) {
    opacity = 1 - (progress - fadeStart) / (fadeEnd - fadeStart);
  } else if (progress >= fadeEnd) {
    opacity = 0;
  }

  if (opacity <= 0) return null;

  return (
    <g
      transform="translate(320, 265)"
      style={{
        opacity,
        transform: `translate(320px, ${265 + translateY}px)`,
      }}
    >
      {/* Sign post */}
      <rect
        x="22"
        y="0"
        width="4"
        height="45"
        fill="hsl(160 25% 20%)"
        stroke="hsl(160 30% 30%)"
        strokeWidth="0.5"
      />
      
      {/* Sign board background */}
      <rect
        x="0"
        y="-25"
        width="48"
        height="28"
        rx="2"
        fill="hsl(160 30% 8%)"
        stroke="hsl(174 62% 38%)"
        strokeWidth="1"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
        }}
      />
      
      {/* Logo container */}
      <foreignObject x="4" y="-22" width="40" height="22">
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
              maxWidth: '36px', 
              maxHeight: '18px', 
              objectFit: 'contain' 
            }} 
          />
        </div>
      </foreignObject>
    </g>
  );
};

export default YardSign;
