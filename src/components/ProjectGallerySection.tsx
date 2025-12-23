import React from 'react';
import doorwayImage from '@/assets/doorway-reveal-image.png';
import coastalCrew from '@/assets/coastal-home-crew.png';
import coastalRoofing from '@/assets/coastal-home-roofing.png';
import aerialPool from '@/assets/aerial-estate-pool.png';
import { useIsMobile } from '@/hooks/use-mobile';

const images = [
  { src: doorwayImage, label: 'Premium Installation' },
  { src: coastalCrew, label: 'Expert Team' },
  { src: coastalRoofing, label: 'Coastal Excellence' },
  { src: aerialPool, label: 'Luxury Estates' },
];

const ProjectGallerySection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Mobile: Warm orange transition zone that fades to slate */}
      {isMobile && (
        <div 
          className="relative h-[50vh] md:hidden"
          style={{
            background: `linear-gradient(180deg, 
              hsl(25 75% 35%) 0%,
              hsl(25 65% 28%) 15%,
              hsl(28 55% 22%) 35%,
              hsl(200 35% 15%) 60%,
              hsl(220 30% 12%) 100%
            )`,
          }}
        >
          {/* Warm glow at top to match doorway */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, hsl(35 85% 55% / 0.5) 0%, transparent 70%)`,
            }}
          />
        </div>
      )}
      
      <section className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 md:py-32 overflow-hidden">
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 20%, hsl(168 60% 30% / 0.12) 0%, transparent 50%)`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Our <span className="text-teal-400">Craftsmanship</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Excellence in every shingle, precision in every detail
          </p>
        </div>
        
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {images.map((img, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              
              {/* Hover border glow */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 0 2px hsl(168 60% 50% / 0.5), 0 0 30px hsl(168 60% 50% / 0.2)',
                }}
              />
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-16">
          <button className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-400/40 hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
      </section>
    </>
  );
};

export default ProjectGallerySection;