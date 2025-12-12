import React, { useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import coastalRoofProject from '@/assets/coastal-roof-project.png';

// Smooth easing function
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const DoorRevealSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // Image animation: fade in and zoom from 10% to 110%
  const imageProgress = Math.min(1, Math.max(0, progress / 0.8)); // Complete by 80% scroll
  const easedProgress = easeOutCubic(imageProgress);
  
  const imageOpacity = easedProgress;
  const imageScale = 0.1 + (easedProgress * 1.0); // 10% → 110%
  
  // Warm overlay fades out as image fades in
  const warmOverlayOpacity = Math.max(0, 1 - (progress / 0.3));
  
  // Typography and CTA appear at the end
  const showWelcomeHome = progress >= 0.75;
  const showCTA = progress >= 0.85;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Warm orange overlay from door - fades out */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, 
              hsl(35 95% 60% / ${warmOverlayOpacity * 0.9}) 0%, 
              hsl(25 90% 45% / ${warmOverlayOpacity * 0.7}) 30%,
              hsl(15 85% 25% / ${warmOverlayOpacity * 0.5}) 60%,
              transparent 100%)`,
          }}
        />
        
        {/* Background that transitions from warm to neutral */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(to bottom, 
              hsl(35 20% ${10 + progress * 5}%) 0%, 
              hsl(30 15% ${8 + progress * 4}%) 100%)`,
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Hero Image with fade + zoom */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              willChange: 'transform, opacity',
            }}
          >
            <img
              src={coastalRoofProject}
              alt="Coastal NC roofing project with waterfront view"
              className="rounded-lg shadow-2xl"
              style={{
                opacity: imageOpacity,
                transform: `scale(${imageScale}) translate3d(0, 0, 0)`,
                transformOrigin: 'center center',
                maxWidth: '85vw',
                maxHeight: '75vh',
                objectFit: 'cover',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                boxShadow: `
                  0 25px 50px -12px hsl(0 0% 0% / ${0.25 + easedProgress * 0.2}),
                  0 0 80px hsl(35 80% 50% / ${0.1 * (1 - easedProgress)})
                `,
              }}
            />
          </div>

          {/* Typography - "Welcome home." */}
          <div 
            className="absolute bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ease-out z-20"
            style={{
              opacity: showWelcomeHome ? 1 : 0,
              transform: `translate(-50%, ${showWelcomeHome ? 0 : 20}px)`,
            }}
          >
            <h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{
                color: 'hsl(32 85% 55%)',
                textShadow: '0 0 40px hsl(32 90% 50% / 0.7), 0 0 80px hsl(32 90% 50% / 0.4)',
              }}
            >
              Welcome home.
            </h2>
          </div>

          {/* CTA Button */}
          <div 
            className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 transition-all duration-700 ease-out z-20"
            style={{
              opacity: showCTA ? 1 : 0,
              transform: `translate(-50%, ${showCTA ? 0 : 30}px)`,
              pointerEvents: showCTA ? 'auto' : 'none',
            }}
          >
            <Button className="btn-neon group">
              <span className="btn-text">Free Assessment</span>
              <ArrowRight className="btn-icon ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoorRevealSection;
