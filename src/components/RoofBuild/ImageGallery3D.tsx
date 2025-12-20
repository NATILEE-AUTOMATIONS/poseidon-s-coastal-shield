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
  // Gallery starts very late - after user fully enters the door
  const galleryStart = 0.995;
  
  // Don't render until we reach the gallery section
  if (progress < galleryStart) return null;
  
  // Normalize progress within gallery section (0.995 to 1.0 = 0 to 1)
  const galleryRange = 1.0 - galleryStart; // 0.005
  const normalizedProgress = (progress - galleryStart) / galleryRange;
  
  // Background fade in first 20% of gallery
  const bgOpacity = Math.min(1, normalizedProgress / 0.2);
  
  // Image 1: 10% to 40% of gallery progress
  const img1Start = 0.1;
  const img1End = 0.4;
  const img1Progress = normalizedProgress < img1Start ? 0 
    : normalizedProgress > img1End ? 1 
    : (normalizedProgress - img1Start) / (img1End - img1Start);
  
  // Image 2: 30% to 60% of gallery progress (overlaps slightly with img1)
  const img2Start = 0.3;
  const img2End = 0.6;
  const img2Progress = normalizedProgress < img2Start ? 0 
    : normalizedProgress > img2End ? 1 
    : (normalizedProgress - img2Start) / (img2End - img2Start);
  
  // Image 3: 50% to 80% of gallery progress
  const img3Start = 0.5;
  const img3End = 0.8;
  const img3Progress = normalizedProgress < img3Start ? 0 
    : normalizedProgress > img3End ? 1 
    : (normalizedProgress - img3Start) / (img3End - img3Start);
  
  // Final hero image: 70% to 100% of gallery progress
  const img4Start = 0.7;
  const img4End = 1.0;
  const img4Progress = normalizedProgress < img4Start ? 0 
    : normalizedProgress > img4End ? 1 
    : (normalizedProgress - img4Start) / (img4End - img4Start);

  // Simple easing
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Image 1 animation - slides in from right, fades out
  const img1Opacity = img1Progress < 0.3 
    ? img1Progress / 0.3 
    : img1Progress > 0.7 
      ? 1 - ((img1Progress - 0.7) / 0.3) 
      : 1;
  const img1X = 100 - (easeOut(img1Progress) * 150); // Starts right, moves left
  const img1Scale = 0.5 + (easeOut(img1Progress) * 0.6);

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
      {/* Image 1 - slides from right */}
      {img1Progress > 0 && img1Opacity > 0.01 && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${img1X}px), -50%) scale(${img1Scale})`,
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