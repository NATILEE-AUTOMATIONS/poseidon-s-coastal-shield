import React from 'react';
import poseidonRealWork from '@/assets/poseidon-real-work.png';

interface DoorwayRevealImageProps {
  progress: number; // 0-1 reveal progress
}

const DoorwayRevealImage: React.FC<DoorwayRevealImageProps> = ({ progress }) => {
  if (progress <= 0) return null;

  const opacity = Math.min(1, progress);
  const scale = progress; // 0 → 1
  const translateX = -50 + (progress * 50); // -50px → 0

  return (
    <div
      className="absolute left-6 md:left-12 lg:left-16 top-1/2 z-30 w-[85vw] md:w-[50vw] lg:w-[40vw] max-w-2xl"
      style={{
        opacity,
        transform: `translateY(-50%) translateX(${translateX}px) scale(${scale})`,
        transformOrigin: 'left center',
        transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
      }}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{
        boxShadow: `0 25px 80px -15px hsl(32 90% 50% / 0.3), 0 0 60px hsl(160 60% 40% / 0.2)`,
      }}>
        <img
          src={poseidonRealWork}
          alt="Poseidon Roofing team at work on a coastal NC home"
          className="w-full h-auto object-cover aspect-[4/3]"
        />
        {/* Subtle border glow */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            border: '1px solid hsl(160 60% 40% / 0.3)',
          }}
        />
      </div>
    </div>
  );
};

export default DoorwayRevealImage;
