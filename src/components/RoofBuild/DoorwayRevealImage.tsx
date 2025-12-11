import React from 'react';
import poseidonRealWork from '@/assets/poseidon-real-work.png';

interface DoorwayRevealImageProps {
  progress: number; // 0-1 reveal progress
}

const DoorwayRevealImage: React.FC<DoorwayRevealImageProps> = ({ progress }) => {
  if (progress <= 0) return null;

  const opacity = Math.min(1, progress);
  const scale = 0.3 + (progress * 0.7); // 0.3 → 1.0

  return (
    <div
      className="absolute inset-0 z-30 overflow-hidden"
      style={{
        opacity,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      <img
        src={poseidonRealWork}
        alt="Poseidon Roofing team at work on a coastal NC home"
        className="w-full h-full object-cover"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out',
        }}
      />
      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(160 30% 6% / 0.6) 100%)',
        }}
      />
    </div>
  );
};

export default DoorwayRevealImage;
