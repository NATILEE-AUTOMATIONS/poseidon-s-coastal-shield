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
      
      // Line starts drawing after scrolling 20% of viewport, completes at 80%
      const startScroll = windowHeight * 0.2;
      const endScroll = windowHeight * 0.9;
      const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / (endScroll - startScroll)));
      
      setLineProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lineHeight = Math.min(lineProgress * 1.2, 1) * 300;
  const textOpacity = lineProgress > 0.7 ? (lineProgress - 0.7) / 0.3 : 0;

  return (
    <section ref={sectionRef} className="relative min-h-[180vh] w-full overflow-hidden bg-gradient-mesh">
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
      <div className="relative z-10 flex flex-col items-center justify-start pt-36 sm:pt-32 lg:pt-40 pb-20 px-6 text-center">
        
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

        {/* Scroll-triggered glowing line */}
        <div className="mt-16 flex flex-col items-center">
          <div 
            className="w-3 rounded-full"
            style={{
              height: `${lineHeight}px`,
              background: 'linear-gradient(to bottom, hsl(168 70% 45%), hsl(168 80% 55%))',
              boxShadow: `
                0 0 15px hsl(168 70% 50% / 0.9),
                0 0 30px hsl(168 70% 50% / 0.7),
                0 0 50px hsl(168 70% 50% / 0.5),
                0 0 80px hsl(168 70% 50% / 0.3)
              `,
              opacity: lineProgress > 0.05 ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          />
          
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
                textShadow: '0 0 10px hsl(168 70% 50% / 0.4), 0 0 20px hsl(168 70% 50% / 0.3)',
              }}
            >
              910
            </h2>
            <h3 
              className="text-3xl md:text-4xl font-bold mt-2"
              style={{
                color: 'hsl(168 70% 55%)',
                textShadow: '0 0 15px hsl(168 70% 50% / 0.8), 0 0 30px hsl(168 70% 50% / 0.6), 0 0 45px hsl(168 70% 50% / 0.4)',
              }}
            >
              Roofing Done Right
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
