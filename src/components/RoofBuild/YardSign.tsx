import React from 'react';
import poseidonLogo from '@/assets/poseidon-logo.png';

interface YardSignProps {
  progress: number;
  isMobile?: boolean;
}

// easeInOutQuad for smooth drop animation (same as roofing materials)
const easeInOutQuad = (x: number): number => {
  return x < 0.5 
    ? 2 * x * x 
    : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

const YardSign: React.FC<YardSignProps> = ({ progress, isMobile }) => {
  // Animation timing - after underlayment finishes on mobile (~0.82), desktop unchanged
  const dropStart = isMobile ? 0.85 : 0.78;
  const dropEnd = isMobile ? 0.92 : 0.82;
  // No fade out - sign stays visible until zoom takes over

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

  // No fade out - just hide before drop starts
  let opacity = entryOpacity;
  if (progress < dropStart) {
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
      <foreignObject x="2" y="-36" width="68" height="40">
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
              maxWidth: '64px', 
              maxHeight: '38px', 
              objectFit: 'contain' 
            }}
          />
        </div>
      </foreignObject>
    </g>
  );
};

export default YardSign;
