import React from 'react';

const GridBackground: React.FC = () => {
  return (
    <>
      {/* Desktop Grid - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
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
            className="absolute w-full h-full top-[25%]"
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
            }}
          />
          
          {/* Vertical lines coming from horizon */}
          <div
            className="absolute w-full h-full top-[25%]"
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
            }}
          />
        </div>
        
        {/* Horizon glow line */}
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

      {/* Mobile Front Yard Grid - visible only on mobile */}
      <div className="absolute inset-0 overflow-hidden md:hidden">
        {/* Deep background */}
        <div className="absolute inset-0 bg-deep-bg" />
        
        {/* Perspective grid container - positioned to start from bottom of house */}
        <div 
          className="absolute inset-0"
          style={{
            perspective: '400px',
            perspectiveOrigin: '50% 45%',
          }}
        >
          {/* Main grid plane - front yard */}
          <div
            className="absolute w-full"
            style={{
              background: `
                linear-gradient(90deg, 
                  transparent 0%, 
                  hsl(168 80% 45% / 0.08) 40%, 
                  hsl(168 80% 45% / 0.35) 50%, 
                  hsl(168 80% 45% / 0.08) 60%, 
                  transparent 100%
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 38px,
                  hsl(168 80% 45% / 0.18) 39px,
                  hsl(168 80% 45% / 0.18) 40px
                )
              `,
              transform: 'rotateX(70deg)',
              transformOrigin: '50% 0%',
              height: '200%',
              top: '58%',
              left: '-25%',
              width: '150%',
            }}
          />
          
          {/* Horizontal receding lines */}
          <div
            className="absolute w-full"
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 28px,
                  hsl(168 80% 45% / 0.15) 29px,
                  hsl(168 80% 45% / 0.15) 30px
                )
              `,
              transform: 'rotateX(70deg)',
              transformOrigin: '50% 0%',
              height: '200%',
              top: '58%',
              left: '-25%',
              width: '150%',
            }}
          />
        </div>
        
        {/* Horizon glow line at base of house */}
        <div 
          className="absolute left-0 right-0"
          style={{
            top: '58%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 10%, hsl(168 80% 55% / 0.6) 30%, hsl(168 80% 60% / 0.9) 50%, hsl(168 80% 55% / 0.6) 70%, transparent 90%)',
            boxShadow: `
              0 0 30px 10px hsl(168 80% 45% / 0.35), 
              0 0 60px 20px hsl(168 80% 45% / 0.2),
              0 0 90px 35px hsl(168 80% 45% / 0.1)
            `,
          }}
        />
        
        {/* Gradient fade at bottom for depth */}
        <div 
          className="absolute inset-x-0 bottom-0 h-1/4"
          style={{
            background: 'linear-gradient(to top, hsl(168 20% 3%), transparent)',
          }}
        />
        
        {/* Subtle vignette overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 55%, transparent 0%, hsl(168 30% 3% / 0.7) 100%)',
          }}
        />
      </div>
    </>
  );
};

export default GridBackground;
