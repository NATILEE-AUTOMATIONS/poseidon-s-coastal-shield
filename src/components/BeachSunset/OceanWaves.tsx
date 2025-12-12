import React from 'react';

interface OceanWavesProps {
  progress: number; // 0-1
}

const OceanWaves: React.FC<OceanWavesProps> = ({ progress }) => {
  const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x);
  const easedProgress = easeOutQuad(progress);
  
  return (
    <div 
      className="absolute left-0 right-0 overflow-hidden"
      style={{
        bottom: '20%',
        height: '25%',
        opacity: easedProgress,
        transform: `translateY(${(1 - easedProgress) * 50}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Ocean gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            hsl(200 70% 35% / 0.9) 0%,
            hsl(205 75% 30% / 0.95) 30%,
            hsl(210 80% 25%) 60%,
            hsl(215 85% 20%) 100%
          )`,
        }}
      />
      
      {/* Sunset reflection on water */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            hsl(35 90% 60% / 0.4) 0%,
            hsl(25 85% 50% / 0.2) 30%,
            transparent 60%
          )`,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Shimmer effect */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity: 0.3,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 12}%`,
              top: `${10 + (i % 3) * 15}%`,
              width: '40px',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, hsl(40 100% 80% / 0.6), transparent)',
              animation: `shimmer ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
      
      {/* Wave lines */}
      <svg 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 100"
      >
        {[0, 1, 2].map((waveIndex) => (
          <path
            key={waveIndex}
            d={`M0 ${30 + waveIndex * 25} 
               Q50 ${25 + waveIndex * 25} 100 ${30 + waveIndex * 25}
               Q150 ${35 + waveIndex * 25} 200 ${30 + waveIndex * 25}
               Q250 ${25 + waveIndex * 25} 300 ${30 + waveIndex * 25}
               Q350 ${35 + waveIndex * 25} 400 ${30 + waveIndex * 25}`}
            fill="none"
            stroke={`hsl(200 60% ${55 - waveIndex * 10}% / ${0.3 - waveIndex * 0.08})`}
            strokeWidth="1.5"
            style={{
              animation: `waveMove ${4 + waveIndex}s ease-in-out infinite`,
              animationDelay: `${waveIndex * 0.5}s`,
            }}
          />
        ))}
      </svg>
      
      {/* Horizon line glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, hsl(40 100% 70% / 0.6) 50%, transparent 90%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};

export default OceanWaves;
