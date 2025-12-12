import React, { useState, useEffect, useRef } from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import multilevelRoofTeam from '@/assets/multilevel-roof-team.png';
import { useIsMobile } from '@/hooks/use-mobile';
import TestimonialReveal from './TestimonialReveal';

// Easing functions
const easeOutExpo = (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeInQuad = (t: number): number => t * t;
const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);

interface ImageGallery3DProps {
  progress: number;
}

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  
  // Momentum damping for smoother scrolling - reduces sensitivity
  const [smoothProgress, setSmoothProgress] = useState(progress);
  const animationFrameRef = useRef<number>();
  
  useEffect(() => {
    const dampingFactor = isMobile ? 0.12 : 0.2; // Lower = smoother but laggier
    
    const updateSmooth = () => {
      setSmoothProgress(prev => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.0001) return progress;
        return prev + diff * dampingFactor;
      });
      animationFrameRef.current = requestAnimationFrame(updateSmooth);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateSmooth);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [progress, isMobile]);
  
  // Use smoothed progress for all animations on mobile
  const animProgress = isMobile ? smoothProgress : progress;
  
  // EXTENDED MOBILE TIMING - more scroll space for each image
  const anim1Start = isMobile ? 0.82 : 0.88;
  const anim1Duration = isMobile ? 0.06 : 0.05;  // 6% on mobile
  const anim1Progress = animProgress >= anim1Start 
    ? Math.min(1, (animProgress - anim1Start) / anim1Duration) 
    : 0;
  
  const anim2Start = isMobile ? 0.88 : 0.91;
  const anim2Duration = isMobile ? 0.055 : 0.04;  // 5.5% on mobile
  const anim2Progress = animProgress >= anim2Start 
    ? Math.min(1, (animProgress - anim2Start) / anim2Duration)
    : 0;
  
  const anim3Start = isMobile ? 0.935 : 0.935;
  const anim3Duration = isMobile ? 0.04 : 0.03;  // 4% on mobile
  const anim3Progress = animProgress >= anim3Start 
    ? Math.min(1, (animProgress - anim3Start) / anim3Duration)
    : 0;
  
  const anim4Start = isMobile ? 0.975 : 0.965;
  const anim4Duration = isMobile ? 0.025 : 0.035;
  const anim4Progress = animProgress >= anim4Start 
    ? Math.min(1, (animProgress - anim4Start) / anim4Duration)
    : 0;

  // Don't render until first animation starts (with buffer for smooth entry)
  if (animProgress < anim1Start - 0.01) return null;

  // Apply smooth easing to all mobile animations
  const easedAnim1 = isMobile ? easeOutCubic(anim1Progress) : anim1Progress;
  const easedAnim2 = isMobile ? easeOutCubic(anim2Progress) : anim2Progress;
  const easedAnim3 = isMobile ? easeOutCubic(anim3Progress) : anim3Progress;
  const easedProgress4 = isMobile ? easeOutQuad(anim4Progress) : easeOutExpo(anim4Progress);

  // Fade timing with eased curves
  const fadeInSpeed = isMobile ? 0.25 : 0.15;  // Slower fade-in
  const fadeOutStart = isMobile ? 0.80 : 0.75;

  // Eased opacity function for smoother fades
  const calcOpacity = (progress: number): number => {
    if (progress <= 0) return 0;
    if (progress < fadeInSpeed) {
      return easeInQuad(progress / fadeInSpeed); // Gentle fade-in curve
    }
    if (progress > fadeOutStart) {
      return 1 - easeOutCubic((progress - fadeOutStart) / (1 - fadeOutStart));
    }
    return 1;
  };

  // Image 1: drifts LEFT - reduced movement speed
  const left1Percent = isMobile 
    ? 50 - (easedAnim1 * 45)   // 50% → 5% (shorter, centered drift)
    : 55 - (anim1Progress * 85);
  const scale1 = isMobile 
    ? easedAnim1 * 1.4   // 0 → 1.4 (starts invisible!)
    : 0.25 + (anim1Progress * 1.3);
  const top1Percent = 50 - (Math.sin(easedAnim1 * Math.PI) * (isMobile ? 5 : 15));
  const opacity1 = calcOpacity(anim1Progress);

  // Image 2: drifts RIGHT - reduced movement speed
  const left2Percent = isMobile 
    ? 50 + (easedAnim2 * 45)   // 50% → 95% (shorter, centered drift)
    : 45 + (anim2Progress * 85);
  const scale2 = isMobile 
    ? easedAnim2 * 1.4   // 0 → 1.4
    : 0.25 + (anim2Progress * 1.3);
  const top2Percent = 50 - (Math.sin(easedAnim2 * Math.PI) * (isMobile ? 5 : 15));
  const opacity2 = calcOpacity(anim2Progress);

  // Image 3: drifts LEFT
  const left3Percent = isMobile 
    ? 50 - (easedAnim3 * 45)
    : 55 - (anim3Progress * 85);
  const scale3 = isMobile 
    ? easedAnim3 * 1.4
    : 0.25 + (anim3Progress * 1.3);
  const top3Percent = 50 - (Math.sin(easedAnim3 * Math.PI) * (isMobile ? 5 : 15));
  const opacity3 = calcOpacity(anim3Progress);

  // Image 4: Cinematic reveal
  const baseScale4 = isMobile ? 0 : 0.05;
  const maxScale4 = isMobile ? 1.1 : 1.15;
  const scale4 = isMobile
    ? easedProgress4 * maxScale4
    : (() => {
        const scaleOvershoot = anim4Progress > 0.8 
          ? maxScale4 - ((anim4Progress - 0.8) / 0.2) * 0.15 
          : baseScale4 + (easedProgress4 * (maxScale4 - baseScale4 + 0.1));
        return Math.max(baseScale4, scaleOvershoot);
      })();
  
  const rotateY4 = 0;
  const rotateX4 = isMobile 
    ? -8 + (easedProgress4 * 8)   // Even gentler tilt
    : -45 + (easedProgress4 * 45);
  
  const top4Percent = -30 + (easedProgress4 * 65);
  
  const opacity4 = anim4Progress < 0.2 
    ? easeInQuad(anim4Progress / 0.2)
    : 1;
  
  const lightBurstIntensity = Math.sin(anim4Progress * Math.PI) * 0.8;

  // Constant background - no flickering
  const bgOpacity = 1;

  // CSS transition for extra smoothing layer
  const imageTransition = isMobile 
    ? 'opacity 0.15s ease-out, transform 0.1s ease-out' 
    : 'none';

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 105,
        perspective: '1200px',
        background: `radial-gradient(ellipse 80% 60% at 70% 30%, 
          hsl(25 40% 15% / ${bgOpacity * 0.95}) 0%, 
          hsl(20 30% 8% / ${bgOpacity}) 50%,
          hsl(15 20% 5% / ${bgOpacity}) 100%)`,
      }}
    >
      {/* Image 1 */}
      <div
        className="absolute"
        style={{
          left: `${left1Percent}%`,
          top: `${top1Percent}%`,
          transform: `translate(-50%, -50%) scale(${scale1})`,
          opacity: opacity1,
          transformStyle: 'preserve-3d',
          transition: imageTransition,
          willChange: 'transform, opacity',
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
              width: isMobile ? '85vw' : '60vw',
              maxWidth: isMobile ? 'none' : '800px',
              height: 'auto',
              maxHeight: isMobile ? '50vh' : '55vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Image 2 */}
      <div
        className="absolute"
        style={{
          left: `${left2Percent}%`,
          top: `${top2Percent}%`,
          transform: `translate(-50%, -50%) scale(${scale2})`,
          opacity: opacity2,
          transformStyle: 'preserve-3d',
          transition: imageTransition,
          willChange: 'transform, opacity',
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
              width: isMobile ? '85vw' : '60vw',
              maxWidth: isMobile ? 'none' : '800px',
              height: 'auto',
              maxHeight: isMobile ? '50vh' : '55vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Image 3 */}
      <div
        className="absolute"
        style={{
          left: `${left3Percent}%`,
          top: `${top3Percent}%`,
          transform: `translate(-50%, -50%) scale(${scale3})`,
          opacity: opacity3,
          transformStyle: 'preserve-3d',
          transition: imageTransition,
          willChange: 'transform, opacity',
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
              width: isMobile ? '85vw' : '60vw',
              maxWidth: isMobile ? 'none' : '800px',
              height: 'auto',
              maxHeight: isMobile ? '50vh' : '55vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Image 4 - Cinematic Grand Reveal */}
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
          transition: imageTransition,
          willChange: 'transform, opacity',
        }}
      >
        {/* Light burst behind image */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            transform: 'scale(3)',
            background: `radial-gradient(ellipse 50% 50% at 50% 50%, 
              hsl(35 80% 55% / ${lightBurstIntensity * 0.6}) 0%,
              hsl(168 70% 40% / ${lightBurstIntensity * 0.3}) 30%,
              transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        
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
              width: isMobile ? '80vw' : '65vw',
              maxWidth: isMobile ? 'none' : '900px',
              height: 'auto',
              maxHeight: isMobile ? '55vh' : '65vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>
      
      {/* Testimonial Reveal */}
      <TestimonialReveal progress={animProgress} />
    </div>
  );
};

export default ImageGallery3D;