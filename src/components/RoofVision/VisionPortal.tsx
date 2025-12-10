import DreamHouseScene from './DreamHouseScene';

interface VisionPortalProps {
  progress: number;
}

const VisionPortal = ({ progress }: VisionPortalProps) => {
  // Portal visibility: appears at 15%, fully visible 20-70%, contracts after
  const portalVisible = progress >= 0.15;
  
  // Portal expansion: 15-50% expands, 60-75% contracts
  const expansionProgress = progress < 0.15 
    ? 0 
    : progress < 0.50 
      ? (progress - 0.15) / 0.35 
      : progress < 0.60 
        ? 1 
        : progress < 0.75 
          ? 1 - (progress - 0.60) / 0.15
          : 0;

  // Size calculations
  const minSize = 20; // Starting dot size
  const maxWidth = 90; // Max width in vw
  const maxHeight = 70; // Max height in vh
  
  const currentWidth = minSize + (maxWidth - minSize) * expansionProgress;
  const currentHeight = minSize + (maxHeight - minSize) * expansionProgress;
  
  // Border radius: from pill (9999px) to rounded (40px) and back
  const borderRadius = expansionProgress < 0.5 
    ? 9999 - (9999 - 40) * (expansionProgress * 2)
    : 40 + (9999 - 40) * ((expansionProgress - 0.5) * 2);

  // Opacity for smooth entrance/exit
  const portalOpacity = progress < 0.15 
    ? 0 
    : progress < 0.20 
      ? (progress - 0.15) / 0.05 
      : progress < 0.70 
        ? 1 
        : progress < 0.78 
          ? 1 - (progress - 0.70) / 0.08
          : 0;

  // Glow intensity increases as portal expands
  const glowIntensity = Math.min(1, expansionProgress * 1.5);

  if (!portalVisible && progress < 0.15) return null;

  return (
    <div 
      className="absolute z-10 overflow-hidden transition-all duration-100 ease-out"
      style={{
        width: `${currentWidth}vw`,
        height: `${currentHeight}vh`,
        borderRadius: `${Math.max(40, borderRadius)}px`,
        opacity: portalOpacity,
        boxShadow: `
          0 0 ${30 * glowIntensity}px hsl(var(--teal) / 0.3),
          0 0 ${60 * glowIntensity}px hsl(var(--teal) / 0.2),
          0 0 ${100 * glowIntensity}px hsl(var(--teal) / 0.1),
          inset 0 0 ${20 * glowIntensity}px hsl(var(--teal) / 0.1)
        `,
        border: '1px solid hsl(var(--teal) / 0.4)',
        background: 'hsl(var(--deep-bg) / 0.8)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Animated gradient background inside portal */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: 'inherit' }}
      >
        {/* Sunrise/sunset gradient */}
        <div 
          className="absolute inset-0 animate-vision-gradient"
          style={{
            background: `
              radial-gradient(ellipse at 50% 120%, 
                hsl(var(--orange) / 0.6) 0%, 
                hsl(25 80% 50% / 0.4) 20%,
                hsl(var(--teal) / 0.3) 50%, 
                hsl(var(--deep-bg)) 80%
              )
            `,
          }}
        />
        
        {/* Animated light rays */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] animate-spin-slow">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-1/2 origin-bottom"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  background: `linear-gradient(to top, hsl(var(--teal) / 0.3), transparent)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Dream house scene - only visible when portal is expanded enough */}
        {expansionProgress > 0.3 && (
          <DreamHouseScene 
            progress={progress} 
            opacity={Math.min(1, (expansionProgress - 0.3) / 0.4)} 
          />
        )}
      </div>
    </div>
  );
};

export default VisionPortal;
