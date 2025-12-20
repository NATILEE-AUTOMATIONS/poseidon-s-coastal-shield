import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import coastalRoofInProgress from '@/assets/coastal-roof-inprogress.png';
import aerialEstatePool from '@/assets/aerial-estate-pool.png';
import multilevelRoofTeam from '@/assets/multilevel-roof-team.png';
import TestimonialReveal from './TestimonialReveal';

interface ImageGallery3DProps {
  progress: number;
}

// DESKTOP ONLY - Simple sequential image reveal after entering doorway
const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  // Image 1 starts when entering the doorway (around 0.85 progress)
  const img1Start = 0.85;
  const img1End = 0.94;
  
  // Gallery background starts later
  const galleryStart = 0.995;
  
  // Calculate image 1 progress separately (appears earlier)
  const img1Progress = progress < img1Start ? 0 
    : progress > img1End ? 1 
    : (progress - img1Start) / (img1End - img1Start);
  
  // Don't render anything until image 1 should start
  if (progress < img1Start) return null;
  
  // Normalize progress within gallery section (0.995 to 1.0 = 0 to 1)
  const galleryRange = 1.0 - galleryStart;
  const normalizedProgress = progress < galleryStart ? 0 : (progress - galleryStart) / galleryRange;
  
  // Background fade in first 20% of gallery (only after gallery starts)
  const bgOpacity = progress < galleryStart ? 0 : Math.min(1, normalizedProgress / 0.2);
  
  // Images 2-4 use the old gallery timing
  // Image 2: 30% to 60% of gallery progress
  const img2Progress = normalizedProgress < 0.3 ? 0 
    : normalizedProgress > 0.6 ? 1 
    : (normalizedProgress - 0.3) / 0.3;
  
  // Image 3: 50% to 80% of gallery progress
  const img3Progress = normalizedProgress < 0.5 ? 0 
    : normalizedProgress > 0.8 ? 1 
    : (normalizedProgress - 0.5) / 0.3;
  
  // Final hero image: 70% to 100% of gallery progress
  const img4Progress = normalizedProgress < 0.7 ? 0 
    : normalizedProgress > 1.0 ? 1 
    : (normalizedProgress - 0.7) / 0.3;

  // Simple easing
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Image 1 animation - expands from nothing, user walks by it
  // Starts tiny and centered, grows and shifts as user "passes" it
  const img1Opacity = img1Progress < 0.15 
    ? img1Progress / 0.15  // Fade in first 15%
    : img1Progress > 0.85 
      ? 1 - ((img1Progress - 0.85) / 0.15)  // Fade out last 15%
      : 1;
  const img1Scale = easeOut(Math.min(img1Progress * 2, 1)); // Scale 0->1 in first half
  const img1Y = -easeOut(img1Progress) * 200; // Moves up as user "passes" it

  // Image 2 animation - slides in from left, fades out
  const img2Opacity = img2Progress < 0.3 
    ? img2Progress / 0.3 
    : img2Progress > 0.7 
      ? 1 - ((img2Progress - 0.7) / 0.3) 
      : 1;
  const img2X = -100 + (easeOut(img2Progress) * 150); // Starts left, moves right
  const img2Scale = 0.5 + (easeOut(img2Progress) * 0.6);

  // Image 3 animation - slides in from right
  const img3Opacity = img3Progress < 0.3 
    ? img3Progress / 0.3 
    : img3Progress > 0.7 
      ? 1 - ((img3Progress - 0.7) / 0.3) 
      : 1;
  const img3X = 100 - (easeOut(img3Progress) * 150);
  const img3Scale = 0.5 + (easeOut(img3Progress) * 0.6);

  // Image 4 (hero) - dramatic center zoom, stays visible
  const img4Opacity = img4Progress < 0.2 ? img4Progress / 0.2 : 1;
  const img4Scale = 0.3 + (easeOut(img4Progress) * 0.8);
  const img4Y = 50 - (easeOut(img4Progress) * 50); // Drops from above

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 105,
        opacity: bgOpacity,
        background: `radial-gradient(ellipse 100% 80% at 50% 40%, 
          hsl(25 50% 12% / 0.98) 0%, 
          hsl(20 40% 8% / 1) 50%,
          hsl(15 30% 5% / 1) 100%)`,
      }}
    >
      {/* Image 1 - expands from nothing, user walks by */}
      {img1Progress > 0 && img1Opacity > 0.01 && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, calc(-50% + ${img1Y}px)) scale(${img1Scale})`,
            opacity: img1Opacity,
          }}
        >
          <div
            className="overflow-hidden rounded-xl"
            style={{
              boxShadow: '0 20px 60px hsl(0 0% 0% / 0.6), 0 10px 30px hsl(0 0% 0% / 0.4)',
            }}
          >
            <img
              src={coastalRoofImage}
              alt="Completed coastal roof project"
              className="w-[50vw] max-w-[700px] h-auto max-h-[50vh] object-cover"
            />
          </div>
        </div>
      )}

      {/* Image 2 - slides from left */}
      {img2Progress > 0 && img2Opacity > 0.01 && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${img2X}px), -50%) scale(${img2Scale})`,
            opacity: img2Opacity,
          }}
        >
          <div
            className="overflow-hidden rounded-xl"
            style={{
              boxShadow: '0 20px 60px hsl(0 0% 0% / 0.6), 0 10px 30px hsl(0 0% 0% / 0.4)',
            }}
          >
            <img
              src={coastalRoofInProgress}
              alt="Coastal roof in progress"
              className="w-[50vw] max-w-[700px] h-auto max-h-[50vh] object-cover"
            />
          </div>
        </div>
      )}

      {/* Image 3 - slides from right */}
      {img3Progress > 0 && img3Opacity > 0.01 && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${img3X}px), -50%) scale(${img3Scale})`,
            opacity: img3Opacity,
          }}
        >
          <div
            className="overflow-hidden rounded-xl"
            style={{
              boxShadow: '0 20px 60px hsl(0 0% 0% / 0.6), 0 10px 30px hsl(0 0% 0% / 0.4)',
            }}
          >
            <img
              src={aerialEstatePool}
              alt="Aerial view of estate with pool"
              className="w-[50vw] max-w-[700px] h-auto max-h-[50vh] object-cover"
            />
          </div>
        </div>
      )}

      {/* Image 4 - Hero reveal, drops from top center */}
      {img4Progress > 0 && img4Opacity > 0.01 && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '45%',
            transform: `translate(-50%, calc(-50% + ${img4Y}px)) scale(${img4Scale})`,
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
      )}
      
      {/* Testimonial Reveal */}
      <TestimonialReveal progress={progress} />
    </div>
  );
};

export default ImageGallery3D;