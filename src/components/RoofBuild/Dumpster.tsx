import dumpsterImage from '@/assets/dumpster.webp';

interface DumpsterProps {
  progress: number;
  startProgress: number;
  endProgress: number;
}

const Dumpster: React.FC<DumpsterProps> = ({ progress, startProgress, endProgress }) => {
  // Calculate animation progress (0 to 1)
  const rawProgress = (progress - startProgress) / (endProgress - startProgress);
  const animProgress = Math.max(0, Math.min(1, rawProgress));
  
  // Don't render if not in view yet
  if (progress < startProgress - 0.01) return null;
  
  // Easing function for smooth animation
  const easeOutBack = (x: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };
  
  const easedProgress = easeOutBack(animProgress);
  
  // Start below viewport, rise up into position
  const translateY = 120 * (1 - easedProgress); // Starts 120px below, rises to 0
  const opacity = animProgress;
  const scale = 0.85 + (0.15 * easedProgress); // Scale from 0.85 to 1
  
  // Fade out when door starts opening (around 70%+)
  const fadeOutStart = 0.72;
  const fadeOutEnd = 0.80;
  const fadeOutProgress = progress > fadeOutStart 
    ? Math.min(1, (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart))
    : 0;
  const finalOpacity = opacity * (1 - fadeOutProgress);
  
  if (finalOpacity <= 0) return null;
  
  return (
    <div 
      className="absolute z-20 pointer-events-none"
      style={{
        bottom: '5%',
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
        opacity: finalOpacity,
        willChange: 'transform, opacity',
      }}
    >
      <div className="relative">
        {/* Dumpster image */}
        <img 
          src={dumpsterImage} 
          alt="Construction dumpster"
          className="w-40 md:w-48 lg:w-56 h-auto"
          style={{
            filter: 'drop-shadow(0 8px 24px hsl(0 0% 0% / 0.6)) drop-shadow(0 0 15px hsl(168 50% 30% / 0.25))',
          }}
        />
        
        {/* Ground shadow */}
        <div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/40 rounded-full blur-sm"
          style={{
            transform: `translateX(-50%) scaleX(${0.85 + easedProgress * 0.15})`,
          }}
        />
      </div>
    </div>
  );
};

export default Dumpster;
