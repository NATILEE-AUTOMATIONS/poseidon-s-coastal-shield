import { useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import VisionPortal from './VisionPortal';
import BenefitPills from './BenefitPills';
import { ArrowRight } from 'lucide-react';

const RoofVisionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // Typography fade: 0-15%
  const typographyOpacity = progress < 0.05 
    ? progress / 0.05 
    : progress < 0.15 
      ? 1 
      : Math.max(0, 1 - (progress - 0.15) / 0.1);

  // CTA appears at 85%+
  const ctaOpacity = progress > 0.85 ? Math.min(1, (progress - 0.85) / 0.1) : 0;

  return (
    <section 
      ref={sectionRef}
      className="relative h-[400vh] bg-[hsl(var(--deep-bg))]"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        
        {/* Typography - Stage 1 */}
        <div 
          className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none"
          style={{ 
            opacity: typographyOpacity,
            transform: `translate(-50%, ${progress > 0.15 ? -20 : 0}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white/90 mb-4 tracking-tight">
            A new roof.
          </h2>
          <p className="text-4xl md:text-6xl lg:text-7xl italic text-teal font-light text-glow-teal">
            A new beginning.
          </p>
        </div>

        {/* Vision Portal - Stages 2-4 */}
        <VisionPortal progress={progress} />

        {/* Benefit Pills - Stage 5 */}
        <BenefitPills progress={progress} />

        {/* Final CTA */}
        <div 
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20"
          style={{ 
            opacity: ctaOpacity,
            transform: `translate(-50%, ${ctaOpacity < 1 ? 20 : 0}px)`,
            transition: 'transform 0.3s ease-out',
            pointerEvents: ctaOpacity > 0.5 ? 'auto' : 'none'
          }}
        >
          <button className="btn-neon group">
            <span>Start Your Transformation</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoofVisionSection;
