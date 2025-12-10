import { Home, Shield, DollarSign, Zap, Sparkles } from 'lucide-react';

interface BenefitPillsProps {
  progress: number;
}

const benefits = [
  { icon: Home, label: 'Curb Appeal', color: 'teal' },
  { icon: Shield, label: 'Protection', color: 'teal' },
  { icon: DollarSign, label: 'Value', color: 'orange' },
  { icon: Zap, label: 'Efficiency', color: 'orange' },
  { icon: Sparkles, label: 'Peace of Mind', color: 'teal' },
];

const BenefitPills = ({ progress }: BenefitPillsProps) => {
  // Pills appear from 75-90% progress
  const pillsVisible = progress >= 0.75;
  
  return (
    <div 
      className="absolute bottom-[22%] left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl px-4"
      style={{
        opacity: pillsVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      {benefits.map((benefit, index) => {
        // Staggered entrance: each pill appears 2% after the previous
        const pillProgress = progress >= 0.75 + (index * 0.02) 
          ? Math.min(1, (progress - (0.75 + index * 0.02)) / 0.05) 
          : 0;
        
        const Icon = benefit.icon;
        const isTeal = benefit.color === 'teal';
        
        return (
          <div
            key={benefit.label}
            className={`
              flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 
              rounded-full backdrop-blur-md 
              border transition-all duration-300
              hover:scale-105 cursor-default
              ${isTeal 
                ? 'bg-teal/10 border-teal/30 hover:border-teal/60 hover:bg-teal/20' 
                : 'bg-orange/10 border-orange/30 hover:border-orange/60 hover:bg-orange/20'
              }
            `}
            style={{
              opacity: pillProgress,
              transform: `translateY(${(1 - pillProgress) * 20}px) scale(${0.8 + pillProgress * 0.2})`,
              boxShadow: pillProgress > 0.5 
                ? `0 0 20px ${isTeal ? 'hsl(var(--teal) / 0.2)' : 'hsl(var(--orange) / 0.2)'}` 
                : 'none',
            }}
          >
            <Icon 
              className={`w-4 h-4 md:w-5 md:h-5 ${isTeal ? 'text-teal' : 'text-orange'}`} 
            />
            <span 
              className={`text-sm md:text-base font-medium ${isTeal ? 'text-teal' : 'text-orange'}`}
            >
              {benefit.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BenefitPills;
