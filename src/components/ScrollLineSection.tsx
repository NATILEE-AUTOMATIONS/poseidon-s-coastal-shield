import React, { useRef, useEffect, useState } from 'react';

const ScrollLineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when section enters view, 1 when section is fully scrolled
      const scrolledPast = windowHeight - sectionTop;
      const totalScrollDistance = sectionHeight + windowHeight * 0.5;
      const progress = Math.max(0, Math.min(1, scrolledPast / totalScrollDistance));
      
      setLineProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Line height based on scroll progress
  const lineHeight = Math.min(lineProgress * 1.5, 1) * 250; // Max 250px
  
  // Text opacity - fades in after line is 60% drawn
  const textOpacity = lineProgress > 0.6 ? (lineProgress - 0.6) / 0.4 : 0;
  
  // Glowing dot at the end of the line
  const showDot = lineProgress > 0.05 && lineProgress < 0.9;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[80vh] bg-background flex flex-col items-center justify-start pt-16 pb-24 overflow-hidden"
    >
      {/* Glowing line container */}
      <div className="relative flex flex-col items-center">
        {/* The animated line */}
        <div 
          className="relative w-1 rounded-full"
          style={{
            height: `${lineHeight}px`,
            background: 'linear-gradient(to bottom, hsl(168 70% 45%), hsl(168 80% 55%))',
            boxShadow: `
              0 0 10px hsl(168 70% 50% / 0.8),
              0 0 20px hsl(168 70% 50% / 0.6),
              0 0 40px hsl(168 70% 50% / 0.4),
              0 0 60px hsl(168 70% 50% / 0.2)
            `,
            opacity: lineProgress > 0.05 ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />
        
        {/* Glowing dot at the tip */}
        {showDot && (
          <div 
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: `${lineHeight - 6}px`,
              background: 'hsl(168 80% 60%)',
              boxShadow: `
                0 0 8px hsl(168 80% 60%),
                0 0 16px hsl(168 80% 60% / 0.8),
                0 0 24px hsl(168 80% 60% / 0.6)
              `,
            }}
          />
        )}
      </div>
      
      {/* Text that reveals after line draws */}
      <div 
        className="mt-12 text-center px-6"
        style={{
          opacity: textOpacity,
          transform: `translateY(${20 * (1 - textOpacity)}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        <h2 
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{
            color: 'hsl(45 100% 95%)',
            textShadow: `
              0 0 10px hsl(168 70% 50% / 0.4),
              0 0 20px hsl(168 70% 50% / 0.3)
            `,
          }}
        >
          910
        </h2>
        <h3 
          className="text-3xl md:text-4xl font-bold mt-2"
          style={{
            color: 'hsl(168 70% 55%)',
            textShadow: `
              0 0 15px hsl(168 70% 50% / 0.8),
              0 0 30px hsl(168 70% 50% / 0.6),
              0 0 45px hsl(168 70% 50% / 0.4)
            `,
          }}
        >
          Roofing Done Right
        </h3>
      </div>
    </section>
  );
};

export default ScrollLineSection;
