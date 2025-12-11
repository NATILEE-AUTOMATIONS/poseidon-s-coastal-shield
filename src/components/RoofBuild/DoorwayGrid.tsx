import React from 'react';

interface DoorwayGridProps {
  lightIntensity: number;
  lightBoost?: number;
}

const DoorwayGrid: React.FC<DoorwayGridProps> = ({ lightIntensity, lightBoost = 0 }) => {
  const totalIntensity = Math.min(1, lightIntensity + lightBoost * 0.5);
  
  // Door frame boundaries
  const doorLeft = 177.5;
  const doorRight = 222.5;
  const doorTop = 195;
  const doorBottom = 265;
  const doorWidth = doorRight - doorLeft;
  const doorHeight = doorBottom - doorTop;
  const centerX = doorLeft + doorWidth / 2;
  const centerY = doorTop + doorHeight * 0.35; // Vanishing point slightly above center
  
  // Generate concentric rings - 12 layers for smooth depth
  const rings = Array.from({ length: 12 }, (_, i) => {
    const progress = i / 11;
    const eased = Math.pow(progress, 1.5); // Ease toward center
    
    // Ring dimensions shrink toward center
    const insetX = eased * (doorWidth * 0.42);
    const insetY = eased * (doorHeight * 0.35);
    
    // Colors warm up toward center
    const hue = 28 + progress * 10; // 28 → 38
    const saturation = 45 + progress * 45; // 45% → 90%
    const lightness = 18 + progress * 50; // 18% → 68%
    
    // Stroke gets thinner toward center
    const strokeWidth = 1.8 - progress * 1.4;
    
    // Opacity builds toward center
    const opacity = (0.25 + progress * 0.65) * totalIntensity;
    
    return {
      x: doorLeft + insetX / 2,
      y: doorTop + insetY / 2,
      width: doorWidth - insetX,
      height: doorHeight - insetY,
      color: `hsl(${hue} ${saturation}% ${lightness}%)`,
      strokeWidth,
      opacity,
      rx: 1 + progress * 4,
      delay: i * 0.15,
    };
  });
  
  // Floating particles
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 8 + (i % 3) * 6;
    return {
      cx: centerX + Math.cos(angle) * radius * 0.4,
      cy: centerY + Math.sin(angle) * radius * 0.6 + 15,
      r: 0.5 + (i % 3) * 0.3,
      delay: i * 0.4,
      duration: 3 + (i % 3),
    };
  });
  
  return (
    <g className="doorway-grid">
      <defs>
        <clipPath id="doorwayClip">
          <rect x={doorLeft} y={doorTop} width={doorWidth} height={doorHeight} />
        </clipPath>
        
        {/* Deep ambient background */}
        <radialGradient id="portalAmbient" cx="50%" cy="20%" r="90%">
          <stop offset="0%" stopColor="hsl(32 60% 22%)" />
          <stop offset="40%" stopColor="hsl(28 50% 12%)" />
          <stop offset="100%" stopColor="hsl(25 40% 5%)" />
        </radialGradient>
        
        {/* Central core glow */}
        <radialGradient id="portalCore" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="hsl(38 95% 65%)" stopOpacity="0.9" />
          <stop offset="30%" stopColor="hsl(35 90% 55%)" stopOpacity="0.5" />
          <stop offset="60%" stopColor="hsl(32 80% 40%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        
        {/* Glow filter for rings */}
        <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Intense core filter */}
        <filter id="coreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Edge vignettes */}
        <linearGradient id="vignetteLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(25 35% 4%)" stopOpacity="1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vignetteRight" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(25 35% 4%)" stopOpacity="1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vignetteBottom" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(25 35% 4%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Base ambient background */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth}
        height={doorHeight}
        fill="url(#portalAmbient)"
        opacity={totalIntensity}
        clipPath="url(#doorwayClip)"
      />
      
      {/* Central glowing core */}
      <ellipse
        cx={centerX}
        cy={centerY}
        rx={doorWidth * 0.35}
        ry={doorHeight * 0.25}
        fill="url(#portalCore)"
        opacity={totalIntensity * 0.9}
        filter="url(#coreGlow)"
        clipPath="url(#doorwayClip)"
      />
      
      {/* Concentric rings - outer to inner */}
      {rings.map((ring, i) => (
        <rect
          key={i}
          x={ring.x}
          y={ring.y}
          width={ring.width}
          height={ring.height}
          fill="none"
          stroke={ring.color}
          strokeWidth={ring.strokeWidth}
          rx={ring.rx}
          opacity={ring.opacity}
          filter="url(#ringGlow)"
          clipPath="url(#doorwayClip)"
          style={{
            animation: `portal-ring-pulse 2.5s ease-in-out infinite`,
            animationDelay: `${ring.delay}s`,
          }}
        />
      ))}
      
      {/* Bright horizon line at vanishing point */}
      <line
        x1={doorLeft + doorWidth * 0.15}
        y1={centerY}
        x2={doorRight - doorWidth * 0.15}
        y2={centerY}
        stroke="hsl(38 95% 70%)"
        strokeWidth="1.5"
        opacity={totalIntensity * 0.8}
        filter="url(#coreGlow)"
        clipPath="url(#doorwayClip)"
        style={{
          animation: 'portal-horizon-glow 3s ease-in-out infinite',
        }}
      />
      
      {/* Floating dust particles */}
      {particles.map((p, i) => (
        <circle
          key={`particle-${i}`}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="hsl(35 90% 70%)"
          opacity={totalIntensity * 0.6}
          filter="url(#ringGlow)"
          clipPath="url(#doorwayClip)"
          style={{
            animation: `portal-particle-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      
      {/* Edge vignettes for depth */}
      <rect
        x={doorLeft}
        y={doorTop}
        width={doorWidth * 0.25}
        height={doorHeight}
        fill="url(#vignetteLeft)"
        opacity={totalIntensity * 0.8}
        clipPath="url(#doorwayClip)"
      />
      <rect
        x={doorRight - doorWidth * 0.25}
        y={doorTop}
        width={doorWidth * 0.25}
        height={doorHeight}
        fill="url(#vignetteRight)"
        opacity={totalIntensity * 0.8}
        clipPath="url(#doorwayClip)"
      />
      <rect
        x={doorLeft}
        y={doorBottom - doorHeight * 0.3}
        width={doorWidth}
        height={doorHeight * 0.3}
        fill="url(#vignetteBottom)"
        opacity={totalIntensity * 0.6}
        clipPath="url(#doorwayClip)"
      />
    </g>
  );
};

export default DoorwayGrid;
