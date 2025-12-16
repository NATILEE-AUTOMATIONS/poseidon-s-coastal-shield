import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import HouseSVG from "./RoofBuild/HouseSVG";
import { useIsMobile } from "@/hooks/use-mobile";

// Easing function for smooth animation
const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);

// Mobile Decking Layer Component
const MobileDeckingLayer: React.FC<{ progress: number }> = ({ progress }) => {
  // Animation runs from 0% to 100% progress
  const easedProgress = easeOutQuint(progress);
  const translateY = -100 * (1 - easedProgress);
  const opacity = 0.2 + (0.8 * easedProgress);
  
  // Label timing: fade in 20-40%, hold 40-70%, fade out 70-90%
  const labelOpacity = progress < 0.2 
    ? 0 
    : progress < 0.4 
      ? (progress - 0.2) / 0.2 
      : progress < 0.7 
        ? 1 
        : progress < 0.9 
          ? 1 - (progress - 0.7) / 0.2 
          : 0;
  
  if (progress <= 0) return null;
  
  return (
    <g 
      className="decking-layer"
      style={{
        transform: `translateY(${translateY}px)`,
        transformOrigin: '200px 107px',
        opacity,
        filter: `drop-shadow(0 ${3 + easedProgress * 5}px ${6 + easedProgress * 10}px hsl(30 25% 12% / ${0.3 + easedProgress * 0.2}))`,
      }}
    >
      <defs>
        <clipPath id="mobileLeftSlopeClip">
          <polygon points="42,159 200,56 200,159" />
        </clipPath>
        <clipPath id="mobileRightSlopeClip">
          <polygon points="200,56 358,159 200,159" />
        </clipPath>
        <linearGradient id="mobilePlyLeft" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="hsl(32 40% 62%)" />
          <stop offset="40%" stopColor="hsl(30 35% 55%)" />
          <stop offset="100%" stopColor="hsl(28 30% 45%)" />
        </linearGradient>
        <linearGradient id="mobilePlyRight" x1="100%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%" stopColor="hsl(34 38% 60%)" />
          <stop offset="40%" stopColor="hsl(32 32% 52%)" />
          <stop offset="100%" stopColor="hsl(29 28% 42%)" />
        </linearGradient>
        <pattern id="mobileGrainPattern" patternUnits="userSpaceOnUse" width="60" height="8">
          <line x1="0" y1="2" x2="60" y2="2" stroke="hsl(30 20% 40%)" strokeWidth="0.5" opacity="0.15" />
          <line x1="0" y1="5" x2="60" y2="5" stroke="hsl(30 20% 35%)" strokeWidth="0.3" opacity="0.1" />
        </pattern>
      </defs>
      
      {/* LEFT SLOPE */}
      <g clipPath="url(#mobileLeftSlopeClip)">
        <polygon points="42,159 200,56 200,159" fill="url(#mobilePlyLeft)" />
        <polygon points="42,159 200,56 200,159" fill="url(#mobileGrainPattern)" />
        <line x1="42" y1="115" x2="200" y2="115" stroke="hsl(28 30% 20%)" strokeWidth="1.4" />
        <line x1="42" y1="116.2" x2="200" y2="116.2" stroke="hsl(35 35% 58%)" strokeWidth="0.5" opacity="0.5" />
        <line x1="42" y1="80" x2="200" y2="80" stroke="hsl(28 30% 20%)" strokeWidth="1.4" />
        <line x1="42" y1="81.2" x2="200" y2="81.2" stroke="hsl(35 35% 58%)" strokeWidth="0.5" opacity="0.5" />
        <line x1="100" y1="159" x2="100" y2="115" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="160" y1="159" x2="160" y2="115" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="80" y1="115" x2="80" y2="80" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="140" y1="115" x2="140" y2="80" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
      </g>
      
      {/* RIGHT SLOPE */}
      <g clipPath="url(#mobileRightSlopeClip)">
        <polygon points="200,56 358,159 200,159" fill="url(#mobilePlyRight)" />
        <polygon points="200,56 358,159 200,159" fill="url(#mobileGrainPattern)" />
        <line x1="200" y1="115" x2="358" y2="115" stroke="hsl(28 30% 20%)" strokeWidth="1.4" />
        <line x1="200" y1="116.2" x2="358" y2="116.2" stroke="hsl(35 35% 58%)" strokeWidth="0.5" opacity="0.5" />
        <line x1="200" y1="80" x2="358" y2="80" stroke="hsl(28 30% 20%)" strokeWidth="1.4" />
        <line x1="200" y1="81.2" x2="358" y2="81.2" stroke="hsl(35 35% 58%)" strokeWidth="0.5" opacity="0.5" />
        <line x1="240" y1="159" x2="240" y2="115" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="300" y1="159" x2="300" y2="115" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="260" y1="115" x2="260" y2="80" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
        <line x1="320" y1="115" x2="320" y2="80" stroke="hsl(28 28% 22%)" strokeWidth="0.9" opacity="0.75" />
      </g>
      
      {/* Ridge line */}
      <line x1="200" y1="56" x2="200" y2="159" stroke="hsl(25 30% 18%)" strokeWidth="2.2" />
      
      {/* Teal edge accent glow */}
      <path 
        d="M42 159 L200 56 L358 159" 
        fill="none"
        stroke="hsl(168 75% 50%)" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.5 + easedProgress * 0.4}
        style={{
          filter: `drop-shadow(0 0 ${10 + easedProgress * 12}px hsl(168 75% 55% / 0.8))`,
        }}
      />
      
      {/* "REPLACE DECKING" label */}
      <g style={{ opacity: labelOpacity, transition: 'opacity 0.15s ease-out' }}>
        <text
          x="200"
          y="103"
          textAnchor="middle"
          fill="hsl(45 100% 95%)"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="3"
          stroke="hsl(0 0% 5%)"
          strokeWidth="2.5"
          paintOrder="stroke fill"
          style={{ filter: 'drop-shadow(0 0 6px hsl(0 0% 0%)) drop-shadow(0 0 12px hsl(0 0% 0% / 0.8))' }}
        >
          REPLACE
        </text>
        <text
          x="200"
          y="124"
          textAnchor="middle"
          fill="hsl(35 100% 90%)"
          fontSize="15"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="3.5"
          stroke="hsl(0 0% 5%)"
          strokeWidth="2.5"
          paintOrder="stroke fill"
          style={{ filter: 'drop-shadow(0 0 6px hsl(0 0% 0%)) drop-shadow(0 0 12px hsl(0 0% 0% / 0.8))' }}
        >
          DECKING
        </text>
      </g>
    </g>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [textLit, setTextLit] = useState(false);
  const [deckingProgress, setDeckingProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Lower threshold for mobile - line starts drawing almost immediately
      const startScroll = windowHeight * 0.05;
      const endScroll = windowHeight * 0.6;
      const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / (endScroll - startScroll)));
      
      setLineProgress(progress);
      
      // Trigger text ignition when line is near complete
      if (progress >= 0.85 && !textLit) {
        setTextLit(true);
      } else if (progress < 0.8 && textLit) {
        setTextLit(false);
      }
      
      // Mobile decking animation: starts after text lights up, extended scroll range
      if (isMobile) {
        const deckingStart = windowHeight * 0.7;
        const deckingEnd = windowHeight * 1.8; // Extended range for slower animation
        const deckProgress = Math.max(0, Math.min(1, (scrollY - deckingStart) / (deckingEnd - deckingStart)));
        setDeckingProgress(deckProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [textLit, isMobile]);

  // Make line taller on mobile for better visibility
  const lineHeight = Math.min(lineProgress * 1.2, 1) * 350;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-gradient-mesh" style={{ minHeight: isMobile ? '200vh' : '100vh' }}>
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-teal-glow/30 animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-orange-glow/30 animate-float animation-delay-200" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-teal-glow/20 animate-float animation-delay-400" />
        <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-orange-glow/20 animate-float animation-delay-600" />
      </div>

      {/* Hero Content - Added padding-top to account for fixed navbar */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-36 sm:pt-32 lg:pt-40 pb-4 px-6 text-center">
        
        {/* Pill Badge */}
        <div 
          className="opacity-0 animate-fade-up mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal/10 to-orange/10 backdrop-blur-md border border-teal/30 animate-pulse-glow"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <Zap className="w-4 h-4 text-orange-glow" />
          <span className="text-sm font-medium text-foreground/90">Coastal NC Roofing</span>
        </div>

        {/* Main Headline - Teal Glow */}
        <h1 
          className="opacity-0 animate-fade-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-glow-teal max-w-4xl"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          Make your home safe and beautiful
        </h1>

        {/* Subheadline - Orange Glow */}
        <p 
          className="opacity-0 animate-fade-up mt-6 lg:mt-8 text-lg sm:text-xl lg:text-2xl font-medium text-glow-orange max-w-2xl leading-relaxed"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          No stress, mess, or surprises. Just a clean, new roof that you know was done right.
        </p>

        {/* CTA Button */}
        <div 
          className="opacity-0 animate-fade-up mt-10 lg:mt-12"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <Button 
            size="lg"
            className="btn-gradient border-0 text-primary-foreground font-bold text-lg px-10 py-7 rounded-full"
          >
            Free Assessment
          </Button>
        </div>

        {/* Line and text container */}
        <div className="mt-10 sm:mt-16 flex flex-col items-center relative w-full" style={{ height: isMobile ? '900px' : '550px' }}>
          {/* Scroll-triggered glowing line */}
          <div 
            className="w-4 sm:w-3 rounded-full absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              height: `${Math.min(lineHeight, 350)}px`,
              background: 'linear-gradient(to bottom, hsl(168 70% 45%), hsl(168 80% 55%))',
              boxShadow: `
                0 0 20px hsl(168 70% 50% / 1),
                0 0 40px hsl(168 70% 50% / 0.8),
                0 0 60px hsl(168 70% 50% / 0.6),
                0 0 100px hsl(168 70% 50% / 0.4)
              `,
              opacity: lineProgress > 0.02 ? 1 : 0,
              transition: 'opacity 0.2s ease-out',
            }}
          />
          
          {/* Text - fixed position with neon ignition effect */}
          <div 
            className="absolute text-center px-6 w-full"
            style={{ top: '355px' }}
          >
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              style={{
                color: textLit ? 'hsl(30 95% 60%)' : 'hsl(30 95% 35%)',
                textShadow: textLit 
                  ? '0 0 15px hsl(30 95% 55% / 0.8), 0 0 30px hsl(30 95% 55% / 0.5)' 
                  : '0 0 5px hsl(30 95% 40% / 0.2)',
                filter: textLit ? 'blur(0px)' : 'blur(2px)',
                opacity: textLit ? 1 : 0.4,
                transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              910 Roofing
            </h2>
            <h3 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mt-2"
              style={{
                color: textLit ? 'hsl(168 70% 55%)' : 'hsl(168 70% 30%)',
                textShadow: textLit 
                  ? '0 0 15px hsl(168 70% 50% / 0.8), 0 0 30px hsl(168 70% 50% / 0.6), 0 0 45px hsl(168 70% 50% / 0.4)' 
                  : '0 0 5px hsl(168 70% 35% / 0.2)',
                filter: textLit ? 'blur(0px)' : 'blur(2px)',
                opacity: textLit ? 1 : 0.4,
                transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: textLit ? '150ms' : '0ms',
              }}
            >
              Done Right
            </h3>
          </div>
          
          {/* Mobile-only animated house with decking layer */}
          {isMobile && (
            <div 
              className="absolute left-0 right-0 flex justify-center"
              style={{ top: '560px' }}
            >
              <svg
                viewBox="30 30 340 250"
                className="w-[85vw]"
                style={{
                  filter: 'drop-shadow(0 0 30px hsl(168 80% 45% / 0.25))',
                }}
              >
                <HouseSVG doorAngle={0} lightBoost={0} />
                <MobileDeckingLayer progress={deckingProgress} />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
