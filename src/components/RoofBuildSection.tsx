// Cache bust: 2025-01-14 - BFCache fix with resetTrigger
import React, { useRef, useEffect, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import GridBackground from './RoofBuild/GridBackground';
import HouseSVG from './RoofBuild/HouseSVG';
import {
  DeckingLayer,
  DripEdgeEavesLayer,
  IceWaterShieldLayer,
  UnderlaymentLayer,
  StarterStripLayer,
  ShinglesLayer,
  VentsLayer,
  ChimneyFlashingLayer,
  FlashingLayer,
  RidgeCapLayer,
  DumpsterLayer,
  TruckLayer,
  CleanUpLayer,
  CleanUpRevealText,
  FallingPalmTree,
  MobilePalmTree,
  MobileYardSign,
  materialInfo,
} from './RoofBuild/RoofLayers';
import YardSign from './RoofBuild/YardSign';
import DoorwayImageReveal from './RoofBuild/DoorwayImageReveal';
import poseidonDoorLogo from '@/assets/poseidon-door-logo.png';


import { useScrollContext } from '@/context/ScrollContext';
// ImageGallery3D removed

import { useIsMobile } from '@/hooks/use-mobile';


const RoofBuildSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { setZoomProgress, resetTrigger } = useScrollContext();
  const progress = useScrollProgress(sectionRef, resetTrigger);
  const [isResetting, setIsResetting] = useState(false);
  const isMobile = useIsMobile();

  // Layer timing - delayed start on mobile (15-85%) so card is visible first
  // Mobile: spread across 70% of scroll for leisurely viewing, ends before sign
  // Desktop: Roof layers: 8-55%, Dumpster: 55-62%, Door: 65-77%, Zoom: 77-93%, Gallery: 93%+
  const roofProgress = Math.min(1, progress / (isMobile ? 0.90 : 0.60));
  
  // Mobile layers spread from 10% to 90%, desktop from 8% to 55%
  // CRITICAL: Mobile timing must fit all layers + dumpster + truck within 0-1 range
  const mobileLayerStart = 0.10;
  const desktopLayerStart = 0.08;
  const mobileLayerStep = 0.020; // Compressed to fit everything including truck
  const desktopLayerStep = 0.035;
  const layerStep = isMobile ? mobileLayerStep : desktopLayerStep;
  const layerStart = isMobile ? mobileLayerStart : desktopLayerStart;
  
  // Decking
  const deckingMultiplier = isMobile ? 2 : 2;
  const deckingEnd = layerStart + (layerStep * deckingMultiplier);
  
  // Drip edge
  const dripEdgeMultiplier = isMobile ? 1 : 1.5;
  const dripEdgeEnd = deckingEnd + (layerStep * dripEdgeMultiplier);
  
  // Ice & water shield
  const iceWaterMultiplier = isMobile ? 1 : 1.5;
  const iceWaterEnd = dripEdgeEnd + (layerStep * iceWaterMultiplier);
  
  // Underlayment
  const underlaymentMultiplier = isMobile ? 2 : 1.5;
  const underlaymentEnd = iceWaterEnd + (layerStep * underlaymentMultiplier);
  
  // Starter strip
  const starterStripMultiplier = isMobile ? 1 : 1.5;
  const starterStripEnd = underlaymentEnd + (layerStep * starterStripMultiplier);
  
  // Shingles, Vents, Flashing
  const shinglesEnd = starterStripEnd + layerStep * (isMobile ? 1.5 : 2);
  const ventsEnd = shinglesEnd + layerStep * (isMobile ? 1 : 1.5);
  const flashingEnd = ventsEnd + layerStep * (isMobile ? 1 : 1.5);
  
  // Ridge cap - shorter duration
  const ridgeCapStart = flashingEnd;
  const ridgeCapEnd = isMobile 
    ? flashingEnd + layerStep * 1
    : flashingEnd + layerStep * 1;
    
  // Dumpster timing - starts right after ridge cap
  const dumpsterStart = ridgeCapEnd;
  const dumpsterMultiplier = isMobile ? 2 : 2;
  const dumpsterEnd = ridgeCapEnd + layerStep * dumpsterMultiplier;
  
  // Truck timing - starts right after dumpster (both mobile and desktop)
  const truckStart = dumpsterEnd;
  const truckMultiplier = isMobile ? 2 : 4;
  const truckEnd = dumpsterEnd + layerStep * truckMultiplier;
    
  const layers = [
    { start: layerStart, end: deckingEnd },                    // 1. Decking
    { start: deckingEnd, end: dripEdgeEnd },                   // 2. Drip Edge
    { start: dripEdgeEnd, end: iceWaterEnd },                  // 3. Ice & Water
    { start: iceWaterEnd, end: underlaymentEnd },              // 4. Underlayment
    { start: underlaymentEnd, end: starterStripEnd },          // 5. Starter Strip
    { start: starterStripEnd, end: shinglesEnd },              // 6. Shingles
    { start: shinglesEnd, end: ventsEnd },                     // 7. Vents
    { start: ventsEnd, end: flashingEnd },                     // 8. Flashing
    { start: ridgeCapStart, end: ridgeCapEnd },                // 9. Ridge Vent & Cap
    { start: dumpsterStart, end: dumpsterEnd },                // 10. Complete Clean Up - Dumpster
    { start: truckStart, end: truckEnd },                      // 11. Truck hauls dumpster away
  ];
  
  // Calculate dumpster progress for truck to know when to show moving dumpster
  const dumpsterRawProgress = (progress - dumpsterStart) / (dumpsterEnd - dumpsterStart);
  const dumpsterAnimProgress = Math.max(0, Math.min(1, dumpsterRawProgress));
  
  // Calculate when all active layers end (truck now runs on both mobile and desktop)
  const roofLayersEnd = truckEnd + 0.05;

  // Show hint during buffer period (before animation starts)
  const showScrollHint = progress < layerStart;
  
  // Door animation: starts after roof layers complete
  // Mobile: starts immediately after truck; Desktop: waits until 70%
  const doorStart = isMobile ? roofLayersEnd : Math.max(0.70, roofLayersEnd);
  // Mobile: slower door open (0.10) for deliberate reveal; Desktop: 0.12
  const doorOpenDuration = isMobile ? 0.10 : 0.12;
  const doorAngle = progress > doorStart 
    ? Math.min(75, ((progress - doorStart) / doorOpenDuration) * 75) 
    : 0;

  // Outline fade: starts when door starts opening, fully gone by zoom start
  // Mobile: slower fade (0.15) to match slower door; Desktop: 0.08
  const outlineOpacity = progress > doorStart 
    ? Math.max(0, 1 - ((progress - doorStart) / (isMobile ? 0.15 : 0.08)))
    : 1;

  // Door zoom: starts after door opens, extended duration for full doorway entry
  // Mobile: much slower zoom (0.25) for smooth, deliberate approach; Desktop: 0.30
  const zoomStart = doorStart + doorOpenDuration;
  const zoomDuration = isMobile ? 0.20 : 0.30;
  const zoomProgress = progress > zoomStart 
    ? Math.min(1, (progress - zoomStart) / zoomDuration)
    : 0;
  
  // Update scroll context so navbar can fade (desktop only)
  useEffect(() => {
    setZoomProgress(zoomProgress);
  }, [zoomProgress, setZoomProgress]);

  // BFCache reset: briefly hide overlays when returning to page
  useEffect(() => {
    if (resetTrigger > 0) {
      setIsResetting(true);
      // Force scroll to top immediately
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        setIsResetting(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [resetTrigger]);
  
  // easeInOutQuad - smooth start AND end for natural approach feel
  const easeInOutQuad = (x: number) => 
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const easedZoom = easeInOutQuad(zoomProgress);
  
  // Scale: 1x → 500x for full doorway pass-through
  const zoomScale = 1 + (easedZoom * 499);
  
  // Delayed warm light effect
  const lightProgress = Math.max(0, (zoomProgress - 0.2) / 0.8);
  const easedLight = easeInOutQuad(lightProgress);
  
  // Fade out elements during zoom
  const gridFadeOut = Math.max(0, 1 - (zoomProgress * 3));
  const houseFadeOut = Math.max(0, 1 - (easedZoom * 2));

  // 3D Gallery visibility (starts VERY late, after zoom fully completes)
  // Mobile: earlier start with longer duration; Desktop: very late start
  const galleryStartPoint = isMobile ? 0.98 : 0.995;
  const galleryProgress = progress > galleryStartPoint 
    ? Math.min(1, (progress - galleryStartPoint) / (isMobile ? 0.02 : 0.005))
    : 0;
  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
  // Mobile: keep warm background visible until user scrolls past; Desktop: fade based on gallery progress
  const overlayFade = isMobile 
    ? 1 
    : (galleryProgress > 0 ? 1 - easeOutCubic(galleryProgress) : 1);
  
  // Overlay multiplier for effects
  const mobileOverlayMultiplier = 1;

  // Calculate staggered exit progress for label pairs (desktop only)
  // Labels exit from 0.92 to 0.96 (AFTER all roof animations complete)
  const getLabelExitProgress = (pairIndex: number): number => {
    const labelExitStart = 0.92;
    const labelExitEnd = 0.96;
    const exitRange = labelExitEnd - labelExitStart;
    const pairWindow = exitRange / 5;
    
    const pairStart = labelExitStart + (pairIndex * pairWindow);
    const pairEnd = pairStart + pairWindow;
    
    if (progress < pairStart) return 0;
    if (progress >= pairEnd) return 1;
    return (progress - pairStart) / pairWindow;
  };

  // Calculate which materials are "locked in"
  const getLockedMaterials = () => {
    return materialInfo.map((_, index) => progress >= layers[index].end);
  };

  // Calculate which materials are "active" (currently animating)
  const getActiveMaterials = () => {
    return layers.map((layer) => 
      progress >= layer.start && progress < layer.end
    );
  };

  const lockedMaterials = getLockedMaterials();
  const activeMaterials = getActiveMaterials();

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: isMobile ? '600vh' : '600vh' }}
    >

      {/* Full-screen blocker during BFCache reset - matches page background for seamless appearance */}
      {isResetting && (
        <div 
          className="fixed inset-0 z-[200]"
          style={{ 
            backgroundColor: 'hsl(160 25% 4%)',
            pointerEvents: 'all' 
          }}
        />
      )}

      {/* Solid backup overlay - catches ANYTHING that escapes */}
      <div 
        className="fixed inset-0 pointer-events-none z-[99]"
        style={{
          backgroundColor: `hsl(25 60% 20% / ${Math.min(1, easedLight * 1.5 * mobileOverlayMultiplier)})`,
          opacity: isResetting ? 0 : ((easedLight > 0.02 && mobileOverlayMultiplier > 0) ? mobileOverlayMultiplier : 0),
          willChange: 'opacity',
        }}
      />

      {/* Warm light overlay - delayed fade-in for smoother experience - z-[100] to cover EVERYTHING */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 50% 45%, 
            hsl(35 98% 75% / ${Math.min(1, easedLight * 1.2 * overlayFade * mobileOverlayMultiplier)}), 
            hsl(30 95% 65% / ${Math.min(1, easedLight * 1.0 * overlayFade * mobileOverlayMultiplier)}) 25%,
            hsl(25 85% 50% / ${Math.min(1, easedLight * 0.85 * overlayFade * mobileOverlayMultiplier)}) 50%,
            hsl(20 75% 35% / ${Math.min(1, easedLight * 0.7 * overlayFade * mobileOverlayMultiplier)}) 80%,
            hsl(15 65% 20% / ${easedLight * 0.5 * overlayFade * mobileOverlayMultiplier}) 100%)`,
          opacity: isResetting ? 0 : ((easedLight > 0.01 && mobileOverlayMultiplier > 0) ? mobileOverlayMultiplier : 0),
          willChange: 'background, opacity',
        }}
      />


      {/* Doorway Image Reveal - appears AFTER zoom is fully complete */}
      <DoorwayImageReveal progress={progress} zoomProgress={zoomProgress} />

      {/* Sticky container - offset for navbar height */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Poseidon Logo - pure zoom animation from 0 to full size, starts when entering doorway */}
        {zoomProgress > 0.10 && (() => {
          // Logo scales from 0 to 1 between zoomProgress 0.10 and 0.25 (faster zoom to full size)
          const logoProgress = Math.min(1, Math.max(0, (zoomProgress - 0.10) / 0.15));
          const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
          const logoScale = easeOutCubic(logoProgress);
          
          // Logo stays visible on both mobile and desktop
          const logoFadeOut = 1;
          
          // Text appears AFTER logo reaches full size (logoProgress >= 1)
          // Text animation: starts at zoomProgress 0.25 and completes by 0.40
          const textProgress = Math.min(1, Math.max(0, (zoomProgress - 0.05) / 0.20));
          const easeOutBack = (x: number) => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
          };
          const textEased = easeOutBack(textProgress);
          
          // Each text line has a staggered delay
          const getLineProgress = (index: number) => {
            const staggerDelay = 0.02; // 2% delay between each line
            const lineStart = 0.05 + (index * staggerDelay);
            const lineProgress = Math.min(1, Math.max(0, (zoomProgress - lineStart) / 0.15));
            return easeOutBack(lineProgress);
          };
          
          // Button appears last with extra delay
          const buttonProgress = Math.min(1, Math.max(0, (zoomProgress - 0.20) / 0.15));
          const buttonEased = easeOutBack(buttonProgress);
          
          return (
            <div 
              className="absolute inset-0 flex items-center justify-center z-[101] pointer-events-none"
            >
              <div className="flex flex-col items-center text-center">
                <img 
                  src={poseidonDoorLogo} 
                  alt="Poseidon Roofing"
                  className="w-[95vw] sm:w-56 md:w-80 lg:w-[450px] sm:max-w-[70vw]"
                  style={{ 
                    transform: `scale(${logoScale})`,
                    opacity: logoFadeOut,
                    willChange: 'transform, opacity',
                  }}
                />
                
                {/* Text + Button - staggered entrance with scroll-direction awareness */}
                <div 
                  className="mt-6 md:mt-10 space-y-2 md:space-y-3"
                >
                  {[
                    "Free Consultations",
                    "Free 17 Point Roof/Home Inspection", 
                    "Free Estimates",
                    "No Paperwork"
                  ].map((text, index) => {
                    const lineEased = getLineProgress(index);
                    return (
                      <p 
                        key={index}
                        className="text-xl md:text-4xl font-extrabold tracking-wide"
                        style={{ 
                          color: 'white',
                          textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.9)',
                          opacity: lineEased,
                          transform: `translateY(${(1 - lineEased) * 30}px) scale(${0.8 + (lineEased * 0.2)})`,
                          filter: `blur(${(1 - lineEased) * 4}px)`,
                          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out',
                          willChange: 'transform, opacity, filter',
                        }}
                      >
                        {text}
                      </p>
                    );
                  })}
                  
                  <div 
                    className="pt-6 md:pt-10"
                    style={{
                      opacity: buttonEased,
                      transform: `translateY(${(1 - buttonEased) * 40}px) scale(${0.7 + (buttonEased * 0.3)})`,
                      filter: `blur(${(1 - buttonEased) * 6}px)`,
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    {/* Premium animated button - tight glow */}
                    <div className="relative group pointer-events-auto inline-block">
                      {/* Animated gradient border - tight fit */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-90 transition-all duration-500"
                        style={{
                          background: 'linear-gradient(90deg, hsl(168, 80%, 50%), hsl(30, 80%, 55%), hsl(168, 80%, 50%))',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer-border 3s linear infinite',
                          padding: '2px',
                        }}
                      />
                      
                      {/* Main button */}
                      <button 
                        className="relative text-lg md:text-2xl font-bold uppercase tracking-wide px-12 py-5 md:px-16 md:py-6 rounded-full transition-all duration-300 group-hover:scale-[1.02]"
                        style={{
                          background: 'linear-gradient(180deg, hsl(160, 30%, 10%) 0%, hsl(160, 35%, 6%) 100%)',
                          color: 'white',
                          boxShadow: '0 0 15px rgba(20, 184, 166, 0.4), 0 8px 24px rgba(0,0,0,0.4)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                          border: '2px solid transparent',
                          backgroundClip: 'padding-box',
                        }}
                      >
                        FREE ASSESSMENT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
        
        <div style={{ opacity: gridFadeOut, transition: 'opacity 0.15s ease-out' }}>
          <GridBackground horizonOpacity={outlineOpacity} />
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
                  transformOrigin: isMobile ? '50% 75%' : '50% 82%',
                  opacity: houseFadeOut,
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden', // Prevent flicker
                }}
              >
              <div className="w-full max-w-2xl svg-container relative z-20" style={{ containerType: 'inline-size' }}>
                <svg
                  viewBox="0 0 400 280"
                  className="w-full roof-build-svg"
                  style={{
                    filter: 'drop-shadow(0 0 40px hsl(168 80% 45% / 0.15))',
                    overflow: 'visible',
                  }}
                >
                  {/* Pulsing roof outline hint during buffer period - hidden during zoom */}
                  {showScrollHint && zoomProgress === 0 && (
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
                  <HouseSVG doorAngle={doorAngle} lightBoost={zoomProgress} outlineOpacity={outlineOpacity} />
                  
                  {/* Animated roof layers - 10 layers in correct installation order */}
                  {/* 1. Replace Decking */}
                  <DeckingLayer progress={progress} startProgress={layers[0].start} endProgress={layers[0].end} isMobile={isMobile} />
                  
                  {/* 3. Ice & Water Shield */}
                  <IceWaterShieldLayer progress={progress} startProgress={layers[2].start} endProgress={layers[2].end} isMobile={isMobile} />
                  {/* 4. Underlayment */}
                  <UnderlaymentLayer progress={progress} startProgress={layers[3].start} endProgress={layers[3].end} isMobile={isMobile} />
                  {/* 5. Starter Strip */}
                  <StarterStripLayer progress={progress} startProgress={layers[4].start} endProgress={layers[4].end} isMobile={isMobile} />
                  {/* 6. Shingles */}
                  <ShinglesLayer progress={progress} startProgress={layers[5].start} endProgress={layers[5].end} isMobile={isMobile} />
                  {/* 8a. Chimney Flashing - renders BEHIND vents */}
                  <ChimneyFlashingLayer progress={progress} startProgress={layers[7].start} endProgress={layers[7].end} isMobile={isMobile} />
                  {/* 7. Pipe Boots & Vents */}
                  <VentsLayer progress={progress} startProgress={layers[6].start} endProgress={layers[6].end} isMobile={isMobile} />
                  {/* 8b. Pipe/Vent Flashing - renders ON TOP of vents */}
                  <FlashingLayer progress={progress} startProgress={layers[7].start} endProgress={layers[7].end} isMobile={isMobile} />
                  {/* 9. Ridge Vent & Cap */}
                  <RidgeCapLayer progress={progress} startProgress={layers[8].start} endProgress={layers[8].end} isMobile={isMobile} />
                  {/* 10. Complete Clean Up - Dumpster is now in truck overlay SVG for both mobile and desktop */}
                  {/* 2. Drip Edge rendered after all layers to be on top */}
                  <DripEdgeEavesLayer progress={progress} startProgress={layers[1].start} endProgress={layers[1].end} isMobile={isMobile} />
                  
                  {/* Palm trees and yard sign - DESKTOP ONLY */}
                  {!isMobile && (
                    <>
                      {/* Palm tree 1 - left side, enters first */}
                      <FallingPalmTree 
                        truckProgress={progress}
                        truckStartProgress={layers[10].start}
                        truckEndProgress={layers[10].end}
                        isMobile={isMobile}
                        delayOffset={0}
                      />
                      
                      {/* Palm tree 2 - right side (mirrored), enters after palm tree 1 */}
                      <FallingPalmTree 
                        truckProgress={progress}
                        truckStartProgress={layers[10].start}
                        truckEndProgress={layers[10].end}
                        isMobile={isMobile}
                        mirrored
                        delayOffset={0.08}
                      />
                      
                      {/* Yard sign drops in to the right of the door */}
                      <YardSign 
                        truckProgress={progress}
                        truckStartProgress={layers[10].start}
                        truckEndProgress={layers[10].end}
                        isMobile={isMobile}
                      />
                    </>
                  )}
                  
                  {/* Mobile-only palm trees on both sides of lawn */}
                  {isMobile && (
                    <>
                      <MobilePalmTree 
                        truckProgress={progress}
                        truckStartProgress={layers[10].start}
                        truckEndProgress={layers[10].end}
                        isMobile={isMobile}
                      />
                      <MobilePalmTree 
                        truckProgress={progress}
                        truckStartProgress={layers[10].start}
                        truckEndProgress={layers[10].end}
                        isMobile={isMobile}
                        mirrored={true}
                        delayOffset={0.10}
                      />
                      <MobileYardSign 
                        truckProgress={progress}
                        truckStartProgress={layers[10].start}
                        truckEndProgress={layers[10].end}
                        isMobile={isMobile}
                        delayOffset={0.35}
                      />
                    </>
                  )}
                  
                </svg>
              </div>
            </div>

            {/* Material labels - left side (positioned as overlay) */}
            <div
              className="absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 pr-4 hidden lg:block w-56 z-10"
            >
              <div className="space-y-5">
                {materialInfo.slice(0, 5).map((material, index) => {
                  // 9 total items: left side shows 1-5
                  const exitProgress = getLabelExitProgress(index);
                  const isExiting = progress >= 0.92;
                  
                  // During exit: slide left and fade out
                  // Before exit: normal lock-in animation (active OR locked shows full)
                  const isActive = activeMaterials[index] || lockedMaterials[index];
                  const translateX = isExiting 
                    ? -150 * exitProgress 
                    : (isActive ? 0 : -20);
                  const opacity = isExiting 
                    ? Math.max(0, 1 - exitProgress) 
                    : (isActive ? 1 : 0.25);
                  
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
                          color: (lockedMaterials[index] || activeMaterials[index]) ? 'hsl(168 80% 60%)' : 'hsl(168 50% 40%)',
                          textShadow: (lockedMaterials[index] || activeMaterials[index])
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
                          opacity: (lockedMaterials[index] || activeMaterials[index]) ? 1 : 0.5,
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
              className="absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 pl-4 hidden lg:block w-56 z-10"
            >
              <div className="space-y-5">
                {materialInfo.slice(5, 10).map((material, index) => {
                  // Right side shows 6-10 (indices 5-9)
                  const actualIndex = index + 5;
                  const exitProgress = getLabelExitProgress(index);
                  const isExiting = progress >= 0.92;
                  
                  // During exit: slide right and fade out (positive X)
                  // Before exit: normal lock-in animation (active OR locked shows full)
                  const isActive = activeMaterials[actualIndex] || lockedMaterials[actualIndex];
                  const translateX = isExiting 
                    ? 150 * exitProgress 
                    : (isActive ? 0 : 20);
                  const opacity = isExiting 
                    ? Math.max(0, 1 - exitProgress) 
                    : (isActive ? 1 : 0.25);
                  
                  return (
                    <div
                      key={material.id}
                      className={`text-left pb-4 ${index < 3 ? 'border-b border-teal-800/20' : ''}`}
                      style={{
                        opacity,
                        transform: `translateX(${translateX}px)`,
                        transition: isExiting ? 'none' : 'all 0.5s ease-out',
                      }}
                    >
                      <div 
                        className="text-sm font-semibold tracking-wide whitespace-nowrap"
                        style={{
                          color: (lockedMaterials[actualIndex] || activeMaterials[actualIndex]) ? 'hsl(168 80% 60%)' : 'hsl(168 50% 40%)',
                          textShadow: (lockedMaterials[actualIndex] || activeMaterials[actualIndex])
                            ? '0 0 20px hsl(168 80% 50% / 0.8), 0 0 40px hsl(168 80% 50% / 0.4)' 
                            : 'none',
                        }}
                      >
                        <span className="text-xs font-normal opacity-60 mr-1.5">{actualIndex + 1}.</span>
                        {material.name}
                      </div>
                      <div 
                        className="text-xs text-muted-foreground/70 mt-1 leading-relaxed"
                        style={{
                          opacity: (lockedMaterials[actualIndex] || activeMaterials[actualIndex]) ? 1 : 0.5,
                        }}
                      >
                        {material.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 11. Truck hauls dumpster away - rendered OUTSIDE house container with z-20 to appear above labels (z-10) */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className={`relative w-full ${isMobile ? 'max-w-[85vw]' : 'max-w-3xl'} aspect-[4/3]`}>
                <svg
                  viewBox="0 0 400 280"
                  className="absolute inset-0 w-full h-full"
                  style={{ overflow: 'visible' }}
                >
                  {/* "Complete Clean Up" text - shows on both mobile and desktop */}
                  <CleanUpRevealText 
                    truckProgress={progress}
                    truckStartProgress={layers[10].start}
                    truckEndProgress={layers[10].end}
                    isMobile={isMobile}
                  />
                  
                  {/* Dumpster rendered in same SVG as truck for alignment */}
                  {/* Hide exactly when truck's isDrivingAway becomes true (backPhaseEnd: 0.50 mobile, 0.40 desktop) */}
                  {progress < layers[10]?.start + (layers[10]?.end - layers[10]?.start) * (isMobile ? 0.50 : 0.40) && (
                    <DumpsterLayer progress={progress} startProgress={layers[9].start} endProgress={layers[9].end} isMobile={isMobile} />
                  )}
                  <TruckLayer 
                    progress={progress} 
                    startProgress={layers[10].start} 
                    endProgress={layers[10].end} 
                    isMobile={isMobile}
                    dumpsterProgress={dumpsterAnimProgress}
                  />
                </svg>
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
