import React, { useRef, useEffect } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import GridBackground from './RoofBuild/GridBackground';
import HouseSVG from './RoofBuild/HouseSVG';
import {
  DeckingLayer,
  DripEdgeEavesLayer,
  IceWaterShieldLayer,
  UnderlaymentLayer,
  DripEdgeRakesLayer,
  StarterStripLayer,
  FieldShinglesLayer,
  VentsLayer,
  FlashingLayer,
  RidgeCapLayer,
  materialInfo,
} from './RoofBuild/RoofLayers';
import MobileStepCard from './RoofBuild/MobileStepCard';
import YardSign from './RoofBuild/YardSign';
import { useScrollContext } from '@/context/ScrollContext';
import ImageGallery3D from './RoofBuild/ImageGallery3D';
import MobileFirstImage from './RoofBuild/MobileFirstImage';

import { useIsMobile } from '@/hooks/use-mobile';

const RoofBuildSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const { setZoomProgress } = useScrollContext();
  const isMobile = useIsMobile();

  // Layer timing - SPREAD OUT for slower animation on mobile
  // Roof layers: 8-60%, Door: 60-72%, Zoom: 72-88%, Gallery: 88%+
  const roofProgress = Math.min(1, progress / 0.60);
  
  const layers = [
    { start: 0.08, end: 0.132 },   // 1. Decking
    { start: 0.132, end: 0.184 },  // 2. Drip Edge Eaves
    { start: 0.184, end: 0.236 },  // 3. Ice & Water
    { start: 0.236, end: 0.288 },  // 4. Underlayment
    { start: 0.288, end: 0.340 },  // 5. Drip Edge Rakes
    { start: 0.340, end: 0.392 },  // 6. Starter Strip
    { start: 0.392, end: 0.444 },  // 7. Shingles
    { start: 0.444, end: 0.496 },  // 8. Vents
    { start: 0.496, end: 0.548 },  // 9. Flashing
    { start: 0.548, end: 0.600 },  // 10. Ridge Cap
  ];

  // Show hint during buffer period (0-8%)
  const showScrollHint = progress < 0.08;
  
  // Door animation: starts at 60%, fully open at 72%
  const doorAngle = progress > 0.60 
    ? Math.min(75, ((progress - 0.60) / 0.12) * 75) 
    : 0;

  // Door zoom: starts at 72%, completes at 88% (gallery starts at 88%)
  const zoomProgress = progress > 0.72 
    ? Math.min(1, (progress - 0.72) / 0.16)
    : 0;
  
  // Update scroll context so navbar can fade
  useEffect(() => {
    setZoomProgress(zoomProgress);
  }, [zoomProgress, setZoomProgress]);
  
  // easeInOutQuad - smooth start AND end for natural approach feel
  const easeInOutQuad = (x: number) => 
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const easedZoom = easeInOutQuad(zoomProgress);
  
  // Scale: 1x → 15x (reduced from 20x for smoother finish)
  const zoomScale = 1 + (easedZoom * 14);
  
  // Delayed warm light - starts at 20% zoom progress for gentler fade-in
  const lightProgress = Math.max(0, (zoomProgress - 0.2) / 0.8);
  const easedLight = easeInOutQuad(lightProgress);
  
  // Fade out elements during zoom - FASTER fades for cleaner transition
  const gridFadeOut = Math.max(0, 1 - (zoomProgress * 3)); // Grid gone by 33% of zoom
  const houseFadeOut = Math.max(0, 1 - (easedZoom * 2)); // House gone by 50% of zoom

  // 3D Gallery visibility - Mobile starts at 88%, desktop at 86%
  const galleryStartPoint = isMobile ? 0.88 : 0.86;
  const galleryProgress = progress > galleryStartPoint 
    ? Math.min(1, (progress - galleryStartPoint) / 0.05)
    : 0;
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  // Fade overlay completely OUT as gallery takes over with its own background
  const overlayFade = galleryProgress > 0 ? 1 - easeOutCubic(galleryProgress) : 1;
  
  // Mobile: force overlays to fade out FASTER - completely gone by 0.90
  const mobileOverlayMultiplier = isMobile 
    ? (progress < 0.86 ? 1 : Math.max(0, 1 - ((progress - 0.86) / 0.04)))
    : 1;

  // Calculate staggered exit progress for label pairs (desktop only)
  // Labels exit from 0.60 to 0.72 (as door opens, before zoom completes)
  const getLabelExitProgress = (pairIndex: number): number => {
    const doorStart = 0.60;
    const doorEnd = 0.72;
    const doorRange = doorEnd - doorStart;
    const pairWindow = doorRange / 5;
    
    const pairStart = doorStart + (pairIndex * pairWindow);
    const pairEnd = pairStart + pairWindow;
    
    if (progress < pairStart) return 0;
    if (progress >= pairEnd) return 1;
    return (progress - pairStart) / pairWindow;
  };

  // Calculate which materials are "locked in"
  const getLockedMaterials = () => {
    return materialInfo.map((_, index) => progress >= layers[index].end);
  };

  const lockedMaterials = getLockedMaterials();

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: isMobile ? '400vh' : '600vh' }}
    >

      {/* Solid backup overlay - catches ANYTHING that escapes */}
      <div 
        className="fixed inset-0 pointer-events-none z-[99]"
        style={{
          backgroundColor: `hsl(25 60% 20% / ${Math.min(1, easedLight * 1.5 * mobileOverlayMultiplier)})`,
          opacity: (easedLight > 0.02 && mobileOverlayMultiplier > 0) ? mobileOverlayMultiplier : 0,
          willChange: 'opacity',
        }}
      />

      {/* Warm light overlay - delayed fade-in for smoother experience - z-[100] to cover EVERYTHING */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          background: `radial-gradient(circle at 50% 45%, 
            hsl(35 98% 75% / ${Math.min(1, easedLight * 1.2 * overlayFade * mobileOverlayMultiplier)}), 
            hsl(30 95% 65% / ${Math.min(1, easedLight * 1.0 * overlayFade * mobileOverlayMultiplier)}) 25%,
            hsl(25 85% 50% / ${Math.min(1, easedLight * 0.85 * overlayFade * mobileOverlayMultiplier)}) 50%,
            hsl(20 75% 35% / ${Math.min(1, easedLight * 0.7 * overlayFade * mobileOverlayMultiplier)}) 80%,
            hsl(15 65% 20% / ${easedLight * 0.5 * overlayFade * mobileOverlayMultiplier}) 100%)`,
          opacity: (easedLight > 0.01 && mobileOverlayMultiplier > 0) ? mobileOverlayMultiplier : 0,
          willChange: 'background, opacity',
        }}
      />

      {/* Image Gallery - Different experience for mobile vs desktop */}
      {isMobile && <MobileFirstImage progress={progress} />}
      {!isMobile && <ImageGallery3D progress={progress} />}


      {/* Sticky container - offset for navbar height */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div style={{ opacity: gridFadeOut, transition: 'opacity 0.15s ease-out' }}>
          <GridBackground />
        </div>
        
        {/* Content container - with top padding for navbar clearance */}
        <div className="relative z-10 h-full flex flex-col items-center justify-start pt-32 md:pt-56 lg:pt-64 px-4">

          {/* Main visualization container - house centered independently */}
          <div className="relative w-full max-w-5xl mx-auto">
            {/* House + Layers SVG - perfectly centered with zoom effect */}
              <div 
                className="flex justify-center"
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: '50% 82%', // Exact door center (door at ~82% of viewBox height)
                  opacity: houseFadeOut,
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden', // Prevent flicker
                }}
              >
              <div className="w-full max-w-2xl">
                <svg
                  viewBox="0 0 400 280"
                  className="w-full"
                  style={{
                    filter: 'drop-shadow(0 0 40px hsl(168 80% 45% / 0.15))',
                  }}
                >
                  {/* Pulsing roof outline hint during buffer period */}
                  {showScrollHint && (
                    <path
                      d="M45 162 L200 52 L355 162"
                      fill="none"
                      stroke="hsl(168 80% 50%)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-roof-pulse"
                      style={{
                        filter: 'drop-shadow(0 0 15px hsl(168 80% 50% / 0.8)) drop-shadow(0 0 30px hsl(168 80% 50% / 0.5))',
                      }}
                    />
                  )}
                  
                  {/* House base with animated door */}
                  <HouseSVG doorAngle={doorAngle} lightBoost={zoomProgress} />
                  
                  {/* Animated roof layers - 10 layers in correct installation order */}
                  {/* 1. Replace Decking */}
                  <DeckingLayer progress={progress} startProgress={layers[0].start} endProgress={layers[0].end} />
                  {/* 2. Drip Edge (Eaves) */}
                  <DripEdgeEavesLayer progress={progress} startProgress={layers[1].start} endProgress={layers[1].end} />
                  {/* 3. Ice & Water Shield */}
                  <IceWaterShieldLayer progress={progress} startProgress={layers[2].start} endProgress={layers[2].end} />
                  {/* 4. Underlayment */}
                  <UnderlaymentLayer progress={progress} startProgress={layers[3].start} endProgress={layers[3].end} />
                  {/* 5. Drip Edge (Rakes) */}
                  <DripEdgeRakesLayer progress={progress} startProgress={layers[4].start} endProgress={layers[4].end} />
                  {/* 6. Starter Strip */}
                  <StarterStripLayer progress={progress} startProgress={layers[5].start} endProgress={layers[5].end} />
                  {/* 7. Shingles */}
                  <FieldShinglesLayer progress={progress} startProgress={layers[6].start} endProgress={layers[6].end} />
                  {/* 8. Pipe Boots & Vents */}
                  <VentsLayer progress={progress} startProgress={layers[7].start} endProgress={layers[7].end} />
                  {/* 9. Flashing */}
                  <FlashingLayer progress={progress} startProgress={layers[8].start} endProgress={layers[8].end} />
                  {/* 10. Ridge Vent & Cap */}
                  <RidgeCapLayer progress={progress} startProgress={layers[9].start} endProgress={layers[9].end} />
                  
                  {/* Yard sign drops in as door opens */}
                  <YardSign progress={progress} />
                </svg>
              </div>
            </div>

            {/* Scroll hint text during buffer */}
            {showScrollHint && (
              <div 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center animate-pulse"
                style={{
                  opacity: 1 - progress * 12.5, // Fades out as we approach 8%
                }}
              >
                <span 
                  className="text-sm font-medium tracking-wider uppercase"
                  style={{
                    color: 'hsl(168 70% 55%)',
                    textShadow: '0 0 20px hsl(168 80% 50% / 0.6)',
                  }}
                >
                  Scroll to build
                </span>
              </div>
            )}

            {/* Mobile Step Card - positioned below house */}
            <MobileStepCard 
              currentStep={Math.max(0, Math.min(9, Math.floor((progress - 0.08) / 0.052)))} 
              isVisible={progress >= 0.08 && progress <= 0.60}
            />

            {/* Material labels - left side (positioned as overlay) */}
            <div 
              className="absolute left-0 xl:left-4 top-1/2 -translate-y-1/2 pr-4 hidden xl:block w-56"
            >
              <div className="space-y-5">
                {materialInfo.slice(0, 5).map((material, index) => {
                  const exitProgress = getLabelExitProgress(index);
                  const isExiting = progress >= 0.60;
                  
                  // During exit: slide left and fade out
                  // Before exit: normal lock-in animation
                  const translateX = isExiting 
                    ? -150 * exitProgress 
                    : (lockedMaterials[index] ? 0 : -20);
                  const opacity = isExiting 
                    ? Math.max(0, 1 - exitProgress) 
                    : (lockedMaterials[index] ? 1 : 0.25);
                  
                  return (
                    <div
                      key={material.id}
                      className={`text-right pb-4 ${index < 4 ? 'border-b border-teal-800/20' : ''}`}
                      style={{
                        opacity,
                        transform: `translateX(${translateX}px)`,
                        transition: isExiting ? 'none' : 'all 0.5s ease-out',
                      }}
                    >
                      <div 
                        className="text-sm font-semibold tracking-wide whitespace-nowrap"
                        style={{
                          color: lockedMaterials[index] ? 'hsl(168 80% 60%)' : 'hsl(168 50% 40%)',
                          textShadow: lockedMaterials[index] 
                            ? '0 0 20px hsl(168 80% 50% / 0.8), 0 0 40px hsl(168 80% 50% / 0.4)' 
                            : 'none',
                        }}
                      >
                        <span className="text-xs font-normal opacity-60 mr-1.5">{index + 1}.</span>
                        {material.name}
                      </div>
                      <div 
                        className="text-xs text-muted-foreground/70 mt-1 leading-relaxed"
                        style={{
                          opacity: lockedMaterials[index] ? 1 : 0.5,
                        }}
                      >
                        {material.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Material labels - right side (positioned as overlay) */}
            <div 
              className="absolute right-0 xl:right-4 top-1/2 -translate-y-1/2 pl-4 hidden xl:block w-56"
            >
              <div className="space-y-5">
                {materialInfo.slice(5).map((material, index) => {
                  const exitProgress = getLabelExitProgress(index); // Same pair index as left side
                  const isExiting = progress >= 0.60;
                  
                  // During exit: slide right and fade out (positive X)
                  // Before exit: normal lock-in animation
                  const translateX = isExiting 
                    ? 150 * exitProgress 
                    : (lockedMaterials[index + 5] ? 0 : 20);
                  const opacity = isExiting 
                    ? Math.max(0, 1 - exitProgress) 
                    : (lockedMaterials[index + 5] ? 1 : 0.25);
                  
                  return (
                    <div
                      key={material.id}
                      className={`text-left pb-4 ${index < 4 ? 'border-b border-teal-800/20' : ''}`}
                      style={{
                        opacity,
                        transform: `translateX(${translateX}px)`,
                        transition: isExiting ? 'none' : 'all 0.5s ease-out',
                      }}
                    >
                      <div 
                        className="text-sm font-semibold tracking-wide whitespace-nowrap"
                        style={{
                          color: lockedMaterials[index + 5] ? 'hsl(168 80% 60%)' : 'hsl(168 50% 40%)',
                          textShadow: lockedMaterials[index + 5] 
                            ? '0 0 20px hsl(168 80% 50% / 0.8), 0 0 40px hsl(168 80% 50% / 0.4)' 
                            : 'none',
                        }}
                      >
                        <span className="text-xs font-normal opacity-60 mr-1.5">{index + 6}.</span>
                        {material.name}
                      </div>
                      <div 
                        className="text-xs text-muted-foreground/70 mt-1 leading-relaxed"
                        style={{
                          opacity: lockedMaterials[index + 5] ? 1 : 0.5,
                        }}
                      >
                        {material.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>


        </div>


        {/* Progress bar - HARD HIDE at 60% before door opens */}
        {progress < 0.60 && (
          <div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-muted/30 rounded-full overflow-hidden z-20"
            style={{
              opacity: progress > 0.55 ? Math.max(0, 1 - ((progress - 0.55) / 0.05)) : 1,
            }}
          >
            <div 
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress / 0.60, 1) * 100}%`,
                background: 'linear-gradient(90deg, hsl(168 80% 50%), hsl(32 80% 55%))',
                boxShadow: '0 0 12px hsl(168 80% 50% / 0.6)',
              }}
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default RoofBuildSection;
