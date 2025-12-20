import React from 'react';
import coastalHomeRoofing from '@/assets/coastal-home-roofing.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import multilevelRoofTeam from '@/assets/multilevel-roof-team.png';
import TestimonialReveal from './TestimonialReveal';

interface ImageGallery3DProps {
  progress: number;
}

// DESKTOP ONLY - Smooth sequential image reveal after entering doorway
const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  // All images appear after door zoom starts (around 0.82+)
  const img1Start = 0.82;
  const img1End = 0.90;
  
  const img2Start = 0.88;
  const img2End = 0.94;
  
  const img3Start = 0.92;
  const img3End = 0.97;
  
  const img4Start = 0.95;
  const img4End = 1.0;
  
  // Calculate individual image progress
  const calcProgress = (start: number, end: number) => 
    progress < start ? 0 : progress > end ? 1 : (progress - start) / (end - start);
  
  const img1Progress = calcProgress(img1Start, img1End);
  const img2Progress = calcProgress(img2Start, img2End);
  const img3Progress = calcProgress(img3Start, img3End);
  const img4Progress = calcProgress(img4Start, img4End);
  
  // Don't render anything until first image should start
  if (progress < img1Start) return null;
  
  // Smooth easing
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // Image 1 animation - expands from center, user "walks by" it
  const img1Opacity = img1Progress < 0.15 
    ? img1Progress / 0.15 
    : img1Progress > 0.85 
      ? 1 - ((img1Progress - 0.85) / 0.15) 
      : 1;
  const img1Scale = 0.2 + easeOut(Math.min(img1Progress * 2, 1)) * 0.8;
  const img1Y = -easeInOut(img1Progress) * 180;

  // Image 2 animation - slides from left
  const img2Opacity = img2Progress < 0.2 
    ? img2Progress / 0.2 
    : img2Progress > 0.8 
      ? 1 - ((img2Progress - 0.8) / 0.2) 
      : 1;
  const img2X = -120 + easeOut(img2Progress) * 160;
  const img2Scale = 0.3 + easeOut(img2Progress) * 0.7;
  const img2Y = -easeInOut(img2Progress) * 120;

  // Image 3 animation - slides from right
  const img3Opacity = img3Progress < 0.2 
    ? img3Progress / 0.2 
    : img3Progress > 0.8 
      ? 1 - ((img3Progress - 0.8) / 0.2) 
      : 1;
  const img3X = 120 - easeOut(img3Progress) * 160;
  const img3Scale = 0.3 + easeOut(img3Progress) * 0.7;
  const img3Y = -easeInOut(img3Progress) * 100;

  // Image 4 (hero) - dramatic center zoom, stays visible
  const img4Opacity = img4Progress < 0.3 ? img4Progress / 0.3 : 1;
  const img4Scale = 0.2 + easeOut(img4Progress) * 0.9;
  const img4Y = 80 - easeOut(img4Progress) * 80;

  // Background gradually fades in
  const bgOpacity = progress < 0.85 ? 0 : Math.min(1, (progress - 0.85) / 0.1);

  return (
    <>
      {/* Gallery background - appears behind images */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 140,
          opacity: bgOpacity,
          background: `radial-gradient(ellipse 100% 80% at 50% 40%, 
            hsl(25 50% 12% / 0.98) 0%, 
            hsl(20 40% 8% / 1) 50%,
            hsl(15 30% 5% / 1) 100%)`,
        }}
      />

      {/* Image 1 - appears first when entering doorway */}
      {img1Progress > 0 && img1Opacity > 0.01 && (
        <div
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
          style={{ zIndex: 150 }}
        >
          <div
            style={{
              transform: `translateY(${img1Y}px) scale(${img1Scale})`,
              opacity: img1Opacity,
            }}
          >
            <div
              className="overflow-hidden rounded-xl"
              style={{
                boxShadow: '0 25px 80px hsl(0 0% 0% / 0.7), 0 10px 40px hsl(0 0% 0% / 0.5)',
              }}
            >
              <img
                src={coastalHomeRoofing}
                alt="Coastal home roofing project"
                className="w-[55vw] max-w-[750px] h-auto max-h-[55vh] object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Image 2 - slides from left */}
      {img2Progress > 0 && img2Opacity > 0.01 && (
        <div
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
          style={{ zIndex: 151 }}
        >
          <div
            style={{
              transform: `translate(${img2X}px, ${img2Y}px) scale(${img2Scale})`,
              opacity: img2Opacity,
            }}
          >
            <div
              className="overflow-hidden rounded-xl"
              style={{
                boxShadow: '0 25px 80px hsl(0 0% 0% / 0.7), 0 10px 40px hsl(0 0% 0% / 0.5)',
              }}
            >
              <img
                src={coastalRoofInProgress}
                alt="Coastal roof in progress"
                className="w-[50vw] max-w-[700px] h-auto max-h-[50vh] object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Image 3 - slides from right */}
      {img3Progress > 0 && img3Opacity > 0.01 && (
        <div
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
          style={{ zIndex: 152 }}
        >
          <div
            style={{
              transform: `translate(${img3X}px, ${img3Y}px) scale(${img3Scale})`,
              opacity: img3Opacity,
            }}
          >
            <div
              className="overflow-hidden rounded-xl"
              style={{
                boxShadow: '0 25px 80px hsl(0 0% 0% / 0.7), 0 10px 40px hsl(0 0% 0% / 0.5)',
              }}
            >
              <img
                src={aerialEstatePool}
                alt="Aerial view of estate with pool"
                className="w-[50vw] max-w-[700px] h-auto max-h-[50vh] object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Image 4 - Hero reveal, drops from top center */}
      {img4Progress > 0 && img4Opacity > 0.01 && (
        <div
          className="fixed inset-0 pointer-events-none flex items-center justify-center"
          style={{ zIndex: 153 }}
        >
          <div
            style={{
              transform: `translateY(${img4Y}px) scale(${img4Scale})`,
              opacity: img4Opacity,
            }}
          >
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                boxShadow: `
                  0 0 60px hsl(35 80% 50% / 0.3),
                  0 0 100px hsl(168 70% 45% / 0.2),
                  0 30px 80px hsl(0 0% 0% / 0.6)
                `,
              }}
            >
              <img
                src={multilevelRoofTeam}
                alt="Multilevel coastal home with roofing crew"
                className="w-[60vw] max-w-[850px] h-auto max-h-[60vh] object-cover"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Testimonial Reveal */}
      <TestimonialReveal progress={progress} />
    </>
  );
};

export default ImageGallery3D;
