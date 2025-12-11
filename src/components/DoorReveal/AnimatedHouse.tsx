import React from 'react';

interface AnimatedHouseProps {
  doorAngle: number; // 0-75 degrees
  lightIntensity: number; // 0-1
}

const AnimatedHouse: React.FC<AnimatedHouseProps> = ({ doorAngle, lightIntensity }) => {
  return (
    <svg
      viewBox="0 0 400 280"
      className="w-full relative z-10"
      style={{
        filter: 'drop-shadow(0 0 40px hsl(168 80% 45% / 0.15))',
      }}
    >
      <defs>
        {/* Wall gradient */}
        <linearGradient id="wallGradientComplete" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 40% 15%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(168 30% 8%)" stopOpacity="0.5" />
        </linearGradient>
        
        {/* Completed roof gradient - rich teal to slate */}
        <linearGradient id="completedRoofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 35% 28%)" />
          <stop offset="50%" stopColor="hsl(168 30% 22%)" />
          <stop offset="100%" stopColor="hsl(168 25% 16%)" />
        </linearGradient>
        
        {/* Window glass */}
        <linearGradient id="windowGlassComplete" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(200 60% 30%)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="hsl(200 50% 20%)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(200 40% 12%)" stopOpacity="0.85" />
        </linearGradient>
        
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
        
        {/* Window glow filter */}
        <filter id="windowGlowComplete" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Interior glow filter */}
        <filter id="interiorGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* House walls */}
      <g className="walls">
        <path
          d="M50 160 L50 265 L350 265 L350 160"
          fill="url(#wallGradientComplete)"
          stroke="hsl(168 60% 40%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px hsl(168 80% 40% / 0.2))' }}
        />
        
        {/* Ground line */}
        <line
          x1="30" y1="265" x2="370" y2="265"
          stroke="hsl(168 80% 45%)"
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 10px hsl(168 80% 45% / 0.5))' }}
        />
        
        {/* Interior warm glow visible through doorway */}
        <rect
          x="177.5"
          y="195"
          width="45"
          height="70"
          fill="url(#interiorGlow)"
          filter="url(#interiorGlowFilter)"
          style={{
            opacity: lightIntensity * 0.9,
          }}
        />
        
        {/* Door frame */}
        <rect
          x="175"
          y="193"
          width="50"
          height="74"
          fill="none"
          stroke="hsl(25 40% 35%)"
          strokeWidth="3"
          rx="1"
        />
        
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
          {/* Door panels */}
          <rect x="182" y="200" width="16" height="25" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          <rect x="202" y="200" width="16" height="25" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          <rect x="182" y="232" width="16" height="28" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          <rect x="202" y="232" width="16" height="28" fill="none" stroke="hsl(25 35% 35%)" strokeWidth="1" rx="1" />
          {/* Door handle */}
          <circle cx="214.5" cy="235" r="2.5" fill="hsl(32 80% 50%)" />
        </g>
        
        {/* Left window */}
        <g className="window-left" filter="url(#windowGlowComplete)">
          <rect x="90" y="180" width="60" height="50" fill="hsl(168 80% 50%)" opacity="0.08" rx="2" />
          <rect x="92.5" y="182.5" width="55" height="45" fill="none" stroke="hsl(168 70% 55%)" strokeWidth="2.5" rx="1.5" />
          <rect x="95" y="185" width="50" height="40" fill="url(#windowGlassComplete)" rx="1" />
          <line x1="120" y1="185" x2="120" y2="225" stroke="hsl(168 60% 50%)" strokeWidth="1.5" />
          <line x1="95" y1="198.3" x2="145" y2="198.3" stroke="hsl(168 60% 50%)" strokeWidth="1" />
          <line x1="95" y1="211.6" x2="145" y2="211.6" stroke="hsl(168 60% 50%)" strokeWidth="1" />
          <rect x="90" y="227.5" width="60" height="4" fill="hsl(168 35% 20%)" rx="0.5" />
          <line x1="90" y1="227.5" x2="150" y2="227.5" stroke="hsl(168 60% 50%)" strokeWidth="1.5" />
        </g>

        {/* Right window */}
        <g className="window-right" filter="url(#windowGlowComplete)">
          <rect x="250" y="180" width="60" height="50" fill="hsl(168 80% 50%)" opacity="0.08" rx="2" />
          <rect x="252.5" y="182.5" width="55" height="45" fill="none" stroke="hsl(168 70% 55%)" strokeWidth="2.5" rx="1.5" />
          <rect x="255" y="185" width="50" height="40" fill="url(#windowGlassComplete)" rx="1" />
          <line x1="280" y1="185" x2="280" y2="225" stroke="hsl(168 60% 50%)" strokeWidth="1.5" />
          <line x1="255" y1="198.3" x2="305" y2="198.3" stroke="hsl(168 60% 50%)" strokeWidth="1" />
          <line x1="255" y1="211.6" x2="305" y2="211.6" stroke="hsl(168 60% 50%)" strokeWidth="1" />
          <rect x="250" y="227.5" width="60" height="4" fill="hsl(168 35% 20%)" rx="0.5" />
          <line x1="250" y1="227.5" x2="310" y2="227.5" stroke="hsl(168 60% 50%)" strokeWidth="1.5" />
        </g>
      </g>

      {/* Completed roof with shingles */}
      <g className="completed-roof">
        <path
          d="M40 160 L200 55 L360 160 Z"
          fill="url(#completedRoofGradient)"
          stroke="hsl(168 50% 40%)"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0 0 20px hsl(168 60% 40% / 0.3))',
          }}
        />
        
        {/* Shingle texture lines */}
        <g opacity="0.3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={`shingle-left-${i}`}
              x1={60 + i * 23}
              y1={153 - i * 16}
              x2={200 - (5 - i) * 5}
              y2={60 + i * 3}
              stroke="hsl(168 40% 35%)"
              strokeWidth="0.5"
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={`shingle-right-${i}`}
              x1={340 - i * 23}
              y1={153 - i * 16}
              x2={200 + (5 - i) * 5}
              y2={60 + i * 3}
              stroke="hsl(168 40% 35%)"
              strokeWidth="0.5"
            />
          ))}
        </g>
        
        {/* Ridge cap */}
        <line
          x1="200" y1="55" x2="200" y2="62"
          stroke="hsl(168 60% 45%)"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px hsl(168 70% 50% / 0.5))' }}
        />
      </g>
    </svg>
  );
};

export default AnimatedHouse;
