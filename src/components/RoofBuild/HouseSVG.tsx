import React from 'react';

interface HouseSVGProps {
  className?: string;
}

const HouseSVG: React.FC<HouseSVGProps> = ({ className = '' }) => {
  return (
    <g className={className}>
      {/* Definitions for gradients */}
      <defs>
        <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 40% 15%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(168 30% 8%)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="roofDeckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 20% 12%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(168 15% 6%)" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(200 50% 25%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(200 40% 15%)" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* House walls with gradient fill */}
      <g className="walls">
        {/* Left wall */}
        <path
          d="M50 160 L50 265 L175 265 L175 160"
          fill="url(#wallGradient)"
          stroke="hsl(168 60% 40%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px hsl(168 80% 40% / 0.2))' }}
        />
        {/* Right wall */}
        <path
          d="M175 160 L175 265 L350 265 L350 160"
          fill="url(#wallGradient)"
          stroke="hsl(168 60% 40%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px hsl(168 80% 40% / 0.2))' }}
        />
        
        {/* Ground line */}
        <line
          x1="30"
          y1="265"
          x2="370"
          y2="265"
          stroke="hsl(168 80% 45%)"
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 10px hsl(168 80% 45% / 0.5))' }}
        />
        
        {/* Door - centered at x=200 */}
        <rect
          x="177.5"
          y="195"
          width="45"
          height="70"
          fill="hsl(168 20% 10%)"
          stroke="hsl(168 60% 45%)"
          strokeWidth="1.5"
          rx="2"
        />
        <circle cx="214.5" cy="230" r="2" fill="hsl(32 80% 50%)" />
        
        {/* Windows with glow */}
        <rect
          x="70"
          y="190"
          width="45"
          height="35"
          fill="url(#windowGradient)"
          stroke="hsl(168 60% 50%)"
          strokeWidth="1.5"
          rx="1"
        />
        <line x1="92.5" y1="190" x2="92.5" y2="225" stroke="hsl(168 50% 40%)" strokeWidth="1" />
        <line x1="70" y1="207.5" x2="115" y2="207.5" stroke="hsl(168 50% 40%)" strokeWidth="1" />
        
        <rect
          x="250"
          y="190"
          width="45"
          height="35"
          fill="url(#windowGradient)"
          stroke="hsl(168 60% 50%)"
          strokeWidth="1.5"
          rx="1"
        />
        <line x1="272.5" y1="190" x2="272.5" y2="225" stroke="hsl(168 50% 40%)" strokeWidth="1" />
        <line x1="250" y1="207.5" x2="295" y2="207.5" stroke="hsl(168 50% 40%)" strokeWidth="1" />
      </g>

      {/* Roof deck (the bare structure) */}
      <g className="roof-deck">
        {/* Roof deck surface */}
        <path
          d="M40 160 L200 55 L360 160 Z"
          fill="url(#roofDeckGradient)"
          stroke="hsl(168 80% 50%)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0 0 15px hsl(168 80% 45% / 0.4))',
          }}
        />
        
        {/* Ridge beam highlight */}
        <line
          x1="200"
          y1="55"
          x2="200"
          y2="62"
          stroke="hsl(168 80% 55%)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px hsl(168 80% 50% / 0.8))' }}
        />
        
        {/* Subtle deck texture lines */}
        <g opacity="0.15">
          <line x1="80" y1="145" x2="200" y2="75" stroke="hsl(168 60% 50%)" strokeWidth="0.5" />
          <line x1="120" y1="140" x2="200" y2="80" stroke="hsl(168 60% 50%)" strokeWidth="0.5" />
          <line x1="160" y1="132" x2="200" y2="85" stroke="hsl(168 60% 50%)" strokeWidth="0.5" />
          <line x1="200" y1="75" x2="320" y2="145" stroke="hsl(168 60% 50%)" strokeWidth="0.5" />
          <line x1="200" y1="80" x2="280" y2="140" stroke="hsl(168 60% 50%)" strokeWidth="0.5" />
          <line x1="200" y1="85" x2="240" y2="132" stroke="hsl(168 60% 50%)" strokeWidth="0.5" />
        </g>
      </g>

      {/* Label for roof deck */}
      <g className="roof-deck-label" opacity="0.5">
        <text
          x="200"
          y="120"
          textAnchor="middle"
          fill="hsl(168 70% 55%)"
          fontSize="11"
          fontFamily="system-ui, sans-serif"
          fontWeight="500"
          letterSpacing="0.1em"
        >
          ROOF DECK
        </text>
      </g>
    </g>
  );
};

export default HouseSVG;
