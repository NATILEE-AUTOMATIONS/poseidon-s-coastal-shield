import React, { useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import SunsetSky from './SunsetSky';
import OceanWaves from './OceanWaves';
import PalmTreeSilhouette from './PalmTreeSilhouette';
import SandyBeach from './SandyBeach';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const BeachSunsetSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  
  // Animation timeline
  // 0-25%: Orange to sunset sky transition
  // 25-45%: Ocean appears
  // 45-65%: Palm trees drop in
  // 65-80%: Sandy beach fades up
  // 80-100%: Welcome text + CTA appear
  
  const skyProgress = Math.min(1, progress / 0.25);
  const oceanProgress = progress > 0.25 ? Math.min(1, (progress - 0.25) / 0.20) : 0;
  const palmProgress = progress > 0.45 ? Math.min(1, (progress - 0.45) / 0.20) : 0;
  const sandProgress = progress > 0.65 ? Math.min(1, (progress - 0.65) / 0.15) : 0;
  const textProgress = progress > 0.80 ? Math.min(1, (progress - 0.80) / 0.15) : 0;
  const ctaProgress = progress > 0.88 ? Math.min(1, (progress - 0.88) / 0.12) : 0;
  
  // Easing for text
  const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x);
  const easedText = easeOutQuad(textProgress);
  const easedCta = easeOutQuad(ctaProgress);
  
  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '200vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Sunset sky background */}
        <SunsetSky progress={skyProgress} />
        
        {/* Ocean with reflection */}
        <OceanWaves progress={oceanProgress} />
        
        {/* Palm trees - one on each side */}
        <PalmTreeSilhouette progress={palmProgress} side="left" />
        <PalmTreeSilhouette 
          progress={palmProgress > 0.3 ? (palmProgress - 0.3) / 0.7 : 0} 
          side="right" 
        />
        
        {/* Sandy beach foreground */}
        <SandyBeach progress={sandProgress} />
        
        {/* Floating particles/dust */}
        {progress > 0.5 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${10 + (i * 7) % 80}%`,
                  top: `${20 + (i * 11) % 50}%`,
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  background: `hsl(40 80% 80% / ${0.3 + (i % 3) * 0.1})`,
                  animation: `float ${4 + i % 3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  opacity: (progress - 0.5) * 2,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Welcome home text */}
        <div 
          className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            bottom: '28%',
            opacity: easedText,
            transform: `translateY(${(1 - easedText) * 30}px)`,
          }}
        >
          <h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            style={{
              color: 'hsl(35 95% 85%)',
              textShadow: `
                0 0 30px hsl(35 100% 70% / 0.6),
                0 0 60px hsl(35 100% 65% / 0.4),
                0 0 90px hsl(30 95% 55% / 0.3),
                0 4px 20px hsl(0 0% 0% / 0.4)
              `,
            }}
          >
            Welcome home.
          </h2>
        </div>
        
        {/* CTA Button */}
        <div 
          className="absolute inset-x-0 flex justify-center pointer-events-auto"
          style={{
            bottom: '15%',
            opacity: easedCta,
            transform: `translateY(${(1 - easedCta) * 20}px) scale(${0.9 + easedCta * 0.1})`,
          }}
        >
          <Button
            size="lg"
            className="group relative px-8 py-6 text-lg font-semibold tracking-wide rounded-md overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(168 70% 35%), hsl(168 80% 40%), hsl(35 80% 50%))',
              color: 'hsl(40 90% 95%)',
              boxShadow: `
                0 0 30px hsl(168 80% 45% / 0.4),
                0 0 60px hsl(35 80% 50% / 0.3),
                0 8px 32px hsl(0 0% 0% / 0.3)
              `,
              border: '1px solid hsl(168 60% 50% / 0.3)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Free Assessment
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
        
      </div>
    </section>
  );
};

export default BeachSunsetSection;
