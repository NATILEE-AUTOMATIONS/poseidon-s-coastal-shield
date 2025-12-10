import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-deep-bg" />
      
      {/* Perspective grid container */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: '500px',
          perspectiveOrigin: '50% 40%',
        }}
      >
        {/* Horizontal grid (ground plane) */}
        <div
          className="absolute w-full h-full"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                hsl(168 80% 45% / 0.03) 49.5%, 
                hsl(168 80% 45% / 0.15) 50%, 
                hsl(168 80% 45% / 0.03) 50.5%, 
                transparent 100%
              ),
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 78px,
                hsl(168 80% 45% / 0.08) 79px,
                hsl(168 80% 45% / 0.08) 80px
              )
            `,
            transform: 'rotateX(75deg) translateZ(-100px)',
            transformOrigin: '50% 100%',
            height: '200%',
            top: '30%',
          }}
        />
        
        {/* Vertical lines coming from horizon */}
        <div
          className="absolute w-full h-full"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 58px,
                hsl(168 80% 45% / 0.06) 59px,
                hsl(168 80% 45% / 0.06) 60px
              )
            `,
            transform: 'rotateX(75deg) translateZ(-100px)',
            transformOrigin: '50% 100%',
            height: '200%',
            top: '30%',
          }}
        />
      </div>
      
      {/* Horizon glow line */}
      <div 
        className="absolute left-0 right-0 h-px"
        style={{
          top: '30%',
          background: 'linear-gradient(90deg, transparent, hsl(168 80% 50% / 0.6) 20%, hsl(168 80% 55% / 0.8) 50%, hsl(168 80% 50% / 0.6) 80%, transparent)',
          boxShadow: '0 0 30px 10px hsl(168 80% 45% / 0.3), 0 0 60px 20px hsl(168 80% 45% / 0.15)',
        }}
      />
      
      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 40%, transparent 0%, hsl(168 30% 5% / 0.6) 100%)',
        }}
      />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 
              ? 'hsl(32 100% 55% / 0.4)' 
              : 'hsl(168 80% 50% / 0.5)',
            boxShadow: i % 3 === 0 
              ? '0 0 6px hsl(32 100% 55% / 0.6)' 
              : '0 0 6px hsl(168 80% 50% / 0.6)',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default GridBackground;
