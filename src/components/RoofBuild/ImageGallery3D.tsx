import React from 'react';
import coastalRoofImage from '@/assets/coastal-roof-project.png';
import inProgressImage from '@/assets/coastal-roof-inprogress.png';
import aerialEstateImage from '@/assets/aerial-estate-pool.png';
import coastalCrewImage from '@/assets/coastal-home-crew.png';
import multilevelTeamImage from '@/assets/multilevel-roof-team.png';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImageGallery3DProps {
  progress: number;
}

interface ImageConfig {
  src: string;
  alt: string;
  startProgress: number;
  desktop: {
    position: 'top-right' | 'bottom-left' | 'top-left' | 'right-center' | 'bottom-center';
    width: string;
    maxWidth: string;
    maxHeight: string;
    startScale: number;
    endScale: number;
    rotateYStart: number;
    rotateYEnd: number;
  };
  mobile: {
    topStart: number;
    topEnd: number;
    width: string;
    maxHeight: string;
    startScale: number;
    endScale: number;
  };
  zIndex: number;
  borderColor: 'teal' | 'orange';
}

const imageConfigs: ImageConfig[] = [
  {
    src: coastalRoofImage,
    alt: 'Completed coastal roof project',
    startProgress: 0.92,
    desktop: {
      position: 'top-right',
      width: '48vw',
      maxWidth: '600px',
      maxHeight: '42vh',
      startScale: 0.5,
      endScale: 1.4,
      rotateYStart: -15,
      rotateYEnd: 10,
    },
    mobile: {
      topStart: 85,
      topEnd: 8,
      width: '88vw',
      maxHeight: '32vh',
      startScale: 0.7,
      endScale: 1.0,
    },
    zIndex: 5,
    borderColor: 'teal',
  },
  {
    src: inProgressImage,
    alt: 'Roof installation in progress',
    startProgress: 0.925,
    desktop: {
      position: 'bottom-left',
      width: '42vw',
      maxWidth: '520px',
      maxHeight: '38vh',
      startScale: 0.45,
      endScale: 1.35,
      rotateYStart: 15,
      rotateYEnd: -7,
    },
    mobile: {
      topStart: 90,
      topEnd: 28,
      width: '82vw',
      maxHeight: '28vh',
      startScale: 0.65,
      endScale: 1.0,
    },
    zIndex: 4,
    borderColor: 'orange',
  },
  {
    src: aerialEstateImage,
    alt: 'Large estate roof project with pool',
    startProgress: 0.93,
    desktop: {
      position: 'top-left',
      width: '44vw',
      maxWidth: '540px',
      maxHeight: '40vh',
      startScale: 0.4,
      endScale: 1.3,
      rotateYStart: 12,
      rotateYEnd: -5,
    },
    mobile: {
      topStart: 95,
      topEnd: 48,
      width: '78vw',
      maxHeight: '26vh',
      startScale: 0.6,
      endScale: 1.0,
    },
    zIndex: 3,
    borderColor: 'teal',
  },
  {
    src: coastalCrewImage,
    alt: 'Coastal home with roofing crew',
    startProgress: 0.935,
    desktop: {
      position: 'right-center',
      width: '40vw',
      maxWidth: '480px',
      maxHeight: '36vh',
      startScale: 0.35,
      endScale: 1.25,
      rotateYStart: -10,
      rotateYEnd: 8,
    },
    mobile: {
      topStart: 100,
      topEnd: 66,
      width: '75vw',
      maxHeight: '24vh',
      startScale: 0.55,
      endScale: 1.0,
    },
    zIndex: 2,
    borderColor: 'orange',
  },
  {
    src: multilevelTeamImage,
    alt: 'Multi-level roof installation team',
    startProgress: 0.94,
    desktop: {
      position: 'bottom-center',
      width: '38vw',
      maxWidth: '460px',
      maxHeight: '34vh',
      startScale: 0.3,
      endScale: 1.2,
      rotateYStart: 8,
      rotateYEnd: -3,
    },
    mobile: {
      topStart: 105,
      topEnd: 82,
      width: '72vw',
      maxHeight: '22vh',
      startScale: 0.5,
      endScale: 1.0,
    },
    zIndex: 1,
    borderColor: 'teal',
  },
];

