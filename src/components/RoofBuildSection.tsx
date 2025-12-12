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

const RoofBuildSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const { setZoomProgress } = useScrollContext();

  // Layer timing - delayed start at 8% for "settle in" period
  // Roof layers use 0-75% of scroll, door animation uses 75-100%
  const roofProgress = Math.min(1, progress / 0.75); // Normalize roof progress to 0-1
  
  const layers = [
    { start: 0.08, end: 0.15 },   // 1. Decking
    { start: 0.15, end: 0.22 },   // 2. Drip Edge Eaves
    { start: 0.22, end: 0.29 },   // 3. Ice & Water
    { start: 0.29, end: 0.36 },   // 4. Underlayment
    { start: 0.36, end: 0.43 },   // 5. Drip Edge Rakes
    { start: 0.43, end: 0.50 },   // 6. Starter Strip
    { start: 0.50, end: 0.57 },   // 7. Shingles
    { start: 0.57, end: 0.64 },   // 8. Vents
    { start: 0.64, end: 0.71 },   // 9. Flashing
    { start: 0.71, end: 0.75 },   // 10. Ridge Cap
  ];

  // Show hint during buffer period (0-8%)
  const showScrollHint = progress < 0.08;
  
  // Door animation: starts at 70%, fully open at 78% (with 2% buffer before zoom)
  const doorAngle = progress > 0.70 
    ? Math.min(75, ((progress - 0.70) / 0.08) * 75) 
    : 0;

  // Door zoom: starts at 80%, completes at 100% (20% scroll window)
  const zoomProgress = progress > 0.80 
    ? Math.min(1, (progress - 0.80) / 0.20)
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

  // 3D Gallery visibility - starts at 84%, overlay fades OUT completely
  const galleryProgress = progress > 0.84 
    ? Math.min(1, (progress - 0.84) / 0.10)
    : 0;
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  // Fade overlay completely OUT as gallery takes over with its own background
  const overlayFade = galleryProgress > 0 ? 1 - easeOutCubic(galleryProgress) : 1;

  // Calculate staggered exit progress for label pairs (desktop only)
  // Labels exit from 0.70 to 0.78 (as door opens, before zoom starts at 0.80)
  const getLabelExitProgress = (pairIndex: number): number => {
    const doorStart = 0.70;
    const doorEnd = 0.78;
    const doorRange = doorEnd - doorStart; // 0.08
    const pairWindow = doorRange / 5; // ~0.016 per pair
    
    const pairStart = doorStart + (pairIndex * pairWindow);
    const pairEnd = pairStart + pairWindow;
    
    if (progress < pairStart) return 0; // Not started
    if (progress >= pairEnd) return 1; // Fully exited
    return (progress - pairStart) / pairWindow; // Mid-animation 0-1
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
      style={{ height: '500vh' }}
    >

      {/* Solid backup overlay - catches ANYTHING that escapes */}
      <div 
        className="fixed inset-0 pointer-events-none z-[99]"
        style={{
          backgroundColor: `hsl(25 60% 20% / ${Math.min(1, easedLight * 1.5)})`,
          opacity: easedLight > 0.02 ? 1 : 0,
          willChange: 'opacity',
        }}
      />

      {/* Warm light overlay - delayed fade-in for smoother experience - z-[100] to cover EVERYTHING */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          background: `radial-gradient(circle at 50% 45%, 
            hsl(35 98% 75% / ${Math.min(1, easedLight * 1.2 * overlayFade)}), 
            hsl(30 95% 65% / ${Math.min(1, easedLight * 1.0 * overlayFade)}) 25%,
            hsl(25 85% 50% / ${Math.min(1, easedLight * 0.85 * overlayFade)}) 50%,
            hsl(20 75% 35% / ${Math.min(1, easedLight * 0.7 * overlayFade)}) 80%,
            hsl(15 65% 20% / ${easedLight * 0.5 * overlayFade}) 100%)`,
          opacity: easedLight > 0.01 ? 1 : 0,
          willChange: 'background, opacity',
        }}
      />

      {/* 3D Parallax Image Gallery */}
      <ImageGallery3D progress={progress} />


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
              currentStep={Math.max(0, Math.min(9, Math.floor((progress - 0.08) / 0.067)))} 
              isVisible={progress >= 0.10 && progress <= 0.75}
            />

            {/* Material labels - left side (positioned as overlay) */}
            <div 
              className="absolute left-0 xl:left-4 top-1/2 -translate-y-1/2 pr-4 hidden xl:block w-56"
            >
              <div className="space-y-5">
                {materialInfo.slice(0, 5).map((material, index) => {
                  const exitProgress = getLabelExitProgress(index);
                  const isExiting = progress >= 0.70;
                  
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
                  const isExiting = progress >= 0.70;
                  
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


        {/* Progress bar - HARD HIDE at 70% before door opens */}
        {progress < 0.70 && (
          <div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-muted/30 rounded-full overflow-hidden z-20"
            style={{
              opacity: progress > 0.65 ? Math.max(0, 1 - ((progress - 0.65) / 0.05)) : 1,
            }}
          >
            <div 
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress / 0.75, 1) * 100}%`,
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
