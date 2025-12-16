import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Make line taller on mobile for better visibility
  const lineHeight = Math.min(lineProgress * 1.2, 1) * 350;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-gradient-mesh">
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
        <div className="mt-10 sm:mt-16 flex flex-col items-center relative w-full" style={{ height: '400px' }}>
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
          
          {/* Text - fixed position */}
          <div className="absolute text-center px-6 w-full" style={{ top: '355px' }}>
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              style={{
                color: 'hsl(30 95% 60%)',
                textShadow: '0 0 15px hsl(30 95% 55% / 0.8), 0 0 30px hsl(30 95% 55% / 0.5)',
              }}
            >
              910 Roofing
            </h2>
            <h3 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mt-2"
              style={{
                color: 'hsl(168 70% 55%)',
                textShadow: '0 0 15px hsl(168 70% 50% / 0.8), 0 0 30px hsl(168 70% 50% / 0.6), 0 0 45px hsl(168 70% 50% / 0.4)',
              }}
            >
              Done Right
            </h3>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