const ImageGallery3D: React.FC<ImageGallery3DProps> = ({ progress }) => {
  const isMobile = useIsMobile();
  const galleryStart = 0.91;
  
  if (progress < galleryStart) return null;

  const easeInOutQuad = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  // Background opacity based on first image
  const firstImgRaw = progress > 0.92 ? Math.min(1, (progress - 0.92) / 0.08) : 0;
  const bgOpacity = firstImgRaw < 0.5 
    ? Math.min(1, firstImgRaw * 3) 
    : 1;

  const getDesktopPosition = (position: ImageConfig['desktop']['position'], rawProgress: number) => {
    switch (position) {
      case 'top-right':
        return { top: `${40 - rawProgress * 55}%`, right: `${30 - rawProgress * 75}%` };
      case 'bottom-left':
        return { bottom: `${35 - rawProgress * 50}%`, left: `${30 - rawProgress * 65}%` };
      case 'top-left':
        return { top: `${35 - rawProgress * 50}%`, left: `${25 - rawProgress * 60}%` };
      case 'right-center':
        return { top: `${50 - rawProgress * 30}%`, right: `${20 - rawProgress * 55}%` };
      case 'bottom-center':
        return { bottom: `${20 - rawProgress * 35}%`, left: `${50 - rawProgress * 20}%` };
    }
  };

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 105,
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, 
          hsl(25 40% 15% / ${bgOpacity * 0.95}) 0%, 
          hsl(20 30% 8% / ${bgOpacity}) 50%,
          hsl(15 20% 5% / ${bgOpacity}) 100%)`,
      }}
    >
      {/* Warm ambient glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, 
            hsl(32 70% 45% / ${0.15 * bgOpacity}) 0%, 
            transparent 70%)`,
        }}
      />

      {imageConfigs.map((config, index) => {
        const imgEnd = 1.0;
        const imgRaw = progress > config.startProgress 
          ? Math.min(1, (progress - config.startProgress) / (imgEnd - config.startProgress))
          : 0;

        if (imgRaw <= 0) return null;

        const easedProgress = easeInOutQuad(imgRaw);
        const shineProgress = Math.min(1, imgRaw * 2.5);
        const opacity = imgRaw < 0.12 ? imgRaw / 0.12 : 1.0;

        // Calculate scale
        const scale = isMobile
          ? config.mobile.startScale + (easedProgress * (config.mobile.endScale - config.mobile.startScale))
          : config.desktop.startScale + (easedProgress * (config.desktop.endScale - config.desktop.startScale));

        // Calculate rotation (desktop only)
        const rotateY = isMobile 
          ? 0 
          : config.desktop.rotateYStart + (imgRaw * (config.desktop.rotateYEnd - config.desktop.rotateYStart));

        // Calculate position
        const mobileTop = config.mobile.topStart - (imgRaw * (config.mobile.topStart - config.mobile.topEnd));
        const desktopPos = getDesktopPosition(config.desktop.position, imgRaw);

        const borderHue = config.borderColor === 'teal' ? '168 70% 45%' : '32 70% 50%';
        const glowHue = config.borderColor === 'teal' ? '168 70% 45%' : '32 80% 50%';

        return (
          <div
            key={index}
            className="absolute"
            style={{
              ...(isMobile 
                ? { top: `${mobileTop}%`, left: '50%', transform: `translateX(-50%) scale(${scale})` }
                : { ...desktopPos, transform: `scale(${scale}) rotateY(${rotateY}deg)` }
              ),
              opacity,
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
              zIndex: config.zIndex,
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: isMobile ? '20px' : '16px',
                boxShadow: `
                  0 4px 20px hsl(0 0% 0% / 0.4),
                  0 8px 40px hsl(0 0% 0% / 0.5),
                  0 16px 60px hsl(0 0% 0% / 0.6),
                  0 32px 100px hsl(0 0% 0% / 0.7),
                  0 0 60px hsl(${glowHue} / ${0.35 * shineProgress}),
                  inset 0 1px 0 hsl(40 60% 80% / 0.1)
                `,
                border: `2px solid hsl(${borderHue} / ${0.5 * shineProgress})`,
              }}
            >
              <img
                src={config.src}
                alt={config.alt}
                style={{
                  width: isMobile ? config.mobile.width : config.desktop.width,
                  maxWidth: isMobile ? 'none' : config.desktop.maxWidth,
                  height: 'auto',
                  maxHeight: isMobile ? config.mobile.maxHeight : config.desktop.maxHeight,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Shine sweep effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(
                    110deg,
                    transparent 20%,
                    hsl(45 90% 95% / ${0.18 * shineProgress}) 40%,
                    hsl(45 90% 95% / ${0.3 * shineProgress}) 50%,
                    hsl(45 90% 95% / ${0.18 * shineProgress}) 60%,
                    transparent 80%
                  )`,
                  transform: `translateX(${-120 + (shineProgress * 240)}%)`,
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
