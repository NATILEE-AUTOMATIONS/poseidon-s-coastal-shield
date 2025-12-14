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
          perspective: '600px',
          perspectiveOrigin: '50% 35%',
        }}
      >
        {/* Horizontal grid (ground plane) */}
        <div
          className="absolute w-full h-full"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                hsl(168 80% 45% / 0.06) 49%, 
                hsl(168 80% 45% / 0.25) 50%, 
                hsl(168 80% 45% / 0.06) 51%, 
                transparent 100%
              ),
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 78px,
                hsl(168 80% 45% / 0.12) 79px,
                hsl(168 80% 45% / 0.12) 80px
              )
            `,
            transform: 'rotateX(75deg) translateZ(-50px)',
            transformOrigin: '50% 100%',
            height: '250%',
            top: '25%',
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
                transparent 48px,
                hsl(168 80% 45% / 0.1) 49px,
                hsl(168 80% 45% / 0.1) 50px
              )
            `,
            transform: 'rotateX(75deg) translateZ(-50px)',
            transformOrigin: '50% 100%',
            height: '250%',
            top: '25%',
          }}
        />
      </div>
      
      {/* Horizon glow line - more dramatic, consistent position */}
      <div 
        className="absolute left-0 right-0 top-[25%]"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 5%, hsl(168 80% 55% / 0.8) 25%, hsl(168 80% 60% / 1) 50%, hsl(168 80% 55% / 0.8) 75%, transparent 95%)',
          boxShadow: `
            0 0 40px 15px hsl(168 80% 45% / 0.4), 
            0 0 80px 30px hsl(168 80% 45% / 0.2),
            0 0 120px 50px hsl(168 80% 45% / 0.1)
          `,
        }}
      />
      
      {/* Upper gradient fade */}
      <div 
        className="absolute inset-x-0 top-0 h-1/3"
        style={{
          background: 'linear-gradient(to bottom, hsl(168 20% 4%), transparent)',
        }}
      />
      
      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 70% at 50% 35%, transparent 0%, hsl(168 30% 4% / 0.8) 100%)',
        }}
      />
    </div>
  );
};

export default GridBackground;
