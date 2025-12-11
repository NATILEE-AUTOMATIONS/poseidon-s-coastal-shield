import React from 'react';

interface DoorLightRaysProps {
  intensity: number; // 0-1
}

const DoorLightRays: React.FC<DoorLightRaysProps> = ({ intensity }) => {
  if (intensity <= 0) return null;

  return (
    <div 
      className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"
      style={{ 
        opacity: intensity,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      {/* Central glow behind doorway area */}
      <div 
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2"
        style={{
          width: '120px',
          height: '180px',
          background: `radial-gradient(ellipse at center bottom, 
            hsl(32 90% 55% / ${0.6 * intensity}) 0%, 
            hsl(32 85% 50% / ${0.3 * intensity}) 40%, 
            transparent 70%)`,
          filter: 'blur(20px)',
          transform: `scaleX(${1 + intensity * 0.5})`,
        }}
      />
      
      {/* Light rays emanating from doorway */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-full h-[60%]">
        {/* Ray 1 - center */}
        <div 
          className="absolute left-1/2 bottom-0 -translate-x-1/2 origin-bottom animate-warm-glow-pulse"
          style={{
            width: '60px',
            height: `${200 * intensity}px`,
            background: `linear-gradient(to top, 
              hsl(32 90% 55% / ${0.5 * intensity}) 0%, 
              hsl(38 85% 50% / ${0.2 * intensity}) 50%, 
              transparent 100%)`,
            filter: 'blur(15px)',
            transform: `scaleY(${intensity})`,
          }}
        />
        
        {/* Ray 2 - left */}
        <div 
          className="absolute left-1/2 bottom-0 origin-bottom animate-warm-glow-pulse"
          style={{
            width: '40px',
            height: `${180 * intensity}px`,
            background: `linear-gradient(to top, 
              hsl(32 90% 55% / ${0.4 * intensity}) 0%, 
              hsl(38 85% 50% / ${0.15 * intensity}) 50%, 
              transparent 100%)`,
            filter: 'blur(12px)',
            transform: `translateX(-80px) rotate(-15deg) scaleY(${intensity})`,
            animationDelay: '0.2s',
          }}
        />
        
        {/* Ray 3 - right */}
        <div 
          className="absolute left-1/2 bottom-0 origin-bottom animate-warm-glow-pulse"
          style={{
            width: '40px',
            height: `${180 * intensity}px`,
            background: `linear-gradient(to top, 
              hsl(32 90% 55% / ${0.4 * intensity}) 0%, 
              hsl(38 85% 50% / ${0.15 * intensity}) 50%, 
              transparent 100%)`,
            filter: 'blur(12px)',
            transform: `translateX(40px) rotate(15deg) scaleY(${intensity})`,
            animationDelay: '0.4s',
          }}
        />
        
        {/* Ray 4 - far left */}
        <div 
          className="absolute left-1/2 bottom-0 origin-bottom animate-warm-glow-pulse"
          style={{
            width: '30px',
            height: `${140 * intensity}px`,
            background: `linear-gradient(to top, 
              hsl(32 90% 55% / ${0.3 * intensity}) 0%, 
              hsl(38 85% 50% / ${0.1 * intensity}) 50%, 
              transparent 100%)`,
            filter: 'blur(10px)',
            transform: `translateX(-130px) rotate(-30deg) scaleY(${intensity})`,
            animationDelay: '0.1s',
          }}
        />
        
        {/* Ray 5 - far right */}
        <div 
          className="absolute left-1/2 bottom-0 origin-bottom animate-warm-glow-pulse"
          style={{
            width: '30px',
            height: `${140 * intensity}px`,
            background: `linear-gradient(to top, 
              hsl(32 90% 55% / ${0.3 * intensity}) 0%, 
              hsl(38 85% 50% / ${0.1 * intensity}) 50%, 
              transparent 100%)`,
            filter: 'blur(10px)',
            transform: `translateX(100px) rotate(30deg) scaleY(${intensity})`,
            animationDelay: '0.3s',
          }}
        />
      </div>
      
      {/* Floating warm particles */}
      {intensity > 0.3 && (
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-40 h-40">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-light-particle-float"
              style={{
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                background: `hsl(32 90% ${60 + Math.random() * 20}%)`,
                left: `${40 + Math.random() * 20}%`,
                bottom: `${10 + i * 10}%`,
                opacity: 0.6 * intensity,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                boxShadow: `0 0 ${6 + Math.random() * 6}px hsl(32 90% 55% / 0.8)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoorLightRays;
