import React from 'react';
import DoorwayGrid from './DoorwayGrid';

interface HouseSVGProps {
  className?: string;
  doorAngle?: number; // 0-75 degrees
  lightBoost?: number; // 0-1 additional light intensity during zoom
}

const HouseSVG: React.FC<HouseSVGProps> = ({ className = '', doorAngle = 0, lightBoost = 0 }) => {
  const baseLightIntensity = doorAngle / 75;
  const lightIntensity = Math.min(1, baseLightIntensity + (lightBoost * 0.5));
  
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
        {/* Door interior warm glow */}
        <linearGradient id="interiorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(32 90% 60%)" stopOpacity="0.9" />
          <stop offset="50%" stopColor="hsl(32 85% 50%)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(28 80% 40%)" stopOpacity="0.5" />
        </linearGradient>
        {/* Door wood gradient */}
        <linearGradient id="doorWood" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(25 40% 25%)" />
          <stop offset="50%" stopColor="hsl(25 45% 30%)" />
          <stop offset="100%" stopColor="hsl(25 35% 20%)" />
        </linearGradient>
        {/* Interior glow filter */}
        <filter id="interiorGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur" />
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
        
        {/* Doorway portal grid - replaces flat orange glow */}
        <DoorwayGrid lightIntensity={lightIntensity} lightBoost={lightBoost} />
        
        
        {/* Animated door with 3D perspective rotation */}
        <g
          style={{
            transformOrigin: '177.5px 230px',
            transform: `perspective(400px) rotateY(-${doorAngle}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <rect
            x="177.5"
            y="195"
            width="45"
            height="70"
            fill="url(#doorWood)"
            stroke="hsl(25 45% 40%)"
            strokeWidth="1.5"
            rx="2"
          />
          {/* Door panels - always visible */}
          <rect x="182" y="200" width="16" height="25" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          <rect x="202" y="200" width="16" height="25" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          <rect x="182" y="232" width="16" height="28" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          <rect x="202" y="232" width="16" height="28" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          <circle cx="214.5" cy="230" r="2" fill="hsl(32 80% 50%)" />
        </g>
        
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
      
      {/* Light rays from doorway */}
      {lightIntensity > 0 && (
        <g className="light-rays" style={{ opacity: lightIntensity }}>
          {/* Central warm glow */}
          <ellipse
            cx="200"
            cy="265"
            rx={30 + lightIntensity * 40}
            ry={10 + lightIntensity * 15}
            fill="hsl(32 90% 55%)"
            opacity={0.3 * lightIntensity}
            style={{ filter: 'blur(8px)' }}
          />
        </g>
      )}
    </g>
  );
};

export default HouseSVG;
