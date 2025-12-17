interface DumpsterProps {
  progress: number;
  startProgress: number;
  endProgress: number;
}

const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);

const Dumpster: React.FC<DumpsterProps> = ({ progress, startProgress, endProgress }) => {
  // Calculate animation progress (0 to 1)
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const animProgress = Math.max(0, Math.min(1, rawProgress));
  
  // Don't render before animation starts
  if (progress < startProgress) return null;
  
  const easedProgress = easeOutQuint(animProgress);
  
  // Rise up from below
  const translateY = 60 * (1 - easedProgress);
  const opacity = Math.min(1, animProgress * 2); // Fade in faster
  
  // Fade out when door starts (around 70%)
  const fadeOutStart = 0.68;
  const fadeOutEnd = 0.75;
  const fadeOutProgress = progress > fadeOutStart 
    ? Math.min(1, (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart))
    : 0;
  const finalOpacity = opacity * (1 - fadeOutProgress);
  
  if (finalOpacity <= 0) return null;
  
  return (
    <g 
      className="dumpster-layer"
      style={{
        transform: `translateY(${translateY}px)`,
        opacity: finalOpacity,
      }}
    >
      <defs>
        {/* Dumpster body gradient */}
        <linearGradient id="dumpsterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(168 60% 25%)" />
          <stop offset="50%" stopColor="hsl(168 50% 18%)" />
          <stop offset="100%" stopColor="hsl(168 40% 12%)" />
        </linearGradient>
        
        {/* Side panel gradient */}
        <linearGradient id="dumpsterSideGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(168 50% 15%)" />
          <stop offset="100%" stopColor="hsl(168 60% 22%)" />
        </linearGradient>
        
        {/* Teal glow filter */}
        <filter id="dumpsterGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor="hsl(168 80% 50%)" floodOpacity="0.6" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Dumpster body - positioned in front yard area */}
      <g transform="translate(155, 220)">
        {/* Main container body - trapezoidal shape */}
        <path
          d="M 0 30 L 8 0 L 82 0 L 90 30 Z"
          fill="url(#dumpsterGradient)"
          stroke="hsl(168 70% 45%)"
          strokeWidth="1.5"
          style={{
            filter: 'drop-shadow(0 0 8px hsl(168 70% 45% / 0.5))',
          }}
        />
        
        {/* Horizontal ridges on body */}
        <line x1="5" y1="10" x2="85" y2="10" stroke="hsl(168 50% 30%)" strokeWidth="1" />
        <line x1="3" y1="20" x2="87" y2="20" stroke="hsl(168 50% 30%)" strokeWidth="1" />
        
        {/* Top rim */}
        <rect
          x="6"
          y="-3"
          width="78"
          height="5"
          fill="hsl(168 40% 20%)"
          stroke="hsl(168 70% 50%)"
          strokeWidth="1"
          style={{
            filter: 'drop-shadow(0 0 4px hsl(168 70% 50% / 0.6))',
          }}
        />
        
        {/* Side handles/hooks */}
        <rect x="-2" y="8" width="4" height="12" rx="1" fill="hsl(30 80% 50%)" 
          style={{ filter: 'drop-shadow(0 0 3px hsl(30 80% 50% / 0.8))' }} />
        <rect x="88" y="8" width="4" height="12" rx="1" fill="hsl(30 80% 50%)" 
          style={{ filter: 'drop-shadow(0 0 3px hsl(30 80% 50% / 0.8))' }} />
        
        {/* Wheels */}
        <circle cx="15" cy="32" r="4" fill="hsl(0 0% 15%)" stroke="hsl(168 50% 35%)" strokeWidth="1" />
        <circle cx="75" cy="32" r="4" fill="hsl(0 0% 15%)" stroke="hsl(168 50% 35%)" strokeWidth="1" />
        
        {/* "CLEAN UP" text on body */}
        <text
          x="45"
          y="18"
          textAnchor="middle"
          fill="hsl(168 90% 70%)"
          fontSize="7"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.5"
          style={{
            filter: 'drop-shadow(0 0 4px hsl(168 80% 50% / 0.8))',
          }}
        >
          CLEAN UP
        </text>
      </g>
      
      {/* Ground shadow */}
      <ellipse
        cx="200"
        cy="258"
        rx={35 * easedProgress}
        ry={4 * easedProgress}
        fill="hsl(0 0% 0% / 0.4)"
        style={{
          filter: 'blur(3px)',
        }}
      />
    </g>
  );
};

export default Dumpster;