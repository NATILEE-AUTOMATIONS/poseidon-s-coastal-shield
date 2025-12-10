import React from 'react';

interface HouseSVGProps {
  className?: string;
}

const HouseSVG: React.FC<HouseSVGProps> = ({ className = '' }) => {
  return (
    <g className={className}>
      {/* Definitions for gradients and filters */}
      <defs>
        <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 40% 15%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(168 30% 8%)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="roofDeckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 20% 12%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(168 15% 6%)" stopOpacity="0.95" />
        </linearGradient>
        {/* Premium window glass gradient */}
        <linearGradient id="windowGlassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(200 60% 30%)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="hsl(200 50% 20%)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(200 40% 12%)" stopOpacity="0.85" />
        </linearGradient>
        {/* Window glow filter */}
        <filter id="windowGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* House walls with gradient fill */}
      <g className="walls">
        {/* Combined walls - single path to avoid center line */}
        <path
          d="M50 160 L50 265 L350 265 L350 160"
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
        
        {/* ===== LEFT WINDOW (Premium 6-pane colonial) ===== */}
        <g className="window-left" filter="url(#windowGlow)">
          {/* Outer glow halo */}
          <rect
            x="90"
            y="180"
            width="60"
            height="50"
            fill="hsl(168 80% 50%)"
            opacity="0.08"
            rx="2"
          />
          {/* Window frame */}
          <rect
            x="92.5"
            y="182.5"
            width="55"
            height="45"
            fill="none"
            stroke="hsl(168 70% 55%)"
            strokeWidth="2.5"
            rx="1.5"
          />
          {/* Glass pane */}
          <rect
            x="95"
            y="185"
            width="50"
            height="40"
            fill="url(#windowGlassGradient)"
            rx="1"
          />
          {/* Warm interior light glow */}
          <ellipse cx="120" cy="205" rx="12" ry="10" fill="hsl(40 70% 55%)" opacity="0.12" />
          {/* 6-pane colonial grid (2 cols × 3 rows) */}
          {/* Vertical center mullion */}
          <line x1="120" y1="185" x2="120" y2="225" stroke="hsl(168 60% 50%)" strokeWidth="1.5" />
          {/* Horizontal mullions */}
          <line x1="95" y1="198.3" x2="145" y2="198.3" stroke="hsl(168 60% 50%)" strokeWidth="1" />
          <line x1="95" y1="211.6" x2="145" y2="211.6" stroke="hsl(168 60% 50%)" strokeWidth="1" />
          {/* Window sill */}
          <rect x="90" y="227.5" width="60" height="4" fill="hsl(168 35% 20%)" rx="0.5" />
          <line x1="90" y1="227.5" x2="150" y2="227.5" stroke="hsl(168 60% 50%)" strokeWidth="1.5" />
        </g>

        {/* ===== RIGHT WINDOW (Premium 6-pane colonial) ===== */}
        <g className="window-right" filter="url(#windowGlow)">
          {/* Outer glow halo */}
          <rect
            x="250"
            y="180"
            width="60"
            height="50"
            fill="hsl(168 80% 50%)"
            opacity="0.08"
            rx="2"
          />
          {/* Window frame */}
          <rect
            x="252.5"
            y="182.5"
            width="55"
            height="45"
            fill="none"
            stroke="hsl(168 70% 55%)"
            strokeWidth="2.5"
            rx="1.5"
          />
          {/* Glass pane */}
          <rect
            x="255"
            y="185"
            width="50"
            height="40"
            fill="url(#windowGlassGradient)"
            rx="1"
          />
          {/* Warm interior light glow */}
          <ellipse cx="280" cy="205" rx="12" ry="10" fill="hsl(40 70% 55%)" opacity="0.12" />
          {/* 6-pane colonial grid (2 cols × 3 rows) */}
          {/* Vertical center mullion */}
          <line x1="280" y1="185" x2="280" y2="225" stroke="hsl(168 60% 50%)" strokeWidth="1.5" />
          {/* Horizontal mullions */}
          <line x1="255" y1="198.3" x2="305" y2="198.3" stroke="hsl(168 60% 50%)" strokeWidth="1" />
          <line x1="255" y1="211.6" x2="305" y2="211.6" stroke="hsl(168 60% 50%)" strokeWidth="1" />
          {/* Window sill */}
          <rect x="250" y="227.5" width="60" height="4" fill="hsl(168 35% 20%)" rx="0.5" />
          <line x1="250" y1="227.5" x2="310" y2="227.5" stroke="hsl(168 60% 50%)" strokeWidth="1.5" />
        </g>
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
