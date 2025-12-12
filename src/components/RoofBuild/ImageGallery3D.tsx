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
  rotation: { x: number; y: number };
  scale: { start: number; end: number };
  zIndex: number;
  parallaxStrength: number;
}

const galleryImages: GalleryImage[] = [
  {
    id: 'completed-roof',
    src: coastalRoofImage,
    alt: 'Beautiful completed coastal roof project by Poseidon Roofing',
    position: { x: 8, y: -5 },
    startProgress: 0.88,
    endProgress: 0.94,
    rotation: { x: -3, y: 8 },
    scale: { start: 0.2, end: 1.0 },
    zIndex: 102,
    parallaxStrength: 15,
  },
  {
    id: 'in-progress',
    src: inProgressImage,
    alt: 'Aerial view of roof installation in progress',
    position: { x: -32, y: 12 },
    startProgress: 0.91,
    endProgress: 0.97,
    rotation: { x: 5, y: -10 },
    scale: { start: 0.15, end: 0.72 },
    zIndex: 101,
    parallaxStrength: -20,
  },
];

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  // Easing functions
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

  // Check if any image should be visible
  const anyVisible = progress > galleryImages[0].startProgress;
  if (!anyVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[101] pointer-events-none"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 45%',
      }}
    >
      {galleryImages.map((image) => {
        // Calculate individual image progress
        const imageRange = image.endProgress - image.startProgress;
        const rawProgress = progress > image.startProgress 
          ? Math.min(1, (progress - image.startProgress) / imageRange)
          : 0;
        
        if (rawProgress === 0) return null;

        const easedProgress = easeOutCubic(rawProgress);
        
        // Scale animation
        const scale = image.scale.start + (easedProgress * (image.scale.end - image.scale.start));
        
        // Opacity with quick fade-in
        const opacity = Math.min(1, rawProgress * 2);
        
        // 3D rotation that settles as image comes in
        const rotateX = image.rotation.x * (1 - easedProgress * 0.3);
        const rotateY = image.rotation.y * (1 - easedProgress * 0.3);
        
        // Parallax depth movement (continues after image is fully visible)
        const continueProgress = progress > image.endProgress 
          ? Math.min(1, (progress - image.endProgress) / 0.06)
          : 0;
        const parallaxY = continueProgress * image.parallaxStrength;
        
        // TranslateZ for depth
        const translateZ = -100 + (easedProgress * 100);

        return (
          <div
            key={image.id}
            className="absolute flex items-center justify-center"
            style={{
              top: '50%',
              left: '50%',
              transform: `
                translate(-50%, -50%)
                translate(${image.position.x}%, ${image.position.y + parallaxY}%)
              `,
              zIndex: image.zIndex,
              willChange: 'transform, opacity',
            }}
          >
            <div
              style={{
                transform: `
                  perspective(1200px)
                  rotateX(${rotateX}deg)
                  rotateY(${rotateY}deg)
                  translateZ(${translateZ}px)
                  scale(${scale})
                `,
                opacity,
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-xl"
                style={{
                  maxWidth: image.id === 'completed-roof' ? '75vw' : '55vw',
                  maxHeight: image.id === 'completed-roof' ? '60vh' : '45vh',
                  objectFit: 'cover',
                  boxShadow: `
                    0 30px 100px -20px rgba(0, 0, 0, 0.6),
                    0 0 80px hsl(32 80% 50% / 0.25),
                    0 0 0 1px hsl(32 60% 40% / 0.3),
                    inset 0 0 0 1px hsl(40 50% 90% / 0.1)
                  `,
                }}
              />
              
              {/* Subtle glow behind each image */}
              <div
                className="absolute inset-0 -z-10 rounded-xl"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(35 70% 60% / 0.2), transparent 70%)',
                  transform: 'scale(1.3)',
                  filter: 'blur(30px)',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery3D;
