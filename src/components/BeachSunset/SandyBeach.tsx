import React from 'react';

interface SandyBeachProps {
  progress: number; // 0-1
}

const SandyBeach: React.FC<SandyBeachProps> = ({ progress }) => {
  const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x);
  const easedProgress = easeOutQuad(progress);
  
  return (
    <div 
      className="absolute left-0 right-0 bottom-0 overflow-hidden"
      style={{
        height: '22%',
        opacity: easedProgress,
        transform: `translateY(${(1 - easedProgress) * 30}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Main sand gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            hsl(40 50% 65%) 0%,
            hsl(38 45% 60%) 30%,
            hsl(35 40% 55%) 70%,
            hsl(32 35% 50%) 100%
          )`,
        }}
      />
      
      {/* Sand texture overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, hsl(42 55% 70% / 0.4) 0%, transparent 3%),
            radial-gradient(circle at 60% 50%, hsl(38 50% 68% / 0.3) 0%, transparent 2%),
            radial-gradient(circle at 80% 20%, hsl(40 52% 72% / 0.35) 0%, transparent 2.5%),
            radial-gradient(circle at 35% 70%, hsl(36 48% 65% / 0.3) 0%, transparent 2%),
            radial-gradient(circle at 90% 60%, hsl(42 55% 70% / 0.25) 0%, transparent 3%)`,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Wet sand near water */}
      <div 
        className="absolute left-0 right-0 top-0 h-1/4"
        style={{
          background: `linear-gradient(180deg,
            hsl(35 40% 45% / 0.6) 0%,
            transparent 100%
          )`,
        }}
      />
      
      {/* Water foam line */}
      <div 
        className="absolute left-0 right-0 top-0"
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, transparent 5%, hsl(200 80% 90% / 0.6) 20%, hsl(200 70% 95% / 0.8) 50%, hsl(200 80% 90% / 0.6) 80%, transparent 95%)',
          filter: 'blur(1px)',
          animation: 'foamPulse 3s ease-in-out infinite',
        }}
      />
      
      {/* Subtle sand ripples */}
      <svg 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 80"
        style={{ opacity: 0.15 }}
      >
        {[0, 1, 2, 3].map((index) => (
          <path
            key={index}
            d={`M0 ${20 + index * 18} Q100 ${15 + index * 18} 200 ${20 + index * 18} Q300 ${25 + index * 18} 400 ${20 + index * 18}`}
            fill="none"
            stroke="hsl(30 30% 40%)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
      
      {/* Footprint hints (very subtle) */}
      {progress > 0.8 && (
        <div className="absolute inset-0" style={{ opacity: (progress - 0.8) * 2.5 }}>
          <div 
            className="absolute"
            style={{
              left: '30%',
              bottom: '40%',
              width: '12px',
              height: '20px',
              background: 'hsl(35 35% 52% / 0.4)',
              borderRadius: '40% 40% 30% 30%',
              transform: 'rotate(-10deg)',
              filter: 'blur(1px)',
            }}
          />
          <div 
            className="absolute"
            style={{
              left: '35%',
              bottom: '35%',
              width: '12px',
              height: '20px',
              background: 'hsl(35 35% 52% / 0.4)',
              borderRadius: '40% 40% 30% 30%',
              transform: 'rotate(5deg)',
              filter: 'blur(1px)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SandyBeach;
