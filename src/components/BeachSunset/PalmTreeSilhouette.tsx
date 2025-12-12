import React from 'react';

interface PalmTreeSilhouetteProps {
  progress: number; // 0-1
  side?: 'left' | 'right';
}

const PalmTreeSilhouette: React.FC<PalmTreeSilhouetteProps> = ({ progress, side = 'left' }) => {
  // Drop-in animation like the yard sign
  const easeInOutQuad = (x: number) => 
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  
  const dropProgress = Math.min(1, progress * 2); // Complete by 50%
  const easedDrop = easeInOutQuad(dropProgress);
  
  // Subtle sway once settled
  const swayAmount = dropProgress >= 1 ? Math.sin(Date.now() / 1500) * 2 : 0;
  
  const isLeft = side === 'left';
  
  return (
    <div 
      className="absolute bottom-[18%]"
      style={{
        [isLeft ? 'left' : 'right']: '8%',
        opacity: progress > 0 ? Math.min(1, progress * 3) : 0,
        transform: `
          translateY(${(1 - easedDrop) * -150}px) 
          ${isLeft ? '' : 'scaleX(-1)'}
          rotate(${swayAmount}deg)
        `,
        transformOrigin: 'bottom center',
        transition: 'opacity 0.3s ease-out',
        willChange: 'transform',
      }}
    >
      <svg 
        width="120" 
        height="200" 
        viewBox="0 0 120 200"
        className="drop-shadow-2xl"
      >
        {/* Palm trunk - curved and organic */}
        <path
          d="M60 200 
             Q55 170 58 140
             Q62 110 55 80
             Q50 60 60 40"
          fill="none"
          stroke="hsl(20 30% 10%)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Trunk texture lines */}
        {[45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175].map((y, i) => (
          <ellipse
            key={i}
            cx={58 + Math.sin(y * 0.1) * 2}
            cy={200 - y * 1.1}
            rx="5"
            ry="1.5"
            fill="none"
            stroke="hsl(25 25% 18%)"
            strokeWidth="1"
            opacity={0.6}
          />
        ))}
        
        {/* Palm fronds - logo-inspired spread pattern */}
        <g transform="translate(60, 35)">
          {/* Center frond (top) */}
          <path
            d="M0 0 Q5 -25 0 -50 Q-5 -25 0 0"
            fill="hsl(140 35% 12%)"
            stroke="hsl(140 30% 8%)"
            strokeWidth="1"
          />
          
          {/* Left fronds */}
          <path
            d="M0 0 Q-20 -20 -45 -35 Q-20 -15 0 0"
            fill="hsl(135 35% 13%)"
            stroke="hsl(135 30% 8%)"
            strokeWidth="1"
          />
          <path
            d="M0 0 Q-25 -10 -55 -15 Q-25 -5 0 0"
            fill="hsl(130 35% 12%)"
            stroke="hsl(130 30% 8%)"
            strokeWidth="1"
          />
          <path
            d="M0 0 Q-20 5 -50 15 Q-20 10 0 0"
            fill="hsl(125 35% 14%)"
            stroke="hsl(125 30% 8%)"
            strokeWidth="1"
          />
          
          {/* Right fronds */}
          <path
            d="M0 0 Q20 -20 45 -35 Q20 -15 0 0"
            fill="hsl(135 35% 13%)"
            stroke="hsl(135 30% 8%)"
            strokeWidth="1"
          />
          <path
            d="M0 0 Q25 -10 55 -15 Q25 -5 0 0"
            fill="hsl(130 35% 12%)"
            stroke="hsl(130 30% 8%)"
            strokeWidth="1"
          />
          <path
            d="M0 0 Q20 5 50 15 Q20 10 0 0"
            fill="hsl(125 35% 14%)"
            stroke="hsl(125 30% 8%)"
            strokeWidth="1"
          />
          
          {/* Drooping fronds */}
          <path
            d="M0 5 Q-15 15 -40 35 Q-15 20 0 5"
            fill="hsl(120 30% 11%)"
            stroke="hsl(120 25% 7%)"
            strokeWidth="1"
          />
          <path
            d="M0 5 Q15 15 40 35 Q15 20 0 5"
            fill="hsl(120 30% 11%)"
            stroke="hsl(120 25% 7%)"
            strokeWidth="1"
          />
        </g>
        
        {/* Coconuts cluster */}
        <g transform="translate(60, 42)">
          <circle cx="-5" cy="0" r="4" fill="hsl(25 35% 15%)" />
          <circle cx="5" cy="0" r="4" fill="hsl(25 35% 15%)" />
          <circle cx="0" cy="5" r="4" fill="hsl(25 30% 12%)" />
        </g>
      </svg>
    </div>
  );
};

export default PalmTreeSilhouette;
