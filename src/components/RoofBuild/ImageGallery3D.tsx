import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import { useIsMobile } from '@/hooks/use-mobile';
import TestimonialReveal from './TestimonialReveal';

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Image 1: Animation starts at 88% scroll (drifts LEFT)
  const anim1Start = 0.88;
  const anim1Progress = progress >= anim1Start 
    ? Math.min(1, (progress - anim1Start) / 0.08) 
    : 0;
  
  // Image 2: Animation starts at 92.5% scroll (drifts RIGHT - mirrored)
  const anim2Start = 0.925;
  const anim2Progress = progress >= anim2Start 
    ? Math.min(1, (progress - anim2Start) / 0.055)
    : 0;
  
  // Image 3: Animation starts at 97% scroll (drifts LEFT from top-right, NO FADE OUT)
  const anim3Start = 0.97;
  const anim3Progress = progress >= anim3Start 
    ? Math.min(1, (progress - anim3Start) / 0.03)
    : 0;
  
  // Don't render anything until first animation starts
  if (progress < anim1Start) return null;

  // Image 1: Position drifts LEFT (55% → -30%)
  const left1Percent = 55 - (anim1Progress * 85);
  const scale1 = 0.25 + (anim1Progress * 1.3);
  const top1Percent = 50 - (Math.sin(anim1Progress * Math.PI) * 15);
  const fadeOutStart = 0.75;
  const opacity1 = anim1Progress < 0.1 
    ? anim1Progress * 10
    : anim1Progress > fadeOutStart 
      ? 1 - ((anim1Progress - fadeOutStart) / (1 - fadeOutStart))
      : 1;

  // Image 2: Position drifts RIGHT (45% → 130%) - MIRRORED
  const left2Percent = 45 + (anim2Progress * 85);
  const scale2 = 0.25 + (anim2Progress * 1.3);
  const top2Percent = 50 - (Math.sin(anim2Progress * Math.PI) * 15);
  const opacity2 = anim2Progress < 0.1 
    ? anim2Progress * 10
    : anim2Progress > fadeOutStart 
      ? 1 - ((anim2Progress - fadeOutStart) / (1 - fadeOutStart))
      : 1;

  // Image 3: Position drifts LEFT (55% → -30%) - SAME AS IMAGE 1, NO FADE OUT
  const left3Percent = 55 - (anim3Progress * 85);
  const scale3 = 0.25 + (anim3Progress * 1.3);
  const top3Percent = 50 - (Math.sin(anim3Progress * Math.PI) * 15);
  const opacity3 = anim3Progress < 0.1 
    ? anim3Progress * 10
    : 1; // No fade out - stays visible with testimonial

  // Combined opacity for background (max of all three)
  const bgOpacity = Math.max(opacity1, opacity2, opacity3);

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 105,
        perspective: '1200px',
        background: `radial-gradient(ellipse 80% 60% at 70% 30%, 
          hsl(25 40% 15% / ${Math.min(bgOpacity, 0.95)}) 0%, 
          hsl(20 30% 8% / ${Math.min(bgOpacity, 1)}) 50%,
          hsl(15 20% 5% / ${Math.min(bgOpacity, 1)}) 100%)`,
      }}
    >
      {/* Image 1 - drive-by from right to left */}
      {anim1Progress > 0 && opacity1 > 0 && (
        <div
          className="absolute"
          style={{
            left: `${left1Percent}%`,
            top: `${top1Percent}%`,
            transform: `translate(-50%, -50%) scale(${scale1})`,
            opacity: opacity1,
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: isMobile ? '16px' : '12px',
              boxShadow: `
                0 4px 20px hsl(0 0% 0% / 0.4),
                0 8px 40px hsl(0 0% 0% / 0.5),
                0 16px 60px hsl(0 0% 0% / 0.6)
              `,
            }}
          >
            <img
              src={coastalRoofImage}
              alt="Completed coastal roof project"
              style={{
                width: isMobile ? '90vw' : '60vw',
                maxWidth: isMobile ? 'none' : '800px',
                height: 'auto',
                maxHeight: isMobile ? '55vh' : '55vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      {/* Image 2 - drive-by from left to right (MIRRORED) */}
      {anim2Progress > 0 && opacity2 > 0 && (
        <div
          className="absolute"
          style={{
            left: `${left2Percent}%`,
            top: `${top2Percent}%`,
            transform: `translate(-50%, -50%) scale(${scale2})`,
            opacity: opacity2,
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: isMobile ? '16px' : '12px',
              boxShadow: `
                0 4px 20px hsl(0 0% 0% / 0.4),
                0 8px 40px hsl(0 0% 0% / 0.5),
                0 16px 60px hsl(0 0% 0% / 0.6)
              `,
            }}
          >
            <img
              src={coastalRoofInProgress}
              alt="Coastal roof in progress"
              style={{
                width: isMobile ? '90vw' : '60vw',
                maxWidth: isMobile ? 'none' : '800px',
                height: 'auto',
                maxHeight: isMobile ? '55vh' : '55vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      {/* Image 3 - drive-by from right to left (HERO SHOT - stays visible with testimonial) */}
      {anim3Progress > 0 && opacity3 > 0 && (
        <div
          className="absolute"
          style={{
            left: `${left3Percent}%`,
            top: `${top3Percent}%`,
            transform: `translate(-50%, -50%) scale(${scale3})`,
            opacity: opacity3,
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: isMobile ? '16px' : '12px',
              boxShadow: `
                0 4px 20px hsl(0 0% 0% / 0.4),
                0 8px 40px hsl(0 0% 0% / 0.5),
                0 16px 60px hsl(0 0% 0% / 0.6)
              `,
            }}
          >
            <img
              src={aerialEstatePool}
              alt="Aerial view of estate with pool"
              style={{
                width: isMobile ? '90vw' : '60vw',
                maxWidth: isMobile ? 'none' : '800px',
                height: 'auto',
                maxHeight: isMobile ? '55vh' : '55vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}
      
      {/* Testimonial Reveal */}
      <TestimonialReveal progress={progress} />
    </div>
  );
};

export default ImageGallery3D;
