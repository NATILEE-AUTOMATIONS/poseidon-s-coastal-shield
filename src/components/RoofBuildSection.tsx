import React, { useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import GridBackground from './RoofBuild/GridBackground';
import HouseSVG from './RoofBuild/HouseSVG';
import {
  DripEdgeLayer,
  IceWaterShieldLayer,
  UnderlaymentLayer,
  StarterStripLayer,
  FlashingLayer,
  FieldShinglesLayer,
  RidgeCapLayer,
  VentsLayer,
  materialInfo,
} from './RoofBuild/RoofLayers';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const RoofBuildSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // Layer timing - each layer gets ~12.5% of the scroll
  const layers = [
    { start: 0, end: 0.12 },
    { start: 0.12, end: 0.25 },
    { start: 0.25, end: 0.37 },
    { start: 0.37, end: 0.50 },
    { start: 0.50, end: 0.62 },
    { start: 0.62, end: 0.75 },
    { start: 0.75, end: 0.87 },
    { start: 0.87, end: 1.0 },
  ];

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
        <div className="relative z-10 h-full flex flex-col items-center justify-start pt-56 lg:pt-64 px-4">

          {/* Main visualization container */}
          <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center">
            {/* Material labels - left side */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 pr-8 hidden xl:block w-48">
              <div className="space-y-4">
                {materialInfo.slice(0, 4).map((material, index) => (
                  <div
                    key={material.id}
                    className="text-right transition-all duration-500 ease-out"
                    style={{
                      opacity: lockedMaterials[index] ? 1 : 0.25,
                      transform: `translateX(${lockedMaterials[index] ? 0 : -20}px)`,
                    }}
                  >
                    <div 
                      className="text-sm font-semibold tracking-wide"
                      style={{
                        color: lockedMaterials[index] ? 'hsl(168 80% 60%)' : 'hsl(168 50% 40%)',
                        textShadow: lockedMaterials[index] 
                          ? '0 0 20px hsl(168 80% 50% / 0.8), 0 0 40px hsl(168 80% 50% / 0.4)' 
                          : 'none',
                      }}
                    >
                      {material.name}
                    </div>
                    <div 
                      className="text-xs text-muted-foreground/70 mt-0.5 leading-tight"
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

            {/* Material labels - right side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pl-8 hidden xl:block w-48">
              <div className="space-y-4">
                {materialInfo.slice(4).map((material, index) => (
                  <div
                    key={material.id}
                    className="text-left transition-all duration-500 ease-out"
                    style={{
                      opacity: lockedMaterials[index + 4] ? 1 : 0.25,
                      transform: `translateX(${lockedMaterials[index + 4] ? 0 : 20}px)`,
                    }}
                  >
                    <div 
                      className="text-sm font-semibold tracking-wide"
                      style={{
                        color: lockedMaterials[index + 4] ? 'hsl(168 80% 60%)' : 'hsl(168 50% 40%)',
                        textShadow: lockedMaterials[index + 4] 
                          ? '0 0 20px hsl(168 80% 50% / 0.8), 0 0 40px hsl(168 80% 50% / 0.4)' 
                          : 'none',
                      }}
                    >
                      {material.name}
                    </div>
                    <div 
                      className="text-xs text-muted-foreground/70 mt-0.5 leading-tight"
                      style={{
                        opacity: lockedMaterials[index + 4] ? 1 : 0.5,
                      }}
                    >
                      {material.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House + Layers SVG */}
            <div className="relative w-full max-w-2xl">
              <svg
                viewBox="0 0 400 280"
                className="w-full"
                style={{
                  filter: 'drop-shadow(0 0 40px hsl(168 80% 45% / 0.15))',
                }}
              >
                {/* House base */}
                <HouseSVG />
                
                {/* Animated roof layers */}
                <DripEdgeLayer progress={progress} startProgress={layers[0].start} endProgress={layers[0].end} />
                <IceWaterShieldLayer progress={progress} startProgress={layers[1].start} endProgress={layers[1].end} />
                <UnderlaymentLayer progress={progress} startProgress={layers[2].start} endProgress={layers[2].end} />
                <StarterStripLayer progress={progress} startProgress={layers[3].start} endProgress={layers[3].end} />
                <FlashingLayer progress={progress} startProgress={layers[4].start} endProgress={layers[4].end} />
                <FieldShinglesLayer progress={progress} startProgress={layers[5].start} endProgress={layers[5].end} />
                <RidgeCapLayer progress={progress} startProgress={layers[6].start} endProgress={layers[6].end} />
                <VentsLayer progress={progress} startProgress={layers[7].start} endProgress={layers[7].end} />
              </svg>
            </div>

            {/* Mobile material list */}
            <div className="xl:hidden absolute -bottom-24 left-0 right-0">
              <div className="grid grid-cols-4 gap-1 px-2">
                {materialInfo.map((material, index) => (
                  <div
                    key={material.id}
                    className="text-center p-1.5 rounded transition-all duration-300"
                    style={{
                      opacity: lockedMaterials[index] ? 1 : 0.3,
                      background: lockedMaterials[index] ? 'hsl(168 80% 45% / 0.1)' : 'transparent',
                    }}
                  >
                    <div 
                      className="text-[10px] font-medium leading-tight"
                      style={{
                        color: lockedMaterials[index] ? 'hsl(168 80% 60%)' : 'hsl(168 50% 40%)',
                        textShadow: lockedMaterials[index] ? '0 0 8px hsl(168 80% 50% / 0.6)' : 'none',
                      }}
                    >
                      {material.name}
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
