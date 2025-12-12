import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import inProgressImage from '@/assets/coastal-roof-inprogress.png';

interface ImageGallery3DProps {
  progress: number;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  position: { x: number; y: number };
  startProgress: number;
  endProgress: number;
  initialRotation: { x: number; y: number };
  finalRotation: { x: number; y: number };
  initialZ: number;
  finalZ: number;
  scale: { start: number; end: number };
  zIndex: number;
  size: { maxWidth: string; maxHeight: string };
}

const galleryImages: GalleryImage[] = [
  {
    id: 'completed-roof',
    src: coastalRoofImage,
    alt: 'Beautiful completed coastal roof project by Poseidon Roofing',
    position: { x: 15, y: -8 },
    startProgress: 0.86,
    endProgress: 0.94,
    initialRotation: { x: -8, y: -25 },
    finalRotation: { x: -2, y: -5 },
    initialZ: -1200,
    finalZ: 50,
    scale: { start: 0.3, end: 1.0 },
    zIndex: 102,
    size: { maxWidth: '52vw', maxHeight: '45vh' },
  },
  {
    id: 'in-progress',
    src: inProgressImage,
    alt: 'Aerial view of roof installation in progress',
    position: { x: -28, y: 18 },
    startProgress: 0.91,
    endProgress: 0.99,
    initialRotation: { x: 10, y: 30 },
    finalRotation: { x: 3, y: 8 },
    initialZ: -1500,
    finalZ: -100,
    scale: { start: 0.2, end: 0.85 },
    zIndex: 101,
    size: { maxWidth: '38vw', maxHeight: '35vh' },
  },
];

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  // Easing functions for smooth animations
  const easeOutExpo = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  const easeOutBack = (x: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  };

  // Check if gallery should be visible at all
  const anyVisible = progress > galleryImages[0].startProgress - 0.02;
  if (!anyVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[101] pointer-events-none overflow-hidden"
      style={{
        perspective: '1800px',
        perspectiveOrigin: '50% 45%',
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {galleryImages.map((image) => {
          // Calculate individual image progress
          const imageRange = image.endProgress - image.startProgress;
          const rawProgress = progress > image.startProgress 
            ? Math.min(1, (progress - image.startProgress) / imageRange)
            : 0;
          
          if (rawProgress === 0) return null;

          // Use easeOutBack for that satisfying "pop" effect
          const easedProgress = easeOutBack(Math.min(rawProgress, 1));
          const smoothProgress = easeOutExpo(rawProgress);
          
          // Z-depth animation (fly in from far away)
          const translateZ = image.initialZ + (smoothProgress * (image.finalZ - image.initialZ));
          
          // Rotation animation (dramatic tilt that settles)
          const rotateX = image.initialRotation.x + (smoothProgress * (image.finalRotation.x - image.initialRotation.x));
          const rotateY = image.initialRotation.y + (smoothProgress * (image.finalRotation.y - image.initialRotation.y));
          
          // Scale with overshoot
          const scale = image.scale.start + (easedProgress * (image.scale.end - image.scale.start));
          
          // Opacity - quick fade in
          const opacity = Math.min(1, rawProgress * 3);
          
          // Subtle floating motion after settled
          const floatOffset = rawProgress > 0.8 
            ? Math.sin((progress - image.endProgress) * Math.PI * 8) * 3 * (rawProgress - 0.8) / 0.2
            : 0;

          // Dynamic shadow intensity based on depth
          const shadowIntensity = Math.min(1, rawProgress * 1.5);

          return (
            <div
              key={image.id}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `
                  translate(-50%, -50%)
                  translate(${image.position.x}%, ${image.position.y + floatOffset}%)
                  translateZ(${translateZ}px)
                  rotateX(${rotateX}deg)
                  rotateY(${rotateY}deg)
                  scale(${scale})
                `,
                opacity,
                zIndex: image.zIndex,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: `
                    0 ${60 * shadowIntensity}px ${120 * shadowIntensity}px -${30 * shadowIntensity}px rgba(0, 0, 0, 0.85),
                    0 ${30 * shadowIntensity}px ${60 * shadowIntensity}px -${15 * shadowIntensity}px rgba(0, 0, 0, 0.6),
                    0 0 ${80 * shadowIntensity}px hsl(32 80% 50% / ${0.25 * shadowIntensity}),
                    0 0 ${40 * shadowIntensity}px hsl(168 60% 40% / ${0.15 * shadowIntensity}),
                    inset 0 1px 0 hsl(40 50% 90% / ${0.15 * shadowIntensity})
                  `,
                  border: `2px solid hsl(168 70% 45% / ${0.25 * shadowIntensity})`,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    maxWidth: image.size.maxWidth,
                    maxHeight: image.size.maxHeight,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                
                {/* Shine overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      hsl(40 60% 90% / ${0.08 * shadowIntensity}) 0%,
                      transparent 50%,
                      hsl(200 60% 20% / ${0.1 * shadowIntensity}) 100%
                    )`,
                  }}
                />
              </div>
              
              {/* Glow behind image */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl"
                style={{
                  background: `radial-gradient(
                    ellipse 120% 120% at 50% 50%,
                    hsl(32 70% 55% / ${0.2 * shadowIntensity}),
                    hsl(168 60% 40% / ${0.1 * shadowIntensity}) 40%,
                    transparent 70%
                  )`,
                  transform: 'scale(1.4) translateZ(-20px)',
                  filter: `blur(${40 * shadowIntensity}px)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery3D;
