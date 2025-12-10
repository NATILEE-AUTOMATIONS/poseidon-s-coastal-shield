import { Sparkles } from 'lucide-react';

interface DreamHouseSceneProps {
  progress: number;
  opacity: number;
}

const DreamHouseScene = ({ progress, opacity }: DreamHouseSceneProps) => {
  // Sparkle animation triggers at peak expansion
  const sparkleIntensity = progress > 0.45 && progress < 0.65 ? 1 : 0.3;

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      {/* Transformed house silhouette */}
      <div className="relative w-64 h-48 md:w-80 md:h-60 lg:w-96 lg:h-72">
        {/* House with new roof glow */}
        <svg 
          viewBox="0 0 200 150" 
          className="w-full h-full"
          style={{
            filter: `drop-shadow(0 0 20px hsl(var(--teal) / 0.5)) drop-shadow(0 0 40px hsl(var(--orange) / 0.3))`,
          }}
        >
          {/* New roof - glowing and premium */}
          <defs>
            <linearGradient id="newRoofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--teal))" stopOpacity="0.9" />
              <stop offset="50%" stopColor="hsl(173 50% 35%)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(173 60% 25%)" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="warmLight" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--orange))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--orange))" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* House body */}
          <rect 
            x="35" y="70" 
            width="130" height="70" 
            fill="hsl(var(--deep-bg))"
            stroke="hsl(var(--teal) / 0.5)"
            strokeWidth="1"
          />
          
          {/* Beautiful new roof */}
          <path 
            d="M 20 75 L 100 20 L 180 75 Z" 
            fill="url(#newRoofGradient)"
            stroke="hsl(var(--teal))"
            strokeWidth="2"
            className="animate-roof-glow"
          />
          
          {/* Roof ridge line */}
          <line 
            x1="100" y1="20" 
            x2="100" y2="25" 
            stroke="hsl(var(--teal))"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Windows with warm light */}
          <rect 
            x="50" y="90" 
            width="25" height="30" 
            fill="url(#warmLight)"
            stroke="hsl(var(--orange) / 0.6)"
            strokeWidth="1"
            rx="2"
          />
          <rect 
            x="125" y="90" 
            width="25" height="30" 
            fill="url(#warmLight)"
            stroke="hsl(var(--orange) / 0.6)"
            strokeWidth="1"
            rx="2"
          />
          
          {/* Door */}
          <rect 
            x="85" y="100" 
            width="30" height="40" 
            fill="hsl(173 40% 20%)"
            stroke="hsl(var(--teal) / 0.4)"
            strokeWidth="1"
            rx="2"
          />
          <circle 
            cx="108" cy="122" 
            r="2" 
            fill="hsl(var(--orange))"
          />
        </svg>

        {/* Sparkle effects */}
        <div 
          className="absolute -top-4 -right-4 text-teal animate-pulse"
          style={{ opacity: sparkleIntensity }}
        >
          <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div 
          className="absolute -top-2 -left-6 text-orange animate-pulse"
          style={{ opacity: sparkleIntensity, animationDelay: '0.3s' }}
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div 
          className="absolute top-8 -right-8 text-teal/70 animate-pulse"
          style={{ opacity: sparkleIntensity, animationDelay: '0.6s' }}
        >
          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-teal/40 animate-float-particle"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DreamHouseScene;
