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
    { start: 0, end: 0.12 },      // Drip Edge
    { start: 0.12, end: 0.25 },   // Ice & Water Shield
    { start: 0.25, end: 0.37 },   // Underlayment
    { start: 0.37, end: 0.50 },   // Starter Strip
    { start: 0.50, end: 0.62 },   // Flashing
    { start: 0.62, end: 0.75 },   // Field Shingles
    { start: 0.75, end: 0.87 },   // Ridge Cap
    { start: 0.87, end: 1.0 },    // Vents
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
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <GridBackground />
        
        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Header */}
          <div 
            className="text-center mb-8 transition-opacity duration-500"
            style={{ opacity: progress < 0.1 ? 1 : Math.max(0.3, 1 - progress * 0.7) }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-glow-teal mb-4">
              What Goes Into Your New Roof?
            </h2>
            <p className="text-lg md:text-xl text-glow-orange opacity-80">
              More than just shingles...
            </p>
          </div>

          {/* Main visualization container */}
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Material labels - left side */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-6 hidden lg:block">
              <div className="space-y-3">
                {materialInfo.slice(0, 4).map((material, index) => (
                  <div
                    key={material.id}
                    className="text-right transition-all duration-300"
                    style={{
                      opacity: lockedMaterials[index] ? 1 : 0.3,
                      transform: lockedMaterials[index] ? 'translateX(0)' : 'translateX(-10px)',
                    }}
                  >
                    <div 
                      className="text-sm font-semibold"
                      style={{
                        color: lockedMaterials[index] ? 'hsl(168 80% 55%)' : 'hsl(168 80% 45% / 0.5)',
                        textShadow: lockedMaterials[index] ? '0 0 10px hsl(168 80% 50% / 0.6)' : 'none',
                      }}
                    >
                      {material.name}
                    </div>
                    <div className="text-xs text-muted-foreground max-w-[160px]">
                      {material.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Material labels - right side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pl-6 hidden lg:block">
              <div className="space-y-3">
                {materialInfo.slice(4).map((material, index) => (
                  <div
                    key={material.id}
                    className="text-left transition-all duration-300"
                    style={{
                      opacity: lockedMaterials[index + 4] ? 1 : 0.3,
                      transform: lockedMaterials[index + 4] ? 'translateX(0)' : 'translateX(10px)',
                    }}
                  >
                    <div 
                      className="text-sm font-semibold"
                      style={{
                        color: lockedMaterials[index + 4] ? 'hsl(168 80% 55%)' : 'hsl(168 80% 45% / 0.5)',
                        textShadow: lockedMaterials[index + 4] ? '0 0 10px hsl(168 80% 50% / 0.6)' : 'none',
                      }}
                    >
                      {material.name}
                    </div>
                    <div className="text-xs text-muted-foreground max-w-[160px]">
                      {material.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House + Layers SVG */}
            <div className="relative">
              <svg
                viewBox="0 0 400 280"
                className="w-full max-w-2xl mx-auto"
                style={{
                  filter: 'drop-shadow(0 0 30px hsl(168 80% 45% / 0.2))',
                }}
              >
                {/* House base is always visible */}
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
            <div className="lg:hidden mt-6 grid grid-cols-2 gap-2 px-4">
              {materialInfo.map((material, index) => (
                <div
                  key={material.id}
                  className="text-center p-2 rounded-lg transition-all duration-300"
                  style={{
                    opacity: lockedMaterials[index] ? 1 : 0.4,
                    background: lockedMaterials[index] ? 'hsl(168 80% 45% / 0.1)' : 'transparent',
                  }}
                >
                  <div 
                    className="text-xs font-semibold"
                    style={{
                      color: lockedMaterials[index] ? 'hsl(168 80% 55%)' : 'hsl(168 80% 45% / 0.5)',
                    }}
                  >
                    {material.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress * 100}%`,
                  background: 'linear-gradient(90deg, hsl(168 80% 45%), hsl(32 90% 50%))',
                  boxShadow: '0 0 10px hsl(168 80% 50% / 0.5)',
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {Math.round(progress * 100)}%
            </span>
          </div>

          {/* Completion message */}
          <div 
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center transition-all duration-500"
            style={{
              opacity: progress > 0.95 ? 1 : 0,
              transform: progress > 0.95 ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <p className="text-lg text-glow-teal mb-4">
              Every layer matters. Trust the experts.
            </p>
            <Button className="btn-neon group">
              <span className="btn-text">Free Assessment</span>
              <ArrowRight className="btn-icon ml-2 h-4 w-4 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoofBuildSection;
