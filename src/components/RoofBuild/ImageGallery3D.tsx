import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import multilevelRoofTeam from '@/assets/multilevel-roof-team.png';
import { useIsMobile } from '@/hooks/use-mobile';
import TestimonialReveal from './TestimonialReveal';

// Exponential ease-out for dramatic zoom effect (desktop)
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

// Gentler cubic ease-out for smoother mobile animations
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // MOBILE: Staggered non-overlapping timing with centered positioning
  // DESKTOP: Original billboard drive-by effect
  
  // Image 1 timing
  const anim1Start = 0.88;
  const anim1Duration = isMobile ? 0.035 : 0.05;
  const anim1Progress = progress >= anim1Start 
    ? Math.min(1, (progress - anim1Start) / anim1Duration) 
    : 0;
  
  // Image 2 timing - on mobile, spaced a bit later with a small overlap
  const anim2Start = isMobile ? 0.92 : 0.91;
  const anim2Duration = isMobile ? 0.035 : 0.04;
  const anim2Progress = progress >= anim2Start 
    ? Math.min(1, (progress - anim2Start) / anim2Duration)
    : 0;
  
  // Image 3 timing - mobile starts after Image 2 ends (0.92 + 0.035 = 0.955)
  const anim3Start = isMobile ? 0.955 : 0.935;
  const anim3Duration = isMobile ? 0.025 : 0.03;
  const anim3Progress = progress >= anim3Start 
    ? Math.min(1, (progress - anim3Start) / anim3Duration)
    : 0;
  
  // Don't render anything until first animation starts
  if (progress < anim1Start) return null;

  // Mobile fade timing: later fade-out start so images stay visible longer
  const mobileFadeOutStart = 0.88;
  const desktopFadeOutStart = 0.75;
  const fadeOutStart = isMobile ? mobileFadeOutStart : desktopFadeOutStart;

  // Image 1: drifts LEFT (right to left) on both mobile and desktop
  const left1Percent = isMobile 
    ? 60 - (anim1Progress * 70)   // Mobile: 60% → -10%
    : 55 - (anim1Progress * 85);
  const scale1 = isMobile 
    ? 0.4 + (anim1Progress * 1.2)   // Mobile: 0.4 → 1.6 (dramatic)
    : 0.25 + (anim1Progress * 1.3);
  const top1Percent = 50 - (Math.sin(anim1Progress * Math.PI) * (isMobile ? 12 : 15));
  const fadeInSpeed = isMobile ? 0.10 : 0.15;
  const opacity1 = anim1Progress < fadeInSpeed 
    ? anim1Progress / fadeInSpeed
    : anim1Progress > fadeOutStart 
      ? 1 - ((anim1Progress - fadeOutStart) / (1 - fadeOutStart))
      : 1;

  // Image 2: drifts RIGHT (left to right) on both mobile and desktop
  const left2Percent = isMobile 
    ? 40 + (anim2Progress * 70)   // Mobile: 40% → 110%
    : 45 + (anim2Progress * 85);
  const scale2 = isMobile 
    ? 0.4 + (anim2Progress * 1.2)
    : 0.25 + (anim2Progress * 1.3);
  const top2Percent = 50 - (Math.sin(anim2Progress * Math.PI) * (isMobile ? 12 : 15));
  const opacity2 = anim2Progress < fadeInSpeed 
    ? anim2Progress / fadeInSpeed
    : anim2Progress > fadeOutStart 
      ? 1 - ((anim2Progress - fadeOutStart) / (1 - fadeOutStart))
      : 1;

  // Image 3: drifts LEFT (same as image 1) on both mobile and desktop
  const left3Percent = isMobile 
    ? 60 - (anim3Progress * 70)   // Mobile: 60% → -10%
    : 55 - (anim3Progress * 85);
  const scale3 = isMobile 
    ? 0.4 + (anim3Progress * 1.2)
    : 0.25 + (anim3Progress * 1.3);
  const top3Percent = 50 - (Math.sin(anim3Progress * Math.PI) * (isMobile ? 12 : 15));
  const opacity3 = anim3Progress < fadeInSpeed 
    ? anim3Progress / fadeInSpeed
    : anim3Progress > fadeOutStart 
      ? 1 - ((anim3Progress - fadeOutStart) / (1 - fadeOutStart))
      : 1;

  // Image 4: starts after Image 3 ends (0.955 + 0.025 = 0.98)
  const anim4Start = isMobile ? 0.98 : 0.965;
  const anim4Duration = isMobile ? 0.02 : 0.035;  // Mobile: 2% scroll (98% → 100%)
  const anim4Progress = progress >= anim4Start 
    ? Math.min(1, (progress - anim4Start) / anim4Duration)
    : 0;
  
  // Apply even gentler easing on mobile - linear blend for maximum smoothness
  const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);
  const easedProgress4 = isMobile ? easeOutQuad(anim4Progress) : easeOutExpo(anim4Progress);
  
  // Scale: mobile uses simple smooth scale without overshoot, smaller range
  const baseScale4 = isMobile ? 0.4 : 0.05;  // Mobile: start bigger (less scale change)
  const maxScale4 = isMobile ? 1.1 : 1.15;   // Mobile: end slightly smaller
  const scale4 = isMobile
    ? baseScale4 + (easedProgress4 * (maxScale4 - baseScale4))  // Simple smooth scale
    : (() => {
        const scaleOvershoot = anim4Progress > 0.8 
          ? maxScale4 - ((anim4Progress - 0.8) / 0.2) * 0.15 
          : baseScale4 + (easedProgress4 * (maxScale4 - baseScale4 + 0.1));
        return Math.max(baseScale4, scaleOvershoot);
      })();
  
  // 3D rotation: minimal on mobile for smoothest effect
  const rotateY4 = 0;
  const rotateX4 = isMobile 
    ? -10 + (easedProgress4 * 10)   // Mobile: -10° → 0° (very gentle tilt)
    : -45 + (easedProgress4 * 45);
  
  // Vertical descent: starts above viewport, drops to center
  const top4Percent = -30 + (easedProgress4 * 65); // -30% → 35%
  
  // Opacity: quick fade in
  const opacity4 = anim4Progress < 0.15 
    ? anim4Progress / 0.15 
    : 1;
  
  // Light burst intensity: peaks at 40-60% of animation
  const lightBurstIntensity = Math.sin(anim4Progress * Math.PI) * 0.8;

  // Combined opacity for background - mobile stays constant to prevent flash
  const bgOpacity = isMobile ? 1 : Math.max(opacity1, opacity2, opacity3, opacity4);

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
                borderRadius: isMobile ? '20px' : '16px',
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
                  width: isMobile ? '85vw' : '65vw',
                  maxWidth: isMobile ? 'none' : '900px',
                  height: 'auto',
                  maxHeight: isMobile ? '60vh' : '65vh',
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
