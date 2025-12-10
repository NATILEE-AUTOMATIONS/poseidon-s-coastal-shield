import React, { useRef } from 'react';
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
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const RoofBuildSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // Layer timing - delayed start at 8% for "settle in" period
  // Each layer gets ~9.2% of scroll (92% total / 10 layers)
  const layers = [
    { start: 0.08, end: 0.17 },   // 1. Decking
    { start: 0.17, end: 0.26 },   // 2. Drip Edge Eaves
    { start: 0.26, end: 0.35 },   // 3. Ice & Water
    { start: 0.35, end: 0.44 },   // 4. Underlayment
    { start: 0.44, end: 0.53 },   // 5. Drip Edge Rakes
    { start: 0.53, end: 0.62 },   // 6. Starter Strip
    { start: 0.62, end: 0.71 },   // 7. Shingles
    { start: 0.71, end: 0.80 },   // 8. Vents
    { start: 0.80, end: 0.89 },   // 9. Flashing
    { start: 0.89, end: 0.98 },   // 10. Ridge Cap
  ];

  // Show hint during buffer period (0-8%)
  const showScrollHint = progress < 0.08;

  // Calculate which materials are "locked in"
  const getLockedMaterials = () => {
    return materialInfo.map((_, index) => progress >= layers[index].end);
  };

  const lockedMaterials = getLockedMaterials();

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      {/* Sticky container - offset for navbar height */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <GridBackground />
        
        {/* Content container - with top padding for navbar clearance */}
        <div className="relative z-10 h-full flex flex-col items-center justify-start pt-32 md:pt-56 lg:pt-64 px-4">

          {/* Main visualization container - house centered independently */}
          <div className="relative w-full max-w-5xl mx-auto">
            {/* House + Layers SVG - perfectly centered */}
            <div className="flex justify-center">
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
                  
                  {/* House base */}
                  <HouseSVG />
                  
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
              currentStep={Math.max(0, Math.min(9, Math.floor((progress - 0.08) / 0.092)))} 
              isVisible={progress >= 0.10 && progress <= 0.95}
            />

            {/* Material labels - left side (positioned as overlay) */}
            <div className="absolute left-0 xl:left-4 top-1/2 -translate-y-1/2 pr-4 hidden xl:block w-56">
              <div className="space-y-5">
                {materialInfo.slice(0, 5).map((material, index) => (
                  <div
                    key={material.id}
                    className={`text-right transition-all duration-500 ease-out pb-4 ${index < 4 ? 'border-b border-teal-800/20' : ''}`}
                    style={{
                      opacity: lockedMaterials[index] ? 1 : 0.25,
                      transform: `translateX(${lockedMaterials[index] ? 0 : -20}px)`,
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
                ))}
              </div>
            </div>

            {/* Material labels - right side (positioned as overlay) */}
            <div className="absolute right-0 xl:right-4 top-1/2 -translate-y-1/2 pl-4 hidden xl:block w-56">
              <div className="space-y-5">
                {materialInfo.slice(5).map((material, index) => (
                  <div
                    key={material.id}
                    className={`text-left transition-all duration-500 ease-out pb-4 ${index < 4 ? 'border-b border-teal-800/20' : ''}`}
                    style={{
                      opacity: lockedMaterials[index + 5] ? 1 : 0.25,
                      transform: `translateX(${lockedMaterials[index + 5] ? 0 : 20}px)`,
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
                ))}
              </div>
            </div>

          </div>


          {/* Progress bar - minimal and elegant */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-muted/30 rounded-full overflow-hidden"
            style={{
              opacity: progress > 0.95 ? 0 : 1,
              transition: 'opacity 0.5s ease-out',
            }}
          >
            <div 
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, hsl(168 80% 50%), hsl(32 80% 55%))',
                boxShadow: '0 0 12px hsl(168 80% 50% / 0.6)',
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>

        </div>

        {/* Completion message - positioned at very bottom with backdrop */}
        <div 
          className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center z-20 transition-all duration-700 ease-out py-6"
          style={{
            opacity: progress > 0.95 ? 1 : 0,
            transform: `translateY(${progress > 0.95 ? 0 : 30}px)`,
            pointerEvents: progress > 0.95 ? 'auto' : 'none',
            background: 'linear-gradient(to top, hsl(160 30% 6% / 0.95) 0%, hsl(160 30% 6% / 0.8) 50%, transparent 100%)',
          }}
        >
          <p 
            className="text-xl md:text-2xl font-medium mb-4"
            style={{
              color: 'hsl(168 70% 60%)',
              textShadow: '0 0 30px hsl(168 80% 50% / 0.6), 0 0 60px hsl(168 80% 50% / 0.3)',
            }}
          >
            Every layer matters. Trust the experts.
          </p>
          <Button className="btn-neon group">
            <span className="btn-text">Free Assessment</span>
            <ArrowRight className="btn-icon ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoofBuildSection;
