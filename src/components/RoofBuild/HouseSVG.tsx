import React from 'react';

interface HouseSVGProps {
  className?: string;
}

const HouseSVG: React.FC<HouseSVGProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 280"
      className={`w-full max-w-2xl ${className}`}
      style={{
        filter: 'drop-shadow(0 0 20px hsl(168 80% 45% / 0.3))',
      }}
    >
      {/* House walls - lower opacity, just structure */}
      <g opacity="0.4">
        {/* Left wall */}
        <path
          d="M60 160 L60 260 L180 260 L180 160"
          fill="none"
          stroke="hsl(168 80% 45%)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Right wall */}
        <path
          d="M180 160 L180 260 L340 260 L340 160"
          fill="none"
          stroke="hsl(168 80% 45%)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Ground line */}
        <line
          x1="40"
          y1="260"
          x2="360"
          y2="260"
          stroke="hsl(168 80% 45%)"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Door */}
        <rect
          x="150"
          y="200"
          width="40"
          height="60"
          fill="none"
          stroke="hsl(168 80% 45%)"
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Windows */}
        <rect
          x="80"
          y="190"
          width="35"
          height="30"
          fill="none"
          stroke="hsl(168 80% 45%)"
          strokeWidth="1"
          opacity="0.6"
        />
        <rect
          x="250"
          y="190"
          width="35"
          height="30"
          fill="none"
          stroke="hsl(168 80% 45%)"
          strokeWidth="1"
          opacity="0.6"
        />
      </g>

      {/* Roof deck (the bare structure) - this is always visible */}
      <g className="roof-deck">
        {/* Main roof rafters/deck outline */}
        <path
          d="M40 160 L200 60 L360 160"
          fill="none"
          stroke="hsl(168 80% 50%)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 0 8px hsl(168 80% 45% / 0.5))',
          }}
        />
        
        {/* Roof deck surface (plywood) */}
        <path
          d="M50 160 L200 68 L350 160 Z"
          fill="hsl(168 30% 8% / 0.8)"
          stroke="hsl(168 80% 45% / 0.3)"
          strokeWidth="1"
        />
        
        {/* Rafters/trusses */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 80 + i * 48;
          const y1 = 160 - (i < 3 ? (i + 1) * 18 : (6 - i) * 18);
          return (
            <line
              key={i}
              x1={x}
              y1="160"
              x2={x}
              y2={y1}
              stroke="hsl(168 80% 45% / 0.25)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
        
        {/* Ridge beam */}
        <line
          x1="200"
          y1="60"
          x2="200"
          y2="68"
          stroke="hsl(168 80% 50%)"
          strokeWidth="3"
        />
      </g>

      {/* Labels for roof deck */}
      <g className="roof-deck-label" opacity="0.6">
        <text
          x="200"
          y="130"
          textAnchor="middle"
          fill="hsl(168 80% 60%)"
          fontSize="10"
          fontFamily="monospace"
        >
          ROOF DECK
        </text>
      </g>
    </svg>
  );
};

export default HouseSVG;
