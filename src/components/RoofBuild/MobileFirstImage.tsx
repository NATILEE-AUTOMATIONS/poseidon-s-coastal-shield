import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import coastalHomeCrew from '@/assets/coastal-home-crew.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';

interface MobileFirstImageProps {
  progress: number;
}

const MobileFirstImage: React.FC<MobileFirstImageProps> = ({ progress }) => {
  // Show gallery after doorway zoom completes
  const galleryStart = 0.88;
  const isVisible = progress >= galleryStart - 0.02;

  // Testimonial data
  const name = "Bruce Gombar";
  const quote1 = "We were very pleased with the final results of our roof replacement";
  const quote2 = "We had some minor issues";
  const quote3 = "But they were quickly corrected once we contacted the team";

  if (!isVisible) return null;

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-start pt-16 px-4 pb-8"
      style={{
        background: `radial-gradient(ellipse at center, hsl(35 40% 15% / 0.95) 0%, hsl(25 30% 8% / 0.98) 100%)`,
      }}
    >
      {/* Main Content Stack - flows naturally */}
      <div className="flex flex-col items-center gap-5 w-full max-w-[500px]">
        
        {/* Stars */}
        <div className="flex gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="text-5xl"
              style={{
                filter: `drop-shadow(0 0 12px hsl(35 80% 55%)) drop-shadow(0 0 24px hsl(35 70% 45%))`,
                color: 'hsl(35 80% 55%)',
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Name */}
        <div 
          className="text-4xl md:text-5xl font-bold tracking-widest uppercase"
          style={{ 
            color: 'hsl(35 60% 70%)',
            textShadow: '0 0 20px hsl(35 70% 55% / 0.6), 0 0 40px hsl(35 60% 45% / 0.3)',
          }}
        >
          {name}
        </div>

        {/* Image 1 */}
        <div className="relative w-[88vw] max-w-[500px]">
          <img
            src={coastalRoofImage}
            alt="Beautiful coastal roof project"
            className="w-full max-h-[40vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 20px 40px hsl(0 0% 0% / 0.4),
                0 0 30px hsl(35 60% 50% / 0.3),
                0 0 60px hsl(168 70% 45% / 0.15)
              `,
            }}
          />
        </div>

        {/* Quote 1 */}
        <div 
          className="text-xl md:text-2xl max-w-[360px] leading-relaxed text-center italic"
          style={{ 
            color: 'hsl(35 30% 65%)',
            textShadow: '0 0 15px hsl(35 50% 50% / 0.3)',
          }}
        >
          "{quote1}"
        </div>

        {/* Image 2 */}
        <div className="relative w-[88vw] max-w-[500px]">
          <img
            src={coastalRoofInProgress}
            alt="Coastal roof in progress"
            className="w-full max-h-[40vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 20px 40px hsl(0 0% 0% / 0.4),
                0 0 30px hsl(35 60% 50% / 0.3),
                0 0 60px hsl(168 70% 45% / 0.15)
              `,
            }}
          />
        </div>

        {/* Quote 2 */}
        <div 
          className="text-lg max-w-[320px] leading-relaxed text-center italic"
          style={{ 
            color: 'hsl(25 50% 65%)',
            textShadow: '0 0 15px hsl(25 60% 50% / 0.4)',
          }}
        >
          "{quote2}"
        </div>

        {/* Image 3 */}
        <div className="relative w-[88vw] max-w-[500px]">
          <img
            src={coastalHomeCrew}
            alt="Poseidon roofing team"
            className="w-full max-h-[40vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 20px 40px hsl(0 0% 0% / 0.5),
                0 0 40px hsl(35 70% 55% / 0.4),
                0 0 80px hsl(168 70% 45% / 0.2)
              `,
            }}
          />
        </div>

        {/* Quote 3 */}
        <div 
          className="text-lg max-w-[340px] leading-relaxed text-center italic"
          style={{ 
            color: 'hsl(35 45% 70%)',
            textShadow: '0 0 15px hsl(35 60% 55% / 0.4)',
          }}
        >
          "{quote3}"
        </div>

        {/* Image 4 - Hero Finale */}
        <div className="relative w-[92vw] max-w-[550px]">
          <img
            src={aerialEstatePool}
            alt="Stunning aerial view of completed estate with pool"
            className="w-full max-h-[45vh] object-cover rounded-xl"
            style={{
              boxShadow: `
                0 25px 50px hsl(0 0% 0% / 0.5),
                0 0 40px hsl(35 80% 55% / 0.5),
                0 0 80px hsl(35 70% 50% / 0.3),
                0 0 120px hsl(168 70% 45% / 0.2),
                inset 0 0 30px hsl(35 60% 50% / 0.1)
              `,
              border: `1px solid hsl(168 70% 45% / 0.3)`,
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default MobileFirstImage;
