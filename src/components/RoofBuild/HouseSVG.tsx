// Cache bust: 2025-01-14T12:00:00Z - Pipe boots and vents removed
import React from 'react';
import DoorwayGrid from './DoorwayGrid';

interface HouseSVGProps {
  className?: string;
  doorAngle?: number; // 0-75 degrees
  lightBoost?: number; // 0-1 additional light intensity during zoom
  outlineOpacity?: number; // 0-1 for fading out roof/ground lines
}

const HouseSVG: React.FC<HouseSVGProps> = ({ className = '', doorAngle = 0, lightBoost = 0, outlineOpacity = 1 }) => {
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
        
        {/* Ground line - fades out during door animation */}
        <line
          x1="30"
          y1="265"
          x2="370"
          y2="265"
          stroke="hsl(168 80% 45%)"
          strokeWidth="2"
          opacity={outlineOpacity}
          style={{ filter: 'drop-shadow(0 0 10px hsl(168 80% 45% / 0.5))' }}
        />
        
        {/* Doorway portal grid - replaces flat orange glow */}
        <DoorwayGrid lightIntensity={lightIntensity} lightBoost={lightBoost} />
        
        {/* Animated door - 3D swing from left hinge */}
        <g
          style={{
            transformOrigin: '177.5px 230px', // Left edge of door (hinge point)
            transform: `perspective(800px) rotateY(-${doorAngle}deg)`,
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
          {/* Door panels - 4 panel colonial style (2x2 grid) */}
          {/* Top left panel */}
          <rect x="182" y="200" width="16" height="22" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          {/* Top right panel */}
          <rect x="202" y="200" width="16" height="22" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          {/* Bottom left panel */}
          <rect x="182" y="227" width="16" height="33" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          {/* Bottom right panel */}
          <rect x="202" y="227" width="16" height="33" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          {/* Door knob */}
          <circle cx="214.5" cy="237" r="2" fill="hsl(32 80% 50%)" />
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

      {/* Roof structure - clean minimal framing */}
      <g className="roof-deck">
        {/* Roof deck surface - dark background */}
        <path
          d="M40 160 L200 55 L360 160 Z"
          fill="url(#roofDeckGradient)"
          stroke="hsl(168 80% 50%)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity={outlineOpacity}
          style={{
            filter: 'drop-shadow(0 0 15px hsl(168 80% 45% / 0.4))',
          }}
        />
        
        {/* Simple interior framing lines - fade out during door animation */}
        {/* Left slope rafter lines */}
        <line x1="80" y1="160" x2="200" y2="55" stroke="hsl(168 50% 35%)" strokeWidth="2" opacity={0.4 * outlineOpacity} />
        <line x1="140" y1="160" x2="200" y2="55" stroke="hsl(168 50% 35%)" strokeWidth="2" opacity={0.4 * outlineOpacity} />
        
        {/* Right slope rafter lines */}
        <line x1="320" y1="160" x2="200" y2="55" stroke="hsl(168 50% 35%)" strokeWidth="2" opacity={0.4 * outlineOpacity} />
        <line x1="260" y1="160" x2="200" y2="55" stroke="hsl(168 50% 35%)" strokeWidth="2" opacity={0.4 * outlineOpacity} />
        
        {/* Single collar tie */}
        <line x1="100" y1="120" x2="300" y2="120" stroke="hsl(168 50% 40%)" strokeWidth="2.5" opacity={0.5 * outlineOpacity} />
      </g>

      {/* ===== PREMIUM CHIMNEY (Left side of roof) ===== */}
      <g className="chimney">
        {/* Chimney gradients */}
        <defs>
          <linearGradient id="chimneyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(168 30% 12%)" />
            <stop offset="35%" stopColor="hsl(168 35% 18%)" />
            <stop offset="65%" stopColor="hsl(168 35% 18%)" />
            <stop offset="100%" stopColor="hsl(168 25% 10%)" />
          </linearGradient>
          <linearGradient id="chimneyCapGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(168 30% 15%)" />
            <stop offset="100%" stopColor="hsl(168 40% 25%)" />
          </linearGradient>
          <linearGradient id="flashingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(168 50% 35%)" />
            <stop offset="100%" stopColor="hsl(168 40% 20%)" />
          </linearGradient>
          {/* Chimney glow filter */}
          <filter id="chimneyGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Chimney body - angled bottom to match roof slope */}
        {/* Roof slope: from (40,160) to (200,55), at x=105, y ≈ 117 */}
        <path
          d="M88 50 L122 50 L122 117 L88 130 Z"
          fill="url(#chimneyGradient)"
          stroke="hsl(168 70% 45%)"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 12px hsl(168 80% 40% / 0.35))' }}
        />
        
        {/* Left side highlight edge */}
        <line
          x1="88"
          y1="50"
          x2="88"
          y2="130"
          stroke="hsl(168 80% 55%)"
          strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 6px hsl(168 80% 50% / 0.6))' }}
        />
        
        {/* Brick texture - horizontal mortar lines */}
        <g opacity="0.25">
          <line x1="88" y1="60" x2="122" y2="60" stroke="hsl(168 50% 40%)" strokeWidth="0.75" />
          <line x1="88" y1="72" x2="122" y2="72" stroke="hsl(168 50% 40%)" strokeWidth="0.75" />
          <line x1="88" y1="84" x2="122" y2="84" stroke="hsl(168 50% 40%)" strokeWidth="0.75" />
          <line x1="88" y1="96" x2="122" y2="96" stroke="hsl(168 50% 40%)" strokeWidth="0.75" />
          <line x1="88" y1="108" x2="122" y2="108" stroke="hsl(168 50% 40%)" strokeWidth="0.75" />
          {/* Vertical brick offsets */}
          <line x1="105" y1="50" x2="105" y2="60" stroke="hsl(168 50% 35%)" strokeWidth="0.5" />
          <line x1="96" y1="60" x2="96" y2="72" stroke="hsl(168 50% 35%)" strokeWidth="0.5" />
          <line x1="114" y1="60" x2="114" y2="72" stroke="hsl(168 50% 35%)" strokeWidth="0.5" />
          <line x1="105" y1="72" x2="105" y2="84" stroke="hsl(168 50% 35%)" strokeWidth="0.5" />
          <line x1="96" y1="84" x2="96" y2="96" stroke="hsl(168 50% 35%)" strokeWidth="0.5" />
          <line x1="114" y1="84" x2="114" y2="96" stroke="hsl(168 50% 35%)" strokeWidth="0.5" />
          <line x1="105" y1="96" x2="105" y2="108" stroke="hsl(168 50% 35%)" strokeWidth="0.5" />
        </g>

        
        {/* Chimney crown (top cap) */}
        <rect
          x="84"
          y="46"
          width="42"
          height="6"
          fill="url(#chimneyCapGradient)"
          stroke="hsl(168 80% 55%)"
          strokeWidth="1.5"
          rx="1"
          style={{ filter: 'drop-shadow(0 0 10px hsl(168 80% 50% / 0.5))' }}
        />
        
        {/* Crown ledge detail */}
        <rect
          x="86"
          y="44"
          width="38"
          height="3"
          fill="hsl(168 35% 22%)"
          stroke="hsl(168 70% 50%)"
          strokeWidth="1"
          rx="0.5"
        />
        
        {/* Flue opening (dark interior) */}
        <rect
          x="92"
          y="44"
          width="26"
          height="2.5"
          fill="hsl(0 0% 3%)"
          rx="0.5"
        />
        
        {/* Flue liner rim glow */}
        <rect
          x="92"
          y="44"
          width="26"
          height="2.5"
          fill="none"
          stroke="hsl(168 60% 40%)"
          strokeWidth="0.5"
          rx="0.5"
          opacity="0.5"
        />
        
        {/* Subtle smoke wisps */}
        <g opacity="0.08" filter="url(#chimneyGlow)">
          <path
            d="M100 40 Q96 28 102 18 Q97 8 104 -5"
            fill="none"
            stroke="hsl(0 0% 80%)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M110 38 Q115 25 108 15 Q114 5 107 -8"
            fill="none"
            stroke="hsl(0 0% 80%)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
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
