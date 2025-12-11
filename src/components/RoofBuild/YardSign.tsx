import React from 'react';
import poseidonLogo from '@/assets/poseidon-logo.png';

interface YardSignProps {
  progress: number;
}

// easeInOutQuad for smooth drop animation (same as roofing materials)
const easeInOutQuad = (x: number): number => {
  return x < 0.5 
    ? 2 * x * x 
    : 1 - Math.pow(-2 * x + 2, 2) / 2;
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

  const easedDrop = easeInOutQuad(dropProgress);
  const translateY = -150 * (1 - easedDrop); // Drops from -150 to 0

  // Calculate entry opacity (fades in from 0.4 to 1 like materials)
  let entryOpacity = 1;
  if (dropProgress < 1) {
    entryOpacity = 0.4 + 0.6 * easedDrop;
  }

  // Calculate fade out
  let opacity = entryOpacity;
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
        x="32"
        y="0"
        width="6"
        height="60"
        fill="hsl(160 25% 20%)"
        stroke="hsl(160 30% 30%)"
        strokeWidth="0.5"
      />
      
      {/* Sign board background */}
      <rect
        x="0"
        y="-38"
        width="72"
        height="42"
        rx="3"
        fill="hsl(160 30% 8%)"
        stroke="hsl(174 62% 38%)"
        strokeWidth="1.5"
        style={{
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
        }}
      />
      
      {/* Logo container */}
      <foreignObject x="4" y="-34" width="64" height="36">
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
              maxWidth: '56px', 
              maxHeight: '30px', 
              objectFit: 'contain' 
            }} 
          />
        </div>
      </foreignObject>
    </g>
  );
};

export default YardSign;
