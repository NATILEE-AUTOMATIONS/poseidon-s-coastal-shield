import React, { useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import GridBackground from '../RoofBuild/GridBackground';
import AnimatedHouse from './AnimatedHouse';
import DoorLightRays from './DoorLightRays';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const DoorRevealSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // Door opens from 15-60% scroll (0° to 75°)
  const doorAngle = Math.min(75, Math.max(0, ((progress - 0.15) / 0.45) * 75));
  
  // Light intensity synced with door opening
  const lightIntensity = doorAngle / 75;

  // Typography visibility
  const showRoofComplete = progress >= 0.05 && progress < 0.55;
  const showWelcomeHome = progress >= 0.60;
  const showCTA = progress >= 0.80;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <GridBackground />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Typography - "Your roof is complete." */}
          <div 
            className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ease-out"
            style={{
              opacity: showRoofComplete ? 1 : 0,
              transform: `translateY(${showRoofComplete ? 0 : -20}px)`,
            }}
          >
            <h2 
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{
                color: 'hsl(168 70% 55%)',
                textShadow: '0 0 40px hsl(168 80% 50% / 0.6), 0 0 80px hsl(168 80% 50% / 0.3)',
              }}
            >
              Your roof is complete.
            </h2>
          </div>

          {/* Main visualization container */}
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Light rays behind house */}
            <DoorLightRays intensity={lightIntensity} />
            
            {/* House SVG with animated door */}
            <AnimatedHouse doorAngle={doorAngle} lightIntensity={lightIntensity} />
          </div>

          {/* Typography - "Welcome home." */}
          <div 
            className="absolute bottom-40 md:bottom-48 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ease-out"
            style={{
              opacity: showWelcomeHome ? 1 : 0,
              transform: `translateY(${showWelcomeHome ? 0 : 20}px)`,
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
            className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 transition-all duration-700 ease-out"
            style={{
              opacity: showCTA ? 1 : 0,
              transform: `translateY(${showCTA ? 0 : 30}px)`,
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
