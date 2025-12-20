import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import multilevelRoofTeam from '@/assets/multilevel-roof-team.png';
import TestimonialReveal from './TestimonialReveal';

// Exponential ease-out for dramatic zoom effect
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

interface ImageGallery3DProps {
  progress: number;
}

// DESKTOP ONLY - This component handles the billboard drive-by effect
// Images appear AFTER the user has fully entered the doorway (well after zoom complete)
const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  // Gallery background fade-in - starts very late, after user fully "enters" door
  const galleryBgStart = 0.995;
  
  // Much slower, more spread out timing for images
  // Each image gets more scroll distance to animate properly
  const anim1Start = 0.996;
  const anim1Duration = 0.0015; // Slower animation
  const anim1Progress = progress >= anim1Start 
    ? Math.min(1, (progress - anim1Start) / anim1Duration) 
    : 0;
  
  // Image 2 timing - later with more space
  const anim2Start = 0.9975;
  const anim2Duration = 0.0015;
  const anim2Progress = progress >= anim2Start 
    ? Math.min(1, (progress - anim2Start) / anim2Duration)
    : 0;
  
  // Image 3 timing
  const anim3Start = 0.999;
  const anim3Duration = 0.001;
  const anim3Progress = progress >= anim3Start 
    ? Math.min(1, (progress - anim3Start) / anim3Duration)
    : 0;
    
  const galleryBgOpacity = progress >= galleryBgStart 
    ? Math.min(1, (progress - galleryBgStart) / 0.002)
    : 0;
  
  // Don't render anything until background starts fading in
  if (progress < galleryBgStart) return null;

  // Fade timing
  const fadeOutStart = 0.75;
  const fadeInSpeed = 0.15;

  // Image 1: drifts LEFT
  const left1Percent = 55 - (anim1Progress * 85);
  const scale1 = 0.25 + (anim1Progress * 1.3);
  const top1Percent = 50 - (Math.sin(anim1Progress * Math.PI) * 15);
  const opacity1 = anim1Progress < fadeInSpeed 
    ? anim1Progress / fadeInSpeed
    : anim1Progress > fadeOutStart 
      ? 1 - ((anim1Progress - fadeOutStart) / (1 - fadeOutStart))
      : 1;

  // Image 2: drifts RIGHT
  const left2Percent = 45 + (anim2Progress * 85);
  const scale2 = 0.25 + (anim2Progress * 1.3);
  const top2Percent = 50 - (Math.sin(anim2Progress * Math.PI) * 15);
  const opacity2 = anim2Progress < fadeInSpeed 
    ? anim2Progress / fadeInSpeed
    : anim2Progress > fadeOutStart 
      ? 1 - ((anim2Progress - fadeOutStart) / (1 - fadeOutStart))
      : 1;

  // Image 3: drifts LEFT
  const left3Percent = 55 - (anim3Progress * 85);
  const scale3 = 0.25 + (anim3Progress * 1.3);
  const top3Percent = 50 - (Math.sin(anim3Progress * Math.PI) * 15);
  const opacity3 = anim3Progress < fadeInSpeed 
    ? anim3Progress / fadeInSpeed
    : anim3Progress > fadeOutStart 
      ? 1 - ((anim3Progress - fadeOutStart) / (1 - fadeOutStart))
      : 1;

  // Image 4 timing - the grand reveal, starts with first image
  const anim4Start = 0.996;
  const anim4Duration = 0.004;
  const anim4Progress = progress >= anim4Start 
    ? Math.min(1, (progress - anim4Start) / anim4Duration)
    : 0;
  
  const easedProgress4 = easeOutExpo(anim4Progress);
  
  // Scale with overshoot effect
  const baseScale4 = 0.05;
  const maxScale4 = 1.15;
  const scale4 = (() => {
    const scaleOvershoot = anim4Progress > 0.8 
      ? maxScale4 - ((anim4Progress - 0.8) / 0.2) * 0.15 
      : baseScale4 + (easedProgress4 * (maxScale4 - baseScale4 + 0.1));
    return Math.max(baseScale4, scaleOvershoot);
  })();
  
  // 3D rotation
  const rotateY4 = 0;
  const rotateX4 = -45 + (easedProgress4 * 45);
  
  // Vertical descent: starts above viewport, drops to center
  const top4Percent = -30 + (easedProgress4 * 65); // -30% → 35%
  
  // Opacity: quick fade in
  const opacity4 = anim4Progress < 0.15 
    ? anim4Progress / 0.15 
    : 1;
  
  // Light burst intensity: peaks at 40-60% of animation
  const lightBurstIntensity = Math.sin(anim4Progress * Math.PI) * 0.8;

  // Combined opacity for background
  const bgOpacity = Math.max(opacity1, opacity2, opacity3, opacity4);

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 105,
        perspective: '1200px',
        opacity: galleryBgOpacity,  // Smooth fade-in for entire gallery
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
              borderRadius: '12px',
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
                width: '60vw',
                maxWidth: '800px',
                height: 'auto',
                maxHeight: '55vh',
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
              borderRadius: '12px',
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
                width: '60vw',
                maxWidth: '800px',
                height: 'auto',
                maxHeight: '55vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      {/* Image 3 - drive-by from right to left (SAME AS IMAGE 1) */}
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
              borderRadius: '12px',
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
                width: '60vw',
                maxWidth: '800px',
                height: 'auto',
                maxHeight: '55vh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      {/* Image 4 - CINEMATIC GRAND REVEAL - 3D zoom from center */}
      {anim4Progress > 0 && opacity4 > 0 && (
        <>
          {/* Light burst behind image */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: `${top4Percent}%`,
              transform: 'translate(-50%, -50%)',
              width: '150vw',
              height: '150vh',
              background: `radial-gradient(ellipse 50% 50% at 50% 50%, 
                hsl(35 80% 55% / ${lightBurstIntensity * 0.6}) 0%,
                hsl(168 70% 40% / ${lightBurstIntensity * 0.3}) 30%,
                transparent 70%)`,
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />
          
          {/* The image with 3D transform */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: `${top4Percent}%`,
              transform: `translate(-50%, -50%) 
                perspective(1200px) 
                rotateY(${rotateY4}deg) 
                rotateX(${rotateX4}deg) 
                scale(${scale4})`,
              opacity: opacity4,
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '16px',
                boxShadow: `
                  0 0 ${30 + lightBurstIntensity * 40}px hsl(35 80% 50% / ${0.3 + lightBurstIntensity * 0.4}),
                  0 0 ${60 + lightBurstIntensity * 60}px hsl(168 70% 45% / ${0.2 + lightBurstIntensity * 0.3}),
                  0 8px 40px hsl(0 0% 0% / 0.5),
                  0 16px 80px hsl(0 0% 0% / 0.6),
                  0 32px 120px hsl(0 0% 0% / 0.4)
                `,
              }}
            >
              <img
                src={multilevelRoofTeam}
                alt="Multilevel coastal home with roofing crew"
                style={{
                  width: '65vw',
                  maxWidth: '900px',
                  height: 'auto',
                  maxHeight: '65vh',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </>
      )}
      
      {/* Testimonial Reveal */}
      <TestimonialReveal progress={progress} />
    </div>
  );
};

export default ImageGallery3D;
