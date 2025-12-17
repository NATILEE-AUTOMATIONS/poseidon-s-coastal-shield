import dumpsterImage from '@/assets/dumpster.webp';

interface DumpsterProps {
  progress: number;
}

const Dumpster: React.FC<DumpsterProps> = ({ progress }) => {
  // Dumpster appears from 5% to 25% scroll progress
  const dumpsterStart = 0.05;
  const dumpsterEnd = 0.25;
  
  // Calculate animation progress (0 to 1)
  const rawProgress = (progress - dumpsterStart) / (dumpsterEnd - dumpsterStart);
  const animProgress = Math.max(0, Math.min(1, rawProgress));
  
  // Easing function for smooth animation
  const easeOutBack = (x: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };
  
  const easedProgress = easeOutBack(animProgress);
  
  // Start below viewport, rise up into position
  const translateY = 150 * (1 - easedProgress); // Starts 150px below, rises to 0
  const opacity = animProgress;
  const scale = 0.8 + (0.2 * easedProgress); // Scale from 0.8 to 1
  
  // Don't render if not in view yet
  if (progress < dumpsterStart - 0.02) return null;
  
  // Fade out when roof layers are mostly complete (around 50%)
  const fadeOutStart = 0.45;
  const fadeOutEnd = 0.55;
  const fadeOutProgress = progress > fadeOutStart 
    ? Math.min(1, (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart))
    : 0;
  const finalOpacity = opacity * (1 - fadeOutProgress);
  
  if (finalOpacity <= 0) return null;
  
  return (
    <div 
      className="absolute z-20 pointer-events-none"
      style={{
        bottom: '8%',
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
        opacity: finalOpacity,
        transition: 'opacity 0.2s ease-out',
        willChange: 'transform, opacity',
      }}
    >
      <div className="relative">
        {/* Dumpster image */}
        <img 
          src={dumpsterImage} 
          alt="Construction dumpster"
          className="w-48 md:w-56 lg:w-64 h-auto drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 10px 30px hsl(0 0% 0% / 0.5)) drop-shadow(0 0 20px hsl(168 50% 30% / 0.3))',
          }}
        />
        
        {/* Ground shadow */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/30 rounded-full blur-md"
          style={{
            transform: `translateX(-50%) scaleX(${0.8 + easedProgress * 0.2})`,
          }}
        />
      </div>
    </div>
  );
};

export default Dumpster;
